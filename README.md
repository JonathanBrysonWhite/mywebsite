# Bryson's Webpage Readme

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   npx expo install
   ```

2. Start the app

   ```bash
    npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Deployment
   ```bash
   npx expo export --platform web
   npx serve
   ```

   or 
   ```bash
   docker build -t my-website:local .
   docker run -p 80:80 --env-file .env my-website:local
   ```

   building for arm64...
   ```bash
   docker buildx build --platform linux/arm64 -t bwhite14/bwhiterepo:my-website --push .
   ```



#todo - replace all alerts w/ toast

#todo - add github pipeline integration

#todo - blog page, with CRM system for blog posts behind auth
#todo - verify domain email, change contact email to include my personal email and contact @ brysonw.net

#blog ideas - how to to recaptcha for this site
#blog ideas - making of the skills component

#todo remove localhost from google.com/re3captcha/admin
#look at spf record for brysonw.net

#todo - file storage service for pdfs

