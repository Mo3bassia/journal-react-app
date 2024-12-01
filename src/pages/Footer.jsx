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
            </div>
            <ul className="space-y-2">
              <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer ">
                <Link to="/" className="flex gap-2">
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
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>

                  {lang == "en" ? "Home" : "الرئيسية"}
                </Link>
              </li>
              <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer">
                <Link to="/add" className="flex gap-2">
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
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>

                  {lang == "en" ? "Add" : "إضافة"}
                </Link>
              </li>
              {notes.length > 0 && (
                <>
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer flex gap-2">
                    <Link to="/notes" className="flex gap-2">
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
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      {lang == "en" ? "Notes" : "مذكراتي"}
                    </Link>
                  </li>
                  <li className="text-sm opacity-80 hover:opacity-100 cursor-pointer flex gap-2">
                    <Link to="/pinned" className="flex gap-2">
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
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      {lang == "en" ? "Pinned" : "المثبتة"}
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
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <h3 className="font-bold text-lg">
                {lang == "en" ? "Random notes" : "مذكرات عشوائية"}
              </h3>
            </div>
            <ul className="space-y-2">
              {randomNotes.length != 0 ? (
                randomNotes.map((note) => {
                  return (
                    <li
                      key={`link-${note.id}`}
                      className="text-sm opacity-80 hover:opacity-100 cursor-pointer"
                    >
                      <Link to={`/note/${note.id}`}>{note.title}</Link>
                    </li>
                  );
                })
              ) : (
                <p className="opacity-70">
                  {lang == "en" ? "No notes available" : "لا توجد مذكرات"}
                </p>
              )}
            </ul>
          </div>
        </div>
        <div className="text-center pt-6 border-t dark:border-gray-700 ">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span>
              {lang == "en" ? "Made with ❤️ by  " : "صنع بكل ❤️ بواسطة  "}
            </span>
            <span className="text-black dark:text-white font-extrabold">
              {lang == "en" ? "Mo3bassia" : "محمد عباسية"}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
