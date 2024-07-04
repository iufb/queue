"use client";
import { getDisplayQueue } from "@/shared/api";
import { IQueue, useRequest } from "@/shared/lib";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const DisplayTable = () => {
  const [tables, setTables] = useState<IQueue[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const IntervalCallback = () => {
      getDisplayQueue()
        .then((data) => {
          setTables(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    };
    IntervalCallback();
    const interval = setInterval(IntervalCallback, 10000);
    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return <Loader2 className="mr-2 h-10 w-10 animate-spin" />;
  }
  if (!tables || tables.length == 0) {
    return <section>Очередь пуста.</section>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tables.map((table) => (
            <TableHead className="text-2xl" key={table.table}>
              Стол № {table.table}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {tables.map((table) => (
            <TableCell className="text-2xl" key={table.id}>
              № {table.order}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};
