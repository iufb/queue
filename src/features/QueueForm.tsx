"use client";
import { createQueue } from "@/shared/api";
import { useRequest } from "@/shared/lib";
import {
    Button,
    Card,
    CardHeader,
    CardTitle
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
    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { id } = await createQueue(program)
            if (!id) {
                throw new Error('No queue data')
            }
            setCookie("queueData", id);
            setSuccess(t("success"));
            setTimeout(() => {
                router.push(path + "/queue");
            }, 1000);

        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
                setError(t("error"));
            }

        }
        finally {
            setLoading(false)
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                {/* <CardDescription>{t("desc")}</CardDescription> */}
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                {/* <DisciplinesSelect onValueChange={(value) => setProgram(value)} /> */}
                {error && <span className="error">{error}</span>}
                {success && <span className="success">{success}</span>}
                <Button className="mt-6" type="submit" loading={loading} disabled={loading}>
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
    "Старший технический секретарь",
    "Заместитель ответственного секретаря приемной комиссии",
    "Ответственный секретарь приемной комиссии",
];
