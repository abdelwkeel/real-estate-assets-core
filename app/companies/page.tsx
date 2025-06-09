"use client";

import { useEffect, useState } from "react";
import CompanyTable from "@/app/components/CompanyTable";
import AddCompanyModal from "@/app/components/AddCompanyModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Company } from "@/app/types";

export default function CompaniesPage() {
  const [companies203, setCompanies203] = useState<Company[]>([]);
  const [companies159, setCompanies159] = useState<Company[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) throw new Error("فشل في تحميل الشركات");
        const data: Company[] = await response.json();

        setCompanies203(data.filter((c) => c.AffiliationLaw === "203"));
        setCompanies159(data.filter((c) => c.AffiliationLaw === "159"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleAddCompany = (newCompany: Company) => {
    if (newCompany.AffiliationLaw === "203") {
      setCompanies203((prev) => [...prev, newCompany]);
    } else if (newCompany.AffiliationLaw === "159") {
      setCompanies159((prev) => [...prev, newCompany]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان وزر الإضافة */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">📁 إدارة الشركات</h1>
        <Button onClick={() => setOpen(true)} className="flex gap-2">
          <PlusCircle className="w-5 h-5" />
          إضافة شركة
        </Button>
      </div>

      {/* المحتوى */}
      {loading ? (
        <p>جاري تحميل الشركات...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* بطاقة 203 */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-xl font-semibold text-indigo-600 mb-3">
              شركات تتبع القانون 203
            </h2>
            {companies203.length > 0 ? (
              <CompanyTable
                companies={companies203}
                onDeleteCompany={(id) =>
                  setCompanies203((prev) =>
                    prev.filter((c) => c.CompanyID !== id)
                  )
                }
              />
            ) : (
              <p className="text-gray-500">لا توجد شركات 203</p>
            )}
          </div>

          {/* بطاقة 159 */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-xl font-semibold text-teal-600 mb-3">
              شركات تتبع القانون 159
            </h2>
            {companies159.length > 0 ? (
              <CompanyTable
                companies={companies159}
                onDeleteCompany={(id) =>
                  setCompanies159((prev) =>
                    prev.filter((c) => c.CompanyID !== id)
                  )
                }
              />
            ) : (
              <p className="text-gray-500">لا توجد شركات 159</p>
            )}
          </div>
        </div>
      )}

      {/* نموذج الإضافة */}
      <AddCompanyModal
        open={open}
        onClose={() => setOpen(false)}
        onAddCompany={handleAddCompany}
      />
    </div>
  );
}
