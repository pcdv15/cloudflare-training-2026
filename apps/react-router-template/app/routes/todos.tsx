import { Link, Outlet } from "react-router";

import { getTodos } from "../lib/todos";
import type { Route } from "./+types/todos";

export async function clientLoader() {
  return { todos: await getTodos() };
}

export default function TodosRoute({ loaderData }: Route.ComponentProps) {
  const { todos } = loaderData;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm text-gray-600">Route: /todos</p>
        <h1 className="text-3xl font-semibold">Todos</h1>
        <p className="text-base text-gray-700">
          Hello from Mugna! This page lists todos from the API and shows nested
          route content.
        </p>
      </header>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Link className="text-blue-600 underline" to={String(todo.id)}>
                {todo.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Outlet />
    </main>
  );
}
