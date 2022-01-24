import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface IProps {
  title?: string;
  path?: string;
  save?: () => void;
}

const NavHeader = (props: IProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { title, path, save } = props;
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  return (
    <nav className="sticky-nav px-2 h-10 shadow-neutral-500/50 shadow dark:shadow-lg dark:shadow-indigo-500/50 flex justify-between items-center w-full bg-white dark:bg-black bg-opacity-60">
      <div className="text-gray-900 dark:text-gray-100">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 dark:bg-gray-800 rounded p-1 h-6 w-6"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
        <span className="ml-4">标题：{title}</span>
        <span className="ml-4">路径：{path}</span>
      </div>

      <div className="text-gray-900 dark:text-gray-100">
        <span className="cursor-pointer" onClick={save}>
          保存
        </span>
      </div>
    </nav>
  );
};
export default NavHeader;
