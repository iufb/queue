"use client";
import { getCurrentQueue } from "@/shared/api";
import { IQueue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

interface CurrentQueueViewProps {}
export const CurrentQueueView = ({}: CurrentQueueViewProps) => {
  const t = useTranslations("queueView");
  const queueData = JSON.parse(getCookie("queueData") || "{}");
  const router = useRouter();
  const [current, setCurrent] = useState<IQueue | null>(null);
  useEffect(() => {
    const IntervalCallback = () => {
      getCurrentQueue(queueData.id)
        .then((data: IQueue) => {
          setCurrent(data);
        })
        .catch((e) => {
          if (e.error == "Task not found") {
            deleteCookie("queueData");
            router.push("/");
          }
        });
    };
    IntervalCallback();
    const interval = setInterval(IntervalCallback, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="flex flex-col gap-3 text-center">
      <div>
        <span>{t("table")}</span>
        <span className="font-bold"> {queueData.table}</span>
      </div>
      {current && (
        <div className="flex flex-col items-center gap-5">
          <span>{t("current")}</span>
          <span
            className={cn(
              "text-6xl bg-black px-6 py-2 rounded-full text-white",
              current && current.order == queueData.order && "bg-green-500"
            )}
          >
            {current.order}
          </span>
        </div>
      )}
      <div
        className={cn(
          current &&
            current.order == queueData.order &&
            "text-green-500 text-xl"
        )}
      >
        <span>{t("yourQueue")}</span>
        <span>{queueData.order}</span>
      </div>
      {current && current.order == queueData.order && (
        <span className="text-green-500 text-lg ">
          {t("successTable")}
          <span>{queueData.table}</span>
        </span>
      )}
    </section>
  );
};
