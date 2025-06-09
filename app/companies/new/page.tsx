"use client";

import React, { useState } from "react";

export default function AddCompanyPage() {
  const [form, setForm] = useState({
    CompanyName: "",
    AffiliationLaw: "203",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ تم إضافة الشركة بنجاح");
      setForm({ CompanyName: "", AffiliationLaw: "203" });
    } else {
      alert("❌ حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">إضافة شركة</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="CompanyName"
          value={form.CompanyName}
          onChange={handleChange}
          placeholder="اسم الشركة"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="AffiliationLaw"
          value={form.AffiliationLaw}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="203">القانون 203</option>
          <option value="159">القانون 159</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          حفظ الشركة
        </button>
      </form>
    </div>
  );
}
