import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DayNotes from "../components/DayNotes";
import { DayPicker } from "react-day-picker";
import { colors } from "../App";
import { ar } from "date-fns/locale";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Notes({ lang, notes, setSelected, setNotes, isDark }) {
  let [currentCategory, setCurrentCategory] = useState("");
  let [isDateOpen, setDateOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [viewMode, setViewMode] = useLocalStorage("grid", 'view'); // grid or list

  useEffect(() => {
    document.title = `${
      lang == "en" ? "Journal | My notes" : "يومياتي | مذكراتي"
    }`;
  }, [lang]);

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function clearSearch() {
    setSearchValue("");
  }

  let allDates = [];

  notes.map((note, index) => {
    allDates.push(note.date);
  });

  let categories = {};
  notes.map((n, index) => {
    if (n.category != "") {
      let newI = index;
      while (!(newI >= 0 && newI < colors.length)) {
        newI -= colors.length;
      }
      categories[n.category] = colors[newI];
    }
  });

  let notesFiltered;

  if (currentCategory === "") {
    notesFiltered = [...notes];
  } else {
    notesFiltered = [...notes].filter((n) => n.category === currentCategory);
  }
  if (selectedDate) {
    notesFiltered = notesFiltered.filter((n) => {
      return n.date === selectedDate.toLocaleDateString("en-US");
    });
  }

  if (searchValue) {
    notesFiltered = notesFiltered.filter(
      (n) =>
        n.note.toLowerCase().includes(searchValue.toLowerCase()) ||
        n.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const totalResults = notesFiltered.length;

  const uniqueDates = [...new Set(allDates)];
  useEffect(() => {
    setSelected("Notes");
  }, []);

  function handleReset() {
    setDateOpen(false);
    setSelectedDate();
  }

  function handleClickOver(e) {
    setDateOpen((i) => !i);
    setSelectedDate(null);
  }
  return (
    <div>
      <div
        className={`${
          isDateOpen ? "" : "hidden"
        } flex items-center justify-center fixed z-[500] top-0 left-0 w-full h-screen bg-transparent backdrop-blur-sm transition-all duration-500`}
        onClick={() => handleClickOver()}
      >
        {isDateOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <DayPicker
              locale={lang != "en" ? ar : ""}
              // footer={
              //   <button
              //     className="border-2 border-red-600 hover:bg-red-600 flex gap-2 px-4 py-1 rounded-lg text-slate-800 hover:text-white dark:text-white mx-auto transition-colors mt-6"
              //     onClick={handleReset}
              //   >
              //     Clear
              //   </button>
              // }
              style={{
                "--rdp-accent-color": `${isDark ? "#607be8" : "#3b82f6"}`, // تغيير لون الخلفية
                "--rdp-day-selected-border": "#fff", // تغيير لون الحدود
              }}
              mode="single"
              defaultMonth={selectedDate}
              selected={selectedDate}
              onDayClick={() => setDateOpen((i) => !i)}
              classNames={{
                months: ` ${
                  lang == "en" ? "right-0" : "left-0 "
                } top-full bg-slate-100 dark:bg-slate-800 dark:text-slate-100 z-50 p-5 rounded-xl shadow-xl dark:shadow-blue-500/10 text-sm `,
              }}
              onSelect={setSelectedDate}
              className="animate-fade-in-up opacity-0  sm:block top-full"
            />
          </div>
        )}
      </div>
      <div className="container mx-auto mt-9 px-4 ">
        <div className="space-y-16 md:space-y-10 flex-col mt-8">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-fade-in-up opacity-0">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 rtl:left-auto rtl:right-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search h-5 w-5 text-gray-400 dark:text-gray-500"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full py-2 px-10 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder={`${
                    lang == "en" ? "Search your notes..." : "ابحث في مذكراتك..."
                  }`}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                {searchValue && (
                  <>
                    <div className={`absolute inset-y-0 ${lang == "en" ? "right-10 left-auto" : "left-10 right-auto"}  flex items-center text-sm text-gray-500 dark:text-gray-400`}>
                      {lang === "en" 
                        ? `${totalResults} ${totalResults === 1 ? "result" : "results"}`
                        : `${totalResults} ${totalResults === 1 ? "نتيجة" : "نتائج"}`
                      }
                    </div>
                    <button
                      onClick={clearSearch}
                      className={`absolute inset-y-0 ${lang == "en" ? "right-3" : "left-3"} flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                      title={lang === "en" ? "Clear search" : "مسح البحث"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className="w-full relative sm:w-48">
                <input
                  readOnly
                  type="text"
                  className="w-full py-2 px-10 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  value={selectedDate?.toLocaleDateString("en-US") || ""}
                  placeholder={`${
                    lang == "en" ? "Select date" : "اختر التاريخ"
                  }`}
                  onClick={() => setDateOpen(true)}
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400 pointer-events-none"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400 cursor-pointer opacity-0 transition-all pointer-events-none ${
                    selectedDate ? "pointer-events-auto opacity-100" : ""
                  }`}
                  onClick={() => setSelectedDate()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              </div>
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 sm:border-l sm:pl-4 dark:border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={lang === "en" ? "Grid view" : "عرض شبكي"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={lang === "en" ? "List view" : "عرض قائمة"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* <span
            className={`w-fit px-4 py-2 rounded-lg shadow-lg bg-blue-400 block `}
            onClick={() => setCurrentCategory("")}
          >
            {lang == "en" ? "Pinned Notes" : "المذكرات المثبتة"}
          </span> */}
          {Object.keys(categories).length !== 0 && (
            <div className="flex gap-x-3 animate-fade-in-up opacity-0 flex-wrap gap-y-4">
              <span
                className={`px-3 py-1 rounded-full text-sm transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 outline-2 dark:text-gray-100 cursor-pointer flex items-center gap-2 ${
                  currentCategory == "" ? "scale-105 outline" : ""
                }`}
                onClick={() => setCurrentCategory("")}
              >
                {lang == "en" ? "All" : "الكل"}
              </span>
              {Object.keys(categories).map((cat) => {
                const percent = Math.round(
                  notes.filter((n) => n.category == cat).length / notes.length * 100
                );
                return (
                  <div key={cat}>
                    <span
                      style={{
                        background: isDark
                          ? categories[cat].dark.background
                          : categories[cat].light.background,
                        color: isDark ? "" : categories[cat].light.text,
                        borderColor: isDark
                          ? categories[cat].dark.border
                          : categories[cat].light.border,
                      }}
                      onClick={() =>
                        currentCategory != cat
                          ? setCurrentCategory(cat)
                          : setCurrentCategory("")
                      }
                      className={`text-xs md:text-sm flex items-center gap-2 dark:text-gray-100 rounded-full px-3 py-1.5 outline-2 cursor-pointer border ${
                        currentCategory == cat ? "scale-105 outline" : ""
                      } transition-transform shadow-sm hover:scale-105`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6Z"
                        />
                      </svg>
                      {cat}
                      <div className="flex items-center gap-1">
                        <span className="text-xs px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm">
                          {notes.filter((n) => n.category == cat).length}
                        </span>
                        <span className="text-[10px] text-black/40 dark:text-white/40 font-light">
                          ({percent}%)
                        </span>
                      </div>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex animate-fade-in-up opacity-0 flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 lg:flex lg:flex-row gap-4 justify-center flex-wrap">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-4 rtl:space-x-reverse  max-w-full gap-4">
              <div className="p-2 bg-gray-50  dark:bg-gray-700 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notes.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang == "en" ? "Total Notes" : "إجمالي المذكرات"}
                </div>
              </div>
            </div>
            <div
              className={`  rounded-lg p-4 shadow-md flex items-center space-x-4 rtl:space-x-reverse max-w-full gap-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer ${
                new Date(selectedDate).toLocaleDateString("en-US") ==
                new Date().toLocaleDateString("en-US")
                  ? "bg-slate-200 dark:bg-slate-700 "
                  : "bg-white dark:bg-gray-800  "
              }`}
              onClick={() =>
                new Date(selectedDate).toLocaleDateString("en-US") !=
                new Date().toLocaleDateString("en-US")
                  ? setSelectedDate(new Date())
                  : setSelectedDate()
              }
            >
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    notes.filter(
                      (d) => d.date == new Date().toLocaleDateString("en-US")
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang == "en" ? "Today's Notes" : "مذكرات اليوم"}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-4 rtl:space-x-reverse max-w-full gap-4">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notes.filter((n) => n.lastEditDate).length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang == "en" ? "Edited Notes" : "المذكرات المعدلة"}
                </div>
              </div>
            </div>
            <Link to="/pinned">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-4 rtl:space-x-reverse max-w-full gap-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 cursor-pointer"
                  >
                    <line x1="12" x2="12" y1="17" y2="22"></line>
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notes.filter((n) => n.pinned).length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {lang == "en" ? "Pinned Notes" : "المذكرات المثبتة"}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up opacity-0">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {lang === "en" ? "Start Your Journey" : "ابدأ رحلتك"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                {lang === "en"
                  ? searchValue
                    ? `No notes match your search "${searchValue}". Try different keywords or clear your search.`
                    : selectedDate
                    ? `No notes found for ${selectedDate.toLocaleDateString()}. Try selecting a different date.`
                    : "You haven't created any notes yet. Start by adding your first note!"
                  : searchValue
                    ? `لا توجد مذكرات تطابق بحثك "${searchValue}". جرب كلمات مختلفة أو امسح البحث.`
                    : selectedDate
                    ? `لا توجد مذكرات في ${selectedDate.toLocaleDateString('ar-EG')}. جرب اختيار تاريخ آخر.`
                    : "لم تقم بإنشاء أي مذكرات بعد. ابدأ بإضافة أول مذكرة!"}
              </p>
              {(searchValue || selectedDate) ? (
                <div className="flex gap-3">
                  {searchValue && (
                    <button
                      onClick={clearSearch}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {lang === "en" ? "Clear Search" : "مسح البحث"}
                    </button>
                  )}
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(undefined)}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {lang === "en" ? "Clear Date" : "مسح التاريخ"}
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  to="/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {lang === "en" ? "Create New Note" : "إنشاء مذكرة جديدة"}
                </Link>
              )}
            </div>
          ) : totalResults === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up opacity-0">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {lang === "en" ? "No matching notes found" : "لم يتم العثور على مذكرات مطابقة"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                {lang === "en"
                  ? searchValue
                    ? `No notes match your search "${searchValue}". Try different keywords or clear your search.`
                    : selectedDate
                    ? `No notes found for ${selectedDate.toLocaleDateString()}. Try selecting a different date.`
                    : "You haven't created any notes yet. Start by adding your first note!"
                  : searchValue
                    ? `لا توجد مذكرات تطابق بحثك "${searchValue}". جرب كلمات مختلفة أو امسح البحث.`
                    : selectedDate
                    ? `لا توجد مذكرات في ${selectedDate.toLocaleDateString('ar-EG')}. جرب اختيار تاريخ آخر.`
                    : "لم تقم بإنشاء أي مذكرات بعد. ابدأ بإضافة أول مذكرة!"}
              </p>
              {(searchValue || selectedDate) ? (
                <div className="flex gap-3">
                  {searchValue && (
                    <button
                      onClick={clearSearch}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {lang === "en" ? "Clear Search" : "مسح البحث"}
                    </button>
                  )}
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(undefined)}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {lang === "en" ? "Clear Date" : "مسح التاريخ"}
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  to="/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {lang === "en" ? "Create New Note" : "إنشاء مذكرة جديدة"}
                </Link>
              )}
            </div>
          ) : (
            uniqueDates.reverse().map((uniqueDate) => {
              const notesOfDate = notesFiltered.filter(
                (note) => note.date === uniqueDate
              );

              return (
                <DayNotes
                  notes={notes}
                  setNotes={setNotes}
                  key={uniqueDate}
                  uniqueDate={uniqueDate}
                  lang={lang}
                  notesOfDate={notesOfDate}
                  isDark={isDark}
                  viewMode={viewMode}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;
