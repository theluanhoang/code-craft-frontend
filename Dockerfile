# Sử dụng Node.js phiên bản 18
FROM node:18

# Cài đặt các dependencies hệ thống cần thiết
RUN apt-get update && apt-get install -y \
  libcairo2-dev \
  libjpeg-dev \
  libpango1.0-dev \
  libgif-dev \
  librsvg2-dev \
  && apt-get clean

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache layer
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Kiểm tra và build dự án
RUN npm run build || { echo "Build failed! Check the logs above."; exit 1; }

# Expose cổng để ứng dụng có thể được truy cập
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
