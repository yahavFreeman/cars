# Step 1: Use the official Node.js image the app was created with
FROM node:20.11.1

# Step 2: Set working directory in the container
WORKDIR /usr/src/app

# Step 3: Install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Expose the correct port for Node.js app
EXPOSE 3001

# Step 6: Run the app
CMD ["npm","run", "start"]
