# ใช้ Nginx Alpine เพราะมีขนาดเล็กและปลอดภัย
FROM nginx:alpine

# ลบไฟล์ default ของ nginx ออกก่อน
RUN rm -rf /usr/share/nginx/html/*

# คัดลอกไฟล์หน้าเว็บของคุณทั้งหมด (html, css, js) เข้าไปในกล่อง
COPY . /usr/share/nginx/html

# เปิด port 80 สำหรับการเรียกใช้งานเว็บ
EXPOSE 80

# สั่งให้ nginx รัน
CMD ["nginx", "-g", "daemon off;"]