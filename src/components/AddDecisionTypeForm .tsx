"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function AddDecisionTypeForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/decision-types", { name });
      toast.success("تم إضافة نوع القرار بنجاح");
      setName("");
    } catch (error) {
      console.error(error);
      toast.error("فشل في إضافة نوع القرار");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="اسم نوع القرار"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">
        حفظ
      </Button>
    </form>
  );
}
