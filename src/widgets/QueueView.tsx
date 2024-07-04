import { CurrentQueueView } from "@/features";
import { IQueue } from "@/shared/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { getTranslations } from "next-intl/server";
interface QueueViewProps {
  queueData: IQueue;
}
export const QueueView = async ({ queueData }: QueueViewProps) => {
  const t = await getTranslations("queueView");
  return (
    <Card className="w-[calc(100vw-40px)] md:w-[500px]">
      <CardHeader>
        <CardTitle className="text-center">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <CurrentQueueView queueData={queueData} />
      </CardContent>
    </Card>
  );
};
