"use client";
import { deleteAdminTask, fetchAdminTask } from "@/shared/api";
import { AdminQueueStatus } from "@/shared/lib/types";
import { Button } from "@/shared/ui";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from '@/shared/ui/alert-dialog';
import { getCookie } from "cookies-next";
import { ClockIcon, Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface AdminQueueViewProps {
}
export const AdminQueueView = ({ }: AdminQueueViewProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState<AdminQueueStatus | null>(null);
    const getData = async () => {
        try {
            const task = await fetchAdminTask();
            setCurrent(task);
            setLoading(false);
        } catch (e: any) {

            if (e.statusCode == 401) {
                router.push('/admin/login')
            }
            console.log(e)
        }
    };

    useEffect(() => {
        getData();
        const interval = setInterval(getData, 10000);
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
        <section className="flex flex-col gap-3 max-w-4xl w-full">

            <section className="p-6 rounded-t-md bg-gradient-to-r from-orange-950 to-[#500002] w-full "><h1 className="text-white text-2xl">Управление очередью</h1>
                <span className="text-white">Стол :{getCookie('table')}</span>
            </section>
            <section className="flex flex-col gap-5">
                <section className="grid grid-cols-[auto_1fr] p-3 gap-2 border rounded-md text-orange-950" >
                    <Users className="my-auto " />
                    <section>
                        <p className="text-lg">Людей в очереди </p>
                        <span className="font-bold text-red-500">{current.waitingCount}</span>
                    </section>
                </section>
                {current.current && <section className="grid grid-cols-[auto_1fr] p-3 gap-2 border rounded-md text-orange-950" >
                    <ClockIcon className="my-auto " />
                    <section>
                        <p className="text-lg">В обработке </p>
                        <span className="block font-bold ">Номер : #{current.current.id}</span>
                    </section>
                </section>
                }
            </section>
            <CallNext refetch={() => getData()} />
        </section>
    );
};

const CallNext = ({ refetch }: { refetch: () => void }) => {

    const handleNext = async () => {
        try {
            const res = await deleteAdminTask()
            if (res.statusCode == 404) {
                throw new Error(res.message)
            }

        } catch (e) {
            console.error(e)
        } finally {
            refetch()
        }
    }
    return <AlertDialog>
        <AlertDialogTrigger asChild><Button>Следующий</Button></AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleNext}>
                    Продолжить
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
