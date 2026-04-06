import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextRequest, NextResponse } from "next/server";

const propertyId = process.env.GA4_PROPERTY_ID;

function getClient() {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    },
  });
}

function getDateRanges(period: string) {
  switch (period) {
    case "24h":
      return {
        current: { startDate: "yesterday", endDate: "today" },
        previous: { startDate: "3daysAgo", endDate: "2daysAgo" },
        timeDimension: "dateHour",
      };
    case "7d":
      return {
        current: { startDate: "7daysAgo", endDate: "today" },
        previous: { startDate: "14daysAgo", endDate: "8daysAgo" },
        timeDimension: "date",
      };
    case "30d":
    default:
      return {
        current: { startDate: "30daysAgo", endDate: "today" },
        previous: { startDate: "60daysAgo", endDate: "31daysAgo" },
        timeDimension: "date",
      };
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function calcChange(
  current: number,
  previous: number
): { value: string; type: "positive" | "negative" | "neutral" } {
  if (previous === 0) {
    if (current === 0) return { value: "0.0%", type: "neutral" };
    return { value: "+100%", type: "positive" };
  }
  const change = ((current - previous) / previous) * 100;
  const type =
    change > 0 ? "positive" : change < 0 ? "negative" : "neutral";
  return {
    value: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
    type,
  };
}

function formatDateLabel(dateStr: string, period: string): string {
  if (period === "24h" && dateStr.length >= 10) {
    return `${dateStr.slice(8, 10)}:00`;
  }
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  if (period === "7d") {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return days[date.getDay()];
  }
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMetricValue(row: any, index: number, asFloat = false): number {
  const val = row?.metricValues?.[index]?.value || "0";
  return asFloat ? parseFloat(val) : parseInt(val);
}

export async function GET(request: NextRequest) {
  // Auth: validate the admin code server-side
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!propertyId) {
    return NextResponse.json(
      {
        error: "GA4_PROPERTY_ID not configured",
        message:
          "Add GA4_PROPERTY_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY to your .env.local",
      },
      { status: 500 }
    );
  }

  const period = request.nextUrl.searchParams.get("period") || "7d";
  const { current, previous, timeDimension } = getDateRanges(period);
  const property = `properties/${propertyId}`;
  const client = getClient();

  try {
    const [
      currentOverview,
      previousOverview,
      timeSeries,
      topPages,
      currentDevices,
      previousDevices,
      browsers,
    ] = await Promise.all([
      // Current period overview
      client.runReport({
        property,
        dateRanges: [current],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "sessions" },
        ],
      }),
      // Previous period overview (for % change comparison)
      client.runReport({
        property,
        dateRanges: [previous],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "sessions" },
        ],
      }),
      // Time series (visit trends over time)
      client.runReport({
        property,
        dateRanges: [current],
        dimensions: [{ name: timeDimension }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: timeDimension } }],
      }),
      // Top pages by views
      client.runReport({
        property,
        dateRanges: [current],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "activeUsers" },
          { name: "averageSessionDuration" },
        ],
        orderBys: [
          { metric: { metricName: "screenPageViews" }, desc: true },
        ],
        limit: 10,
      }),
      // Current device breakdown
      client.runReport({
        property,
        dateRanges: [current],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
      }),
      // Previous device breakdown (for mobile rate comparison)
      client.runReport({
        property,
        dateRanges: [previous],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
      }),
      // Browser breakdown
      client.runReport({
        property,
        dateRanges: [current],
        dimensions: [{ name: "browser" }],
        metrics: [{ name: "sessions" }],
        orderBys: [
          { metric: { metricName: "sessions" }, desc: true },
        ],
        limit: 5,
      }),
    ]);

    // Parse overview
    const cur = currentOverview[0]?.rows?.[0];
    const prev = previousOverview[0]?.rows?.[0];

    const activeUsers = getMetricValue(cur, 0);
    const pageViews = getMetricValue(cur, 1);
    const avgDuration = getMetricValue(cur, 2, true);
    const totalSessions = getMetricValue(cur, 3);

    const prevActiveUsers = getMetricValue(prev, 0);
    const prevPageViews = getMetricValue(prev, 1);
    const prevAvgDuration = getMetricValue(prev, 2, true);
    const prevTotalSessions = getMetricValue(prev, 3);

    // Mobile rate calculation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getMobileRate = (rows: any[], total: number) => {
      const mobileRow = rows?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) =>
          r.dimensionValues?.[0]?.value?.toLowerCase() === "mobile"
      );
      const mobileSessions = parseInt(
        mobileRow?.metricValues?.[0]?.value || "0"
      );
      return total > 0
        ? Math.round((mobileSessions / total) * 100)
        : 0;
    };

    const mobileRate = getMobileRate(
      currentDevices[0]?.rows || [],
      totalSessions
    );
    const prevMobileRate = getMobileRate(
      previousDevices[0]?.rows || [],
      prevTotalSessions
    );

    // Parse time series
    const timeSeriesData = {
      labels: (timeSeries[0]?.rows || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) =>
          formatDateLabel(
            row.dimensionValues?.[0]?.value || "",
            period
          )
      ),
      values: (timeSeries[0]?.rows || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) =>
          parseInt(row.metricValues?.[0]?.value || "0")
      ),
    };

    // Parse top pages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topPagesData = (topPages[0]?.rows || []).map((row: any) => ({
      path: row.dimensionValues?.[0]?.value || "",
      views: parseInt(row.metricValues?.[0]?.value || "0"),
      uniqueVisitors: parseInt(row.metricValues?.[1]?.value || "0"),
      avgTime: formatDuration(
        parseFloat(row.metricValues?.[2]?.value || "0")
      ),
    }));

    // Parse devices
    const devicesData = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      labels: (currentDevices[0]?.rows || []).map((row: any) => {
        const val = row.dimensionValues?.[0]?.value || "";
        return val.charAt(0).toUpperCase() + val.slice(1);
      }),
      values: (currentDevices[0]?.rows || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) =>
          parseInt(row.metricValues?.[0]?.value || "0")
      ),
    };

    // Parse browsers
    const browsersData = {
      labels: (browsers[0]?.rows || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) => row.dimensionValues?.[0]?.value || ""
      ),
      values: (browsers[0]?.rows || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) =>
          parseInt(row.metricValues?.[0]?.value || "0")
      ),
    };

    // Top pages bar chart data
    const pagesBar = {
      labels: topPagesData.slice(0, 5).map((p) =>
        p.path === "/" ? "Accueil" : p.path.split("/").pop() || p.path
      ),
      values: topPagesData.slice(0, 5).map((p) => p.views),
    };

    return NextResponse.json({
      overview: {
        activeUsers,
        pageViews,
        avgDuration: formatDuration(avgDuration),
        mobileRate,
        changes: {
          activeUsers: calcChange(activeUsers, prevActiveUsers),
          pageViews: calcChange(pageViews, prevPageViews),
          avgDuration: calcChange(avgDuration, prevAvgDuration),
          mobileRate: calcChange(mobileRate, prevMobileRate),
        },
      },
      timeSeries: timeSeriesData,
      topPages: topPagesData,
      pagesBar,
      devices: devicesData,
      browsers: browsersData,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GA4 API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics", message },
      { status: 500 }
    );
  }
}
