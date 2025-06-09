"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    companies: 0,
    letters: 0,
    sectors: 0,
    authorities: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [companies, letters, sectors, authorities] = await Promise.all([
          fetch("/api/companies").then((res) => res.json()),
          fetch("/api/letters").then((res) => res.json()),
          fetch("/api/sectors").then((res) => res.json()),
          fetch("/api/authorities").then((res) => res.json()),
        ]);

        setCounts({
          companies: companies.length,
          letters: letters.length,
          sectors: sectors.length,
          authorities: authorities.length,
        });
      } catch (err) {
        console.error("فشل في تحميل الإحصائيات", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 لوحة التحكم</h1>

      {/* البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="الشركات" count={counts.companies} />
        <StatCard label="الخطابات" count={counts.letters} />
      </div>
    </div>
  );
}

const StatCard = ({ label, count }: { label: string; count: number }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h2 className="text-2xl font-bold text-indigo-600">{count}</h2>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);
