import {  useEffect, useState } from 'react';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';

const Backup = ({ lang, setNotes, notes,setSelected }) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const timeForMsg = 5000;

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
      if (Array.isArray(parsedData)) {
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
            title={lang === 'en' ? 'Invalid Data' : 'بيانات غير صالحة'}
            message={
              lang === 'en'
                ? 'Please provide valid journal data'
                : 'يرجى تقديم بيانات صالحة للمذكرات'
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
          title={lang === 'en' ? 'Invalid Format' : 'تنسيق غير صالح'}
          message={
            lang === 'en'
              ? 'Please provide valid JSON data'
              : 'يرجى تقديم بيانات JSON صالحة'
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
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1a1f2b] dark:text-white animate-fade-in-up opacity-0">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">
            {lang === 'en' ? 'Data Backup' : 'نسخ البيانات'}
          </h1>

          {/* Current Data Section */}
          <div className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
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
                className="mt-4 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
              >
                {lang === 'en' ? 'Copy Data' : 'نسخ البيانات'}
              </button>
            </div>
          </div>

          {/* Restore Data Section */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
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
