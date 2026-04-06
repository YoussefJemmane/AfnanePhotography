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

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!propertyId) {
    return NextResponse.json(
      { error: "GA4_PROPERTY_ID not configured" },
      { status: 500 }
    );
  }

  const property = `properties/${propertyId}`;
  const client = getClient();

  try {
    const [activeUsers, pageViews, topPages, devices] = await Promise.all([
      // Active users right now
      client.runRealtimeReport({
        property,
        metrics: [{ name: "activeUsers" }],
      }),
      // Page views in last 30 min
      client.runRealtimeReport({
        property,
        metrics: [{ name: "screenPageViews" }],
      }),
      // Top pages right now
      client.runRealtimeReport({
        property,
        dimensions: [{ name: "unifiedScreenName" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 5,
      }),
      // Devices right now
      client.runRealtimeReport({
        property,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
      }),
    ]);

    const activeUsersCount = parseInt(
      activeUsers[0]?.rows?.[0]?.metricValues?.[0]?.value || "0"
    );
    const pageViewsCount = parseInt(
      pageViews[0]?.rows?.[0]?.metricValues?.[0]?.value || "0"
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topPagesData = (topPages[0]?.rows || []).map((row: any) => ({
      page: row.dimensionValues?.[0]?.value || "",
      activeUsers: parseInt(row.metricValues?.[0]?.value || "0"),
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const devicesData = (devices[0]?.rows || []).map((row: any) => ({
      device: row.dimensionValues?.[0]?.value || "",
      activeUsers: parseInt(row.metricValues?.[0]?.value || "0"),
    }));

    return NextResponse.json({
      activeUsers: activeUsersCount,
      pageViews: pageViewsCount,
      topPages: topPagesData,
      devices: devicesData,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GA4 Realtime API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch realtime data", message },
      { status: 500 }
    );
  }
}
