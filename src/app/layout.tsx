// app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
