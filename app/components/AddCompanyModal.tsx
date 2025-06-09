"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Company } from "@/app/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onAddCompany: (company: Company) => void;
};

const AddCompanyModal = ({ open, onClose, onAddCompany }: Props) => {
  const [name, setName] = useState("");
  const [law, setLaw] = useState("203");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("يرجى إدخال اسم الشركة");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CompanyName: name, AffiliationLaw: law }),
      });

      if (!response.ok) {
        throw new Error("فشل في إضافة الشركة");
      }

      const newCompany: Company = await response.json();
      onAddCompany(newCompany); // تمرير الشركة الجديدة للصفحة الأم لتحديث القائمة
      setName("");
      setLaw("203");
      onClose();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة شركة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="اسم الشركة"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <select
            className="w-full border rounded p-2"
            value={law}
            onChange={(e) => setLaw(e.target.value)}
            disabled={loading}
          >
            <option value="203">القانون 203</option>
            <option value="159">القانون 159</option>
          </select>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanyModal;
