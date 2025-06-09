"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddLetterModal from "@/app/components/AddLetterModal";
import AddSectorModal from "@/app/components/AddSectorModal";
import AddAuthorityModal from "@/app/components/AddAuthorityModal";

import type { Letter } from "@/app/types";
export default function LettersPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // حالات التحكم
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [showAuthorityModal, setShowAuthorityModal] = useState(false);
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await fetch("/api/letters");
        if (!res.ok) throw new Error("فشل في جلب الخطابات");
        const data = await res.json();
        setLetters(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, []);

  const handleAddLetter = (newLetter: Letter) => {
    setLetters((prev) => [newLetter, ...prev]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان وزر الإضافة */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">📨 الخطابات</h1>
        <Button className="flex gap-2" onClick={() => setOpen(true)}>
          <PlusCircle className="w-5 h-5" />
          إضافة خطاب
        </Button>
      </div>

      {/* عرض الخطابات */}
      {loading ? (
        <p className="text-gray-500">جاري تحميل الخطابات...</p>
      ) : letters.length === 0 ? (
        <p className="text-gray-500">لا توجد خطابات لعرضها.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-center">رقم الصادر</th>
                <th className="border p-2 text-center">الموضوع</th>
                <th className="border p-2 text-center">نوع الجهة</th>
                <th className="border p-2 text-center">الجهة المرسل لها</th>
                <th className="border p-2 text-center">التاريخ</th>
                <th className="border p-2 text-center">عدد الملفات</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <tr key={letter.LetterID} className="hover:bg-gray-50 text-sm">
                  <td className="border p-2 text-center">
                    {letter.OutgoingNumber}
                  </td>
                  <td className="border p-2">{letter.Subject}</td>
                  <td className="border p-2 text-center">
                    {letter.RecipientType}
                  </td>
                  <td className="border p-2">{letter.RecipientName}</td>
                  <td className="border p-2 text-center">
                    {new Date(letter.DateSent).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="border p-2 text-center">
                    {letter.AttachedFiles.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* مودال الإضافة */}
      <AddLetterModal
        open={open}
        onClose={() => setOpen(false)}
        onAddLetter={handleAddLetter}
      />
      <div className="flex gap-4 mt-6">
        <Button onClick={() => setShowSectorModal(true)}>
          ➕ إضافة قطاع داخلي
        </Button>
        <Button onClick={() => setShowAuthorityModal(true)}>
          ➕ إضافة جهة حكومية
        </Button>
      </div>

      <AddSectorModal
        open={showSectorModal}
        onClose={() => setShowSectorModal(false)}
      />
      <AddAuthorityModal
        open={showAuthorityModal}
        onClose={() => setShowAuthorityModal(false)}
      />
    </div>
  );
}
