import React, { useState, useEffect } from 'react';

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem('theme');
  const currentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark';

  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`changeTheme ${theme}`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;