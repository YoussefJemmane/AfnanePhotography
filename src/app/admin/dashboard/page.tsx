"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/admin/StatsCard";
import { LineChart, BarChart, DoughnutChart } from "@/components/admin/Charts";
import TopPagesTable from "@/components/admin/TopPagesTable";

type TimePeriod = "24h" | "7d" | "30d";

interface ChangeInfo {
  value: string;
  type: "positive" | "negative" | "neutral";
}

interface AnalyticsData {
  overview: {
    activeUsers: number;
    pageViews: number;
    avgDuration: string;
    mobileRate: number;
    changes: {
      activeUsers: ChangeInfo;
      pageViews: ChangeInfo;
      avgDuration: ChangeInfo;
      mobileRate: ChangeInfo;
    };
  };
  timeSeries: { labels: string[]; values: number[] };
  topPages: { path: string; views: number; uniqueVisitors: number; avgTime: string }[];
  pagesBar: { labels: string[]; values: number[] };
  devices: { labels: string[]; values: number[] };
  browsers: { labels: string[]; values: number[] };
}

// Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DeviceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [period, setPeriod] = useState<TimePeriod>("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (p: TimePeriod) => {
      const token = sessionStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/analytics?period=${p}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          sessionStorage.removeItem("admin_token");
          router.push("/admin");
          return;
        }

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Erreur lors du chargement des analytics");
        }

        setData(await res.json());
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    fetchAnalytics(period);
  }, [period, fetchAnalytics, router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    router.push("/admin");
  };

  // Loading state
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-500">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => fetchAnalytics(period)}
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Réessayer
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { overview, timeSeries, topPages, pagesBar, devices, browsers } = data;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
              <p className="text-sm text-gray-500 mt-1">Afnane Photography - Analytics</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogoutIcon />
              <span>Deconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Period Selector */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Periode:</span>
          {(["24h", "7d", "30d"] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {p === "24h" ? "24 heures" : p === "7d" ? "7 jours" : "30 jours"}
            </button>
          ))}
          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-800 ml-3"></div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Visiteurs Uniques"
            value={overview.activeUsers.toLocaleString()}
            change={overview.changes.activeUsers.value}
            changeType={overview.changes.activeUsers.type}
            icon={<UsersIcon />}
          />
          <StatsCard
            title="Pages Vues"
            value={overview.pageViews.toLocaleString()}
            change={overview.changes.pageViews.value}
            changeType={overview.changes.pageViews.type}
            icon={<EyeIcon />}
          />
          <StatsCard
            title="Temps Moyen"
            value={overview.avgDuration}
            change={overview.changes.avgDuration.value}
            changeType={overview.changes.avgDuration.type}
            icon={<ClockIcon />}
          />
          <StatsCard
            title="Taux Mobile"
            value={`${overview.mobileRate}%`}
            change={overview.changes.mobileRate.value}
            changeType={overview.changes.mobileRate.type}
            icon={<DeviceIcon />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart data={timeSeries} title="Evolution des visites" />
          <BarChart data={pagesBar} title="Pages les plus visitees" />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DoughnutChart data={devices} title="Appareils" />
          <DoughnutChart data={browsers} title="Navigateurs" />
        </div>

        {/* Top Pages Table */}
        <TopPagesTable data={topPages} title="Details par page" />

        {/* Info Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Les donnees proviennent de Google Analytics (GA4).
            Il peut y avoir un delai de 24-48h avant que les nouvelles visites apparaissent.
          </p>
        </div>
      </main>
    </div>
  );
}
