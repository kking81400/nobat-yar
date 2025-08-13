import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// اگر میخوای روی GitHub Pages منتشر کنی، base باید /نام-ریپو/ باشه
// برای مثال اگر ریپوی تو github.com/username/nobat-yar هست → base: '/nobat-yar/'
export default defineConfig({
    plugins: [react()],
    // base: '/nobat-yar/', // اینو تغییر بده بر اساس اسم ریپوی خودت
    server: {
        port: 5173,
        open: true,
    },
});
