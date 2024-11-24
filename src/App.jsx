import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Notes from "./pages/Notes";
import Tabs from "./components/Tabs";

function App() {
  const [isDark, setIsDark] = useLocalStorage(false, "dark");
  const [lang, setLanguage] = useLocalStorage("ar", "lang");
  const [notes, setNotes] = useLocalStorage({}, "notes");
  const [selected, setSelected] = useState("Add");

  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    document.documentElement.lang = lang;
  }, [lang, isDark]);

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Navbar setLanguage={setLanguage} lang={lang} setIsDark={setIsDark} />
        <Tabs lang={lang} selected={selected} setSelected={setSelected} />
        <Routes>
          <Route path="/" element={<p className="hidden">s</p>} />
          <Route path="add" element={<Add lang={lang} />} />
          <Route path="notes" element={<Notes lang={lang} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
