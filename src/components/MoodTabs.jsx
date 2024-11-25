import { moods } from "../App";
function MoodTabs({ lang, mood, setMood }) {
  const handleChange = (event) => {
    setMood(event.target.value);
  };

  const usedMoodsType = Object.keys(moods[lang]);
  const usedMoodsEmoji = Object.values(moods[lang]);

  return (
    <div
      className="radio-inputs flex flex-wrap rounded-lg box-border shadow-lg text-gray-900
    dark:bg-gray-800 
    dark:text-white dark:shadow-md p-1 mx-auto my-3 text-base md:text-xl gap-2 max-w-[500px]"
    >
      {usedMoodsEmoji.map((emoji, index) => {
        return (
          <label
            key={usedMoodsType[index]}
            className="radio flex-1 text-center relative group"
          >
            <input
              type="radio"
              name="radio"
              value={emoji}
              checked={mood === emoji}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`name cursor-pointer flex items-center justify-center rounded-lg py-2 px-0 
            ${
              mood === emoji
                ? "bg-blue-500 text-white font-semibold dark:bg-blue-800 dark:text-white"
                : "text-gray-800 dark:text-gray-300"
            } 
            transition-all ease-in-out`}
            >
              {emoji}
            </span>

            {/* Tooltip */}
            <div
              className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 
          sm:text-base sm:px-2 sm:py-1 md:text-lg md:px-3 md:py-2 lg:text-base lg:px-4 lg:py-3 pointer-events-none"
            >
              {usedMoodsType[index]}
            </div>
          </label>
        );
      })}
    </div>
  );
}

export default MoodTabs;
