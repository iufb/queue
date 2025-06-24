"use client";

import { deleteAdminTask } from "@/shared/api";
import { useRequest } from "@/shared/lib";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const NewQueueButton = ({
    label,
    onSuccess,
}: {
    label: string,
    onSuccess: () => void;
}) => {
    const { loading, setLoading, error, setError } = useRequest();
    const ref = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    const handleClick = () => {
        setLoading(true);
        deleteAdminTask()
            .then(() => {
                if (ref.current) {
                    ref.current.click();
                }
            })
            .finally(() => {
                setLoading(false);

                onSuccess();
            });
    };
    return (
        <Dialog>
            <DialogTrigger >
                <div className="px-3 py-2 rounded-md bg-[#500002] text-white ">
                    {label}
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Вы уверены ?</DialogTitle>
                </DialogHeader>
                <DialogFooter className=" gap-2">
                    <DialogClose asChild>
                        <Button ref={ref} type="button" variant="secondary">
                            Отменить
                        </Button>
                    </DialogClose>
                    <Button loading={loading} onClick={handleClick}>
                        Позвать следующего
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
