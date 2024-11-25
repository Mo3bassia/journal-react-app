import { useEffect } from "react";
import { convertDate } from "../App";
import { Link } from "react-router-dom";

function Note({ lang, note, setSelected, notes }) {
  const { id, title, note: noteTxt, date, emoji, moodAr, time, moodEn } = note;

  useEffect(function () {
    setSelected("");
  }, []);

  return (
    <>
      <div key={id} className="p-4">
        <div className="my-2 flex justify-between items-center text-gray-600 dark:text-gray-400 mb-5">
          <span>
            {lang == "en"
              ? convertDate(date)[0].toDateString()
              : convertDate(date)[1]}
          </span>
          <span>{time}</span>
        </div>
        {title && (
          <h2 className="mb-6 flex items-center justify-between text-gray-900 dark:text-white  font-extrabold">
            <span className="text-3xl md:text-4xl">{title}</span>
            <span>
              {lang == "en" ? `${moodEn}` : `${moodAr}`}
              <span className="text-2xl"> {emoji}</span>
            </span>
          </h2>
        )}
        <p className="text-gray-600 text-lg md:text-xl dark:text-gray-300 mb-4 whitespace-pre-line leading-loose">
          {noteTxt}
        </p>
      </div>
      <div className={`flex justify-center gap-4 flex-row-reverse`}>
        {note.id != notes.length && (
          <Link
            to={`/note/${note.id + 1}`}
            className={`bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white flex-row-reverse`}
          >
            {lang == "en" ? (
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            ) : (
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            )}
            <span>
              {lang == "en"
                ? `Next (${note.id + 1})`
                : `التالي (${note.id + 1}) `}
            </span>
          </Link>
        )}
        {note.id != 1 && (
          <Link
            to={`/note/${note.id - 1}`}
            className={`bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white flex-row-reverse`}
          >
            <span>
              {lang == "en"
                ? `(${note.id - 1}) Previous`
                : `(${note.id - 1}) السابق`}
            </span>
            {lang != "en" ? (
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            ) : (
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            )}
          </Link>
        )}
      </div>
    </>
  );
}

export default Note;
