import { AdminQueueView, NewQueueButton } from "@/features";
import { fetchAdminTask } from "@/shared/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const getTable = () => {
  const table = cookies().get("adminTable")?.value;
  return table;
};
const getAdminTask = async (table: number) => {
  try {
    const task = await fetchAdminTask(table);
    return task;
  } catch (e) {
    console.log(e);
  }
};
export default async function AdminPage() {
  const table = getTable();
  if (!table) {
    redirect("/admin/login");
  }
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Ваш стол № {table}</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminQueueView table={+table} />
        </CardContent>
      </Card>
    </section>
  );
}
