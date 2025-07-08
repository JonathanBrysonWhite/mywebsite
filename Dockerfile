# -------- STAGE 1: Build & Compile --------
FROM node:18-alpine AS builder

# Enable native dependencies if needed
RUN apk add --no-cache bash git libc6-compat

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install
RUN npx expo install

# Copy source code
COPY . .

# Build Expo app for web (generates dist/client and dist/server)
RUN npx expo export --platform web

# -------- STAGE 2: Runtime Image --------
FROM node:18-alpine

WORKDIR /app

# Only install prod deps
COPY package*.json ./
RUN npm install --production
RUN npm i -D express compression morgan

# Copy compiled JS server and build outputs
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/devops/server.ts /app/server.ts


# Run the compiled server
CMD ["node", "server.ts"]
