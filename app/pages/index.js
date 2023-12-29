import Link from 'next/link';
import Layout from '../components/Layout.js';

export default function HomePage({ isDarkMode }) {

  return (
    <Layout title="Travel Adventures" isDarkMode={isDarkMode}>
      <div className="bg-pink-100 rounded-lg min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/images/home-background.jpg")' }}>
        <div className="max-w-lg mx-auto text-center">
          <div className={`rounded-lg p-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Home page links to the different app pages */}
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'} mb-6`}>
            Explore our travel stories and discover the world&apos;s wonders. Check out our{' '}
            <Link href="/articles" className={`text-pink-600 hover:underline ${isDarkMode ? 'dark:hover:text-white' : ''}`}>
              latest articles
            </Link>
              , learn{' '}
            <Link href="/about" className={`text-pink-600 hover:underline ${isDarkMode ? 'dark:hover:text-white' : ''}`}>
              about us
            </Link>
              , or reach out to us for any inquiries{' '}
            <Link href="/contacts" className={`text-pink-600 hover:underline ${isDarkMode ? 'dark:hover:text-white' : ''}`}>
              here
            </Link>
            .
        </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}









