import { useEffect, useState, useRef } from "react";
import { convertDate } from "../App";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import MoodTabs from "./MoodTabs";
import { moods } from "../App";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";
import { colors } from "../App";

function SingleNote({ lang, note, setSelected, notes, setNotes, isDark }) {
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
    lastEditDate,
    lastEditTime,
    addedLater,
    pinned,
  } = note;

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const form = useRef(null);
  const [mood, setMood] = useState("");
  const [titleTxt, setTitle] = useState("");
  const [categoryTxt, setCategory] = useState("");
  const [noteVal, setNote] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const timeForMsg = 5000;

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

  useEffect(
    function () {
      setSelected("");
      // console.log(title);
      // if (lang == "en") {
      if (title) {
        if (lang == "en") {
          document.title = "Note | " + title;
        } else {
          document.title = "مذكرة | " + title;
        }
      } else {
        if (lang == "en") {
          document.title = "Journal | Note " + id;
        } else {
          document.title = "يومياتي | مذكرة " + id;
        }
      }
      // }
    },
    [lang]
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setTitle(title);
    setNote(noteTxt);
    setCategory(category);
    setMood(emoji);
  };

  const toggleModalDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  function handleRemove() {
    let index = notes.indexOf(note);

    let editedNotes = notes.slice().filter((_, i) => i !== index);
    editedNotes.map((n, i) => {
      n.id = i + 1;
    });
    setNotes(editedNotes);
    // console.log(
    //   location.pathname.slice("/")[location.pathname.slice("/").length - 1]
    // );
    console.log(editedNotes.length);
    console.log(location.pathname.slice("/"));
    console.log(
      location.pathname.split("/")[location.pathname.split("/").length - 1]
    );
    if (
      location.pathname.split("/")[location.pathname.split("/").length - 1] >
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

  function handleCheckRemove() {
    setIsDeleteOpen(false);
    handleRemove();
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
    // console.log(category, categoryTxt);
    // console.log(note, noteVal);
    // console.log(title, titleTxt);
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
    // console.log(newNotes);
    setNotes(newNotes);
    setIsOpen((i) => !i);
  }

  function handlePin() {
    let index = notes.indexOf(note);
    let editedNote = notes[index];
    editedNote.pinned = !editedNote.pinned;
    let newNotes = notes.slice();
    newNotes[index] = editedNote;
    setNotes(newNotes);
  }

  return (
    <>
      <Modal
        lang={lang}
        toggleModal={toggleModal}
        isOpen={isOpen}
        modalTitle={lang == "en" ? "Edit Note" : "تعديل المذكرة"}
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
      <Modal
        lang={lang}
        toggleModal={toggleModalDelete}
        isOpen={isDeleteOpen}
        modalTitle={
          lang == "en" ? "Confirm delete note!" : "!تأكيد حذف المذكرة"
        }
        handleEdit={handleCheckRemove}
        cancelButton={lang == "en" ? "Cancel" : "إلغاء"}
        confirmButton={lang == "en" ? "Delete" : "حذف"}
      >
        <p className="my-4 text-base md:text-lg lg:text-xl">
          {lang == "en"
            ? "Are you sure you want to delete this note?"
            : "هل أنت متأكد من حذف هذه المذكرة؟"}
        </p>
      </Modal>
      {success}
      {error}
      <div
        key={id}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-4 animate-fade-in-up opacity-0"
      >
        <div className="text-gray-900 dark:text-white border-b dark:border-gray-700 pb-6">
          <div className=" gap-2 flex items-center justify-between mt-2">
            <span className="leading-medium text-3xl md:text-4xl font-extrabold">
              {title != ""
                ? title
                : `${lang == "en" ? "Without title" : "بدون عنوان"}`}
            </span>
            <div className="flex">
              <button
                className={`p-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  pinned ? "text-blue-500" : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={handlePin}
              >
                {!pinned ? (
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
                    className="size-6 cursor-pointer"
                  >
                    <line x1="12" x2="12" y1="17" y2="22"></line>
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                  </svg>
                ) : (
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
                    className="size-6"
                  >
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                    <line x1="12" x2="12" y1="17" y2="22"></line>
                    <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"></path>
                    <path d="M15 9.34V6h1a2 2 0 0 0 0-4H7.89"></path>
                  </svg>
                )}
              </button>
              <button
                onClick={toggleModal}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                onClick={toggleModalDelete}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap mt-4 items-center text-gray-600 dark:text-gray-400">
            <span className="flex gap-2 ">
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
            </span>
            <span className="flex gap-2">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              {time}
            </span>
            {lastEditDate && (
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>

                <span>{lang == "en" ? "Edited at " : "تم التعديل في "}</span>
                <span>
                  {lastEditDate} - {lastEditTime}
                </span>
              </div>
            )}
            {addedLater && (
              <span className="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow inline-flex font-normal">
                {lang == "en" ? "Added later" : "أُضيف لاحقًا"}
              </span>
            )}

            {emoji && (
              <span className="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow inline-flex font-normal">
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
                          className={`text-xs md:text-sm text-gray-700 w-fit flex items-center gap-2 dark:text-gray-300 rounded-md px-3 py-1 shadow-sm border`}
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
        </div>
        <p
          className={`text-gray-600 text-lg lg:text-xl ${
            notes.length == 1 ? "" : "border-b pb-6"
          } ${
            lang == "en" ? "ml-3" : "mr-3"
          }  dark:border-gray-700 pt-6  md:text-xl dark:text-gray-300  whitespace-pre-line leading-loose`}
        >
          {noteTxt}
        </p>
        {
          <div
            className={`flex justify-between items-center flex-row-reverse pt-6 pb-3 ${
              notes.length == 1 && "hidden"
            }`}
          >
            {note.id != notes.length && (
              <Link
                to={`/note/${note.id + 1}`}
                className={` flex gap-2 items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-row-reverse`}
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
                className={` flex gap-2 items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-row-reverse`}
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
        }
      </div>
    </>
  );
}

export default SingleNote;
