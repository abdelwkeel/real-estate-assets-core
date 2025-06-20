// app/(dashboard)/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>جاري التحميل...</div>;
  }

  if (!session) {
    // تقدر تعمل Redirect يدوي أو تعرض رسالة بعدم وجود جلسة
    return <div>أنت غير مصرح لك بالدخول. الرجاء تسجيل الدخول.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مرحبًا {session?.user?.name}</h1>
      <p>مرحبًا بك في نظام إدارة الأصول.</p>
    </div>
  );
}
