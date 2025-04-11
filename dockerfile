# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first
COPY package.json ./


# Install all dependencies (including dev dependencies for building)
RUN npm install

# Copy necessary config files for TypeScript and tsoa
COPY tsconfig.json tsoa-config.json ./

# Copy the entire project
COPY . .

# Build TypeScript code before running
RUN npm run build

# Expose the application's port
EXPOSE 4201

# Start the app
CMD ["node", "dist/index.js"]
