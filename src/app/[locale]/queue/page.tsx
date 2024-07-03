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

  return (
    <>
      <Header />
      <section className="px-3 flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <QueueView queueData={queueData} />
      </section>
    </>
  );
}
