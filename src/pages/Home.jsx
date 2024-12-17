import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joyride from 'react-joyride';
import SEO from '../components/SEO';

function Home({ lang, setSelected, isDark }) {
  const [runTour, setRunTour] = useState(() => {
    return localStorage.getItem('dontShowGuide') !== 'true';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  const handleDontShowAgain = () => {
    localStorage.setItem('dontShowGuide', 'true');
    setRunTour(false);
  };

  const steps = [
    {
      target: '.radio-inputs',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en' 
              ? 'Use these tabs to navigate through the app. Click on Add to create a new note, Notes to view your entries, Statistics to see your progress, and Backup to manage your data.'
              : 'استخدم هذه الأزرار للتنقل في التطبيق. اضغط على إضافة لإنشاء مذكرة جديدة، مذكراتي لعرض مدخلاتك، إحصائيات لمتابعة تقدمك، ونسخ احتياطي لإدارة بياناتك.'}
          </div>
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
          >
            {lang === 'en' ? "Don't show this guide again" : 'عدم عرض هذا الدليل مرة أخرى'}
          </button>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.home-welcome',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en' 
              ? 'Welcome to your personal journal! Here you can write and organize your thoughts.'
              : 'مرحباً بك في يومياتك الشخصية! هنا يمكنك كتابة وتنظيم أفكارك.'}
          </div>
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
          >
            {lang === 'en' ? "Don't show this guide again" : 'عدم عرض هذا الدليل مرة أخرى'}
          </button>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.theme-toggle',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en'
              ? 'Toggle between light and dark mode for comfortable reading.'
              : 'قم بالتبديل بين الوضع الفاتح والداكن للقراءة المريحة.'}
          </div>
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
          >
            {lang === 'en' ? "Don't show this guide again" : 'عدم عرض هذا الدليل مرة أخرى'}
          </button>
        </div>
      ),
    },
    {
      target: '.lang-toggle',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en'
              ? 'Switch between English and Arabic languages.'
              : 'قم بالتبديل بين اللغة العربية والإنجليزية.'}
          </div>
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
          >
            {lang === 'en' ? "Don't show this guide again" : 'عدم عرض هذا الدليل مرة أخرى'}
          </button>
        </div>
      ),
    }
  ];

  useEffect(function () {
    setSelected("");
  }, []);

  useEffect(() => {
    document.title = `${lang == "en" ? "Journal" : "يومياتي"}`;
  }, [lang]);

  return (
    <>
      <SEO 
        title={lang === "ar" ? "المذكرات - صفحتك الرئيسية" : "Journal - Your Home Page"}
        description={lang === "ar" ? "سجل أفكارك ومشاعرك اليومية" : "Record your daily thoughts and feelings"}
      />
      <Joyride
        steps={steps}
        continuous
        showProgress
        showSkipButton
        disableScrolling
        disableOverlayClose
        spotlightClicks
        hideCloseButton
        run={runTour}
        styles={{
          options: {
            arrowColor: isDark ? '#1a1f2b' : '#ffffff',
            backgroundColor: isDark ? '#1a1f2b' : '#ffffff',
            primaryColor: '#3b82f6',
            textColor: isDark ? '#ffffff' : '#1a1f2b',
            spotlightShadow: isDark ? '0 0 15px rgba(255, 255, 255, 0.1)' : '0 0 15px rgba(0, 0, 0, 0.1)',
            overlayColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
            beaconSize: 36,
            zIndex: 100,
          },
          tooltip: {
            padding: '20px',
            borderRadius: '8px',
            boxShadow: isDark ? '0 0 15px rgba(255, 255, 255, 0.1)' : '0 0 15px rgba(0, 0, 0, 0.1)',
          },
          tooltipContainer: {
            textAlign: 'right',
          },
          buttonNext: {
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: '6px',
          },
          buttonBack: {
            padding: '8px 16px',
            fontSize: '14px',
            color: isDark ? '#ffffff' : '#1a1f2b',
            marginRight: '10px',
          },
          buttonSkip: {
            padding: '8px 16px',
            fontSize: '14px',
            color: isDark ? '#ffffff' : '#1a1f2b',
          }
        }}
        locale={{
          back: lang === 'en' ? 'Back' : 'السابق',
          close: lang === 'en' ? 'Close' : 'إغلاق',
          last: lang === 'en' ? 'Got it' : 'فهمت',
          next: lang === 'en' ? 'Next' : 'التالي',
          skip: lang === 'en' ? 'Skip' : 'تخطي',
        }}
      />
      <div className="container mx-auto px-4 md:px-6 animate-fade-in-up opacity-0">
        <div className="mt-5 bg-white border border-gray-100 dark:border-gray-700 dark:bg-[#232936] w-[700px] max-w-full rounded-lg shadow-xl p-6 mx-auto text-center">
          <div className=" my-5 mt-2 relative bg-blue-500/10 w-32 mx-auto h-32 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl mb-3 font-bold home-welcome">
            {lang == "en" ? "Start your journey" : "ابدأ رحلتك"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 my-2 leading-loose">
            {lang == "en"
              ? "Your digital diary awaits. Begin capturing your thoughts, memories, and experiences"
              : "مذكراتك الرقمية في انتظارك. ابدأ بتسجيل أفكارك وذكرياتك وتجاربك"}
          </p>
          <Link
            to="/add"
            className="my-3 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
              flex gap-2 transition-colors rounded-lg text-white font-medium font-arabic add-note-btn"
          >
            <span>{lang == "en" ? "Create a note" : "انشئ مذكرة الآن"} </span>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg always-available">
              <h3 className="font-bold my-2">
                {lang == "en" ? "Always Available" : "متاح دائماً"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {lang == "en"
                  ? "Access your notes anytime, anywhere."
                  : "يمكنك الوصول إلى مذكراتك في أي وقت وأي مكان"}
              </p>
            </div>
            <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg easy-to-use">
              <h3 className="font-bold my-2">
                {lang == "en" ? "Easy to Use" : "سهل الاستخدام"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {lang == "en"
                  ? "Simple interface to focus on what matters - your writing."
                  : "واجهة بسيطة تركز على ما يهم - كتاباتك"}
              </p>
            </div>
            <div className="dark:bg-[#1a1f2b] bg-gray-50 p-4 text-start rounded-lg private-secure">
              <h3 className="font-bold my-2">
                {lang == "en" ? "Private & Secure" : "خاص وآمن"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {lang == "en"
                  ? "Your thoughts stay yours, protected and private."
                  : "أفكارك تبقى خاصة، محمية وآمنة"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
