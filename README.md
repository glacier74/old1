# EarlyBird

## Install

1. Login to our npm private registry: https://npm.cnnic.eu

```bash
npm login
```

2. Install npm packages

```bash
pnpm install
```

> If you don't have `pnpm`, you can run **`npm install -g pnpm`** to install it.

## Development

1. Copy the environment variables below to `.env.development.local`

```
NEXT_PUBLIC_HOMEPAGE=http://127.0.0.1:3000
NEXT_PUBLIC_API_URI=http://127.0.0.1:8000
NEXT_PUBLIC_STORAGE_URI=https://devlopment-flybird.s3.us-west-004.backblazeb2.com

NEXT_PUBLIC_COOKIE_DOMAIN=127.0.0.1
NEXT_PUBLIC_COOKIE_MAX_AGE=1y

NEXT_PUBLIC_REDIRECT_URL_COOKIE_NAME=earlybird_redirect_uri
NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME=earlybird_browser_id
NEXT_PUBLIC_TOKEN_COOKIE_NAME=earlybird_token
NEXT_PUBLIC_TOUR_NAME=earlybird_tour

NEXT_PUBLIC_PRIVATE_TOKEN_COOKIE_NAME=earlybird_private_token
NEXT_PUBLIC_PRIVATE_TOKEN_COOKIE_MAX_AGE=15d

NEXT_PUBLIC_PUBLIC_SITE_DOMAIN=joegates.top
NEXT_API_VERIFICATION_KEY=PUBLIC_API_VERIFICATION_KEY
```

2. Start the project

```bash
pnpm dev
```
