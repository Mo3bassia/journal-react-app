import { useEffect } from "react";
import { Link } from "react-router-dom";
function Home({ lang, setSelected }) {
  useEffect(function () {
    setSelected("");
  }, []);
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mt-5 bg-white border border-gray-100 dark:border-gray-700 dark:bg-[#232936] w-[700px] max-w-full rounded-lg shadow-xl p-6 mx-auto text-center">
        <div className="my-5 mt-2 relative bg-blue-500/10 w-32 mx-auto h-32 flex items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-16 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-3 font-bold">
          {lang == "en" ? "Start your journey" : "ابدأ رحلتك"}
        </p>
        <p className="text-gray-600 dark:text-gray-400 my-2 leading-loose">
          {lang == "en"
            ? "Your digital diary awaits. Begin capturing your thoughts, memories, and experiences"
            : "مذكراتك الرقمية في انتظارك. ابدأ بتسجيل أفكارك وذكرياتك وتجاربك"}
        </p>
        <Link
          to="/add"
          className="my-3 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
              flex gap-2 transition-colors rounded-lg text-white font-medium font-arabic "
        >
          <span>{lang == "en" ? "Create a note" : "انشئ مذكرة الآن"} </span>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg">
            <h3 className="font-bold my-2">
              {lang == "en" ? "Always Available" : "متاح دائماً"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {lang == "en"
                ? "Access your notes anytime, anywhere."
                : "يمكنك الوصول إلى مذكراتك في أي وقت وأي مكان"}
            </p>
          </div>
          <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg">
            <h3 className="font-bold my-2">
              {lang == "en" ? "Easy to Use" : "سهل الاستخدام"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {lang == "en"
                ? "Simple interface to focus on what matters - your writing."
                : "واجهة بسيطة تركز على ما يهم - كتاباتك"}
            </p>
          </div>
          <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg">
            <h3 className="font-bold my-2">
              {lang == "en" ? "Private & Secure" : "خاص وآمن"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {lang == "en"
                ? "Your thoughts stay yours, protected and private."
                : "أفكارك تبقى خاصة، محمية وآمنة"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
