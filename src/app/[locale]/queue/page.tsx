import { IQueue } from "@/shared/lib";
import { Header, QueueView } from "@/widgets";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
export const getQueueData = () => {
  const cookiesData = cookies().get("queueData");

  if (cookiesData) {
    const queueData: IQueue = JSON.parse(cookiesData.value);
    return queueData;
  }
  return null;
};

export default function Index() {
  const queueData = getQueueData();
  if (!queueData) {
    redirect("/");
  }

  return <QueueView queueData={queueData} />;
}
