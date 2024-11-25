import { useEffect, useRef, useState } from "react";
import MoodTabs from "../components/MoodTabs";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { moods } from "../App";

function Add({ lang, setNotes }) {
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const form = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  let check = false;
  const timeForMsg = 5000;

  function handleAdd(e) {
    e.preventDefault();
    const inputs = form.current.querySelectorAll("input[type=text], textarea");
    const date = new Date();

    inputs.forEach((input, index) => {
      if (input.required) {
        if (input.value) {
          setNotes((n) => {
            setSuccess(
              <SuccessAlert
                lang={lang}
                title={
                  lang == "en" ? "Successfully Added." : "تمت الإضافة بنجاح!"
                }
                message={
                  lang == "en"
                    ? "You have successfully added your note."
                    : "لقد قمت بالتو بإضافة مذكرات اخري!"
                }
                timeForMsg={timeForMsg}
              />
            );
            if (!success) {
              setTimeout(() => {
                setSuccess("");
              }, timeForMsg);
            }

            const newObj = {
              id: n.length + 1,
              title,
              category,
              note: note,
              emoji: mood,
              moodAr: Object.values(moods["ar"])
                .map((m, index) => {
                  if (m == mood) {
                    return Object.keys(moods["ar"])[index];
                  }
                })
                .filter((m) => m != null)[0],
              moodEn: Object.values(moods["en"])
                .map((m, index) => {
                  if (m == mood) {
                    return Object.keys(moods["en"])[index];
                  }
                })
                .filter((m) => m != null)[0],
              date: date.toLocaleDateString(),
              time: date.toLocaleTimeString(),
            };

            setCategory("");
            setNote("");
            setTitle("");
            inputs[0].focus();
            return [...n, newObj];
          });
        } else {
          setError(
            <ErrorAlert
              lang={lang}
              title={
                lang == "en" ? "Failed to Add Note." : "فشلت الاضافة للمذكرة."
              }
              message={
                lang == "en"
                  ? "Please fill out all required fields."
                  : "يرجى ملء الحقول المطلوبة."
              }
              timeForMsg={timeForMsg}
            />
          );
          if (!error) {
            setTimeout(() => {
              setError("");
            }, timeForMsg);
          }
        }
      }
    });
  }

  return (
    <div className="container mx-auto mt-9 px-4">
      {success}
      {error}
      <h2 className="text-3xl lg:text-4xl xl:text-5xl block font-medium text-gray-900 dark:text-white mb-5 md:mb-8">
        {lang == "en" ? "💬 Write your notes here..." : "💬 أدخل الملاحظة..."}
      </h2>
      <form ref={form}>
        <div className="my-6">
          <label
            htmlFor="title"
            className="text-lg md:text-xl lg:text-2xl  font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
          >
            <span>{lang == "en" ? "📝 Title..." : "📝 العنوان..."}</span>
            <span className="text-sm">
              {lang == "en" ? "(Not required)" : "(غير اجباري)"}
            </span>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="category"
            className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
          >
            <span>{lang == "en" ? " 📂 Category..." : " 📂 التصنيف ..."}</span>
            <span className="text-sm">
              {lang == "en" ? "(Not required)" : "(غير اجباري)"}
            </span>
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="Note"
            className="text-lg md:text-xl lg:text-2xl flex font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 items-center justify-between"
          >
            <span>{lang == "en" ? "✍️ Note..." : "✍️ الملاحظة..."}</span>
            <span className="text-sm">
              {lang == "en" ? "(required)" : "(اجباري)"}
              <span className="text-red-600"> *</span>
            </span>
          </label>
          <textarea
            type="text"
            id="Note"
            className="min-h-28 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
            placeholder={
              lang == "en"
                ? " Add your note here"
                : "اكتب ملاحظاتك أو أفكارك هنا"
            }
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="my-6">
          <label className="text-lg md:text-xl lg:text-2xl flex font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 items-center justify-between">
            <span>{lang == "en" ? " 💭 Mood..." : " 💭 المزاج  ..."}</span>
            <span className="text-sm">
              {lang == "en" ? "(Not required)" : "(غير اجباري)"}
            </span>
          </label>
          <MoodTabs lang={lang} mood={mood} setMood={setMood} />
        </div>
        <button
          type="submit"
          className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:ring-0 focus:outline-none p-2.5 dark:bg-blue-400 transition-colors dark:focus:bg-blue-600 dark:text-white px-5 py-2 mx-auto block mt-4"
          onClick={(e) => handleAdd(e)}
        >
          {lang == "en" ? "add ➕" : "اضافة ➕"}
        </button>
      </form>
    </div>
  );
}

export default Add;