import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aдмин панель - очередь",
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"ru"}>
      <body>{children}</body>
    </html>
  );
}
