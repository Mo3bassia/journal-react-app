import { moods } from "../App";

function MoodTabs({ lang, mood, setMood }) {
  const handleChange = (event) => {
    setMood(event.target.value);
  };

  const usedMoodsType = Object.keys(moods[lang]);
  const usedMoodsEmoji = Object.values(moods[lang]);

  return (
    <div className="grid grid-cols-8 sm:grid-cols-10 gap-1 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm max-w-xl mx-auto">
      {usedMoodsEmoji.map((emoji, index) => (
        <label
          key={usedMoodsType[index]}
          className="relative group"
        >
          <input
            type="radio"
            name="radio"
            value={emoji}
            checked={mood === emoji}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`cursor-pointer aspect-square flex items-center justify-center rounded-md transition-all ${
              mood === emoji
                ? "bg-blue-100 dark:bg-blue-900 scale-105"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="text-lg">{emoji}</span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-3 py-1.5 bg-black/75 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            {usedMoodsType[index]}
          </div>
        </label>
      ))}
    </div>
  );
}

export default MoodTabs;
