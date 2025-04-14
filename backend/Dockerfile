# 🔧 First stage: build the app (compile TypeScript to JavaScript)
FROM node:20-alpine as builder

# 📁 Set working directory inside the build container
WORKDIR /app

# 📦 Copy package files to install dependencies
COPY package*.json ./

# 🧰 Install all dependencies (including devDependencies for build tools)
RUN npm install

# 📄 Copy all source code into the container
COPY . .

# 🛠️ Build the app (compile TypeScript to dist/)
RUN npm run build


# 🚀 Second stage: production container (clean and optimized)
FROM node:20-alpine

# 📁 Set working directory for the production app
WORKDIR /usr/src/app/backend

# 📦 Copy package files to install only production dependencies
COPY package*.json ./
RUN npm install --production

# 📦 Copy the built app (compiled JS only) from the builder stage
COPY --from=builder /app/dist ./dist

# 🌐 Expose the app ports (3000 for HTTP, 3030 if needed for WebSocket, etc.)
EXPOSE 3000
EXPOSE 3030

# ▶️ Start the app by running the compiled entry point
CMD ["node", "dist/main"]
