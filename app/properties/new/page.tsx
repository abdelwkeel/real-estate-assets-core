"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    Name: "",
    Location: "",
    OwnerCompanyID: "",
    Status: "مملوك",
    LegalStatus: "سليم",
    UtilizationStatus: "مستغل",
    Governorate: "",
    Images: "",
    Documents: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.Name,
          Location: form.Location,
          OwnerCompanyID: Number(form.OwnerCompanyID),
          Status: form.Status,
          LegalStatus: form.LegalStatus,
          UtilizationStatus: form.UtilizationStatus,
          Governorate: form.Governorate,
          Images: form.Images,
          Documents: form.Documents,
        }),
      });
      if (res.ok) {
        router.push("/properties");
      } else {
        alert("فشل إضافة الأصل");
      }
    } catch {
      alert("حدث خطأ في الإرسال");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl mb-4 font-bold">إضافة أصل عقاري جديد</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          name="Name"
          placeholder="اسم الأصل"
          value={form.Name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          required
          name="Location"
          placeholder="الموقع (عنوان دقيق)"
          value={form.Location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          required
          name="OwnerCompanyID"
          placeholder="معرف الشركة المالكة"
          type="number"
          value={form.OwnerCompanyID}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="Status"
          value={form.Status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="مملوك">مملوك</option>
          <option value="قيد البيع">قيد البيع</option>
          <option value="مبيع">مبيع</option>
        </select>
        <select
          name="LegalStatus"
          value={form.LegalStatus}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="سليم">سليم</option>
          <option value="عليه نزاع">عليه نزاع</option>
          <option value="رهن">رهن</option>
        </select>
        <select
          name="UtilizationStatus"
          value={form.UtilizationStatus}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="مستغل">مستغل</option>
          <option value="غير مستغل">غير مستغل</option>
        </select>
        <input
          required
          name="Governorate"
          placeholder="المحافظة"
          value={form.Governorate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="Images"
          placeholder="روابط الصور (اختياري)"
          value={form.Images}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="Documents"
          placeholder="روابط المستندات (اختياري)"
          value={form.Documents}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          إضافة
        </button>
      </form>
    </div>
  );
}
