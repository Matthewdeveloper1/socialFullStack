import { useContext } from "react";
import "./App.css"
import { ThemeContext } from "./components/theme-provider";

const App = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="App">
      <button className="border border-1 border-blue-500">a</button>
      <div className={"dark:bg-gray-800 dark:text-white p-4 light:bg-white text-black"}>
        <p>Текущая тема: {theme}</p>
        <button onClick={toggleTheme} className="mt-2 p-2 bg-blue-500 text-white">
          Переключить тему
        </button>
      </div>
    </div>
  )
}

export default App
