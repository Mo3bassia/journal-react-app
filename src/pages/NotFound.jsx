import { Link } from "react-router-dom";
function NotFound({ lang }) {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mt-5 bg-white border border-gray-100 dark:border-gray-700 dark:bg-[#232936] w-[400px] max-w-full rounded-lg shadow-xl p-6 mx-auto text-center">
        <div className="my-5 relative bg-blue-500/10 w-32 mx-auto h-32 flex items-center justify-center rounded-full">
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
            className="mx-auto w-16 h-16 text-blue-500 relative z-10"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <h1
            className="text-[120px] top-1/2 -translate-y-1/2 z-[0] font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 absolute"
          >
            {lang == "en" ? "404" : "٤٠٤"}
          </h1>
        </div>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-3 font-bold">
          {lang == "en" ? "Page Not Found" : "الصفحة غير موجودة"}
        </p>
        <p className="text-gray-600 dark:text-gray-400 my-2 leading-loose">
          {lang == "en"
            ? "Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist"
            : "يبدو أنك وصلت إلى منطقة غير موجودة. الصفحة التي تبحث عنها غير متوفرة."}
        </p>
        <Link
          to="/"
          className="my-3 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
              transition-colors rounded-lg text-white font-medium font-arabic flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className=" w-5 h-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>{lang == "en" ? "Back Home" : "العودة للرئيسية"}</span>
        </Link>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
