import { useEffect } from "react";
import { convertDate } from "../App";
import Note from "../components/Note";
import { Link } from "react-router-dom";

function Notes({ lang, notes, setSelected }) {
  let allDates = [];
  notes.map((note) => {
    allDates.push(note.date);
  });
  const uniqueDates = [...new Set(allDates)];
  useEffect(() => {
    setSelected("Notes");
  }, []);

  return (
    <div className="container mx-auto mt-9 px-4">
      <div className="space-y-6 md:space-y-10 flex-col mt-8 ">
        {uniqueDates.reverse().map((uniqueDate) => {
          const notesOfDate = notes.filter((note) => note.date === uniqueDate);

          return (
            <div
              key={uniqueDate}
              className="space-y-5 border p-4 py-6 rounded-xl dark:bg-transparent bg-slate-100 border-gray-400 dark:border-gray-700"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 ">
                {lang == "en"
                  ? convertDate(uniqueDate)[0].toDateString()
                  : convertDate(uniqueDate)[1]}
              </h2>
              {notesOfDate.map((note) => {
                return <Note key={note.id} note={note} lang={lang} />;
              })}
            </div>
          );
        })}
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
