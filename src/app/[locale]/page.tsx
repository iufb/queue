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
  return <QueueForm />;
}
