import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from './api/supabase';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

export default function Articles({ articles, isDarkMode }) {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { q } = router.query;

  const postsPerPage = 1;
  const offset = currentPage * postsPerPage;
  const currentArticle = articles[offset];

  const pageCount = Math.ceil(articles.length / postsPerPage);

  // Method to change pages
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //Method to execute the search
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .textSearch(['title', 'content'], { query: searchTerm.toLowerCase() });

    if (error) {
      console.error('Error fetching data:', error);
    }

    router.push({
      pathname: '/articles',
      query: { q: searchTerm },
    });
  };

  return (
    <Layout title="Articles" isDarkMode={isDarkMode}>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-black' : 'text-pink-700'} mb-5`}>Welcome to the Blog</h1>

        {/* Ask the user to log in or create an article based on the user authentication status */}
        {user ? (
          <Link href="/addArticle">
            <button className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105`}>
              Create a new post
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105`}>
              Log in to create a post
            </button>
          </Link>
        )}

        {/* Search display */}
        <div className="my-8">
          <form onSubmit={handleSearch} className="mt-4 flex items-center">
            <input
              type="text"
              name="search"
              placeholder="Search posts"
              defaultValue={q || ''}
              className="p-2 border rounded mr-2"
            />
            <button type="submit" className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded`}>
              Search
            </button>
          </form>

          {/* Current article display */}
          {currentArticle && (
            <div key={currentArticle.id} className="mb-8 border p-4 rounded-md shadow">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-black' : 'text-pink-700'}`}>
                <Link href={`/articles/${currentArticle.slug}`}>
                  <li className={`${isDarkMode ? 'text-black hover:underline' : 'text-pink-700 hover:underline'}`}>{currentArticle.title}</li>
                </Link>
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{currentArticle.content}</p>
            </div>
          )}
        </div>

        {/* React pagination */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex justify-center items-center mt-4'}
          pageClassName={'m-0 px-3 py-2 cursor-pointer rounded transition duration-300 ease-in-out'}
          previousClassName={`m-0 px-3 py-2 cursor-pointer rounded transition duration-300 ease-in-out bg-pink-500 hover:bg-pink-600 text-black`}
          nextClassName={`m-0 px-3 py-2 cursor-pointer rounded transition duration-300 ease-in-out bg-pink-500 hover:bg-pink-600 text-black`}
          activeClassName={`bg-pink-500 text-black`}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const searchQuery = query.q || '';

  // Fetch articles in ascending from the newest to the oldest based on the creation date
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  let filteredData = data;

  // Filter data if there's a search request, if not return everything
  if (searchQuery) {
    filteredData = data.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      articles: filteredData || [],
    },
  };
}







