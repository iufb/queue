"use client";
import { getCurrentQueue } from "@/shared/api";
import { IQueue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

interface CurrentQueueViewProps {
  queueData: IQueue;
}
export const CurrentQueueView = ({ queueData }: CurrentQueueViewProps) => {
  const t = useTranslations("queueView");
  const [current, setCurrent] = useState<IQueue | null>(null);
  useEffect(() => {
    const IntervalCallback = () => {
      getCurrentQueue(queueData.id).then((data: IQueue) => {
        setCurrent(data);
      });
    };
    IntervalCallback();
    const interval = setInterval(IntervalCallback, 10000);
    return () => clearInterval(interval);
  }, []);
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
          current && current.order == queueData.order && "text-green-500",
        )}
      >
        {t("yourQueue")} {queueData.order}
      </span>
      {current && current.order == queueData.order && (
        <span className="text-green-500">
          Подойдите к столу № {queueData.table}
        </span>
      )}
    </section>
  );
};
