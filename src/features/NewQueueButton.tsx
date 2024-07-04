"use client";

import { deleteAdminTask } from "@/shared/api";
import { useRequest } from "@/shared/lib";
import {
  Button,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  Dialog,
  DialogFooter,
  DialogClose,
} from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const NewQueueButton = ({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess: () => void;
}) => {
  const { loading, setLoading, error, setError } = useRequest();
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    deleteAdminTask(id)
      .then(() => {
        if (ref.current) {
          ref.current.click();
        }
        onSuccess();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="px-5 py-4 rounded-md bg-[#500002] text-white">
          Следующий
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
