# Build stage
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files from builder stage to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for Nginx server
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]