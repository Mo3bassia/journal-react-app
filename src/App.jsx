import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Notes from "./pages/Notes";
import Tabs from "./components/Tabs";
import SingleNote from "./components/SingleNote";
import Note from "./components/Note.jsx";
import NotFound from "./pages/NotFound.jsx";
import Pinned from "./pages/Pinned.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Backup from "./pages/Backup.jsx";
import Statistics from "./pages/Statistics.jsx";

export const colors = [
  {
    light: {
      background: "#ebf8ff", // bg-blue-100
      text: "#2b6cb0", // text-blue-700
      border: "#bfdbfe", // border-blue-200
    },
    dark: {
      background: "rgba(42, 67, 101, 0.5)", // bg-blue-900 مع 50% شفافية
      text: "#63b3ed", // text-blue-300
      border: "#1e3a8a", // border-blue-800
    },
  },
  {
    light: {
      background: "#f0fff4", // bg-green-100
      text: "#2f855a", // text-green-700
      border: "#c6f6d5", // border-green-200
    },
    dark: {
      background: "rgba(34, 84, 61, 0.5)", // bg-green-900 مع 50% شفافية
      text: "#68d391", // text-green-300
      border: "#1c4532", // border-green-800
    },
  },
  {
    light: {
      background: "#faf5ff", // bg-purple-100
      text: "#6b46c1", // text-purple-700
      border: "#e9d8fd", // border-purple-200
    },
    dark: {
      background: "rgba(50, 38, 89, 0.5)", // bg-purple-900 مع 50% شفافية
      text: "#d6bcfa", // text-purple-300
      border: "#5b21b6", // border-purple-800
    },
  },
  {
    light: {
      background: "#fffff0", // bg-yellow-100
      text: "#d69e2e", // text-yellow-700
      border: "#fefcbf", // border-yellow-200
    },
    dark: {
      background: "rgba(116, 66, 16, 0.5)", // bg-yellow-900 مع 50% شفافية
      text: "#fbd38d", // text-yellow-300
      border: "#7c2d12", // border-yellow-800
    },
  },
  {
    light: {
      background: "#fff5f5", // bg-red-100
      text: "#c53030", // text-red-700
      border: "#fecaca", // border-red-200
    },
    dark: {
      background: "rgba(116, 42, 42, 0.5)", // bg-red-900 مع 50% شفافية
      text: "#fc8181", // text-red-300
      border: "#991b1b", // border-red-800
    },
  },
  {
    light: {
      background: "#fff5f7", // bg-pink-100
      text: "#b83280", // text-pink-700
      border: "#fed7e2", // border-pink-200
    },
    dark: {
      background: "rgba(112, 36, 89, 0.5)", // bg-pink-900 مع 50% شفافية
      text: "#f687b3", // text-pink-300
      border: "#9b2c2c", // border-pink-800
    },
  },
  {
    light: {
      background: "#f7fafc", // bg-gray-100
      text: "#4a5568", // text-gray-700
      border: "#edf2f7", // border-gray-200
    },
    dark: {
      background: "rgba(26, 32, 44, 0.5)", // bg-gray-900 مع 50% شفافية
      text: "#edf2f7", // text-gray-300
      border: "#4a5568", // border-gray-800 (dark mode)
    },
  },
];

