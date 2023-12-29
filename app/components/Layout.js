import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Layout({ children, title, description, isDarkMode }) {
  return (
    <>
      <Head>
        <title>{`Webtech ${title && `- ${title}`}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Header isDarkMode={isDarkMode} />
        <main className="py-10 max-w-5xl mx-auto">
          {children}
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}




