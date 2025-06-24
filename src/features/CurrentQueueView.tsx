"use client";
import { getCurrentQueue } from "@/shared/api";
import { QueueInfo, QueueStatus } from "@/shared/lib/types";
import { cn } from "@/shared/lib/utils";
import { deleteCookie, getCookie } from "cookies-next";
import {
    AlarmClock,
    CheckCircle,
    CircleHelp,
    Users,
    XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

interface CurrentQueueViewProps { }
export const CurrentQueueView = ({ }: CurrentQueueViewProps) => {
    const t = useTranslations("queueView");
    const router = useRouter();
    const [current, setCurrent] = useState<QueueInfo | null>(null);
    const queueData = getCookie("queueData");

    const getStatusLabel = (status: QueueStatus) => {
        switch (status) {
            case "WAITING":
                return "Ожидание";
            case "CALLED":
                return "Вас вызывают";
            case "SKIPPED":
                return "Пропущено";
            case "COMPLETED":
                return "Обслужено";
            default:
                return "Неизвестно";
        }
    };

    const getStatusColor = (status: QueueStatus) => {
        switch (status) {
            case "WAITING":
                return "bg-gray-300 text-gray-800";
            case "CALLED":
                return "bg-green-500 text-white";
            case "SKIPPED":
                return "bg-red-500 text-white";
            case "COMPLETED":
                return "bg-gray-400 text-white";
            default:
                return "bg-zinc-300 text-black";
        }
    };

    const getStatusIcon = (status: QueueStatus) => {
        switch (status) {
            case "WAITING":
                return <AlarmClock className="w-5 h-5" />;
            case "CALLED":
                return <CheckCircle className="w-5 h-5" />;
            case "SKIPPED":
                return <XCircle className="w-5 h-5" />;
            case "COMPLETED":
                return <CheckCircle className="w-5 h-5 opacity-50" />;
            default:
                return <CircleHelp className="w-5 h-5" />;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!queueData) throw new Error("No queue id");
                const data = await getCurrentQueue(queueData);
                if (data.status === "COMPLETED") throw new Error("COMPLETED");
                setCurrent(data);
            } catch (e: any) {
                if (e?.error === "Task not found" || e?.message === "COMPLETED") {
                    deleteCookie("queueData");
                    router.push("/");
                } else {
                    console.error("Unexpected error:", e);
                }
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-3xl border border-gray-200 text-center space-y-6">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-800">
                    {t("table")} #{current?.table}
                </h2>
                <p className="text-sm text-gray-500">{current?.discipline}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
                <div
                    className={cn(
                        "w-20 h-20 flex items-center justify-center rounded-full text-xl font-bold shadow-md transition-all",
                        getStatusColor(current?.status || "WAITING")
                    )}
                >
                    {current?.queueId || "--"}
                </div>
                <p className="text-gray-600 text-sm">Ваш номер в очереди</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <Users className="w-5 h-5" />
                    <span className="text-base">Людей перед вами: <strong>{current?.peopleAhead}</strong></span>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-700">
                    {getStatusIcon(current?.status || "WAITING")}
                    <span className="text-base">
                        Статус:{" "}
                        <strong>{current ? getStatusLabel(current.status) : "..."}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
};
