import { useEffect, useRef, useState } from "react";
import MoodTabs from "../components/MoodTabs";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { moods } from "../App";

function Add({ lang, setSelected, setNotes }) {
  useEffect(function () {
    setSelected("Add");
    window.scrollTo(0, 0);
  }, []);

  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const form = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const timeForMsg = 5000;

  useEffect(() => {
    let timeoutId;
    if (success) {
      timeoutId = setTimeout(() => {
        setSuccess("");
      }, timeForMsg);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [success]);

  useEffect(() => {
    let timeoutId;
    if (error) {
      timeoutId = setTimeout(() => {
        setError("");
      }, timeForMsg);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error]);

  useEffect(() => {
    document.title = `${
      lang == "en" ? "Journal | Add a note" : "يومياتي | إضافة مذكرة"
    }`;
  }, [lang]);

  function handleAdd(e) {
    e.preventDefault();
    const inputs = form.current.querySelectorAll("input[type=text], textarea");
    const date = new Date();

    inputs.forEach((input, index) => {
      if (input.required) {
        if (input.value) {
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

          setCategory("");
          setNote("");
          setTitle("");
          inputs[0].focus();
          setNotes((n) => {
            const newObj = {
              id: n.length + 1,
              title:
                title == ""
                  ? lang == "en"
                    ? "No title"
                    : "بدون عنوان"
                  : title,
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
              date: date.toLocaleDateString("en-US"),
              time: date.toLocaleTimeString("en-US"),
            };
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
        }
      }
    });
  }

  return (
    <>
      {success}
      {error}
      <div className="container mx-auto mt-9 px-4 animate-fade-in-up opacity-0">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl block font-medium text-gray-900 dark:text-white mb-5 md:mb-8">
          {lang == "en" ? " Write your notes here..." : " أدخل الملاحظة..."}
        </h2>
        <form ref={form}>
          <div className="my-6">
            <label
              htmlFor="title"
              className="text-lg md:text-xl lg:text-2xl  font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
            >
              <span>{lang == "en" ? " Title..." : " العنوان..."}</span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
              </span>
            </label>
            <input
              type="text"
              id="title"
              className=" outline-none bg-white border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <span>
                {lang == "en" ? " Category..." : " التصنيف ..."}
              </span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
              </span>
            </label>
            <input
              type="text"
              id="category"
              className=" outline-none bg-white border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <span>{lang == "en" ? " Note..." : " الملاحظة..."}</span>
              <span className="text-sm">
                {lang == "en" ? "(required)" : "(اجباري)"}
                <span className="text-red-600"> *</span>
              </span>
            </label>
            <textarea
              type="text"
              id="Note"
              className="min-h-28 outline-none bg-white border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <span>{lang == "en" ? " Mood..." : " المزاج  ..."}</span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
              </span>
            </label>
            <MoodTabs lang={lang} mood={mood} setMood={setMood} />
          </div>
          <button
            type="submit"
            className="text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white mt-5 mx-auto"
            onClick={(e) => handleAdd(e)}
          >
            {lang == "en" ? "add " : "اضافة "}
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
