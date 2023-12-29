import { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../api/supabase';
import UserContext from '../../components/UserContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Gravatar from 'react-gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function ArticlePage({ article, initialComments, isDarkMode }) {
  const [commentList, setCommentList] = useState(initialComments);
  const [newComment, setNewComment] = useState({ content: '', email: '' });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title: article.title,
    content: article.content,
    tags: article.tags,
  });
  const { user } = useContext(UserContext);
  const isAuthor = user && user.email === article.author;
  const router = useRouter();

  const [likes, setLikes] = useState(article.likes || 0);
  const [randomImage, setRandomImage] = useState('');

  //Generate random image using Unsplash
  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: '6X9ZlWcisayy2p3kifkxF9GfkUmaYSi_tXc8dPu17e0', 
            orientation: 'landscape',
          },
        });

        if (response.data.urls && response.data.urls.regular) {
          setRandomImage(response.data.urls.regular);
        }
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  useEffect(() => {
    setCommentList(initialComments);
  }, [initialComments]);

  // Handle change in inpout for articles
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
  };

  // Remove function
  const handleRemove = async () => {
    try {
      // Remove the post using article ID
      const { error } = await supabase.from('articles').delete().eq('id', article.id);

      if (error) {
        console.error('Error removing post:', error);
        return;
      }

      console.log('Post removed successfully');

      // Redirect to the articles list page or homepage
      router.push('/articles');
    } catch (error) {
      console.error('Error removing post:', error);
    }
  };

  // Like function
  const handleLike = async () => {
    // Update the likes in the database
    const { data, error } = await supabase
      .from('articles')
      .update({ likes: likes + 1 })
      .eq('id', article.id);

    if (error) {
      console.error('Error updating likes:', error);
      return;
    }

    // Update the local count
    setLikes(likes + 1);
  };

  // Submit comment function
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Set an error if content or email are empty
    if (!newComment.content || !newComment.email) {
      // Error message
      setError('Both content and email are required.');
      return;
    }

    // Clear any previous error messages
    setError(null);

    // Insert comment
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          article_id: article.id,
          content: newComment.content,
          email: newComment.email,
        },
      ]);

    // If there's an error, tell the user and show the error in the terminal
    if (error) {
      console.error('Error submitting comment:', error);
      setError('Error submitting comment. Please try again.');
      return;
    }

    // Update the comment list if data exists
    if (data && data.length > 0) {
      setCommentList((prevComments) => [...prevComments, data[0]]);
    }

    setNewComment({ content: '', email: '' });

    // Alert the user that the comment was added
    alert('Comment added successfully! Refresh the page to see it');
  };

  const handleEditSubmit = async () => {
    try {
      // Create a copy of the article with the updated values
      const updatedArticle = {
        title: editedArticle.title,
        content: editedArticle.content,
        tags: editedArticle.tags,
      };

      // Update the article in the database
      const { data, error } = await supabase
        .from('articles')
        .update(updatedArticle)
        .eq('id', article.id);
      
      if (error) {
        console.error('Error updating article:', error);
        return;
      }

      console.log('Article updated successfully:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
    // Alert the user that the post was edited
    alert('Post edited successfully! Refresh the page to see it');
  };

  // Display
  return (
    <Layout title={article.title} isDarkMode={isDarkMode}>
      <div className={`max-w-2xl mx-auto mt-10 ${isDarkMode ? 'dark' : ''}`}>
        {/* Article title */}
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-pink-300' : 'text-pink-700'} mb-5`}>
          {article.title}
        </h1>
        {/* Article author */}
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Author: {article.author || 'Anonymous'}
        </p>
        {/* Article tags */}
        <p className={`${isDarkMode ? 'text-pink-300' : 'text-pink-700'}`}>
          Tags: {article.tags || 'No tags'}
        </p>
        {/* Display the generated image with Unsplash */}
        {randomImage && (
          <div className="mb-8">
            <img src={randomImage} alt="Random" className="w-full h-auto rounded-lg" />
          </div>
        )}
        {/* Editing articles */}
        <div className={`mb-10 text-lg ${isDarkMode ? 'text-black' : 'text-black'}`}>
          {isEditing ? (
            <textarea
              name="content"
              value={editedArticle.content}
              onChange={handleInputChange}
              className={`w-full rounded border p-2 ${
                isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-800'
              }`}
              rows="4"
            />
          ) : (
            article.content
          )}
        </div>
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>{likes} Likes</span>
        </button>
        {/* Edit and Remove Buttons */}
        {isAuthor && !isEditing && (
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="text-pink-600 hover:text-pink-800 font-bold"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="text-pink-600 hover:text-pink-800 font-bold"
              onClick={() => handleRemove()}
            >
              Remove
            </button>
          </div>
        )}
        {isEditing && (
          <div className="mt-4 flex justify-end space-x-4">
            {/* Save button */}
            <button
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300"
              onClick={handleEditSubmit}
            >
              Save Changes
            </button>
            {/* Cancel button */}
            <button
              className="text-pink-600 hover:text-pink-800 font-bold"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
        {/* Comments Section */}
        <div className="mt-8">
          <h2 className={`text-2xl text-sm font-bold mb-4 ${isDarkMode ? 'text-black' : 'text-black'}`}>
            Comments
          </h2>
          <ul className="space-y-4">
            {commentList.map((comment) => (
              <li key={comment.id} className="border-t pt-4 flex items-start space-x-2">
                {/* Gravatar Image */}
                <Gravatar email={comment.email} size={40} className="rounded-full" />
                {/* Comment Content */}
                <p className={`text-sm ${isDarkMode ? 'text-pink-300' : 'text-pink-700'}`}>
                  <strong>{comment.email}:</strong> {comment.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
        {/* Comment Form */}
        <div className="mt-8">
          <h2 className={`text-2xl text-sm font-bold mb-4 ${isDarkMode ? 'text-black' : 'text-black'}`}>
            Leave a Comment
          </h2>
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="mb-4">
              {/* Content (message) */}
              <label className={`${isDarkMode ? 'text-black' : 'text-pink-600'} block`}>Content</label>
              <textarea
                name="content"
                value={newComment.content}
                onChange={handleInputChange}
                className={`w-full rounded border p-2 ${
                  isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-800'
                }`}
                rows="4"
              />
            </div>
            <div className="mb-4">
              {/* Email */}
              <label className={`${isDarkMode ? 'text-black' : 'text-pink-600'} block`}>Email</label>
              <input
                type="email"
                name="email"
                value={newComment.email}
                onChange={handleInputChange}
                className={`w-full rounded border p-2 ${
                  isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-800'
                }`}
              />
            </div>
            <div className="text-center">
              {/* Submit button */}
              <button
                type="submit"
                className={`bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300`}
              >
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch the article
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  console.log('Article:', article);

  if (articleError) {
    console.error('Error fetching article data:', articleError);
    return {
      notFound: true,
    };
  }

  // Fetch the comments related to the article
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_id', article.id)
    .order('created_at', { ascending: true });

  console.log('Comments:', comments);

  if (error) {
    console.error('Error fetching comments data:', error);
    return {
      notFound: true,
    };
  }
  
  // Return articles and comments
  return {
    props: {
      article,
      initialComments: comments,
    },
  };
}