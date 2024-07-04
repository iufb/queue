import { QueueForm } from "@/features";
import { IQueue } from "@/shared/lib";

import { Header } from "@/widgets";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const getQueueData = () => {
  const cookiesData = cookies().get("queueData");

  if (cookiesData) {
    const queueData: IQueue = JSON.parse(cookiesData.value);
    return queueData;
  }
  return null;
};
export default function Index({ params }: { params: { locale: string } }) {
  const queueData = getQueueData();
  const { locale } = params;
  if (queueData) {
    redirect(`/${locale}/queue`);
  }
  return <QueueForm />;
}
