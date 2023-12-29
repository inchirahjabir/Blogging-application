import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import { supabase } from './api/supabase';

export default function CreatePost({ isDarkMode }) {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const author = user ? user.email : '';

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: author, // Assuming user has an 'email' field
    tags: '',
    slug: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert the new article into the 'articles' table in the Supabase database
      const { data, error } = await supabase.from('articles').upsert([formData]);

      if (error) {
        console.error('Failed to create/update post:', error);
        return;
      }

      console.log('Article created/updated successfully:', data);

      // Redirect to the articles list page after successful creation/update
      router.push('/articles');
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    // Go back to the articles list page
    router.back();
  };

  //If the user is not logged in, display a button to ask them to log in to create articles
  if (!user) {
    return (
      <Layout title="Create Post" description="Create a new post" isDarkMode={isDarkMode}>
        <p>Please log in to create a post.</p>
      </Layout>
    );
  }

  // Form to create a post
  return (
    <Layout title="Create Post" description="Create a new post">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl text-pink-800 font-semibold mb-6">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Tite (title) */}
            <label className="block text-pink-600">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            {/* Content (content) */}
            <label className="block text-pink-600">Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-40 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            {/* Author (author) */}
            <label className="block text-pink-600">Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            {/* Tags (tags) */}
            <label className="block text-pink-600">Tags (example: Travel, Europe, France):</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            {/* Post id (slug) */}
            <label className="block text-pink-600">Post id (example: sample_article):</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between">

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Save
            </button>

            {/* Cancel button */}
            <button
              type="button"
              onClick={handleCancel}
              className="text-pink-600 hover:text-pink-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}




