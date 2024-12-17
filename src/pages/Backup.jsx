import { useEffect, useState } from 'react';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import Joyride from 'react-joyride';

const Backup = ({ lang, setNotes, notes, setSelected, isDark }) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [runTour, setRunTour] = useState(() => {
    return localStorage.getItem('dontShowBackupGuide') !== 'true';
  });
  const timeForMsg = 5000;

  const handleDontShowAgain = () => {
    localStorage.setItem('dontShowBackupGuide', 'true');
    setRunTour(false);
  };

  const steps = [
    {
      target: '.current-data',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en' 
              ? 'This section shows your current data. You can copy it to create a backup.'
              : 'يعرض هذا القسم بياناتك الحالية. يمكنك نسخها لإنشاء نسخة احتياطية.'}
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
      target: '.copy-btn',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en'
              ? 'Click here to copy your data to clipboard. Save it somewhere safe!'
              : 'انقر هنا لنسخ بياناتك إلى الحافظة. احفظها في مكان آمن!'}
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
      target: '.restore-data',
      content: (
        <div>
          <div className="mb-4">
            {lang === 'en'
              ? 'If you need to restore your data, paste your backup here and click the restore button.'
              : 'إذا كنت بحاجة لاستعادة بياناتك، الصق النسخة الاحتياطية هنا واضغط على زر الاستعادة.'}
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

  useEffect(() => {
    setSelected('backup');
    document.title = `${
      lang == "en" ? "Journal | Backup" : "يومياتي | نسخة احتياطية"
    }`;
  }, [])

  const getCurrentData = () => {
    return JSON.stringify(notes, null, 2) || '{}';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentData());
    const successMessage = (
      <SuccessAlert
        lang={lang}
        title={lang === 'en' ? 'Successfully Copied' : 'تم النسخ بنجاح'}
        message={
          lang === 'en'
            ? 'Data has been copied to clipboard'
            : 'تم نسخ البيانات إلى الحافظة'
        }
        timeForMsg={timeForMsg}
      />
    );
    setSuccess(successMessage);
    if (!success) {
      setTimeout(() => {
        setSuccess('');
      }, timeForMsg);
    }
  };

  const handleRestore = () => {
    try {
      const parsedData = JSON.parse(inputData);
      
      // التحقق من أن البيانات عبارة عن مصفوفة وكل عنصر فيها يحتوي على الحقول المطلوبة
      if (Array.isArray(parsedData) && parsedData.every(note => 
        typeof note === 'object' && note !== null &&
        'id' in note &&
        'title' in note &&
        'note' in note &&
        'date' in note &&
        'emoji' in note &&
        'moodAr' in note &&
        'moodEn' in note
      )) {
        setNotes(parsedData);
        setError('');
        const successMessage = (
          <SuccessAlert
            lang={lang}
            title={lang === 'en' ? 'Successfully Restored' : 'تم الاستعادة بنجاح'}
            message={
              lang === 'en'
                ? 'Your data has been restored successfully'
                : 'تم استعادة بياناتك بنجاح'
            }
            timeForMsg={timeForMsg}
          />
        );
        setSuccess(successMessage);
        if (!success) {
          setTimeout(() => {
            setSuccess('');
          }, timeForMsg);
        }
        setInputData('');
      } else {
        const errorMessage = (
          <ErrorAlert
            lang={lang}
            title={lang === 'en' ? 'Invalid Data Structure' : 'هيكل بيانات غير صالح'}
            message={
              lang === 'en'
                ? 'The data structure is not valid. Please make sure you are using a valid journal backup.'
                : 'هيكل البيانات غير صالح. يرجى التأكد من استخدام نسخة احتياطية صالحة للمذكرات.'
            }
            timeForMsg={timeForMsg}
          />
        );
        setError(errorMessage);
        if (!error) {
          setTimeout(() => {
            setError('');
          }, timeForMsg);
        }
      }
    } catch (e) {
      const errorMessage = (
        <ErrorAlert
          lang={lang}
          title={lang === 'en' ? 'Invalid JSON Format' : 'تنسيق JSON غير صالح'}
          message={
            lang === 'en'
              ? 'The data is not in a valid JSON format. Please check your input.'
              : 'البيانات ليست بتنسيق JSON صالح. يرجى التحقق من المدخلات.'
          }
          timeForMsg={timeForMsg}
        />
      );
      setError(errorMessage);
      if (!error) {
        setTimeout(() => {
          setError('');
        }, timeForMsg);
      }
    }
  };

  return (
    <>
      {error}
      {success}
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        styles={{
          options: {
            arrowColor: isDark ? '#1a1f2b' : '#f7f7f7',
            backgroundColor: isDark ? '#1a1f2b' : '#fff',
            textColor: isDark ? '#f7f7f7' : '#1a1f2b',
            primaryColor: isDark ? '#3498db' : '#3498db',
            overlayColor: isDark ? 'rgba(26, 31, 43, 0.5)' : 'rgba(247, 247, 247, 0.5)',
            zIndex: 1000,
          },
        }}
      />
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1a1f2b] dark:text-white animate-fade-in-up opacity-0">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">
            {lang === 'en' ? 'Data Backup' : 'نسخ البيانات'}
          </h1>

          {/* Current Data Section */}
          <div className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg current-data">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'en' ? 'Current Data' : 'البيانات الحالية'}
            </h2>
            <div className="relative">
              <textarea
                readOnly
                dir="ltr"
                value={getCurrentData()}
                className="w-full h-48 p-3 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              />
              <button
                onClick={handleCopy}
                className="mt-4 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors copy-btn"
              >
                {lang === 'en' ? 'Copy Data' : 'نسخ البيانات'}
              </button>
            </div>
          </div>

          {/* Restore Data Section */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg restore-data">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'en' ? 'Restore Data' : 'استعادة البيانات'}
            </h2>
            <textarea
              dir="ltr"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
                setError('');
              }}
              placeholder={
                lang === 'en'
                  ? 'Paste your backup data here...'
                  : 'الصق بيانات النسخ الاحتياطي هنا...'
              }
              className="w-full h-48 p-3 rounded-lg font-mono text-sm mb-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              onClick={handleRestore}
              className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors"
            >
              {lang === 'en' ? 'Restore Data' : 'استعادة البيانات'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Backup;
