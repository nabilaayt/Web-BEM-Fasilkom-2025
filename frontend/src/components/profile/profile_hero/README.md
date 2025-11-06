# Profile Hero Component

Hero section dengan layout foto mosaic di kiri dan kanan text.

## 📸 Cara Mengganti Foto

### Opsi 1: Gunakan Foto Lokal

1. **Simpan foto** di folder `frontend/public/assets/hero/`
   - Buat folder jika belum ada
   - Nama file: `photo-1.jpg`, `photo-2.jpg`, dst.
   - Total: 10 foto

2. **Update array di `index.jsx`:**

```jsx
const defaultImages = [
  '/assets/hero/photo-1.jpg',
  '/assets/hero/photo-2.jpg',
  '/assets/hero/photo-3.jpg',
  '/assets/hero/photo-4.jpg',
  '/assets/hero/photo-5.jpg',
  '/assets/hero/photo-6.jpg',
  '/assets/hero/photo-7.jpg',
  '/assets/hero/photo-8.jpg',
  '/assets/hero/photo-9.jpg',
  '/assets/hero/photo-10.jpg',
];
```

### Opsi 2: Pass Images via Props

Dari parent component (misal `ProfilePage.jsx`):

```jsx
const heroImages = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  // ... total 10 images
];

<ProfileHero images={heroImages} />
```

## 🎨 Customization

### Mengubah Text

```jsx
<ProfileHero 
  titleMain="Custom welcome text"
  cabinetName="CUSTOM CABINET NAME"
  description="Your custom description here..."
/>
```

### Mengubah Layout Foto

Edit di `index.jsx`:

```jsx
const leftPhotos = [
  { size: 'w-32 h-40', rotation: '-rotate-6', delay: '0' },
  // ... tambah/edit sesuai kebutuhan
];
```

## 📱 Responsive

- **Desktop**: Foto di kiri & kanan text
- **Mobile**: Foto di atas text, layout horizontal

## 🎯 Features

- ✅ Smooth animations (fade in, scale)
- ✅ Hover effects (scale up, rotate to 0°)
- ✅ Glassmorphism effect pada text box
- ✅ Lazy loading images
- ✅ Responsive design
- ✅ Placeholder fallback (Unsplash)

## 🔧 Tech Stack

- React
- Tailwind CSS
- Custom CSS animations
