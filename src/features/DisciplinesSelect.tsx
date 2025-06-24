'use client'

import { getDisciplines } from "@/shared/api";
import { Discipline } from "@/shared/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import { useEffect, useState } from 'react';
interface DisciplinesSelect {
    onValueChange: (value: string) => void
}
export const DisciplinesSelect = (props: DisciplinesSelect) => {
    const [specialties, setSpecialities] = useState<Discipline[]>([])
    useEffect(() => {
        async function getData() {
            try {
                const data = await getDisciplines()
                setSpecialities(data)
            }
            catch (e) { }
        }
        getData()
    }, [])

    const t = useTranslations("queueForm");
    return (
        <Select {...props}>
            <SelectTrigger className="max-w-[calc(100vw-20px)]">
                <SelectValue placeholder={t("selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="max-w-[calc(100vw-20px)]">
                {specialties.map((s, idx) => (
                    <SelectItem value={s.id} key={idx}>
                        {s.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    );
};
