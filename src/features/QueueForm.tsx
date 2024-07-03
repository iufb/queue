"use client";
import { createQueue } from "@/shared/api";
import { useRequest } from "@/shared/lib";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const QueueForm = () => {
  const t = useTranslations("queueForm");
  const [program, setProgram] = useState("");
  const path = usePathname();
  const router = useRouter();
  const { error, setError, success, setSuccess, loading, setLoading } =
    useRequest();
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    createQueue(program)
      .then((data) => {
        console.log(data);
        setCookie("queueData", JSON.stringify(data));
        setCookie("id", data.id);
        setSuccess(t("success"));
        router.push(path + "/queue");
      })
      .catch((e) => {
        {
          if (e instanceof Error) {
            console.log(e);
            setError(t("error"));
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <Select onValueChange={(value) => setProgram(value)}>
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder={t("selectPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="max-w-[calc(100vw-20px)]">
            {specialties.map((s, idx) => (
              <SelectItem value={s} key={idx}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="error">{error}</span>}
        {success && <span className="success">{success}</span>}
        <Button loading={loading} disabled={program == ""}>
          {t("submitBtn")}
        </Button>
      </form>
    </Card>
  );
};
const specialties = [
  "6В01101 Педагогика и психология",
  "6В01201 Дошкольное обучение и воспитание",
  "6В01303 Начальное образование (IP)",
  "6В03115 Психология",
  "6В01403 Начальная военная подготовка",
  "6В01404 Физическая культура и спорт",
  "6В01509 Химия-биология",
  "6В05121 Биотехнология",
  "6В01510 География-история",
  "6В01606 История",
  "6В02212 Отечественная и всемирная история",
  "6В01707 Казахский язык и литература",
  "6В01733 Русский язык и литература в школах с русским и нерусским языками обучения (IP)",
  "6В01708 Английский язык с дополнительным изучением второго иностранного языка (немецкий, турецкий)",
  "6В02313 Казахская филология",
  "6В04119 Государственное и местное управление",
  "6В04116 Экономика",
  "6B04120 Менеджмент в туризме и гостеприимстве",
  "6В04117 Учет и аудит",
  "6В04118 Финансы",
  "6В04220 Юриспруденция",
  "6B04221 Государственная служба и судебная система",
  "6B04222 Следственно-прокурорская деятельность",
  "6В12330 Правоохранительная деятельность",
  "6В06122 Информатика",
  "6В06123 IT в здравоохранении",
  "6В06124 Вычислительная техника и программное обеспечение",
  "6В06101 Прикладная информатика",
  "6В06001 Информационные системы",
  "6В06103 Инженерия искусственного интеллекта и блокчейн",
  "6В07125 Электроэнергетика",
];
