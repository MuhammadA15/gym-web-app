import React from 'react'
import FilledButton from 'components/ui/FilledButton/filledButton'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div>
      <div className="container flex justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-neutral-800 shadow-xl rounded px-8 pt-6 pb-8 mb-4">
            <div className='mb-6'>
              <p className='text-left opacity-50 mb-1'>Welcome to Fitness App!</p>
              <p className='text-left opacity-50'>Let's begin your fitness journey</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-left text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email@mail.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-left text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="block items-center">
              <FilledButton text={'Sign Up'} />
              <div className='mt-4'>
                Already Have An Account? {' '}
                <Link
                  className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Moosie Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage