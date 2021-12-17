import MainBody from "./components/MainBody";
import TodoListContextProvider from "./contexts/TodoListContext";

function App() {
  return (
    <div className="App">
      <TodoListContextProvider>
        <header></header>
        <MainBody />
      </TodoListContextProvider>
    </div>
  );
}

export default App;
