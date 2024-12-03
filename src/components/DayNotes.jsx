import { convertDate } from "../App";
import Modal from "./Modal";
import Note from "./Note";
import { useState, useRef } from "react";
import MoodTabs from "./MoodTabs";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { moods } from "../App";
import { Link } from "react-router-dom";

function DayNotes({ uniqueDate, lang, notesOfDate, setNotes, notes, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState("");
  const [titleTxt, setTitle] = useState("");
  const [categoryTxt, setCategory] = useState("");
  const [noteVal, setNote] = useState("");
  const form = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const timeForMsg = 5000;

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setTitle("");
    setNote("");
    setCategory("");
    setMood("");
  };

  function handleEdit() {
    const inputs = form.current.querySelectorAll("input[type=text], textarea");

    inputs.forEach((input, index) => {
      if (input.required) {
        if (input.value) {
          let date = new Date(uniqueDate);
          const lastId = notes.length > 0 
            ? Math.max(...notes.map(n => n.id))
            : 0;
          
          let editedNote = {
            id: lastId + 1,
            title: titleTxt,
            category: categoryTxt,
            note: noteVal,
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
            time: new Date().toLocaleTimeString("en-US"),
            addedLater:
              new Date().toLocaleDateString("en-US") !=
              new Date(uniqueDate).toLocaleDateString("en-US"),
          };
          let editedNotes = [...notes];
          const insertIndex = editedNotes.findIndex(n => n.date === uniqueDate);
          if (insertIndex === -1) {
            editedNotes.push(editedNote);
          } else {
            editedNotes.splice(insertIndex, 0, editedNote);
          }
          
          setNotes(editedNotes);
          setIsOpen((i) => !i);

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

  notesOfDate.reverse().sort((a, b) => b.id - a.id);

  // console.log(notesOfDate);
  return (
    <>
      {success}
      {error}
      {notesOfDate.length != 0 && (
        <div
          key={uniqueDate}
          className="animate-fade-in-up opacity-0 space-y-5 border p-4 py-6 rounded-xl dark:bg-transparent bg-gray-50 border-gray-300 dark:border-gray-700"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 ">
            <Link
              className="hover:text-slate-500 dark:hover:text-gray-400"
              to={`/notes/${uniqueDate.split("/").join("-")}`}
            >
              {lang == "en"
                ? convertDate(uniqueDate)[0].toDateString()
                : convertDate(uniqueDate)[1]}
            </Link>
          </h2>
          {notesOfDate.map((note) => {
            return (
              <Note
                key={note.id}
                note={note}
                lang={lang}
                notes={notes}
                isDark={isDark}
              />
            );
          })}
          <button
            onClick={toggleModal}
            className="border-2 border-blue-600 hover:bg-blue-600 flex gap-2 px-6 py-3 rounded-lg text-slate-800 hover:text-white dark:text-white mx-auto transition-colors"
          >
            {lang == "en" ? "Add More" : "إضافة المزيد"}
          </button>
        </div>
      )}
      <Modal
        lang={lang}
        toggleModal={toggleModal}
        isOpen={isOpen}
        modalTitle={lang == "en" ? "Add Note" : "إضافة مذكرة"}
        handleEdit={handleEdit}
        cancelButton={lang == "en" ? "Cancel" : "إلغاء"}
        confirmButton={lang == "en" ? "Save" : "حفظ"}
      >
        <form ref={form}>
          <div className="my-6">
            <label
              htmlFor="title"
              className="text-lg   font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
            >
              <span>{lang == "en" ? "📝 Title..." : "📝 العنوان..."}</span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
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
              value={titleTxt}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label
              htmlFor="category"
              className="text-lg  font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
            >
              <span>
                {lang == "en" ? " 📂 Category..." : " 📂 التصنيف ..."}
              </span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
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
              value={categoryTxt}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label
              htmlFor="Note"
              className="text-lg  flex font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 items-center justify-between"
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
              className="min-h-40 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              placeholder={
                lang == "en"
                  ? " Add your note here"
                  : "اكتب ملاحظاتك أو أفكارك هنا"
              }
              value={noteVal}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="text-lg md:text-xl lg:text-2xl flex font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 items-center justify-between">
              <span>{lang == "en" ? " 💭 Mood..." : " 💭 المزاج  ..."}</span>
              <span className="text-sm">
                {lang == "en" ? "(Optional)" : "(اختياري)"}
              </span>
            </label>
            <MoodTabs lang={lang} mood={mood} setMood={setMood} />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DayNotes;
