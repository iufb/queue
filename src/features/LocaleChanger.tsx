"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const LocaleChanger = () => {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();

  const onSelectChange = (lang: string) => {
    router.replace(`/${lang}/${path.split("/").slice(2)}`);
  };
  return (
    <Select onValueChange={(value) => onSelectChange(value)}>
      <SelectTrigger className="max-w-[60px]">
        <SelectValue placeholder={params.locale} />
      </SelectTrigger>
      <SelectContent className="max-w-[60px]">
        <SelectItem value={"ru"}>ru</SelectItem>

        <SelectItem value={"kz"}>kz</SelectItem>
      </SelectContent>
    </Select>
  );
};
