import  { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  LabelList
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function Statistics({ notes, lang, isDark, setSelected }) {
  useEffect(() => {
    document.title = `${
      lang == "en" ? "Journal | Statistics" : "يومياتي | الإحصائيات"
    }`
    setSelected('statistics');
  }, [lang]);

  // Helper function to get date parts
  const getDateParts = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hour: date.getHours(),
      date: date.getDate(), // يوم الشهر
      fullDate: date,
      rawDate: dateStr // التاريخ الأصلي كما هو
    };
  };

  // General Statistics
  const totalNotes = notes.length;
  const totalWords = notes.reduce((acc, note) => 
    acc + note.note.split(/\s+/).filter(word => word.length > 0).length, 0
  );
  const averageWords = Math.round(totalWords / totalNotes || 0);
  const averageLength = Math.round(
    notes.reduce((acc, note) => acc + note.note.length, 0) / totalNotes || 0
  );
  const notesWithTitles = notes.filter((note) => note.title).length;
  const longestNote = Math.max(...notes.map(note => note.note.length));
  const shortestNote = Math.min(...notes.map(note => note.note.length));

  // Time-based Statistics
  const dayNames = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  };

  const monthNames = {
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    ar: [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ],
  };

  // Notes by Day of Week
  const notesByDay = notes.reduce((acc, note) => {
    const { day } = getDateParts(note.date);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const dayChartData = Array.from({ length: 7 }, (_, i) => ({
    name: dayNames[lang][i],
    count: notesByDay[i] || 0,
  }));

  // Notes by Month
  const notesByMonth = notes.reduce((acc, note) => {
    const { month } = getDateParts(note.date);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthChartData = Array.from({ length: 12 }, (_, i) => ({
    name: monthNames[lang][i],
    count: notesByMonth[i] || 0,
  }));

  // Find most active day with full date
  const notesByFullDate = notes.reduce((acc, note) => {
    const dateStr = note.date.split('T')[0]; // أخذ التاريخ فقط بدون الوقت
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const mostActiveDate = Object.entries(notesByFullDate)
    .reduce((max, [date, count]) => 
      count > max.count ? { date, count } : max,
      { date: '', count: 0 }
    );

  const mostActiveDateParts = mostActiveDate.date ? getDateParts(mostActiveDate.date) : null;

  // Format date function
  const formatDate = (dateParts, lang) => {
    if (!dateParts) return lang === "en" ? "No notes yet" : "لا توجد مذكرات بعد";
    
    if (lang === "en") {
      return `${monthNames.en[dateParts.month]} ${dateParts.date}, ${dateParts.year}`;
    } else {
      return `${dateParts.date} ${monthNames.ar[dateParts.month]} ${dateParts.year}`;
    }
  };

  // Calculate writing frequency
  const calculateWritingFrequency = () => {
    if (notes.length === 0) return { daily: 0, weekly: 0, monthly: 0 };

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const notesInDay = notes.filter(
      note => (now - new Date(note.date)) <= oneDay
    ).length;

    const notesInWeek = notes.filter(
      note => (now - new Date(note.date)) <= oneWeek
    ).length;

    const notesInMonth = notes.filter(
      note => (now - new Date(note.date)) <= oneMonth
    ).length;

    return {
      daily: notesInDay,
      weekly: Math.round(notesInWeek / 7),
      monthly: Math.round(notesInMonth / 30)
    };
  };

  const writingFrequency = calculateWritingFrequency();

  // Calculate writing streak
  const calculateWritingStreak = () => {
    if (notes.length === 0) return 0;
    
    // Get current date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get dates of notes and sort them
    const dates = notes
      .map(note => {
        const date = new Date(note.date);
        date.setHours(0, 0, 0, 0);
        return date.toISOString().split('T')[0];
      })
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b) - new Date(a));

    let streak = 1;
    let currentDate = new Date(dates[0]);

    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i]);
      const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }

    // Check if the streak is still active (last note was today or yesterday)
    const lastNoteDate = new Date(dates[0]);
    const diffFromToday = Math.round((today - lastNoteDate) / (1000 * 60 * 60 * 24));
    
    return diffFromToday <= 1 ? streak : 0;
  };

  // Calculate longest streak
  const calculateLongestStreak = () => {
    if (notes.length === 0) return 0;
    
    // Get dates and sort them
    const dates = notes
      .map(note => {
        const date = new Date(note.date);
        date.setHours(0, 0, 0, 0);
        return date.toISOString().split('T')[0];
      })
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort();
    
    let currentStreak = 1;
    let maxStreak = 1;
    let currentDate = new Date(dates[0]);
    
    for (let i = 1; i < dates.length; i++) {
      const nextDate = new Date(dates[i]);
      const diffDays = Math.round((nextDate - currentDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
      currentDate = nextDate;
    }
    
    return maxStreak;
  };

  const currentStreak = calculateWritingStreak();
  const longestStreak = calculateLongestStreak();

  // Time ranges for better hour grouping
  const getTimeRange = (timeStr) => {
    // Convert time string (e.g. "9:45:24 PM") to hour (0-23)
    const [time, period] = timeStr.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    if (hours >= 0 && hours < 6) return { range: "night", en: "Night (12 AM - 6 AM)", ar: "ليلاً (12 - 6)" };
    if (hours >= 6 && hours < 12) return { range: "morning", en: "Morning (6 AM - 12 PM)", ar: "صباحاً (6 - 12)" };
    if (hours >= 12 && hours < 18) return { range: "afternoon", en: "Afternoon (12 PM - 6 PM)", ar: "ظهراً (12 - 6)" };
    return { range: "evening", en: "Evening (6 PM - 12 AM)", ar: "مساءً (6 - 12)" };
  };

  // Notes by time range
  const notesByTimeRange = notes.reduce((acc, note) => {
    const timeRange = getTimeRange(note.time);
    acc[timeRange.range] = (acc[timeRange.range] || 0) + 1;
    return acc;
  }, {});

  // Convert to array for chart
  const timeRangeData = Object.entries(notesByTimeRange).map(([range, count]) => {
    let timeStr;
    switch (range) {
      case "night":
        timeStr = "3:00 AM"; // Night (12 AM - 6 AM)
        break;
      case "morning":
        timeStr = "9:00 AM"; // Morning (6 AM - 12 PM)
        break;
      case "afternoon":
        timeStr = "3:00 PM"; // Afternoon (12 PM - 6 PM)
        break;
      case "evening":
        timeStr = "9:00 PM"; // Evening (6 PM - 12 AM)
        break;
      default:
        timeStr = "12:00 AM";
    }
    const timeRangeInfo = getTimeRange(timeStr);
    return {
      name: timeRangeInfo[lang],
      count,
      percentage: ((count / totalNotes) * 100).toFixed(1)
    };
  }).sort((a, b) => {
    const order = ["morning", "afternoon", "evening", "night"];
    const aIndex = order.indexOf(Object.keys(notesByTimeRange).find(key => 
      getTimeRange("9:00 AM")[key]?.en === a.name || getTimeRange("9:00 AM")[key]?.ar === a.name
    ));
    const bIndex = order.indexOf(Object.keys(notesByTimeRange).find(key => 
      getTimeRange("9:00 AM")[key]?.en === b.name || getTimeRange("9:00 AM")[key]?.ar === b.name
    ));
    return aIndex - bIndex;
  });

  // Calculate most productive time
  const mostProductiveTime = timeRangeData.reduce((max, current) => 
    current.count > max.count ? current : max,
    { count: 0 }
  );

  // Calculate most productive day
  const mostProductiveDay = dayChartData.reduce((max, current) => 
    current.count > max.count ? current : max,
    { count: 0, name: lang === "en" ? "No data" : "لا توجد بيانات" }
  );

  // Mood Statistics with Emojis
  const moodData = notes.reduce((acc, note) => {
    const mood = lang === "en" ? note.moodEn : note.moodAr;
    const emoji = note.emoji;
    const moodText = mood ? mood : (lang === "en" ? "Unknown" : "غير معروف");
    const key = `${emoji} ${moodText}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const moodChartData = Object.entries(moodData)
    .sort((a, b) => b[1] - a[1])
    .map(([mood, count]) => ({
      name: mood,
      value: count,
      percentage: ((count / totalNotes) * 100).toFixed(1)
    }));

  // Calculate note length distribution
  const calculateNoteLengthDistribution = () => {
    const lengths = notes.map(note => note.note.length);
    const short = lengths.filter(len => len < 100).length;
    const medium = lengths.filter(len => len >= 100 && len < 500).length;
    const long = lengths.filter(len => len >= 500).length;

    return [
      { name: lang === "en" ? "Short (<100)" : "قصيرة (<100)", value: short },
      { name: lang === "en" ? "Medium (100-500)" : "متوسطة (100-500)", value: medium },
      { name: lang === "en" ? "Long (>500)" : "طويلة (>500)", value: long }
    ];
  };

  const noteLengthDistribution = calculateNoteLengthDistribution();

  // Calculate categories distribution
  const categoriesCount = notes.reduce((acc, note) => {
    const category = note.category ? note.category.trim() : '';
    const categoryName = category === '' ? (lang === 'en' ? 'Unknown' : 'غير معروف') : category;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  const categoriesData = Object.entries(categoriesCount)
    .map(([category, count]) => ({
      name: category,
      count,
      percentage: ((count / notes.length) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

  // Calculate most productive time range
  const mostProductiveTimeRange = timeRangeData.reduce((max, current) => 
    current.count > max.count ? current : max,
    { count: 0, name: lang === "en" ? "No data" : "لا توجد بيانات" }
  );

  // Calculate notes status statistics
  const pinnedNotes = notes.filter(note => note.pinned).length;
  const editedNotes = notes.filter(note => note.lastEditDate).length;
  const scheduledNotes = notes.filter(note => note.addedLater).length;

  // Calculate category-mood relationship
  const categoryMoodRelation = notes.reduce((acc, note) => {
    const category = note.category ? note.category.trim() : (lang === 'en' ? 'Unknown' : 'غير معروف');
    const mood = lang === "en" ? note.moodEn : note.moodAr;
    const moodText = mood ? mood : (lang === "en" ? "Unknown" : "غير معروف");
    const key = `${category}-${moodText}`;
    
    if (!acc[key]) {
      acc[key] = {
        category,
        mood: moodText,
        emoji: note.emoji || '😐',
        count: 0
      };
    }
    
    acc[key].count++;
    return acc;
  }, {});

  // Convert to array and group by category
  const categoryMoodAnalysis = Object.values(categoryMoodRelation)
    .reduce((acc, { category, mood, emoji, count }) => {
      if (!acc[category]) {
        acc[category] = {
          category,
          totalNotes: 0,
          moods: []
        };
      }
      
      acc[category].totalNotes += count;
      acc[category].moods.push({
        mood,
        emoji,
        count
      });
      
      return acc;
    }, {});

  // Calculate percentages and sort
  const sortedAnalysis = Object.values(categoryMoodAnalysis)
    .map(cat => ({
      ...cat,
      moods: cat.moods.map(mood => ({
        ...mood,
        percentage: ((mood.count / cat.totalNotes) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
    }))
    .sort((a, b) => b.totalNotes - a.totalNotes);

  return (
    <div className="container opacity-0 animate-fade-in-up mx-auto px-4 py-8 animate-fade-in">
      {/* General Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Most Active Day" : "أكثر يوم نشاطاً"}
          </h3>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 text-right">
            {formatDate(mostActiveDateParts, lang)}
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dayNames[lang][mostActiveDateParts?.day || 0]}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {mostActiveDate.count} {lang === "en" ? "notes" : "مذكرة"}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Most Active Time" : "أكثر وقت نشاطاً"}
          </h3>
          <div className="text-xl font-bold text-orang-600 dark:text-orange-400 text-right">
            {lang === "en" ? mostProductiveTime.name : mostProductiveTime.name}
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mostProductiveTime.count} {lang === "en" ? "notes" : "مذكرة"}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Writing Streak" : "أيام الكتابة المتتالية"}
          </h3>
          <div className="text-xl font-bold text-pink-600 dark:text-pink-400 text-right">
            {currentStreak} {lang === "en" ? "days" : "يوم"}
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {lang === "en" ? "Current streak" : "التتابع الحالي"}
            </div>
          </div>
        </div>
      </div>

      {/* Most Productive Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Total Notes" : "إجمالي المذكرات"}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalNotes}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Average Words" : "متوسط الكلمات"}
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {averageWords}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {lang === "en" ? "Total Words: " : "إجمالي الكلمات: "}{totalWords}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Note Length" : "طول المذكرة"}
          </h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {averageLength}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>{lang === "en" ? "Longest: " : "الأطول: "}{longestNote}</p>
            <p>{lang === "en" ? "Shortest: " : "الأقصر: "}{shortestNote}</p>
          </div>
        </div>
      </div>

      {/* Notes Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Notes Status" : "حالة المذكرات"}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {lang === "en" ? "Pinned" : "المثبتة"}
              </span>
              <span className="text-blue-500 font-semibold">{pinnedNotes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {lang === "en" ? "Edited" : "المعدلة"}
              </span>
              <span className="text-green-500 font-semibold">{editedNotes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {lang === "en" ? "Scheduled" : "المضافة لاحقاً"}
              </span>
              <span className="text-purple-500 font-semibold">{scheduledNotes}</span>
            </div>
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Most Used Moods" : "المشاعر الأكثر استخداماً"}
          </h3>
          <div className="space-y-4">
            {moodChartData.slice(0, 5).map(mood => (
              <div key={mood.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {mood.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">({mood.percentage}%)</span>
                  <span className="bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-md">
                    {mood.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Productive Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Total Notes" : "إجمالي المذكرات"}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalNotes}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Average Words" : "متوسط الكلمات"}
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {averageWords}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {lang === "en" ? "Total Words: " : "إجمالي الكلمات: "}{totalWords}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Note Length" : "طول المذكرة"}
          </h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {averageLength}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>{lang === "en" ? "Longest: " : "الأطول: "}{longestNote}</p>
            <p>{lang === "en" ? "Shortest: " : "الأقصر: "}{shortestNote}</p>
          </div>
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Mood Distribution" : "توزيع المزاج"}
          </h3>
          <div className="h-[300px] dir-ltr" style={{ direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) =>
                    `${name} (${percentage}%)`
                  }
                >
                  {moodChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Mood Breakdown" : "تفصيل المزاج"}
            </h4>
            <div className="space-y-2">
              {moodChartData.map((mood, index) => 
                  {return <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{mood.name || "غير معروف"}</span>
                    <span className="text-gray-600 dark:text-gray-400">{mood.value} ({mood.percentage}%)</span>
                  </div>}
                )}
            </div>
          </div>
        </div>

        {/* Notes by Time Range */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {lang === "en" ? "Notes by Time of Day" : "المذكرات حسب وقت اليوم"}
          </h3>
          <div style={{ direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: isDark ? "#fff" : "#000" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tick={{ fill: isDark ? "#fff" : "#000" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#fff",
                    color: isDark ? "#fff" : "#000",
                    padding: "10px",
                    borderRadius: "4px"
                  }}
                  formatter={(value, name) => [value, lang === "en" ? "Notes" : "مذكرات"]}
                  labelStyle={{
                    marginBottom: "8px"
                  }}
                />
                <Bar dataKey="count" fill="#8884d8">
                  {timeRangeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count > 0 ? "#8884d8" : isDark ? "#374151" : "#e5e7eb"} />
                  ))}
                  <LabelList
                    dataKey="count"
                    position="top"
                    fill={isDark ? "#fff" : "#000"}
                    formatter={(value) => value > 0 ? `${value} ${lang === "en" ? "notes" : "مذكرات"}` : ""}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Notes by Day of Week */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {lang === "en" ? "Notes by Day of Week" : "المذكرات حسب أيام الأسبوع"}
        </h3>
        <div style={{ direction: 'ltr' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fill: isDark ? '#e5e7eb' : '#374151' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: isDark ? '#e5e7eb' : '#374151'
                }}
              />
              <Bar
                dataKey="count"
                fill={isDark ? '#3b82f6' : '#2563eb'}
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="count"
                  position="right"
                  fill={isDark ? '#e5e7eb' : '#374151'}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
          {lang === "en" ? "Notes by Month" : "المذكرات حسب الشهر"}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: isDark ? '#e5e7eb' : '#374151' }}
              />
              <YAxis
                tick={{ fill: isDark ? '#e5e7eb' : '#374151' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: isDark ? '#e5e7eb' : '#374151'
                }}
              />
              <Bar
                dataKey="count"
                fill={isDark ? '#3b82f6' : '#2563eb'}
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  fill={isDark ? '#e5e7eb' : '#374151'}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories and Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {/* Categories Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Categories Distribution" : "توزيع التصنيفات"}
          </h3>
          <div className="space-y-5">
            {categoriesData.map((category) => (
              <div key={category.name} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-base text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                  <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {category.count} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Writing Streaks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Writing Streaks" : "فترات الكتابة المتواصلة"}
          </h3>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="text-center">
              <p className="text-base text-gray-600 dark:text-gray-400 mb-3">
                {lang === "en" ? "Current Streak" : "التتابع الحالي"}
              </p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {currentStreak}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === "en" ? "days" : "يوم"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-base text-gray-600 dark:text-gray-400 mb-3">
                {lang === "en" ? "Longest Streak" : "أطول تتابع"}
              </p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {longestStreak}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === "en" ? "days" : "يوم"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category-Mood Relationship */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
          {lang === "en" ? "Category & Mood Analysis" : "تحليل التصنيفات والمشاعر"}
        </h3>
        <div className="space-y-6">
          {sortedAnalysis.map(({ category, totalNotes, moods }) => (
            <div key={category} className="border-b dark:border-gray-700 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {totalNotes} {lang === "en" ? "notes" : "مذكرة"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {moods.map(({ mood, emoji, count, percentage }) => (
                  <div key={`${category}-${mood}`} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-gray-600 dark:text-gray-400">{mood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">({percentage}%)</span>
                      <span className="bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-md">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Total Notes" : "إجمالي المذكرات"}
          </h3>
          <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 text-center">
            {totalNotes}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Total Words" : "إجمالي الكلمات"}
          </h3>
          <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 text-center mb-2">
            {totalWords}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {lang === "en"
              ? `Average: ${averageWords} per note`
              : `المتوسط: ${averageWords} لكل مذكرة`}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-right">
            {lang === "en" ? "Categories" : "التصنيفات"}
          </h3>
          <p className="text-5xl font-bold text-orange-600 dark:text-orange-400 text-center">
            {Object.keys(categoriesCount).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