export const moods = {
  en: {
    // Positive Feelings
    "Happy": "😊",
    "Joyful": "🤗",
    "Excited": "🤩",
    "Loved": "🥰",
    "Cool": "😎",
    "Blessed": "😇",
    "Peaceful": "😌",
    "Proud": "🦚",
    "Motivated": "🔥",
    "Grateful": "🙏",
    "Confident": "💫",
    "Optimistic": "🌟",
    "Accomplished": "🏆",

    // Neutral States
    "Thoughtful": "🤔",
    "Normal": "😐",
    "Busy": "⚡",
    "Focused": "🎯",
    "Creative": "🎨",
    "Relaxed": "🌺",

    // Physical States
    "Sleepy": "😴",
    "Tired": "🥱",
    "Sick": "🤒",
    "Hungry": "🤤",
    "Energetic": "💪",
    "Refreshed": "🌊",

    // Negative Feelings
    "Bored": "😑",
    "Worried": "😟",
    "Anxious": "😰",
    "Sad": "😢",
    "Crying": "😭",
    "Angry": "😠",
    "Furious": "🤬",
    "Shocked": "😱",
    "Overwhelmed": "😫",
    "Stressed": "🥴",
    "Lonely": "💔",
    "Disappointed": "😞",

    // Fun States
    "Silly": "🤪",
    "Playful": "🎮",
    "Sarcastic": "😏"
  },
  ar: {
    // مشاعر إيجابية
    "سعيد": "😊",
    "مبتهج": "🤗",
    "متحمس": "🤩",
    "محبوب": "🥰",
    "رايق": "😎",
    "ممتن": "😇",
    "هادئ": "😌",
    "فخور": "🦚",
    "متحفز": "🔥",
    "شاكر": "🙏",
    "واثق": "💫",
    "متفائل": "🌟",
    "منجز": "🏆",

    // حالات محايدة
    "مفكر": "🤔",
    "عادي": "😐",
    "مشغول": "⚡",
    "مركز": "🎯",
    "مبدع": "🎨",
    "مسترخي": "🌺",

    // حالات جسدية
    "نعسان": "😴",
    "متعب": "🥱",
    "مريض": "🤒",
    "جوعان": "🤤",
    "نشيط": "💪",
    "منتعش": "🌊",

    // مشاعر سلبية
    "ملل": "😑",
    "قلق": "😟",
    "متوتر": "😰",
    "حزين": "😢",
    "أبكي": "😭",
    "غاضب": "😠",
    "ثائر": "🤬",
    "مصدوم": "😱",
    "مغلوب": "😫",
    "مضغوط": "🥴",
    "وحيد": "💔",
    "محبط": "😞",

    // حالات مرحة
    "مرح": "🤪",
    "لاعب": "🎮",
    "ساخر": "😏"
  }
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
  const [isDark, setIsDark] = useLocalStorage(true, "dark");
  const [lang, setLanguage] = useLocalStorage("ar", "lang");
  const [notes, setNotes] = useLocalStorage([], "notes");
  const [selected, setSelected] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  let allDates = [];
  notes.map((note) => {
    allDates.push(note.date);
  });

  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    document.documentElement.lang = lang;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang, isDark]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const uniqueDates = [...new Set(allDates)];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1a1f2b] dark:text-white flex flex-col">
      <BrowserRouter>
        <Navbar setLanguage={setLanguage} lang={lang} setIsDark={setIsDark} />
        <Tabs lang={lang} selected={selected} setSelected={setSelected} />
        <main className="flex-grow ">
          <div className="h-full w-full 2xl:w-[70%] 2xl:mx-auto">
            <Routes>
              <Route
                path="/"
                element={<Home setSelected={setSelected} lang={lang} isDark={isDark} />}
              />
              <Route
                path="/pinned"
                element={
                  <Pinned
                    isDark={isDark}
                    setSelected={setSelected}
                    lang={lang}
                    notes={notes}
                  />
                }
              />
              <Route
                path="add"
                element={
                  <Add
                    setSelected={setSelected}
                    lang={lang}
                    setNotes={setNotes}
                  />
                }
              />
              <Route
                path="notes"
                element={
                  <Notes
                    isDark={isDark}
                    setNotes={setNotes}
                    lang={lang}
                    notes={notes}
                    setSelected={setSelected}
                  />
                }
              />
              <Route
                path="/backup"
                element={
                  <Backup
                    lang={lang}
                    notes={notes}
                    setNotes={setNotes}
                    setSelected={setSelected}
                    isDark={isDark}
                  />
                }
              />
              <Route
                path="/statistics"
                element={<Statistics setSelected={setSelected} lang={lang} notes={notes} isDark={isDark} />}
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
                          isDark={isDark}
                        />
                      </div>
                    }
                  />
                );
              })}
              {[...uniqueDates].reverse().map((uniqueDate) => {
                const notesOfDate = notes.filter(
                  (note) => note.date === uniqueDate
                );
                return (
                  <Route
                    key={uniqueDate}
                    path={`/notes/${uniqueDate.split("/").join("-")}`}
                    element={
                      <div className="container animate-fade-in-up opacity-0 mx-auto px-4 md:px-6">
                        <div className="space-y-6">
                          <h1 className="text-4xl font-extrabold my-8">
                            {lang == "en"
                              ? convertDate(uniqueDate)[0].toDateString()
                              : convertDate(uniqueDate)[1]}
                          </h1>
                          {[...notesOfDate].reverse().map((note) => {
                            return (
                              <Note
                                key={note.id}
                                note={note}
                                lang={lang}
                                isDark={isDark}
                                notes={notes}
                              />
                            );
                          })}
                        </div>
                      </div>
                    }
                  />
                );
              })}
              <Route path="*" element={<NotFound lang={lang} />} />
            </Routes>
          </div>
        </main>
        <Footer lang={lang} notes={notes} />
      </BrowserRouter>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 ${
            lang === "ar" ? "right-4" : "left-4"
          } px-3 py-2 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
            isDark ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
          } opacity-50 hover:opacity-100`}
          aria-label={lang === "ar" ? "العودة للأعلى" : "Back to top"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <span className="text-sm font-semibold"></span>
        </button>
      )}
    </div>
  );
}

export default App;
