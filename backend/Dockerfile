# Use an official Node.js image as a base
FROM node:18

# Install Java (OpenJDK 17)
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile and run the Java code directly
CMD ["sh", "-c", "javac Main.java && java Main"]

# Expose port if needed for other services
EXPOSE 5000
