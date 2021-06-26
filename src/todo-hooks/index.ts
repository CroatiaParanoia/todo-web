import { useCallback, useMemo, useState } from "react";

interface TodoItem {
  content: string;
  id: string;
  isComplete: boolean;
}

const generateTodoItem = (content: string): TodoItem => {
  return {
    content,
    id: Date.now().toString(),
    isComplete: false,
  };
};

const useTodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const resetInputValue = useCallback(() => {
    setInputValue("");
  }, []);

  const addTodoItem = useCallback(
    (content) => {
      setTodoList([...todoList, generateTodoItem(content)]);
    },
    [todoList]
  );

  const createTodoItem = useCallback(
    () => {
      addTodoItem(inputValue);
      resetInputValue();
    },
    [addTodoItem, inputValue, resetInputValue]
  );

  const removeTodoItem = useCallback(
    (id: string) => {
      setTodoList(todoList.filter((v) => v.id !== id));
    },
    [todoList]
  );

  const completeTodoItem = useCallback(
    (id: string) => {
      setTodoList(
        todoList.map((v) => {
          if (v.id === id) {
            return {
              ...v,
              isComplete: true,
            };
          }

          return v;
        })
      );
    },
    [todoList]
  );

  return [
    { todoList, inputValue },
    {
      addTodoItem,
      removeTodoItem,
      completeTodoItem,
      resetInputValue,
      setInputValue,
      createTodoItem,
    },
  ] as const;
};

export default useTodoList;
