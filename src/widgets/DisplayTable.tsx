"use client";
import { getDisplayQueue } from "@/shared/api";
import { AllTableQueue } from "@/shared/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const DisplayTable = () => {
    const t = useTranslations("display");
    const [tables, setTables] = useState<AllTableQueue[] | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const IntervalCallback = async () => {
            try {
                const data = await getDisplayQueue();
                setTables(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        IntervalCallback();
        const interval = setInterval(IntervalCallback, 10000);
        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return <Loader2 className="mr-2 h-10 w-10 animate-spin" />;
    }
    if (!tables || tables.length == 0) {
        return (
            <section>
                <h1 className="text-3xl">{t("empty")}</h1>
            </section>
        );
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {tables.slice(0, 8).map((table) => (
                        <TableHead className="text-2xl" key={table.table}>
                            {t("table")} {table.table}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="text-center">
                    {tables.slice(0, 8).map((table, idx) => (
                        <TableCell className="text-2xl" key={table.table}>
                            {table.queue ? `#${table.queue}` : '- -'}
                            {idx === 7 && <br />}
                        </TableCell>
                    ))}
                </TableRow>
            </TableBody>
            <TableHeader>
                <TableRow className="text-center">
                    {tables.slice(8, tables.length).map((table) => (
                        <TableHead className="text-2xl" key={table.table}>
                            {t("table")} {table.table}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="text-center">
                    {tables.slice(8, tables.length).map((table, idx) => (
                        <TableCell className="text-2xl" key={table.table}>
                            № {table.queue}
                            {idx === 7 && <br />}
                        </TableCell>
                    ))}
                </TableRow>
            </TableBody>
        </Table>
    );
};
