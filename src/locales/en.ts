export default {
  app: {
    name: 'EarlyBird',
    description: 'EarlyBird is xxx',
    title: '{{title}} · $t(app.name)'
  },
  login: {
    title: 'Login · $t(app.name)',
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
    title: '$t(signUp.heading) · $t(app.name)',
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
    title: 'Forgot password · $t(app.name)',
    heading: 'Forgot password?',
    description: "We'll send you an email with verification code.",
    continue: 'Continue',
    back: 'Back to sign in'
  },
  resetPassword: {
    title: '$t(resetPassword.heading) · $t(app.name)',
    heading: 'Reset password',
    description:
      "We've sent you an email with a 6-digit verification code, please check your inbox at",
    code: 'Verification code',
    invalidCode: 'Invalid verification code',
    newPassword: 'New password',
    repeatPassword: 'Repeat password'
  },
  confirmEmail: {
    title: 'Confirm email · $t(app.name)',
    heading: 'Check your email',
    code: 'Verification code',
    invalidCode: 'Invalid verification code'
  },
  sidebar: {
    createProduct: 'Create product',
    member: 'Member',
    accountSettings: 'Account settings',
    logout: 'Logout',
    version: 'Version',
    viewProfile: 'View profile',
    dashboard: 'Dashboard',
    engagements: 'Customer engagements',
    integrate: 'Integrate with apps',
    members: 'Team members',
    productSettings: 'Product settings',
    pro: 'EarlyBird Pro',
    resources: 'Resources',
    gettingStarted: 'GettingStarted',
    whatsNew: "What's new",
    roadmap: 'Roadmap',
    blog: 'Blog',
    helpSupport: 'Help & Support',
    helpCenter: 'Help center',
    sendEmail: 'Send us an email',
    twitter: 'Twitter @EarlyBirdIm'
  }
}
