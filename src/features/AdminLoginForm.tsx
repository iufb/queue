"use client";
import { adminLogin } from "@/shared/api";
import { useRequest } from "@/shared/lib";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
} from "@/shared/ui";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const AdminLoginForm = () => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const { loading, setLoading, error, setError } = useRequest();
    const router = useRouter();
    const handleLogin = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        adminLogin(loginData)
            .then((data) => {
                setCookie('table', data.table)
                router.push('/admin')
                console.log(data)
            })
            .catch((e) => {
                setError("Ошибка при авторизации");
            })
            .finally(() => setLoading(false));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Авторизация</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-3 p-4" onSubmit={handleLogin}>
                    <Input
                        label="Логин"
                        type="text"
                        required
                        value={loginData.username}
                        onChange={(e) =>
                            setLoginData({ ...loginData, username: e.target.value })
                        }
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                        }
                    />
                    {error && <span className="error">{error}</span>}
                    <Button>Войти</Button>
                </form>
            </CardContent>
        </Card>
    );
};
