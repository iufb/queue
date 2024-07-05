import { Header } from "@/widgets";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Очередь ALIKHAN BOKEIKHAN UNIVERSITY",
  description: "Онлайн очередь приемной комиссии ALIKHAN BOKEIKHAN UNIVERSITY",
};
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <section className="px-3 flex h-[calc(100vh-64px)] w-full items-center justify-center">
            {children}
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
