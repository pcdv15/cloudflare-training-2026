import { Link } from "react-router";

import { getTodo } from "../lib/todos";
import type { Route } from "./+types/todos.$todoId";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const todoId = params.todoId;

  if (!todoId) {
    throw new Response("Todo ID is required", { status: 400 });
  }

  return { todo: await getTodo(todoId) };
}

export default function TodoDetailRoute({ loaderData }: Route.ComponentProps) {
  const { todo } = loaderData;

  return (
    <section className="space-y-4 rounded border border-gray-200 p-4">
      <header className="space-y-2">
        <p className="text-sm text-gray-600">Nested route: /todos/:todoId</p>
        <h2 className="text-2xl font-semibold">Todo Detail</h2>
      </header>

      <div className="space-y-2">
        <p>
          <strong>ID:</strong> {todo.id}
        </p>
        <p>
          <strong>Title:</strong> {todo.title}
        </p>
        <p>
          <strong>Content:</strong> {todo.content}
        </p>
        <p>
          <strong>Completed:</strong> {todo.isCompleted ? "Yes" : "No"}
        </p>
        <p>
          <strong>Created At:</strong> {todo.createdAt}
        </p>
      </div>

      <Link className="text-blue-600 underline" to="/todos">
        Back to todos
      </Link>
    </section>
  );
}
