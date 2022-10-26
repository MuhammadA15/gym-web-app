import * as Yup from 'yup'

export const signUp_InitVals = {
    username: "",
    email: "",
    password: ""
}
export const signUp_ValidationSchema = () => Yup.object({
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(3, 'Password must be atleast 3 characters long').required('Password is required'),
})