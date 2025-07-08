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

   1. Copy Caddyfile and docker-compose.prod.yaml into a directory on your app server
   2. Install docker
   3. Update Caddyfile with your hostname
   4. Run docker compose up -d

## Automated Deployment:
The CI/CD workflow goes like:
>git push to master -> triggers github action -> builds new docker image using docker buildx -> sends post request through reverse proxy -> request is proxied to flask running on docker host -> flask app verifies message with secret then triggers docker pull and docker compose up
Do the following on your linux host:
1. Copy deploy.sh and webhook.py to /home/ubuntu/deploy (or whatever your home directory is)
2. chmod +x deploy.sh
3. cd /home/ubuntu/deploy
   sudo apt install python3.8-venv
   python3 -m venv .venv
   . .venv/bin/activate
   pip install flask
   pip install gunicorn
   
4. sudo nano /etc/systemd/system/github-webhook.service
```text
[Unit]
Description=GitHub Webhook Listener for Auto Deployment
After=network.target

[Service]
WorkingDirectory=/home/ubuntu/deploy
Environment=WEBHOOK_SECRET=<your secret here>
ExecStart=/home/ubuntu/deploy/.venv/bin/gunicorn -w 2 -b 172.17.0.1:5000 webhook:app
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```
5. sudo systemctl daemon-reload
6. sudo systemctl enable --now github-webhook.service
You should now be able to hit the webhook at http://localhost:5000/webhook
returning a 405

7. Set the following variables in github secrets....
   DOCKER_PASSWORD - use an app password here
   DOCKER_USERNAME - from docker hub or whatever repo
   EMAIL_PASSWORD - your email for notifications
   EMAIL_USERNAME - use an app password
   WEBHOOK_SECRET - secret for hmac 

8. Update .github/workflows/deploy.yml with your hostname and email addresses
9. Pushing to master (or whatever branch you configure in deploy.yml) will now trigger the GH actions workflow


#todo - replace all alerts w/ toast

#todo - add github pipeline integration

#todo - blog page, with CRM system for blog posts behind auth
#todo - verify domain email, change contact email to include my personal email and contact @ brysonw.net

#blog ideas - how to to recaptcha for this site
#blog ideas - making of the skills component

#todo remove localhost from google.com/re3captcha/admin
#look at spf record for brysonw.net

#todo - file storage service for pdfs

