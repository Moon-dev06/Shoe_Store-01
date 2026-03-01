import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//     vus: 1, // จำลองคนเข้าพร้อมกัน 100 คน
//     duration: '1m',
// };

// export default function () {
//     // เปลี่ยนจาก <YOUR_APP_URL> เป็น localhost:31023
//     // http.get('http://localhost:31023');
//     http.get('http://localhost:31023/api/health');
//     sleep(1);
// }

export const options = {
  vus: 10, // จำลองผู้ใช้ 10 คนพร้อมกัน
  duration: '30s', // ทดสอบเป็นเวลา 30 วินาที
};

export default function () {
  // ยิงไปที่ IP/Port ของ Backend ที่รันอยู่ (เช่น localhost:5000 หรือ NodePort 31023)
  http.get('http://localhost:5000/api/products'); 
  sleep(1);
}