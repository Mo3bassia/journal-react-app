import { useState, useEffect } from "react";

function ErrorAlert({ message, title, lang }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div
        className={`fixed bottom-5 ${
          lang == "en" ? "right-5" : "left-5"
        } bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-800/30
          ${isVisible ? "animate-slide-up" : "animate-slide-right"} z-50`}
        role="alert"
        tabIndex="-1"
        aria-labelledby="hs-bordered-red-style-label"
      >
        <div className="flex">
          <div className="shrink-0">
            <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </span>
          </div>
          <div className="ms-3">
            <h3
              id="hs-bordered-red-style-label"
              className="text-gray-800 font-semibold dark:text-white"
            >
              {title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-neutral-400">
              {message}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default ErrorAlert;
