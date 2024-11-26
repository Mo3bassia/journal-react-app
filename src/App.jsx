import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Notes from "./pages/Notes";
import Tabs from "./components/Tabs";
import SingleNote from "./components/SingleNote";
import { Link } from "react-router-dom";
import Note from "./components/Note.jsx";
import NotFound from "./pages/NotFound.jsx";

export const moods = {
  en: {
    Happy: "😊",
    Joyful: "😄",
    Excited: "🤩",
    Sad: "😞",
    Anxious: "😖",
    Calm: "😌",
    Angry: "😡",
    Thoughtful: "🤔",
    Relaxed: "😴",
    Confused: "😕",
  },
  ar: {
    سعيد: "😊",
    مبتهج: "😄",
    متحمس: "🤩",
    مكتئب: "😞",
    مضطرب: "😖",
    هادئ: "😌",
    غاضب: "😡",
    مفكر: "🤔",
    مرتاح: "😴",
    متحير: "😕",
  },
};

export function convertDate(date) {
  return [
    new Date(date),
    new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date)),
  ];
}

function App() {
  const [isDark, setIsDark] = useLocalStorage(false, "dark");
  const [lang, setLanguage] = useLocalStorage("ar", "lang");
  const [notes, setNotes] = useLocalStorage([], "notes");
  const [selected, setSelected] = useState("");

  let allDates = [];
  notes.map((note) => {
    allDates.push(note.date);
  });

  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    document.documentElement.lang = lang;
  }, [lang, isDark]);

  const uniqueDates = [...new Set(allDates)];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1a1f2b] dark:text-white flex flex-col">
      <BrowserRouter>
        <Navbar setLanguage={setLanguage} lang={lang} setIsDark={setIsDark} />
        <Tabs lang={lang} selected={selected} setSelected={setSelected} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<p className="hidden">s</p>} />
            <Route
              path="add"
              element={<Add lang={lang} setNotes={setNotes} />}
            />
            <Route
              path="notes"
              element={
                <Notes
                  setNotes={setNotes}
                  lang={lang}
                  notes={notes}
                  setSelected={setSelected}
                />
              }
            />
            {notes.map((note) => {
              return (
                <Route
                  key={note.id}
                  path={`/note/${note.id}`}
                  element={
                    <div className="container mx-auto">
                      <SingleNote
                        note={note}
                        notes={notes}
                        setSelected={setSelected}
                        lang={lang}
                        setNotes={setNotes}
                      />
                    </div>
                  }
                />
              );
            })}
            {uniqueDates.reverse().map((uniqueDate) => {
              const notesOfDate = notes.filter(
                (note) => note.date === uniqueDate
              );
              return (
                <Route
                  key={uniqueDate}
                  path={`/notes/${uniqueDate.split("/").join("-")}`}
                  element={
                    <div className="container mx-auto px-4 md:px-6">
                      <h1 className="text-4xl font-extrabold my-8">
                        {lang == "en"
                          ? convertDate(uniqueDate)[0].toDateString()
                          : convertDate(uniqueDate)[1]}
                      </h1>
                      {notesOfDate.map((note) => {
                        return <Note key={note.id} note={note} lang={lang} />;
                      })}
                    </div>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound lang={lang} />} />
          </Routes>
        </main>
        <footer className="flex justify-center py-4">
          <Link to="/add" className="text-gray-500 hover:text-gray-900">
            Add Note
          </Link>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
