const Modal = ({
  toggleModal,
  isOpen,
  children,
  modalTitle,
  handleEdit,
  lang,
}) => {
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900  bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className={`bg-slate-100 dark:bg-slate-800 dark:text-slate-100 rounded-lg shadow-lg p-6 w-[400px] transform transition-transform duration-300 ${
              isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
            {children}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Field 1</label>
              <input
                type="text"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter something..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Field 2</label>
              <input
                type="text"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter something..."
              />
            </div> */}
            <div className="flex justify-end space-x-4 gap-3">
              <button
                onClick={toggleModal}
                className="bg-red-600/70 hover:bg-red-600/80 text-white  px-4 py-2 rounded-lg"
              >
                {lang == "en" ? "Save" : "إلغاء"}
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-800 flex gap-2 px-6 py-3 rounded-lg text-white"
              >
                {lang == "en" ? "Save" : "حفظ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
