import React, { useState } from 'react'
import FilledButton from '../../components/ui/FilledButton/filledButton'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { signUp_InitVals, signUp_ValidationSchema } from './utils/utils_signupForm'
import { Link, useNavigate } from 'react-router-dom'
import { SIGNUP_ENDPOINT } from '../../utils/constants/apiEndpoints'

const SignUpPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: signUp_InitVals,
    validationSchema: signUp_ValidationSchema(),
    onSubmit: async values => {
      setLoading(true);
      
      const data = {
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password
      }

      await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json().then(data => ({status: res.status, body: data})))
        .then(data => {
          if (data.status === 200) {
            alert(data.body.msg)
            navigate('/login')
          } else {
            setErrorMsg(data.body.msg)
            setLoading(false);
          }
        })
    },
  })

  return (
    <div className='mt-24'>
      <div className="container flex justify-center">
        <div className="w-full max-w-xs mt-10">
          { errorMsg &&
            <p className='text-red-500 mb-3'>{errorMsg}</p>
          }
          <form onSubmit={formik.handleSubmit}  className="bg-neutral-800 shadow-xl rounded px-8 pt-6 pb-8 mb-4">
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
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email &&
                <p className='text-left text-red-500'>{formik.errors.email}</p>
              }
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
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username &&
                <p className='text-left text-red-500'>{formik.errors.username}</p>
              }
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
              {formik.errors.password &&
                <p className='text-left text-red-500'>{formik.errors.password}</p>
              }
            </div>
            <div className="block items-center">
              <FilledButton text={'Sign Up'} loading={loading}/>
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