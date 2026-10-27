# Smart Expense Tracker: a static site served by nginx.
# alpine-slim leaves out extras the site doesn't need (curl, brotli), so the image is smaller and has fewer CVEs.
FROM nginx:alpine-slim

# Only the three app files go into the image (see .dockerignore for what never reaches the build).
COPY index.html style.css script.js /usr/share/nginx/html/

EXPOSE 80
