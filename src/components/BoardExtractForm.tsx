// components/BoardExtractForm.tsx

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BoardExtractFormProps {
  onSuccess: () => void;
}

export default function BoardExtractForm({ onSuccess }: BoardExtractFormProps) {
  const { data: session } = useSession();

  const [extractNumber, setExtractNumber] = useState("");
  const [extractDate, setExtractDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let fileUrl = null;

    // رفع الملف لو موجود
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        fileUrl = uploadData.fileUrl;
      } else {
        alert("فشل في رفع الملف");
        setLoading(false);
        return;
      }
    }

    // إضافة المستخرج
    const res = await fetch("/api/board-extract", {
      method: "POST",
      body: JSON.stringify({
        extractNumber,
        extractDate,
        title,
        content,
        fileUrl,
        createdById: Number(session?.user.id),
      }),
    });

    if (res.ok) {
      // عمل إعادة تحميل للبيانات في الصفحة
      onSuccess();
      // تصفير الفورم
      setExtractNumber("");
      setExtractDate("");
      setTitle("");
      setContent("");
      setFile(null);
    } else {
      alert("فشل في إضافة المستخرج");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="رقم المستخرج"
        value={extractNumber}
        onChange={(e) => setExtractNumber(e.target.value)}
        required
      />
      <Input
        type="date"
        placeholder="تاريخ المستخرج"
        value={extractDate}
        onChange={(e) => setExtractDate(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="العنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="المحتوى"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "جاري الإضافة..." : "إضافة"}
      </Button>
    </form>
  );
}
