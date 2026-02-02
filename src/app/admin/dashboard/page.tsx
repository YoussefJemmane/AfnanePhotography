"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/admin/StatsCard";
import { LineChart, BarChart, DoughnutChart } from "@/components/admin/Charts";
import TopPagesTable from "@/components/admin/TopPagesTable";

type TimePeriod = "24h" | "7d" | "30d";

// Icons as SVG components
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

// Generate mock data based on time period
function generateMockData(period: TimePeriod) {
  const now = new Date();
  const labels: string[] = [];
  const values: number[] = [];
  
  if (period === "24h") {
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      labels.push(`${hour.getHours()}:00`);
      values.push(Math.floor(Math.random() * 50) + 10);
    }
  } else if (period === "7d") {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      labels.push(days[day.getDay()]);
      values.push(Math.floor(Math.random() * 300) + 100);
    }
  } else {
    for (let i = 29; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      labels.push(`${day.getDate()}/${day.getMonth() + 1}`);
      values.push(Math.floor(Math.random() * 500) + 150);
    }
  }
  
  return { labels, values };
}

function generateTopPages() {
  return [
    { path: "/", views: Math.floor(Math.random() * 1000) + 500, uniqueVisitors: Math.floor(Math.random() * 500) + 200, avgTime: "2m 34s" },
    { path: "/gallerie", views: Math.floor(Math.random() * 800) + 300, uniqueVisitors: Math.floor(Math.random() * 400) + 150, avgTime: "3m 12s" },
    { path: "/service/nouveaune", views: Math.floor(Math.random() * 500) + 200, uniqueVisitors: Math.floor(Math.random() * 300) + 100, avgTime: "1m 45s" },
    { path: "/service/bebe", views: Math.floor(Math.random() * 400) + 150, uniqueVisitors: Math.floor(Math.random() * 250) + 80, avgTime: "2m 08s" },
    { path: "/service/famille", views: Math.floor(Math.random() * 350) + 100, uniqueVisitors: Math.floor(Math.random() * 200) + 60, avgTime: "1m 56s" },
    { path: "/service/grossesse", views: Math.floor(Math.random() * 300) + 80, uniqueVisitors: Math.floor(Math.random() * 180) + 50, avgTime: "2m 21s" },
    { path: "/service/mode", views: Math.floor(Math.random() * 250) + 70, uniqueVisitors: Math.floor(Math.random() * 150) + 40, avgTime: "1m 33s" },
  ];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [period, setPeriod] = useState<TimePeriod>("7d");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  const pageViewsData = generateMockData(period);
  const topPages = generateTopPages();
  
  const totalViews = pageViewsData.values.reduce((a, b) => a + b, 0);
  const uniqueVisitors = Math.floor(totalViews * 0.65);
  const avgTimeOnSite = "2m 18s";

  const deviceData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    values: [55, 38, 7],
  };

  const browserData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Autre"],
    values: [45, 30, 12, 8, 5],
  };

  const pagesBarData = {
    labels: topPages.slice(0, 5).map(p => p.path === "/" ? "Accueil" : p.path.split("/").pop() || p.path),
    values: topPages.slice(0, 5).map(p => p.views),
  };

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
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Period Selector */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Période:</span>
          {(["24h", "7d", "30d"] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {p === "24h" ? "24 heures" : p === "7d" ? "7 jours" : "30 jours"}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Visiteurs Uniques"
            value={uniqueVisitors.toLocaleString()}
            change="+12.5%"
            changeType="positive"
            icon={<UsersIcon />}
          />
          <StatsCard
            title="Pages Vues"
            value={totalViews.toLocaleString()}
            change="+8.2%"
            changeType="positive"
            icon={<EyeIcon />}
          />
          <StatsCard
            title="Temps Moyen"
            value={avgTimeOnSite}
            change="-2.4%"
            changeType="negative"
            icon={<ClockIcon />}
          />
          <StatsCard
            title="Taux Mobile"
            value="55%"
            change="+5.1%"
            changeType="positive"
            icon={<DeviceIcon />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart data={pageViewsData} title="Évolution des visites" />
          <BarChart data={pagesBarData} title="Pages les plus visitées" />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DoughnutChart data={deviceData} title="Appareils" />
          <DoughnutChart data={browserData} title="Navigateurs" />
        </div>

        {/* Top Pages Table */}
        <TopPagesTable data={topPages} title="Détails par page" />

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Ces données sont des exemples de démonstration. 
            Une fois déployé sur Vercel, les vraies données d'analytics seront disponibles 
            via le tableau de bord Vercel Analytics ou l'API Vercel.
          </p>
        </div>
      </main>
    </div>
  );
}
