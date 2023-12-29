import Layout from '../components/Layout';
import Image from 'next/image';

export default function About({ isDarkMode }) {
  return (
    <Layout title="About Us" isDarkMode={isDarkMode}>
      <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-pink-100 text-gray-800'}`}>
        <div className="max-w-3xl mx-auto text-center mt-8">
          {/* Intro text */}
          <h1 className={`text-4xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-600'} mb-4`}>Who I am</h1>
          <p className="text-lg">
            Welcome to my blog! I&apos;m Inchirah Jabir, a travel enthusiast on a mission to explore the globe and share the magic of diverse cultures, hidden gems, and unforgettable adventures.
          </p>
          <p className="text-lg mt-4">
            This website is more than just a travel blog; it&apos;s a community where you&apos;re invited to be part of the journey. Whether you&apos;re seeking travel tips, inspiration, or want to share your own escapades, you&apos;ve found your tribe!
          </p>
          <p className="text-lg mt-4">
            Join me as we embark on a virtual expedition, uncovering the beauty of our planet and connecting with fellow explorers. Together, we&apos;ll turn every trip into a story and every story into an adventure.
          </p>
          {/* Display favorite destinations(place, image and short descriptiomn) */}
          <div className="mt-8">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-600'} mb-4`}>Some of My Favorite Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FavoriteDestinationCard
                image="/images/paris.jpg"
                alt="Paris"
                title="Paris, France"
                description="Eiffel Tower, romantic vibes, and exquisite cuisine."
                isDarkMode={isDarkMode}
              />
              <FavoriteDestinationCard
                image="/images/istanbul.jpg"
                alt="Istanbul"
                title="Istanbul, Turkey"
                description="Historical wonders, vibrant bazaars, and delicious street food."
                isDarkMode={isDarkMode}
              />
              <FavoriteDestinationCard
                image="/images/madrid.jpg"
                alt="Madrid"
                title="Madrid, Spain"
                description="Artistic treasures, lively plazas, and a rich cultural scene."
                isDarkMode={isDarkMode}
              />
              <FavoriteDestinationCard
                image="/images/newyork.jpg"
                alt="New York"
                title="New York, USA"
                description="Iconic skyline, Broadway shows, and diverse neighborhoods."
                isDarkMode={isDarkMode}
              />
              <FavoriteDestinationCard
                image="/images/miami.jpg"
                alt="Miami"
                title="Miami, USA"
                description="Tropical vibes, stunning beaches, and vibrant nightlife."
                isDarkMode={isDarkMode}
              />
              <FavoriteDestinationCard
                image="/images/marrakesh.jpg"
                alt="Marrakesh"
                title="Marrakesh, Morocco"
                description="Sensory souks, historic palaces, and Moroccan hospitality."
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Layout for the cards displaying the destionations
const FavoriteDestinationCard = ({ image, alt, title, description, isDarkMode }) => (
  <div className={`bg-white rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105 ${isDarkMode ? 'text-black' : 'text-gray-800'}`}>
    <Image src={image} alt={alt} width={1200} height={800} className="w-32 h-32 rounded-full mx-auto mb-4" />
    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-600'} mb-2`}>{title}</h3>
    <p>{description}</p>
  </div>
);
