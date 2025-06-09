import type { Company } from "@/app/types";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NextResponse } from "next/server";
type CompanyTableProps = {
  companies: Company[];
  onDeleteCompany: (companyId: number) => void;
};

const CompanyTable = ({ companies, onDeleteCompany }: CompanyTableProps) => {
  const handleDelete = async (id: number) => {
    const confirmed = confirm("هل أنت متأكد أنك تريد حذف هذه الشركة؟");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/companies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("فشل في حذف الشركة");
      }

      onDeleteCompany(id); // تحديث القائمة في الواجهة
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "فشل في حذف الشركة";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  return (
    <ul className="space-y-2">
      {companies.map((company) => (
        <li
          key={company.CompanyID}
          className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-sm transition"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {company.CompanyName}
              </p>
              <p className="text-xs text-gray-500">
                رقم الشركة: {company.CompanyID}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="w-8 h-8"
              onClick={() => handleDelete(company.CompanyID)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CompanyTable;
