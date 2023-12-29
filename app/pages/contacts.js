import { useState } from 'react';
import Layout from '../components/Layout.js';
import { supabase } from './api/supabase';

export default function Contacts({ isDarkMode }) {
  const [message, setMessage] = useState(null);

  const onSubmit = async function (e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const { error } = await supabase
      .from('contacts')
      .insert(Object.fromEntries(data), { returning: 'minimal' });

    // Display error if the form couldn't be submitted
    if (error) {
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
    // Display a confirmation message if the message was successfully submitted
    else {
      setMessage(
        <div className={`max-w-lg mx-auto bg-white rounded-lg p-6 shadow-md mt-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-800'} mb-4 text-center`}>
            Confirmation
          </h2>
          <p className="text-center">
            Thank you for contacting us. We will get back to you promptly.
          </p>
        </div>
      );
    }
  };

  return (
    <Layout title="Contacts" description="Get in touch with us! Fill out the form below." isDarkMode={isDarkMode}>
      <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-pink-300' : 'text-pink-700'} mb-8 text-center`}>
      Contact Us
      </h1>
      <p className={`text-lg ${isDarkMode ? 'text-black' : 'text-gray-700'} mb-6 text-center`}>
      Have questions or feedback? We&apos;d love to hear from you! Fill out the form below, and we&apos;ll get back to you as soon as possible.
      </p>

      {/* Form */}
      <form
        className={`max-w-lg mx-auto rounded-lg p-6 shadow-md transition-transform hover:shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        onSubmit={onSubmit}
      >
        {/* First Name */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>First Name</label>
          <input
            type="text"
            name="firstname"
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        {/* Last name */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Last Name</label>
          <input
            type="text"
            name="lastname"
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Email</label>
          <input
            type="text"
            name="email"
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        {/* Message */}
        <div className="mb-4">
          <label className={`${isDarkMode ? 'text-white' : 'text-pink-600'} block`}>Message</label>
          <textarea
            name="message"
            className={`w-full rounded border p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            rows="4"
          />
        </div>
        {/* Send button*/}
        <div className="text-center">
          <button
            className={`bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-all duration-300`}
            type="submit"
          >
            Send
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



