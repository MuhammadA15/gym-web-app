import React, { useState } from "react";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import { useFormik } from "formik";
import { login_InitVals } from "./utils/utils_loginForm";
import { login_ValidationSchema } from "./utils/utils_loginForm";
import { LOGIN_ENDPOINT } from "../../utils/constants/apiEndpoints";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.path || "/home";

  const formik = useFormik({
    initialValues: login_InitVals,
    validationSchema: login_ValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const data = {
        username: formik.values.username,
        password: formik.values.password,
      };

      await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) =>
          res.json().then((data) => ({ status: res?.status, body: data }))
        )
        .then((data) => {
          if (data?.status === 200) {
            // console.log("data", data.body.data);
            auth?.login(data.body.data);
            navigate(redirectPath, { replace: true });
          } else {
            setErrorMsg(data?.body?.msg);
            setLoading(false);
          }
        });
    },
  });

  return (
    <div className="mt-24">
      <div className="container flex justify-center">
        <div className="w-full max-w-xs mt-10">
          {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}
          <form
            onSubmit={formik.handleSubmit}
            className="bg-neutral-800 shadow-xl rounded px-8 pt-6 pb-8 mb-4"
          >
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
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && (
                <p className="text-left text-red-500">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="mb-9">
              <label
                className="block text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className="text-left text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <FilledButton text={"Log In"} loading={loading}/>
              <a
                className={`${loading ? 'hidden' : ''} inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800`}
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
