import { AdminQueueStatus, AllTableQueue, Discipline, QueueInfo } from "@/shared/lib/types";
import { getCookie } from "cookies-next";

const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL
export const getDisciplines = (): Promise<Discipline[]> => {
    return customFetch({
        path: "discipline",
        method: "GET",
    });

}
export const deleteAdminTask = () => {
    return customFetch({
        path: "queue/call",
        method: "POST",
    });
};
export const fetchAdminTask = (): Promise<AdminQueueStatus> => {
    return customFetch({
        path: `queue/specialist/status`,
        method: "GET",
    });
};
export const getAuthedTable = () => {
    return customFetch({
        path: "profile/",
        method: "GET",
        token: `Token ${getCookie("token")}`,
    });
};
export const adminLogout = () => {
    return customFetch({
        path: "auth/logout",
        method: "POST",
    });
}
export const adminLogin = (data: { username: string; password: string }): Promise<{ message: string, table: string }> => {
    return customFetch({
        path: "auth/login",
        method: "POST",
        body: { json: { login: data.username, password: data.password } },
    });
};
export const createQueue = (program: string): Promise<{ id: number }> => {
    return customFetch({
        path: "queue",
        method: "POST",
        body: {
            json: {
                disciplineId: program,
            },
        },
    });
};
export const getDisplayQueue = (): Promise<AllTableQueue[]> => {
    return customFetch({
        path: "queue/display",
        method: "GET",
    });
};
export const getCurrentQueue = (id: string): Promise<QueueInfo> => {
    return customFetch({
        path: `queue/status/${id}`,
        method: "GET",
    });
};
interface CRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
    token?: string;
    query?: URLSearchParams | Record<string, any>;
    body?: { json?: unknown; multipart?: FormData };
}
const customFetch = async (params: CRequest) => {
    const url = new URL(`/api/v1/${params.path}`, backendUrl);
    url.search =
        params.query instanceof URLSearchParams
            ? params.query.toString()
            : new URLSearchParams(params.query).toString();
    let body;
    if (params.body?.json) {
        body = JSON.stringify(params.body?.json);
    }
    if (params.body?.multipart) {
        body = params.body.multipart;
    }
    const headers = new Headers();
    if (params.body?.json) {
        headers.set("Content-Type", "application/json");
    }
    if (params.token) {
        headers.set("authorization", params.token);
    }

    const response = await fetch(url, {
        method: params.method,
        body,
        headers,
        credentials: 'include'

    });
    const isJson =
        response.headers.get("content-type")?.includes("application/json") &&
        params.method !== "DELETE";
    if (response.ok) {
        if (isJson) {
            return response.json();
        }
        return response.text();
    }
    if (isJson) {
        throw await response.json();
    }
    if (response.status === 404) {
        throw { message: "notFound" };
    }
};
