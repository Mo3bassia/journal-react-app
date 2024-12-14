import { Link } from "react-router-dom";

function getRandom(arr, num) {
  let result = [];
  while ([...new Set(result)].length < num) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (arr.length < num && [...new Set(result)].length == arr.length) {
      break;
    }
    if (arr[randomIndex].title) {
      result.push(arr[randomIndex]);
    } else {
      continue;
    }
  }
  return [...new Set(result)];
}

function Footer({ lang, notes }) {
  let randomNotes = getRandom(notes, 4);
  return (
    <footer className="py-7 bg-white text-gray-900 dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 dark:text-white flex mt-12 shadow-2xl animate-fade-in-up opacity-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-book w-5 h-5"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              <h3 className="font-bold text-lg">
                {lang == "ar" ? "يومياتي" : "Journal"}
              </h3>
            </div>
            <p className="text-sm opacity-80">
              {lang == "en"
                ? "Your personal space to capture daily thoughts, memories, and experiences."
                : "مساحتك الشخصية لتسجيل أفكارك وذكرياتك وتجاربك اليومية"}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-link w-5 h-5"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <h3 className="font-bold text-lg">
                {lang == "ar" ? "روابط سريعة" : "Quick Links"}
              </h3>
            </div><ul className="space-y-3">
              {/* الرئيسية */}
              <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                <Link to="/" className="flex gap-3 items-center group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-500 transition-transform group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9.75V19a2.25 2.25 0 0 0 2.25 2.25H18.75A2.25 2.25 0 0 0 21 19V9.75M9 21V12.75h6V21M9 3.75L3 9.75h18L15 3.75"
                    />
                  </svg>
                  <span className="transition-colors group-hover:text-blue-500">{lang === "en" ? "Home" : "الرئيسية"}</span>
                </Link>
              </li>

              {/* إضافة */}
              <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                <Link to="/add" className="flex gap-3 items-center group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-500 transition-transform group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.75v14.5m7.25-7.25H4.75"
                    />
                  </svg>
                  <span className="transition-colors group-hover:text-green-500">{lang === "en" ? "Add" : "إضافة"}</span>
                </Link>
              </li>

              {/* مذكراتي */}
              {notes.length > 0 && (
                <>
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                    <Link to="/notes" className="flex gap-3 items-center group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-yellow-500 transition-transform group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5.75v12.5A2.25 2.25 0 0 0 5.25 20.5H18.75A2.25 2.25 0 0 0 21 18.25V5.75M3 5.75L12 12.25m0 0L21 5.75m-9 6.5V5.75"
                        />
                      </svg>
                      <span className="transition-colors group-hover:text-yellow-500">{lang === "en" ? "Notes" : "مذكراتي"}</span>
                    </Link>
                  </li>

                  {/* المثبتة */}
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                    <Link to="/pinned" className="flex gap-3 items-center group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9"
                        />
                      </svg>
                      <span className="transition-colors group-hover:text-red-500">{lang === "en" ? "Pinned" : "المثبتة"}</span>
                    </Link>
                  </li>

                  {/* الإحصائيات */}
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                    <Link to="/statistics" className="flex gap-3 items-center group">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-indigo-500 transition-transform group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                        />
                      </svg>
                      <span className="transition-colors group-hover:text-indigo-500">{lang === "en" ? "Statistics" : "الإحصائيات"}</span>
                    </Link>
                  </li>

                  {/* النسخة الاحتياطية */}
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                    <Link to="/backup" className="flex gap-3 items-center group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-purple-500 transition-transform group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                      </svg>
                      <span className="transition-colors group-hover:text-purple-500">{lang === "en" ? "Backup" : "نسخة احتياطية"}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>
              <h3 className="font-bold text-lg">
                {lang == "ar" ? "مذكرات عشوائية" : "Random Notes"}
              </h3>
            </div>
            {randomNotes.length > 0 ? (
              <div className="space-y-3">
                {randomNotes.map((note) => (
                  <Link
                    key={note.id}
                    to={`/note/${note.id}`}
                    className="block text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                          {note.title || (lang === "en" ? "Untitled" : "بدون عنوان")}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                          {note.note}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === "en"
                  ? "No notes available yet"
                  : "لا توجد مذكرات متاحة بعد"}
              </p>
            )}
          </div>
        </div>
        <div className="text-center pt-6 border-t dark:border-gray-700 ">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center justify-center">
            <span>{lang == "en" ? "Made with   " : "صنع بكل   "}</span>
            <span>
              <svg
                className="w-6 h-6 text-red-600 animate-ping"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
              </svg>
            </span>
            <span>{lang == "en" ? "by" : "بواسطة"}</span>
            <span className="text-black dark:text-white font-extrabold">
              {lang == "en" ? "Mo3bassia" : "محمد عباسية"}
            </span>
            <div className="flex gap-1 items-center">
              <a
                className="p-1 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                href="https://github.com/Mo3bassia"
                target="_blank"
              >
                <svg
                  className="w-6 h-6 inline-block text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" />
                </svg>
              </a>
              <a
                className="p-1 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                href="https://www.linkedin.com/in/mohamed-abassia-21b06232a/"
                target="_blank"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
