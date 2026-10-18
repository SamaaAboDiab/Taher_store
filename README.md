# T Hour — ساعات وإكسسوارات

موقع React + React Router + Tailwind CSS v4 + Lucide icons، بواجهة عربية
بالكامل (RTL)، مع أنيميشن AOS للسكرول وبانر رئيسي متحرك بمكتبة anime.js.

## التشغيل

```
npm install
npm run dev
```

بعدين افتح الرابط اللي هيظهر (غالبًا http://localhost:5173).

## الهيكل

- `src/data/products.js` — كتالوج المنتجات ("API" وهمي: `fetchProducts`,
  `fetchProductById`). غيّر روابط الصور هنا بصور منتجاتك الحقيقية — كل
  كارت، البانر، وصفحة المنتج بيقروا من الملف ده.
- `src/pages/` — الرئيسية، المتجر (فلاتر + ترتيب)، تفاصيل المنتج،
  إكسسوارات، السلة.
- `src/components/` — Navbar، HeroBanner (البانر المتحرك)، CategoryStrip،
  ProductCard، WhyUs، Newsletter، Footer.
- `src/context/CartContext.jsx` — سلة بسيطة (إضافة/حذف/عدد).

## ملاحظات

- كل صور الساعات والإكسسوارات حاليًا صور Unsplash placeholder — غيّرها
  بصور منتجاتك الحقيقية في `src/data/products.js`، من غير ما تحتاج تعدل
  أي حاجة تانية.
- نظام الألوان والخطوط والمسافات متعرّف مرة واحدة في `src/index.css` تحت
  `@theme` — لو عايز تغيّر شكل الموقع كله، غيّر من هنا.
- الموقع RTL بالكامل (عربي)، والخطوط المستخدمة: Cairo للعناوين وTajawal
  للنصوص.
- بناء نسخة الإنتاج: `npm run build`، والناتج هيبقى في `dist/`.
