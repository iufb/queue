import { IQueue } from "@/shared/lib";
import { getCookie } from "cookies-next";

const backendUrl = "http://77.243.80.138:8000";
export const deleteAdminTask = (id: number) => {
  return customFetch({
    path: "delete-task",
    method: "DELETE",
    body: { json: { id } },
  });
};
export const fetchAdminTask = (table: number): Promise<IQueue> => {
  return customFetch({
    path: `get-admin-task/${table}`,
    method: "GET",
    // token: `Token ${getCookie("token")}`,
  });
};
export const getAuthedTable = () => {
  return customFetch({
    path: "profile/",
    method: "GET",
    token: `Token ${getCookie("token")}`,
  });
};
export const adminLogin = (data: { username: string; password: string }) => {
  return customFetch({
    path: "api-token-auth/",
    method: "POST",
    body: { json: data },
  });
};
export const createQueue = (program: string) => {
  return customFetch({
    path: "post-task",
    method: "POST",
    body: {
      json: {
        op: program,
      },
    },
  });
};
export const getDisplayQueue = (): Promise<IQueue[]> => {
  return customFetch({
    path: "get-queue",
    method: "GET",
  });
};
export const getCurrentQueue = (id: number) => {
  return customFetch({
    path: `get-task-student/${id}`,
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
  const url = new URL(`/api/${params.path}`, backendUrl);
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
