import { useEffect, useState, useRef } from "react";
import { convertDate } from "../App";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import MoodTabs from "./MoodTabs";
import { moods } from "../App";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";

function SingleNote({ lang, note, setSelected, notes, setNotes }) {
  const navigate = useNavigate();

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
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef(null);
  const [mood, setMood] = useState("");
  const [titleTxt, setTitle] = useState("");
  const [categoryTxt, setCategory] = useState("");
  const [noteVal, setNote] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const timeForMsg = 5000;

  useEffect(function () {
    setSelected("");
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setTitle(title);
    setNote(noteTxt);
    setCategory(category);
    setMood(emoji);
  };

  function handleRemove() {
    let index = notes.indexOf(note);

    let editedNotes = notes.slice().filter((_, i) => i !== index);
    editedNotes.map((n, i) => {
      n.id = i + 1;
    });
    setNotes(editedNotes);
    console.log(
      location.pathname.slice("/")[location.pathname.slice("/").length - 1]
    );
    if (
      location.pathname.slice("/")[location.pathname.slice("/").length - 1] >
        editedNotes.length &&
      editedNotes.length != 0
    ) {
      navigate(`/note/${editedNotes.length}`);
    } else if (editedNotes.length == 0) {
      navigate(`/add/`);
    }
    setError(
      <ErrorAlert
        lang={lang}
        title={lang == "en" ? "Note Removed." : "تم الحذف!"}
        message={
          lang == "en"
            ? "You have successfully removed this note."
            : "لقد قمت بحذف هذه المذكرة!"
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

  function handleEdit() {
    let index = notes.indexOf(note);
    let editedNote = notes[notes.indexOf(note)];
    let date = new Date();

    editedNote.title = titleTxt;
    editedNote.category = categoryTxt;
    editedNote.note = noteVal;
    editedNote.emoji = mood;
    editedNote.title = titleTxt;
    console.log(category, categoryTxt);
    console.log(note, noteVal);
    console.log(title, titleTxt);
    if (
      category !== categoryTxt ||
      noteTxt !== noteVal ||
      title != titleTxt ||
      mood != emoji
    ) {
      editedNote.lastEditDate = date.toLocaleDateString();
      editedNote.lastEditTime = date.toLocaleTimeString();

      setSuccess(
        <SuccessAlert
          lang={lang}
          title={lang == "en" ? "Edited Successfully." : "تمت التعديل بنجاح!"}
          message={
            lang == "en"
              ? "You have successfully edited this note."
              : "لقد قمت بتعديل هذه المذكرة!"
          }
          timeForMsg={timeForMsg}
        />
      );
      if (!success) {
        setTimeout(() => {
          setSuccess("");
        }, timeForMsg);
      }
    }
    editedNote.moodAr = Object.values(moods["ar"])
      .map((m, index) => {
        if (m == mood) {
          return Object.keys(moods["ar"])[index];
        }
      })
      .filter((m) => m != null)[0];
    editedNote.moodEn = Object.values(moods["en"])
      .map((m, index) => {
        if (m == mood) {
          return Object.keys(moods["en"])[index];
        }
      })
      .filter((m) => m != null)[0];
    let newNotes = notes.slice();
    newNotes[index] = editedNote;
    console.log(newNotes);
    setNotes(newNotes);
    setIsOpen((i) => !i);
  }

  return (
    <>
      <div key={id} className="p-4">
        {success}
        {error}
        <div className="my-2 flex justify-between items-center text-gray-600 dark:text-gray-400 mb-5">
          <span>
            {lang == "en"
              ? convertDate(date)[0].toDateString()
              : convertDate(date)[1]}
          </span>
          <span>{time}</span>
        </div>
        <div className="sm:hidden flex items-center justify-between mb-4">
          <div className="flex">
            <button
              onClick={toggleModal}
              className="h-12 flex items-center justify-center w-12 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              className="h-12 flex items-center justify-center w-12 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              onClick={handleRemove}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 cursor-pointer text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <span className="">
            {lang == "en" ? `${moodEn}` : `${moodAr}`}
            <span className="text-2xl"> {emoji}</span>
          </span>
        </div>
        <Modal
          lang={lang}
          toggleModal={toggleModal}
          isOpen={isOpen}
          modalTitle={lang == "en" ? "Edit Note" : "تعديل المذكرة"}
          handleEdit={handleEdit}
        >
          <form ref={form}>
            <div className="my-6">
              <label
                htmlFor="title"
                className="text-lg   font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex items-center justify-between"
              >
                <span>{lang == "en" ? "📝 Title..." : "📝 العنوان..."}</span>
                <span className="text-sm">
                  {lang == "en" ? "(Not required)" : "(اختياري)"}
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
                  {lang == "en" ? "(Not required)" : "(اختياري)"}
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
                  {lang == "en" ? "(Not required)" : "(اختياري)"}
                </span>
              </label>
              <MoodTabs lang={lang} mood={mood} setMood={setMood} />
            </div>
          </form>
        </Modal>

        {title && (
          <h2 className="mb-2 flex items-center justify-between text-gray-900 dark:text-white  font-extrabold">
            <div className="text-3xl md:text-4xl flex items-center gap-2">
              <span>{title}</span>
              <div className="hidden sm:flex">
                <button
                  onClick={toggleModal}
                  className="h-12 flex items-center justify-center w-12 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  className="h-12 flex items-center justify-center w-12 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={handleRemove}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 cursor-pointer text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <span className="hidden sm:block">
              {lang == "en" ? `${moodEn}` : `${moodAr}`}
              <span className="text-2xl"> {emoji}</span>
            </span>
          </h2>
        )}
        {category != "" && (
          <p className="relative mb-6 mt-3">
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
          </p>
        )}
        <p className="text-gray-600 text-lg md:text-xl dark:text-gray-300 mb-4 whitespace-pre-line leading-loose">
          {noteTxt}
        </p>
      </div>
      <div className={`flex justify-center gap-4 flex-row-reverse`}>
        {note.id != notes.length && (
          <Link
            to={`/note/${note.id + 1}`}
            className={`bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white flex-row-reverse`}
          >
            {lang == "en" ? (
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            ) : (
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            )}
            <span>
              {lang == "en"
                ? `Next (${note.id + 1})`
                : `التالي (${note.id + 1}) `}
            </span>
          </Link>
        )}
        {note.id != 1 && (
          <Link
            to={`/note/${note.id - 1}`}
            className={`bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white flex-row-reverse`}
          >
            <span>
              {lang == "en"
                ? `(${note.id - 1}) Previous`
                : `(${note.id - 1}) السابق`}
            </span>
            {lang != "en" ? (
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            ) : (
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            )}
          </Link>
        )}
      </div>
    </>
  );
}

export default SingleNote;
