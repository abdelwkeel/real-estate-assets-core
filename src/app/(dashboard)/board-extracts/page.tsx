"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BoardExtractForm from "@/components/BoardExtractForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface BoardExtract {
  id: number;
  extractNumber: string;
  extractDate: string;
  title: string;
  content: string;
  fileUrl: string | null;
  createdBy: {
    name: string;
    role: string;
  };
}

export default function BoardExtractsPage() {
  const { data: session, status } = useSession();
  const [extracts, setExtracts] = useState<BoardExtract[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExtract, setSelectedExtract] = useState<BoardExtract | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // تحميل البيانات
  const fetchExtracts = async () => {
    try {
      const res = await fetch("/api/board-extract");
      const data = await res.json();
      setExtracts(data.extracts);
    } catch (error) {
      console.error("فشل في تحميل البيانات", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchExtracts();
    }
  }, [status]);

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف المستخرج؟")) {
      try {
        await axios.delete(`/api/board-extract/${id}`);
        fetchExtracts();
        toast.success("تم حذف المستخرج بنجاح");
      } catch (error) {
        console.error(error);
        toast.error("فشل في حذف المستخرج");
      }
    }
  };

  const handleEdit = (extract: BoardExtract) => {
    setSelectedExtract(extract);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedExtract) {
      try {
        let fileUrl = selectedExtract.fileUrl;

        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);

          const uploadRes = await axios.post(
            "/api/upload?folder=board-extracts",
            formData
          );
          fileUrl = uploadRes.data.fileUrl;
        }

        await axios.put(`/api/board-extract/${selectedExtract.id}`, {
          ...selectedExtract,
          fileUrl,
        });

        fetchExtracts();
        setIsDialogOpen(false);
        setSelectedExtract(null);
        setSelectedFile(null);
        toast.success("تم تعديل المستخرج بنجاح");
      } catch (error) {
        console.error(error);
        toast.error("فشل في تعديل المستخرج");
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
        <h1 className="text-2xl font-bold underline">إدارة المستخرجات</h1>
        <Dialog>
          <DialogTitle>
            <VisuallyHidden>إضافة مستخرج جديد</VisuallyHidden>
          </DialogTitle>
          <DialogTrigger asChild>
            <Button>إضافة مستخرج جديد</Button>
          </DialogTrigger>
          <DialogContent>
            <BoardExtractForm onSuccess={fetchExtracts} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="p-2 border">#</th> */}
              <th className="p-2 border">رقم المستخرج</th>
              <th className="p-2 border">تاريخ المستخرج</th>
              <th className="p-2 border ">العنوان</th>
              <th className="p-2 border">المحتوى</th>
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
            {extracts.map((extract) => (
              <tr key={extract.id} className="border-b">
                {/* <td className="p-2 border">{index + 1}</td> */}
                <td className="p-2 border">{extract.extractNumber}</td>
                <td className="p-2 border">
                  {new Date(extract.extractDate).toLocaleDateString("ar-EG", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border">{extract.title}</td>
                <td className="p-2 border">{extract.content}</td>
                <td className="p-2 border">
                  {extract.fileUrl ? (
                    <a
                      href={extract.fileUrl}
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
                  <td className="p-2 border">{extract.createdBy.name}</td>
                )}
                {(session.user.role === "ADMIN" ||
                  session.user.role === "SUPERADMIN") && (
                  <td className="p-2 border space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(extract)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(extract.id)}
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

      {/* مودال التعديل */}
      {selectedExtract && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>تعديل المستخرج</DialogTitle>
            <div className="space-y-4">
              <div className="flex">
                <input
                  className="w-full p-2 border ml-2.5 rounded"
                  placeholder="رقم المستخرج"
                  value={selectedExtract.extractNumber}
                  onChange={(e) =>
                    setSelectedExtract({
                      ...selectedExtract,
                      extractNumber: e.target.value,
                    })
                  }
                />

                <input
                  className="w-fit p-2 border rounded text-end"
                  type="date"
                  value={selectedExtract.extractDate.split("T")[0]}
                  onChange={(e) =>
                    setSelectedExtract({
                      ...selectedExtract,
                      extractDate: e.target.value,
                    })
                  }
                />
              </div>
              <input
                className="w-full p-2 border rounded"
                placeholder="العنوان"
                value={selectedExtract.title}
                onChange={(e) =>
                  setSelectedExtract({
                    ...selectedExtract,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="المحتوى"
                value={selectedExtract.content}
                onChange={(e) =>
                  setSelectedExtract({
                    ...selectedExtract,
                    content: e.target.value,
                  })
                }
              />
              <div className="space-y-2 border text-center flex flex-col">
                <label>تحميل ملف جديد </label>
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
