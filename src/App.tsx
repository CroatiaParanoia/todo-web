import "./App.css";

import useTodo from "./todo-hooks";

function App() {
  const [
    { todoList, inputValue },
    { createTodoItem, removeTodoItem, completeTodoItem, setInputValue },
  ] = useTodo();

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />{" "}
        <button onClick={() => createTodoItem()}>创建</button>
      </div>
      <br />

      <div>
        {todoList.map((item) => {
          return (
            <div key={item.id} className="flex jc-sb ai-c">
              <div
                style={{
                  textDecoration: item.isComplete ? "line-through" : "none",
                }}
              >
                {item.content}
              </div>
              <div>
                {item.isComplete ? (
                  <button onClick={() => removeTodoItem(item.id)}>删除</button>
                ) : (
                  <button onClick={() => completeTodoItem(item.id)}>
                    完成
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
