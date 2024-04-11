//logout context

//import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { PowerIcon } from '@heroicons/react/24/outline'
//import { UserIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';

export default function Example() {
  return (
    <Disclosure as="Usernav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center p-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                <span
                  className="realative rounded-full bg-slate-50 p-1 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset"
                >
                  <PowerIcon className="h-4 w-4 m-1 "  />
                </span>
                
                  <Link className="font-semibold text-slate-50 p-3  hover:text-blue-400" to="/Login">Sign Out</Link> {/* Visible label */}

                {/* user dropdown Hell user inclde again*/}
               {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                      
                      </div>
                      
                    </Menu.Button>
                  </div> 


                  //user dropdown 
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition> 
                </Menu> */}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
