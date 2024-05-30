import { Disclosure } from '@headlessui/react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Example() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Add any other content or logo here if needed */}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center p-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <span
                  className="relative rounded-full bg-slate-50 p-1 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset"
                  onClick={handleLogout}
                >
                  <PowerIcon className="h-4 w-4 m-1" />
                </span>
                <button
                  className="font-semibold text-slate-50 p-3 hover:text-blue-400"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
