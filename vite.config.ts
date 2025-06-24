import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// تأكد هذا السطر يحتوي على اسم المشروع داخل GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Tupac/', // <-- هذا اسم المستودع على GitHub
})
