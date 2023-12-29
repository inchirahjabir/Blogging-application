import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import '@/styles/globals.css';
import { ContextProvider } from '../components/UserContext';

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient({}));

  // State to manage the theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ContextProvider>
        {/* Button to toggle the theme */}
        <button className="fixed top-24 right-4 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300" onClick={toggleTheme}>
          Light/Dark
        </button>
        
        {/* Pass the current theme and toggle function to components */}
        <Component {...pageProps} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </ContextProvider>
    </SessionContextProvider>
  );
}




