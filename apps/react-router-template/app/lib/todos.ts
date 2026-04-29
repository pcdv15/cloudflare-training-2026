import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Response(response.statusText || "Request failed", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json() as Promise<T>;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/api/todos`);

  return readJson<Todo[]>(response);
}

export async function getTodo(todoId: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/api/todos/${todoId}`);

  return readJson<Todo>(response);
}
