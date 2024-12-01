import { useEffect } from "react";
import Note from "../components/Note";

function Pinned({ lang, isDark, notes, setSelected }) {
  let notesOfDate = notes;
  notesOfDate.reverse().sort((a, b) => b.id - a.id);

  useEffect(function () {
    setSelected("Pinned");
  }, []);

  useEffect(() => {
    document.title = `${
      lang == "en" ? "Journal | Pinned notes" : "يومياتي | المثبتة"
    }`;
  }, [lang]);

  let pinnedNotes = notesOfDate.filter((n) => n.pinned);
  console.log(pinnedNotes);
  {
    /* <div className="container mx-auto px-4 md:px-6 ">
              <p className="text-center text-base md:text-lg lg:text-xl xl:text-2xl mt-10">
                {lang == "en"
                  ? "No notes match your search"
                  : "لا توجد مذكرات متطابقة مع بحثك"}
              </p>
            </div> */
  }
  return (
    <div className={`container mx-auto mt-9 px-4 animate-fade-in-up opacity-0`}>
      {pinnedNotes.length != 0 && (
        <h2 className="text-3xl lg:text-4xl xl:text-5xl block font-medium text-gray-900 dark:text-white mb-5 md:mb-8">
          {lang == "en" ? "Pinned notes" : "المذكرات المثبتة"}
        </h2>
      )}
      <div className="space-y-6 md:space-y-8 flex-col mt-8">
        {pinnedNotes.length != 0 ? (
          pinnedNotes.map((note) => {
            return (
              <Note
                key={note.id}
                note={note}
                lang={lang}
                notes={notes}
                isDark={isDark}
              />
            );
          })
        ) : (
          <div className="container mx-auto px-4 md:px-6 ">
            <p className="text-center text-base md:text-lg lg:text-xl xl:text-2xl mt-10">
              {lang == "en"
                ? "No pinned notes available"
                : "لا توجد مذكرات محفوظة"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pinned;
