"use client";

import React, { useEffect, useState } from "react";

interface Property {
  PropertyID: number;
  Name: string;
  Location: string;
  Status: string;
  ownerCompany: {
    CompanyName: string;
  };
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>جاري تحميل الأصول...</p>;
  if (!properties.length) return <p>لا توجد أصول عقارية للعرض.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">قائمة الأصول العقارية</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">الرقم التعريفي</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الموقع</th>
            <th className="border p-2">الشركة المالكة</th>
            <th className="border p-2">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.PropertyID} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{prop.PropertyID}</td>
              <td className="border p-2">{prop.Name}</td>
              <td className="border p-2">{prop.Location}</td>
              <td className="border p-2">
                {prop.ownerCompany?.CompanyName || "-"}
              </td>
              <td className="border p-2">{prop.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
