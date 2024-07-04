"use client";
import { NewQueueButton } from "@/features/NewQueueButton";
import { fetchAdminTask, getCurrentQueue } from "@/shared/api";
import { IQueue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { deleteCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
interface AdminQueueViewProps {
  table: number;
}
export const AdminQueueView = ({ table }: AdminQueueViewProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<{
    id: number;
    table: number | null;
    order: number | null;
  } | null>(null);
  useEffect(() => {
    const IntervalCallback = async () => {
      try {
        const task = await fetchAdminTask(table);
        setCurrent(task);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    IntervalCallback();
    const interval = setInterval(IntervalCallback, 5000);
    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className=" justify-self-center mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (!current) {
    return <h1 className="text-red-500">Ошибка</h1>;
  }
  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col gap-5 items-center min-w-[300px]">
        {current.order ? (
          <span className="text-xl">
            Очередь в обработке - {current?.order}
          </span>
        ) : (
          <span>Oчередь пуста</span>
        )}
        {current.order && (
          <NewQueueButton onSuccess={() => setLoading(true)} id={current.id} />
        )}
      </section>
    </section>
  );
};
