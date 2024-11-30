import { useEffect, useState } from "react";
import { convertDate } from "../App";
import Note from "../components/Note";
import { Link } from "react-router-dom";
import DayNotes from "../components/DayNotes";

import { colors } from "../App";

function Notes({ lang, notes, setSelected, setNotes, isDark }) {
  let [currentCategory, setCurrentCategory] = useState("");

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
    notesFiltered = notes;
  } else {
    notesFiltered = notes.filter((n) => n.category === currentCategory);
  }
  // console.log(notesFiltered);

  const uniqueDates = [...new Set(allDates)];
  useEffect(() => {
    setSelected("Notes");
  }, []);

  return (
    <div className="container mx-auto mt-9 px-4 animate-fade-in-up opacity-0">
      <div className="space-y-16 md:space-y-10 flex-col mt-8">
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
              return (
                <span
                  style={{
                    background: isDark
                      ? categories[cat].dark.background
                      : categories[cat].light.background,
                    color: isDark
                      ? categories[cat].dark.text
                      : categories[cat].light.text,
                    borderColor: isDark
                      ? categories[cat].dark.border
                      : categories[cat].light.border,
                  }}
                  onClick={() =>
                    currentCategory != cat
                      ? setCurrentCategory(cat)
                      : setCurrentCategory("")
                  }
                  className={`text-xs md:text-sm  w-fit flex items-center gap-2 dark:text-gray-300 rounded-full px-3 py-1 outline-2 cursor-pointer border ${
                    currentCategory == cat ? "scale-105 outline" : ""
                  } transition-transform shadow-sm`}
                  key={cat}
                >
                  {cat}
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
                </span>
              );
            })}
          </div>
        )}
        <div className="flex gap-4 justify-center">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-4 rtl:space-x-reverse max-w-full gap-4">
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
                  notes.filter((d) => d.date == new Date().toLocaleDateString())
                    .length
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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
        </div>
        {uniqueDates.length != 0 ? (
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
              />
            );
          })
        ) : (
          <div className="container mx-auto px-4 md:px-6 ">
            <p className="text-center text-base md:text-lg lg:text-xl xl:text-2xl mt-10">
              {lang == "en"
                ? "No notes match your search"
                : "لا توجد مذكرات متطابقة مع بحثك"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
  // return (
  //   <div className="container mx-auto mt-9 px-4">
  //     <div className="space-y-6">
  //       {notes.map((note) => {
  //         const {
  //           id,
  //           title,
  //           note: noteTxt,
  //           date,
  //           emoji,
  //           moodAr,
  //           moodEn,
  //         } = note;
  //         return (
  //           <div
  //             key={id}
  //             className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
  //           >
  //             <span className="my-2 block text-gray-600 dark:text-gray-400">
  //               {lang == "en"
  //                 ? convertDate(date)[0].toDateString()
  //                 : convertDate(date)[1]}
  //             </span>
  //             {title && (
  //               <h2 className="text-xl flex items-center justify-between text-gray-900 dark:text-white mb-2 font-bold">
  //                 <span>{title}</span>
  //               </h2>
  //             )}
  //             <p className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">
  //               {noteTxt}
  //             </p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}

export default Notes;
