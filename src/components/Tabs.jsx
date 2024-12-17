import { useState } from "react";
import { NavLink } from "react-router-dom";

function Tabs({ lang, selected, setSelected }) {
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div className="radio-inputs flex flex-wrap justify-center gap-2 rounded-lg box-border shadow-lg dark:shadow-slate-800 dark:shadow-md p-2 max-w-full sm:max-w-[600px] text-xs sm:text-sm mx-auto my-7">
      <NavLink
        to="/add"
        className="radio flex-1 text-center min-w-[80px] sm:min-w-[100px]"
        onClick={() => setSelected("Add")}
      >
        <label className="">
          <input
            type="radio"
            name="radio"
            value={"Add"}
            checked={selected === "Add"}
            onChange={handleChange}
            className="hidden"
          />
          <span
            className={`name cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
              ${
                selected === "Add"
                  ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                  : "text-gray-800 dark:text-gray-300"
              } 
              transition-all ease-in-out`}
          >
            {lang == "en" ? "Add" : "اضافة"}
          </span>
        </label>
      </NavLink>

      <NavLink
        to="/notes"
        className="radio flex-1 text-center min-w-[80px] sm:min-w-[100px]"
        onClick={() => setSelected("Notes")}
      >
        <label className="radio flex-1 text-center">
          <input
            type="radio"
            name="radio"
            value={"Notes"}
            checked={selected === "Notes"}
            onChange={handleChange}
            className="hidden"
          />
          <span
            className={`name cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
              ${
                selected === "Notes"
                  ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                  : "text-gray-800 dark:text-gray-300"
              } 
              transition-all ease-in-out`}
          >
            {lang == "en" ? "Notes" : "مذكراتي"}
          </span>
        </label>
      </NavLink>
      <NavLink
        to="/pinned"
        className="radio flex-1 text-center min-w-[80px] sm:min-w-[100px]"
        onClick={() => setSelected("Pinned")}
      >
        <label className="radio flex-1 text-center">
          <input
            type="radio"
            name="radio"
            value={"Pinned"}
            checked={selected === "Pinned"}
            onChange={handleChange}
            className="hidden"
          />
          <span
            className={`name cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
              ${
                selected === "Pinned"
                  ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                  : "text-gray-800 dark:text-gray-300"
              } 
              transition-all ease-in-out`}
          >
            {lang == "en" ? "Pinned" : "المثبتة"}
          </span>
        </label>
      </NavLink>
      <NavLink
        to="/statistics"
        className="radio flex-1 text-center min-w-[80px] sm:min-w-[100px]"
        onClick={() => setSelected("statistics")}
      >
        <label className="radio flex-1 text-center">
          <input
            type="radio"
            name="radio"
            value={"statistics"}
            checked={selected === "statistics"}
            onChange={handleChange}
            className="hidden"
          />
          <span
            className={`name px-2 cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
              ${
                selected === "statistics"
                  ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                  : "text-gray-800 dark:text-gray-300"
              } 
              transition-all ease-in-out`}
          >
            {lang == "en" ? "Statistics" : "الإحصائيات"}
          </span>
        </label>
      </NavLink>
      <NavLink
        to="/backup"
        className="radio flex-1 text-center min-w-[80px] sm:min-w-[100px]"
        onClick={() => setSelected("backup")}
      >
        <label className="radio flex-1 text-center">
          <input
            type="radio"
            name="radio"
            value={"backup"}
            checked={selected === "backup"}
            onChange={handleChange}
            className="hidden"
          />
          <span
            className={`name cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
              ${
                selected === "backup"
                  ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                  : "text-gray-800 dark:text-gray-300"
              } 
              transition-all ease-in-out`}
          >
            {lang == "en" ? "Backup" : "النسخ"}
          </span>
        </label>
      </NavLink>
      

    </div>
  );
}

export default Tabs;
