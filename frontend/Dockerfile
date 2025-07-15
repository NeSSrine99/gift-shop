# استخدم صورة node الرسمية
FROM node:18

# أنشئ مجلد عمل داخل الحاوية
WORKDIR /app

# نسخ ملفات package.json و lock (لو موجود)
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي المشروع
COPY . .

# بناء التطبيق
RUN npm run build

# تحديد المنفذ
EXPOSE 3000

# الأمر لتشغيل التطبيق
CMD ["npm", "start"]
