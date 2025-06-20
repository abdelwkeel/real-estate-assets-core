"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

interface DecisionType {
  id: number;
  name: string;
}

interface BoardDecisionFormProps {
  onSuccess: () => void;
}

export default function BoardDecisionForm({
  onSuccess,
}: BoardDecisionFormProps) {
  const [decisionNumber, setDecisionNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [decisionTypeId, setDecisionTypeId] = useState("");
  const [decisionTypes, setDecisionTypes] = useState<DecisionType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [decisionDate, setDecisionDate] = useState("");
  useEffect(() => {
    const fetchDecisionTypes = async () => {
      try {
        const res = await axios.get("/api/decision-types");
        setDecisionTypes(res.data);
      } catch (error) {
        console.error("فشل في تحميل أنواع القرارات", error);
      }
    };

    fetchDecisionTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fileUrl = null;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(
          "/api/upload?folder=board-decisions",
          formData
        );
        fileUrl = uploadRes.data.fileUrl;
      }

      await axios.post("/api/board-decisions", {
        title,
        description,
        decisionTypeId: Number(decisionTypeId),
        decisionDate,
        fileUrl,
      });

      toast.success("تم إضافة القرار بنجاح");
      setDecisionNumber("");
      setTitle("");
      setDescription("");
      setDecisionDate("");
      setDecisionTypeId("");
      setFile(null);
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("فشل في إضافة القرار");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row">
        <Input
          className="ml-2.5"
          type="text"
          placeholder="رقم القرار"
          value={decisionNumber}
          onChange={(e) => setDecisionNumber(e.target.value)}
          required
        />
        <input
          type="date"
          className=" p-2 border rounded w-fit"
          value={decisionDate}
          onChange={(e) => setDecisionDate(e.target.value)}
        />
      </div>
      <Input
        placeholder="العنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="الوصف"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <label className="block mb-1">نوع القرار</label>
        <select
          className="w-full p-2 border rounded"
          value={decisionTypeId}
          onChange={(e) => setDecisionTypeId(e.target.value)}
          required
        >
          <option value="">اختر نوع القرار</option>
          {decisionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 border text-center flex flex-col p-2 rounded">
        <label>تحميل ملف</label>
        <input
          className="text-center"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <Button type="submit" className="w-full">
        حفظ القرار
      </Button>
    </form>
  );
}
