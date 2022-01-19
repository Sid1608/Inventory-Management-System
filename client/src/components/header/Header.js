import React, {Fragment} from 'react'
import "./Header.css"
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({setIsLoggedIn}){
    const user = {
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        department: localStorage.getItem('department'),
    }
    return(
        <div className="header">
            <Menu as="div" className="relative inline-block text-left mr-4">
                <div>
                    <Menu.Button className="dropdown-button inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">
                        {user.username}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items as="ul" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item as="li">
                            <span className="block px-4 py-2 text-sm text-gray-700">Name: {user.name}</span>
                        </Menu.Item>
                        <Menu.Item as="li">
                            <span className="block px-4 py-2 text-sm text-gray-700">Department: {user.department}</span>
                        </Menu.Item>
                        <Menu.Item as="li">
                            {({ active }) => (
                            <Link onClick = {
                                (e) => {e.preventDefault();
                                    setIsLoggedIn(false)
                                    window.localStorage.clear()
                                }
                            }
                                type="submit"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                                )}
                            >
                                Sign out
                            </Link>
                            )}
                        </Menu.Item>
                        {/* </form> */}
                    </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
