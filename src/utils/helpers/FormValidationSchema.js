import * as Yup from 'yup';

export const SignupValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),

  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'At least one special character required',
    ),

  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),

  password: Yup.string().required('Required'),
});
