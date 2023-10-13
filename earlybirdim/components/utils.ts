export function getRecaptchaToken(): Promise<string> {
  const { grecaptcha } = window as any

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute((window as any).captcha.recaptcha, {
          action: 'submit'
        })
        .then(resolve)
        .catch(reject)
    })
  })
}
