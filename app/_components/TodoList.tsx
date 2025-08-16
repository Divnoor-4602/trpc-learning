"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const createTodo = trpc.createTodo.useMutation();

  const [content, setContent] = useState("");

  return (
    <>
      <div>{JSON.stringify(getTodos.data)}</div>
      <input
        type="text"
        value={content}
        className="border-2 border-gray-300 rounded-md p-2"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          createTodo.mutate({ content });
          setContent("");
        }}
      >
        Add
      </button>
    </>
  );
}
