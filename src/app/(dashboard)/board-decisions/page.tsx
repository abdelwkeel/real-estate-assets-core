"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BoardDecisionForm from "@/components/BoardDecisionForm";
import AddDecisionTypeForm from "@/components/AddDecisionTypeForm ";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

interface DecisionType {
  id: number;
  name: string;
}

interface BoardDecision {
  id: number;
  decisionNumber: string;
  title: string;
  description: string;
  decisionDate: string;
  fileUrl: string | null;
  decisionType: DecisionType;
  createdBy: {
    name: string;
    role: string;
  };
}

export default function BoardDecisionsPage() {
  const { data: session, status } = useSession();
  const [decisions, setDecisions] = useState<BoardDecision[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<BoardDecision | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchDecisions = async () => {
    try {
      const res = await fetch("/api/board-decisions");
      const data = await res.json();
      setDecisions(data);
    } catch (error) {
      console.error("فشل في تحميل البيانات", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDecisions();
    }
  }, [status]);

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف القرار؟")) {
      try {
        await axios.delete(`/api/board-decisions/${id}`);
        fetchDecisions();
        toast.success("تم حذف القرار بنجاح");
      } catch (error) {
        console.error(error);
        toast.error("فشل في حذف القرار");
      }
    }
  };

  const handleEdit = (decision: BoardDecision) => {
    setSelectedDecision(decision);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedDecision) {
      try {
        let fileUrl = selectedDecision.fileUrl;

        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);

          const uploadRes = await axios.post(
            "/api/upload?folder=board-decisions",
            formData
          );
          fileUrl = uploadRes.data.fileUrl;
        }

        await axios.put(`/api/board-decisions/${selectedDecision.id}`, {
          ...selectedDecision,
          fileUrl,
        });

        fetchDecisions();
        setIsDialogOpen(false);
        setSelectedDecision(null);
        setSelectedFile(null);
        toast.success("تم تعديل القرار بنجاح");
      } catch (error) {
        console.error(error);
        toast.error("فشل في تعديل القرار");
      }
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-10">جاري التحميل...</div>;
  }

  if (!session || !session.user) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold">
        يرجى تسجيل الدخول
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة القرارات</h1>
        <div className="flex space-x-2">
          {/* زرار إضافة قرار جديد */}
          <Dialog>
            {/* <DialogTitle>إضافة قرار جديد</DialogTitle> */}
            <DialogTrigger asChild>
              <Button>إضافة قرار جديد</Button>
            </DialogTrigger>
            <DialogContent>
              <BoardDecisionForm onSuccess={fetchDecisions} />
            </DialogContent>
          </Dialog>

          {/* زرار إضافة نوع قرار جديد */}
          <Dialog>
            {/* <DialogTitle>إضافة نوع قرار جديد</DialogTitle> */}
            <DialogTrigger asChild>
              <Button variant="outline">إضافة نوع قرار</Button>
            </DialogTrigger>
            <DialogContent>
              <AddDecisionTypeForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">رقم القرار</th>
              <th className="p-2 border">العنوان</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">نوع القرار</th>
              <th className="p-2 border">تاريخ القرار</th>
              <th className="p-2 border">الملف</th>
              {(session.user.role === "ADMIN" ||
                session.user.role === "SUPERADMIN") && (
                <th className="p-2 border">أنشئ بواسطة</th>
              )}
              {(session.user.role === "ADMIN" ||
                session.user.role === "SUPERADMIN") && (
                <th className="p-2 border">العمليات</th>
              )}
            </tr>
          </thead>
          <tbody>
            {decisions.map((decision, index) => (
              <tr key={decision.id} className="border-b">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{decision.decisionNumber}</td>
                <td className="p-2 border">{decision.title}</td>
                <td className="p-2 border">{decision.description}</td>
                <td className="p-2 border">{decision.decisionDate}</td>
                <td className="p-2 border">{decision.decisionType?.name}</td>
                <td className="p-2 border">
                  {decision.fileUrl ? (
                    <a
                      href={decision.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    "لا يوجد"
                  )}
                </td>
                {(session.user.role === "ADMIN" ||
                  session.user.role === "SUPERADMIN") && (
                  <td className="p-2 border">{decision.createdBy.name}</td>
                )}
                {(session.user.role === "ADMIN" ||
                  session.user.role === "SUPERADMIN") && (
                  <td className="p-2 border space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(decision)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(decision.id)}
                    >
                      حذف
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDecision && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>تعديل القرار</DialogTitle>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="العنوان"
                value={selectedDecision.title}
                onChange={(e) =>
                  setSelectedDecision({
                    ...selectedDecision,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="الوصف"
                value={selectedDecision.description}
                onChange={(e) =>
                  setSelectedDecision({
                    ...selectedDecision,
                    description: e.target.value,
                  })
                }
              />
              <div className="space-y-2 border text-center flex flex-col">
                <label>تحميل ملف جديد</label>
                <input
                  className="text-center"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <Button onClick={handleUpdate} className="w-full">
                حفظ التعديلات
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
