import { useContext } from "react";
import { ThemeContext } from "./components/theme-provider";
import Header from "./components/header";
import { NavButton } from "./components/nav-button";

const App = () => {

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <Header/>
    </div>
  );
};

export default App;