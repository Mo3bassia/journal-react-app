import { Link } from "react-router-dom";
import { convertDate } from "../App";
import { colors } from "../App";

function Note({ lang, note, notes, isDark }) {
  const {
    id,
    title,
    category,
    note: noteTxt,
    pinned,
    date,
    emoji,
    moodAr,
    time,
    moodEn,
  } = note;

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

  return (
    <Link to={`/note/${id}`} className="block relative">
      <div
        key={id}
        className="select-none transition-all duration-200 ease-in-out cursor-pointer p-4 rounded-lg shadow-md
        bg-gradient-to-br from-slate-50 via-white to-blue-50
        hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50
        dark:from-[#1a1f2c] dark:via-[#1e2433] dark:to-[#232936]
        dark:hover:from-[#1e2433] dark:hover:via-[#232936] dark:hover:to-[#2a3241]
        border border-gray-100 dark:border-gray-700"
      >
        {
          <h2 className="text-xl md:text-2xl flex items-center justify-between text-gray-900 dark:text-white mb-2 font-bold mt-2 flex-wrap gap-y-3">
            <span className="flex gap-2 items-center">
              {title != ""
                ? title
                : `${lang == "en" ? "Without title" : "بدون عنوان"}`}
              {pinned && (
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
                  className={`size-5 cursor-pointer text-blue-600 ${
                    lang == "en" ? "rotate-45" : "-rotate-45"
                  }`}
                >
                  <line x1="12" x2="12" y1="17" y2="22"></line>
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                </svg>
              )}
            </span>

            <div className="flex items-center gap-1">
              {emoji && (
                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow inline-flex font-normal">
                  {lang == "en" ? `${moodEn}` : `${moodAr}`} {emoji}
                </span>
              )}
              {category != "" && (
                <>
                  {Object.keys(categories).map((c) => {
                    return (
                      <div
                        key={c}
                        className={`${category !== c && "hidden"} font-normal`}
                      >
                        {category == c && (
                          <div
                            style={{
                              background: isDark
                                ? categories[c].dark.background
                                : categories[c].light.background,
                              color: isDark
                                ? categories[c].dark.text
                                : categories[c].light.text,
                              borderColor: isDark
                                ? categories[c].dark.border
                                : categories[c].light.border,
                            }}
                            className={`text-xs md:text-sm  w-fit flex items-center gap-2 rounded-full px-3 py-1 shadow-sm border`}
                          >
                            <span>{category}</span>
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </h2>
        }
        <ul className="text-sm"></ul>
        <p className="text-gray-600 text-base md:text-lg mt-4 dark:text-gray-400 mb-4 whitespace-pre-line">
          {noteTxt.slice(0, 200)}
          {noteTxt.length > 200 ? "..." : ""}
        </p>
        <div className="my-2 flex justify-between items-center text-gray-600 dark:text-gray-400 mt-6 text-sm gap-2">
          <div className="flex gap-2">
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {lang == "en"
              ? convertDate(date)[0].toDateString()
              : convertDate(date)[1]}
          </div>
          <div className="flex items-center gap-2">
            {time}
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Note;
