import { AdminQueueView } from "@/features";
import { Logout } from "@/features/Logout";
import { fetchAdminTask } from "@/shared/api";

const getAdminTask = async () => {
    try {
        const task = await fetchAdminTask();
        return task;
    } catch (e) {
        console.log(e);
    }
};
export default async function AdminPage() {
    return (
        <section className="h-screen w-full flex justify-center items-center px-2">
            <Logout />
            <AdminQueueView />
        </section>
    );
}
