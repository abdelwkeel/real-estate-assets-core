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
import { NextResponse } from "next/server";
type Props = {
  open: boolean;
  onClose: () => void;
};

const AddSectorModal = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("يرجى إدخال اسم القطاع");

    setLoading(true);
    try {
      await fetch("/api/sectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ SectorName: name }),
      });

      onClose();
      setName("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حذف الشركة في الأضافة";
      return NextResponse.json({ error: message }, { status: 500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة قطاع داخلي</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="اسم القطاع"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectorModal;
