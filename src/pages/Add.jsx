import { useState } from "react";
import MoodTabs from "../components/MoodTabs";

function Add({ lang }) {
  const [mood, setMood] = useState("");

  return (
    <div className="container mx-auto mt-9 px-4">
      <h2 className="text-3xl lg:text-4xl xl:text-5xl block font-medium text-gray-900 dark:text-white mb-5 md:mb-8">
        {lang == "en" ? "💬 Write your notes here..." : "💬 أدخل الملاحظة..."}
      </h2>
      <form>
        <div className="my-6">
          <label
            htmlFor="title"
            className="text-lg md:text-xl lg:text-2xl  block font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4"
          >
            {lang == "en" ? "📝 Title..." : "📝 العنوان..."}
          </label>
          <input
            type="text"
            id="title"
            className=" outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={
              lang == "en"
                ? " A New Day: Thoughts and Events"
                : " يوميات يوم جديد: أفكار وأحداث"
            }
            required
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="category"
            className="text-lg md:text-xl lg:text-2xl  block font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4"
          >
            {lang == "en" ? " 📂 Category..." : " 📂 التصنيف ..."}
          </label>
          <input
            type="text"
            id="category"
            className=" outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={
              lang == "en"
                ? " Select a category: Work, Study, Personal Life, Mood"
                : " اختر التصنيف: عمل، دراسة، حياة شخصية، مشاعر "
            }
            required
          />
        </div>
        <div className="my-6">
          <label className="text-lg md:text-xl lg:text-2xl  block font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
            {lang == "en" ? " 💭 Mood..." : " 💭 المزاج  ..."}
          </label>
          <MoodTabs lang={lang} mood={mood} setMood={setMood} />
        </div>
        <button
          type="submit"
          className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:ring-0 focus:outline-none p-2.5 dark:bg-blue-400 dark:text-white px-5 py-2 mx-auto block mt-4"
          onClick={(e) => e.preventDefault()}
        >
          {lang == "en" ? "add ➕" : "اضافة ➕"}
        </button>
      </form>
    </div>
  );
}

export default Add;
