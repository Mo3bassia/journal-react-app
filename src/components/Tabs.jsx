import { useState } from "react";
import { NavLink } from "react-router-dom";

function Tabs({ lang, selected, setSelected }) {
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div className="radio-inputs flex flex-wrap rounded-lg box-border shadow-lg dark:shadow-slate-800 dark:shadow-md p-1 max-w-[300px] text-sm mx-auto my-7">
      <NavLink
        to="/add"
        className="radio flex-1 text-center w-28 sm:w-32"
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
        className="radio flex-1 text-center w-28 sm:w-32"
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
    </div>
  );
}

export default Tabs;
