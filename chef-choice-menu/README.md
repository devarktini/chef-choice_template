# Chef Choice Menu - Enhanced Next.js Website

A stunning, fully animated website for Chef Choice Menu with custom color palette, SVG backgrounds, and image/video integration.

## 🎨 Enhanced Features

### New Additions
1. **Custom Color Palette** - Based on golden/orange (#EBBA68) from provided image
2. **Animated Components** - Smooth fade, slide, scale animations throughout
3. **SVG Backgrounds** - Floating chef hats, utensils, food icons
4. **Image Integration** - High-quality food/chef images from Unsplash
5. **Video Section** - Interactive video placeholder with play button
6. **Advanced Hover Effects** - Scale, shine, and transform effects
7. **Gradient Overlays** - Beautiful color transitions
8. **Background Patterns** - Dots, grids, and wave patterns

### Color Palette
- **Primary**: #E5A855 (Golden Orange)
- **Accent**: #D14545 (Warm Red)
- **Warm**: #E67E22 (Deep Orange)
- **Cream**: #FFF8E7 (Soft Cream)
- **Earth**: #5D4037 (Brown)
- **Fresh**: #27AE60 (Green)

## 📦 Complete Package Includes

### 9 Fully Designed Pages
1. **Home** (`/`) - Hero, Video, Services, Booking Steps, Occasions, Testimonials, FAQ
2. **About** (`/about`) - Company story with images, stats, team
3. **Services** (`/service`) - Service showcase with images
4. **Blog** (`/blog`) - Blog grid with images
5. **Contact** (`/contact`) - Contact form with animated cards
6. **Book Chef** (`/book-chef`) - Interactive booking interface
7. **Privacy** (`/privacy`) - Privacy policy
8. **Terms** (`/terms`) - Terms & conditions
9. **Disclaimer** (`/disclaimer`) - Disclaimer page

### Components
- Animated Header with scroll effects
- Enhanced Footer with SVG background
- SVG Background Components (Chef Hat, Food, Utensils, Spices, Plates)
- Floating animations
- Image hover effects
- Card shine effects

### Animations
- Fade in/out
- Slide up/down/left/right
- Scale in
- Bounce slow
- Float
- Pulse glow
- Hover transforms

## 🚀 Installation

```bash
# Extract the zip file
cd chef-choice-menu

# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📸 Image Sources

All images use Unsplash API with fallback placeholders:
- Chef cooking images
- Food photography
- Event catering
- Restaurant ambiance
- Professional chefs

### Image URLs Format
```
https://images.unsplash.com/photo-[ID]?w=[WIDTH]&h=[HEIGHT]&fit=crop
```

## 🎥 Video Integration

Video section includes:
- Thumbnail with overlay
- Play button with hover effects
- Video duration badge
- Stats overlay
- Click to play functionality

## 🎨 SVG Backgrounds

Floating animated SVGs:
- Chef Hat
- Food Ingredients
- Utensils (Fork & Spoon)
- Spice Containers
- Plates & Bowls

All SVGs are:
- Lightweight
- Animated with float effect
- Positioned strategically
- Low opacity for subtlety

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons
- Responsive images
- Mobile menu with animations

## 🔧 Technologies

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling + custom animations
- **Framer Motion** - Advanced animations (optional)
- **Lucide React** - Icons
- **Next Image** - Optimized images

## 🎯 Performance

- Lazy loading images
- Optimized animations
- CSS-only effects (no JS overhead)
- Minimal bundle size
- Fast page loads

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* your colors */ },
  // Add more...
}
```

### Add More Images
Use Unsplash API or replace with your own:
```tsx
<Image 
  src="https://your-image-url.com" 
  alt="Description"
  width={800}
  height={600}
/>
```

### Modify Animations
Edit `app/globals.css`:
```css
@keyframes yourAnimation {
  /* keyframes */
}
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel deploy
```

## 🌟 Features Checklist

✅ Custom golden color palette
✅ Animated components
✅ SVG backgrounds
✅ Image integration
✅ Video section
✅ Hover effects
✅ Responsive design
✅ 9 complete pages
✅ Smooth transitions
✅ Professional gradients
✅ Background patterns
✅ Loading states

## 📞 Support

Email: info@chefchoicemenu.com
Phone: +91 85 959 039 39

## 📄 License

© 2024 Chef Choice Menu. All rights reserved.
