import { useContext, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import UserContext from '../components/UserContext';
import Layout from '../components/Layout';

export default function Profile({ isDarkMode }) {
  const supabase = useSupabaseClient();
  const { user} = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.user_metadata?.firstname || '',
    lastname: user?.user_metadata?.lastname || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    profilePicture: '',
    password: '',
  });

  // If the user click on the edit button, start editing
  const handleEditClick = () => {
    setEditMode(true);
  };

  //If the user clicks on save, save the information entered
  const handleSaveClick = async () => {
    console.log('Updating user with data:', formData);
    console.log('User ID:', user.id);
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          user_metadata: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            email: formData.email,
            language: formData.language,
            profilePicture: formData.profilePicture,
          },
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      //Update successful
      console.log('User information updated in the database:', data);

      setEditMode(false);
    } catch (error) {
      // Update unsuccessful
      console.error('Error updating user information:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  return (
    <Layout title="Profile" description="User profile page" isDarkMode={isDarkMode}>
      <div className={`flex justify-between items-center mb-8 ${isDarkMode ? 'text-black' : 'text-black'}`}>
        {/* User icon */}
        <div className="flex items-center">
          <img
            src={user?.user_metadata?.profilePicture || '/icon.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          {/* User first and last name */}
          <div>
            <h1 className={`text-4xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>
              {user?.user_metadata?.firstname || 'First Name'}{' '}
              {user?.user_metadata?.lastname || 'Last Name'}
            </h1>
          </div>
        </div>
      </div>

      {/* Edit Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>
            {editMode ? 'Edit Information' : 'Current Information'}
          </h2>
            {/* Form to edit info */}
            {editMode ? (
              <form onSubmit={handleSaveClick}>
                {/* Profile pic */}
                <label className="block mb-4">
                  Profile Picture:
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                {/* First name */}
                <label className="block mb-4">
                  First Name:
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                {/* Last name */}
                <label className="block mb-4">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                {/* Email */}
                <label className="block mb-4">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                {/* Phone number */}
                <label className="block mb-4">
                  Phone Number:
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                {/* Language */}
                <label className="block mb-4">
                  Language:
                  <input
                    type="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </label>
                <div className="flex justify-end">
                  {/* Save button */}
                  <button
                    className={`rounded px-4 py-2 text-white ${isDarkMode ? 'bg-pink-400 hover:bg-pink-500' : 'bg-pink-500 hover:bg-pink-700'}`}
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
          ) : (
            <>
              {/* Display email */}
              <p>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
              {/* Display phone number. If no language is specified, return N/A */}
              <p>
                <strong>Phone Number:</strong> {user?.user_metadata?.phone || 'N/A'}
              </p>
              {/* Display language. If no language is specified, return N/A */}
              <p>
                <strong>Language:</strong> {user?.user_metadata?.language || 'N/A'}
              </p>
              <div className="flex justify-end mt-4">
                {/* Edit button */}
                <button
                  className={`rounded px-4 py-2 text-white ${isDarkMode ? 'bg-pink-700 hover:bg-blue-700' : 'bg-pink-500 hover:bg-pink-700'}`}
                  onClick={handleEditClick}
                >
                  Edit my information
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

