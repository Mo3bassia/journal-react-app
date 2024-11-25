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

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Navbar setLanguage={setLanguage} lang={lang} setIsDark={setIsDark} />
        <Tabs lang={lang} selected={selected} setSelected={setSelected} />
        <Routes>
          <Route path="/" element={<p className="hidden">s</p>} />
          <Route path="add" element={<Add lang={lang} setNotes={setNotes} />} />
          <Route
            path="notes"
            element={
              <Notes lang={lang} notes={notes} setSelected={setSelected} />
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
                    />
                  </div>
                }
              />
            );
          })}
          {/* {uniqueDates.reverse().map((uniqueDate) => {
            const notesOfDate = notes.filter(
              (note) => note.date === uniqueDate
            );
            console.log(uniqueDate);
            return (
              <Route
                key={uniqueDate}
                path={`/days/${uniqueDate.split("/").join("-")}`}
                element={
                  <div className="container mx-auto">
                    <h1>
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
          })} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
