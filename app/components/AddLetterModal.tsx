"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Letter, Company } from "@/app/types";

type Sector = { SectorID: number; SectorName: string };
type Authority = { AuthorityID: number; AuthorityName: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onAddLetter: (letter: Letter) => void;
};

const AddLetterModal = ({ open, onClose, onAddLetter }: Props) => {
  const [subject, setSubject] = useState("");
  const [recipientType, setRecipientType] = useState("جهة حكومية");
  const [recipientName, setRecipientName] = useState("");
  const [dateSent, setDateSent] = useState("");
  const [outgoingNumber, setOutgoingNumber] = useState("");
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [companyLawFilter, setCompanyLawFilter] = useState("203"); // جديد

  // جلب البيانات حسب نوع الجهة
  useEffect(() => {
    if (recipientType === "شركة تابعة" || recipientType === "دوري شركات") {
      fetch("/api/companies")
        .then((res) => res.json())
        .then((data) => setCompanies(data));
    } else if (recipientType === "قطاع داخلي") {
      fetch("/api/sectors")
        .then((res) => res.json())
        .then((data) => setSectors(data));
    } else if (recipientType === "جهة حكومية") {
      fetch("/api/authorities")
        .then((res) => res.json())
        .then((data) => setAuthorities(data));
    }
  }, [recipientType]);

  const handleSubmit = async () => {
    if (!subject || !recipientName || !dateSent || !outgoingNumber) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Subject: subject,
          RecipientType: recipientType,
          RecipientName: recipientName,
          DateSent: dateSent,
          OutgoingNumber: outgoingNumber,
          AttachedFiles: JSON.parse(files || "[]"),
        }),
      });

      if (!res.ok) throw new Error("فشل في حفظ الخطاب");

      const newLetter: Letter = await res.json();
      onAddLetter(newLetter);
      onClose();

      setSubject("");
      setRecipientType("جهة حكومية");
      setRecipientName("");
      setDateSent("");
      setOutgoingNumber("");
      setFiles("");
      setCompanyLawFilter("203");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // مكوّن اختيار الجهة حسب النوع
  const renderRecipientSelector = () => {
    switch (recipientType) {
      case "شركة تابعة":
        return (
          <select
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full border rounded p-2"
            disabled={loading}
          >
            <option value="">اختر شركة</option>
            {companies.map((c) => (
              <option key={c.CompanyID} value={c.CompanyName}>
                {c.CompanyName}
              </option>
            ))}
          </select>
        );

      case "قطاع داخلي":
        return (
          <select
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full border rounded p-2"
            disabled={loading}
          >
            <option value="">اختر قطاعًا</option>
            {sectors.map((s) => (
              <option key={s.SectorID} value={s.SectorName}>
                {s.SectorName}
              </option>
            ))}
          </select>
        );

      case "جهة حكومية":
        return (
          <select
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full border rounded p-2"
            disabled={loading}
          >
            <option value="">اختر جهة</option>
            {authorities.map((a) => (
              <option key={a.AuthorityID} value={a.AuthorityName}>
                {a.AuthorityName}
              </option>
            ))}
          </select>
        );

      case "دوري شركات":
        return (
          <>
            <select
              value={companyLawFilter}
              onChange={(e) => {
                setCompanyLawFilter(e.target.value);
                setRecipientName(""); // إعادة تعيين الاختيار
              }}
              className="w-full border rounded p-2 mb-2"
              disabled={loading}
            >
              <option value="203">شركات القانون 203</option>
              <option value="159">شركات القانون 159</option>
              <option value="all">النوعين معًا</option>
            </select>

            <select
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full border rounded p-2"
              disabled={loading}
            >
              <option value="">اختر شركة</option>
              {companies
                .filter((c) =>
                  companyLawFilter === "all"
                    ? true
                    : c.AffiliationLaw === companyLawFilter
                )
                .map((c) => (
                  <option key={c.CompanyID} value={c.CompanyName}>
                    {c.CompanyName} ({c.AffiliationLaw})
                  </option>
                ))}
            </select>
          </>
        );

      case "جهة أخرى":
      default:
        return (
          <Input
            placeholder="اسم الجهة"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            disabled={loading}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>إضافة خطاب جديد</DialogTitle>
        </DialogHeader>

        <textarea
          placeholder="موضوع الخطاب"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
          disabled={loading}
        />

        <select
          value={recipientType}
          onChange={(e) => setRecipientType(e.target.value)}
          className="w-full border rounded p-2"
          disabled={loading}
        >
          <option value="جهة حكومية">جهة حكومية</option>
          <option value="قطاع داخلي">قطاع داخلي</option>
          <option value="شركة تابعة">شركة تابعة</option>
          <option value="دوري شركات">دوري شركات</option>
          <option value="جهة أخرى">جهة أخرى</option>
        </select>

        {renderRecipientSelector()}

        <Input
          type="date"
          value={dateSent}
          onChange={(e) => setDateSent(e.target.value)}
          disabled={loading}
        />

        <Input
          placeholder="رقم الصادر"
          value={outgoingNumber}
          onChange={(e) => setOutgoingNumber(e.target.value)}
          disabled={loading}
        />

        <Input
          placeholder='روابط الملفات كمصفوفة JSON مثل ["https://link.pdf"]'
          value={files}
          onChange={(e) => setFiles(e.target.value)}
          disabled={loading}
        />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddLetterModal;
