import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100, // จำลองคนเข้าพร้อมกัน 100 คน
    duration: '1m',
};

export default function () {
    // เปลี่ยนจาก <YOUR_APP_URL> เป็น localhost:31023
    http.get('http://localhost:31023/');
    sleep(1);
}