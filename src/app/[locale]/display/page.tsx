import { getDisplayQueue } from "@/shared/api";
import { DisplayTable } from "@/widgets";
const getDisplayData = async () => {
  try {
    const data = await getDisplayQueue();
    if (!data) {
      throw new Error("No data");
    }
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
export default async function DisplayPage() {
  return (
    <section>
      <DisplayTable />
    </section>
  );
}
