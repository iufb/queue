import { QueueForm } from "@/features";

import { Header } from "@/widgets";
import { redirect } from "next/navigation";
import { getQueueData } from "./queue/page";

export default function Index({ params }: { params: { locale: string } }) {
  const queueData = getQueueData();
  const { locale } = params;
  if (queueData) {
    redirect(`/${locale}/queue`);
  }
  return (
    <>
      <Header />
      <section className="px-3 flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <QueueForm />
      </section>
    </>
  );
}
