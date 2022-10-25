import React from "react";
import FilledButton from "../../components/ui/FilledButton/filledButton";

const LoginPage = () => {
  return (
    <div>
      <div className="container flex justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-neutral-800 shadow-xl rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-left text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username or Email
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
            <div className="flex items-center justify-between">
              <FilledButton text={'Log In'} />
              <a
                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Moosie Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
