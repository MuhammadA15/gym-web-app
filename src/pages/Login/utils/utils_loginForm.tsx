import * as Yup from 'yup'

export const login_InitVals = {
    username: "",
    password: ""
}
export const login_ValidationSchema = () => Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})