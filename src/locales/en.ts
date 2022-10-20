export default {
  app: {
    name: 'EarlyBird',
    description: 'EarlyBird is xxx'
  },
  login: {
    title: 'Login · EarlyBird',
    heading: '👋 Welcome back!',
    description: 'Log in to your account or <1>create an account</1>',
    startWith: 'Start with',
    email: 'Email address',
    invalidEmail: 'Invalid email address',
    password: 'Password',
    invalidPassword: 'Invalid password',
    forgot: 'Forgot your password?',
    remember: 'Remember me',
    submit: 'Log in',
    continueWith: 'Or continue with',
    loginWithGoogle: 'Log in with google',
    loginWithTwitter: 'Log in with twitter',
    loginWithGithub: 'Log in with github'
  },
  signUp: {
    title: '$t(signUp.heading) · EarlyBird',
    heading: 'Create an account',
    description: 'Start a 14-day trial with all features unlocked.',
    name: 'Name',
    invalidName: 'Name must not be empty',
    invalidPassword:
      'Password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
    agreeWith: 'By signing up, you agree to our <1>terms of service</1> and <3>privacy policy</3>.',
    submit: 'Get started'
  },
  forgotPassword: {
    title: 'Forgot password · EarlyBird',
    heading: 'Forgot password?',
    description: "We'll send you an email with verification code.",
    continue: 'Continue',
    back: 'Back to sign in'
  },
  resetPassword: {
    title: '$t(resetPassword.heading) · EarlyBird',
    heading: 'Reset password',
    description:
      "We've sent you an email with a 6-digit verification code, please check your inbox at <1>{{email}}</1>",
    code: 'Verification code',
    invalidCode: 'Invalid verification code',
    newPassword: 'New password',
    repeatPassword: 'Repeat password'
  },
  confirmEmail: {
    title: 'Confirm email · EarlyBird',
    heading: 'Check your email',
    code: 'Verification code',
    invalidCode: 'Invalid verification code'
  }
}
