# ==========================================
# Stage 1: Build the React application
# ==========================================
FROM node:24-alpine AS builder
# 1. Setting the working directory to the app folder.
WORKDIR /app
# 2. Copy the entire project into the container.
COPY . .
# 3. Install all dependencies at the root level. This ensures that the package
#    manager is able to go into the shared packages folder.
RUN npm install
# 4. Specifically build the web app.
WORKDIR /app/apps/web
RUN npm run build

# ==========================================
# Stage 2: Serve the application with Nginx
# ==========================================
FROM nginx:alpine
# 1. Remove the default nginx configuration to avoid conflicts.
RUN rm /etc/nginx/conf.d/default.conf
# 2. Copy the custom nginx configuration file into the container.
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# 3. Copy the built static files from the builder stage to the nginx html
#    directory.
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# 4. Expose port 80 to allow access to the web server.
EXPOSE 80

# 5. Start nginx when the container runs.
CMD ["nginx", "-g", "daemon off;"]