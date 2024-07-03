"use client";
import { IQueue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { useTranslations } from "use-intl";

interface CurrentQueueViewProps {
  queueData: IQueue;
}
export const CurrentQueueView = ({ queueData }: CurrentQueueViewProps) => {
  const t = useTranslations("queueView");
  const [current, setCurrent] = useState<IQueue | null>(null);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       getCurrentQueue(queueData.id).then((data: IQueue) => {
  //         setCurrent(data);
  //       });
  //     }, 10000);
  //   }, []);
  return (
    <section className="flex flex-col gap-3">
      <span>
        {t("table")} {queueData.table}
      </span>
      {current && (
        <span>
          {t("current")} {current.order}
        </span>
      )}
      <span
        className={cn(
          current && current.order == queueData.order && "text-green-500"
        )}
      >
        {t("yourQueue")} {queueData.order}
      </span>
    </section>
  );
};
