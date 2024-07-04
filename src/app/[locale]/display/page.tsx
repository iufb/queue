import { getDisplayQueue } from "@/shared/api";
import { DisplayTable } from "@/widgets";

export default async function DisplayPage() {
  return (
    <section>
      <DisplayTable />
    </section>
  );
}
