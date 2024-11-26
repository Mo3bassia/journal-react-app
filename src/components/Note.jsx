import { Link } from "react-router-dom";
import { convertDate } from "../App";
import CloseIcon from "./CloseIcon";

function Note({ lang, note }) {
  const {
    id,
    title,
    category,
    note: noteTxt,
    date,
    emoji,
    moodAr,
    time,
    moodEn,
  } = note;

  return (
    <Link to={`/note/${id}`} className="block relative">
      <div
        key={id}
        className="select-none transition-all hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer p-4 bg-white dark:bg-[#232936] rounded-lg shadow-md"
      >
        <div className="my-2 flex justify-between items-center text-gray-600 dark:text-gray-400">
          <span>
            {lang == "en"
              ? convertDate(date)[0].toDateString()
              : convertDate(date)[1]}
          </span>
          <span>{time}</span>
        </div>
        {title && (
          <h2 className="text-xl md:text-2xl flex items-center justify-between text-gray-900 dark:text-white mb-2 font-bold">
            <span>{title}</span>
          </h2>
        )}
        <ul className="text-sm">
          {emoji && (
            <li className=" relative">
              <span className={`${lang == "en" ? "ml-6" : "mr-6"}`}>
                {lang == "en" ? `${moodEn}` : `${moodAr}`} {emoji}
              </span>
              <span
                className={`absolute ${
                  lang == "en" ? "left-0" : "right-0"
                } top-1/2 -translate-y-1/2 text-sm flex items-center justify-center`}
              >
                💭
              </span>
            </li>
          )}
          {category != "" && (
            <li className="relative mt-2">
              <span className={`${lang == "en" ? "ml-6" : "mr-6"}`}>
                {lang == "en" ? "category:" : "التصنيف:"} {category}
              </span>
              <span
                className={`absolute ${
                  lang == "en" ? "left-0" : "right-0"
                } top-1/2 -translate-y-1/2 text-sm flex items-center justify-center`}
              >
                📂
              </span>
            </li>
          )}
        </ul>
        <p className="text-gray-600 text-base md:text-lg mt-4 dark:text-gray-400 mb-4 whitespace-pre-line">
          {noteTxt}
        </p>
      </div>
    </Link>
  );
}

export default Note;
