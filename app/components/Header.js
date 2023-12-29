import Link from 'next/link';
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import { useContext } from 'react';
import UserContext from './UserContext';
import { useRouter } from 'next/router';

export default function Header({ isDarkMode }) {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  const onClickLogin = () => {
    router.push('/login');
  };

  return (
    <header className={`p-4 text-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-pink-700 text-white'}`}>
      <nav className="flex gap-12 justify-between items-center">
        <Link href={`/`} className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
          Home
        </Link>
        <ul className="flex gap-12 text-white">
          <li className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
            <Link href="/articles">Articles</Link>
          </li>
          <li className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
            <Link href="/about">About Us</Link>
          </li>
          <li className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
            <Link href="/contacts">Contact Us</Link>
          </li>
          {user && (
            <li className={`rounded py-1 px-2 ${isDarkMode ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-pink-800 border-pink-900 hover:bg-pink-700 hover:text-white border'}`}>
              <Link href="/profile" className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6">
                {user.username}
                <OutlineUserCircleIcon />
              </Link>
            </li>
          )}
          <li className="flex gap-12 justify-between items-center text-white">
            {user ? (
              <button onClick={logout} className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
                Sign out
              </button>
            ) : (
              <button onClick={onClickLogin} className="py-2 px-2 hover:text-white transition duration-300 transform hover:scale-105">
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
