import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import { supabase } from './api/supabase';

export default function CreatePost({ isDarkMode }) {
  const [message, setMessage] = useState(null);
  const { user } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if a record with the same slug already exists
      const { data: existingData, error: existingError } = await supabase
        .from('articles')
        .select('slug')
        .eq('slug', formData.slug)
        .single();

      if (existingError) {
        throw new Error('Error checking existing record:', existingError);
      }

      if (existingData) {
        // If a record exists, perform an update
        const { data: updateData, error: updateError } = await supabase
          .from('articles')
          .update([formData])
          .eq('slug', formData.slug);

        if (updateError) {
          throw new Error('Failed to update post:', updateError);
        }

        setMessage(
          <div className={`max-w-lg mx-auto bg-white rounded-lg p-6 shadow-md mt-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-800'} mb-4 text-center`}>
              Article Updated
            </h2>
            <p className="text-center">
              Your article has been successfully updated.
            </p>
          </div>
        );
      } else {
        // If no record exists, perform an insert
        const { data: insertData, error: insertError } = await supabase
          .from('articles')
          .insert([formData]);

        if (insertError) {
          throw new Error('Failed to create post:', insertError);
        }

        setMessage(
          <div className={`max-w-lg mx-auto bg-white rounded-lg p-6 shadow-md mt-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-800'} mb-4 text-center`}>
              Article Created
            </h2>
            <p className="text-center">
              Your article has been successfully created.
            </p>
          </div>
        );
      }
    } catch (error) {
      console.error('Error creating/updating post:', error);

      setMessage(
        <div className={`max-w-md mx-auto p-4 ${isDarkMode ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'} border ${isDarkMode ? 'border-red-500' : 'border-red-300'} rounded-md shadow-md mt-4`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-red-600'} mb-2 text-center`}>
            Oops! Something went wrong.
          </h2>
          <p className="text-sm text-center">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      );
    }
  };

  const author = user ? user.email : '';

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: author,
    tags: '',
    slug: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Layout title="Create Post" description="Create a new post" isDarkMode={isDarkMode}>
      <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-pink-300' : 'text-pink-700'} mb-8 text-center`}>
        Create Post
      </h1>
      <p className={`text-lg ${isDarkMode ? 'text-black' : 'text-gray-700'} mb-6 text-center`}>
        Share your thoughts by creating a new post.
      </p>

      {/* Form */}
      <form
        className={`max-w-lg mx-auto rounded-lg p-6 shadow-md transition-transform hover:shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        onSubmit={onSubmit}
      >
        {/* Title */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            required
          />
        </div>
        {/* Content */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            rows="4"
            required
          />
        </div>
        {/* Tags */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Tags (example: Travel, Europe, France):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        {/* Slug */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Post id (example: sample_article):</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        {/* Submit button */}
        <div className="text-center">
          <button
            className={`bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      {message && (
        <div
          aria-label="Overflow below the drawer dialog"
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setMessage(null)}
          role="dialog"
        >
          <div
            aria-label="Alert pane"
            className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white"
          >
            {message}
          </div>
        </div>
      )}
    </Layout>
  );
}
