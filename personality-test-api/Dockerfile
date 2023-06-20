# Use the official Node.js 14 base image
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port your NestJS application will be listening on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start"]
