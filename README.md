# AndriaLife Portfolio - SSR/SSG Optimized

A modern, SEO-optimized portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This project has been migrated from Vite + React to Next.js to implement Server-Side Rendering (SSR) and Static Site Generation (SSG) for better SEO and ChatGPT accessibility.

## 🚀 Features

### SEO & Performance
- **Server-Side Rendering (SSR)** - Content is rendered on the server for better SEO
- **Static Site Generation (SSG)** - Pre-rendered pages for optimal performance
- **Comprehensive Metadata** - OpenGraph, Twitter Cards, and structured data
- **Sitemap Generation** - Automatic sitemap.xml generation
- **Robots.txt** - Search engine crawling instructions
- **PWA Support** - Web app manifest for mobile experience

### Technical Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **React Query** - Server state management

### Content Accessibility
- **JavaScript-Free Content** - Main content visible without JavaScript
- **Progressive Enhancement** - Enhanced experience with JavaScript
- **Semantic HTML** - Proper heading structure and landmarks
- **Alt Text** - Descriptive image alt text for screen readers

## 📁 Project Structure

```
AndriaLife/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (Server Component)
│   ├── sitemap.ts         # Sitemap generator
│   ├── robots.ts          # Robots.txt generator
│   └── globals.css        # Global styles
├── src/
│   ├── components/        # React components
│   │   ├── ClientLayout.tsx    # Client-side layout wrapper
│   │   ├── HomePageClient.tsx  # Client-side home page
│   │   └── ...                 # Other components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── ...
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   └── ...
└── ...
```

## 🔧 SSR/SSG Implementation

### Server Components
- **Root Layout** (`app/layout.tsx`) - Server component with metadata
- **Home Page** (`app/page.tsx`) - Server component with SEO metadata
- **Sitemap** (`app/sitemap.ts`) - Dynamic sitemap generation
- **Robots** (`app/robots.ts`) - Dynamic robots.txt generation

### Client Components
- **ClientLayout** (`src/components/ClientLayout.tsx`) - Wraps interactive features
- **HomePageClient** (`src/components/HomePageClient.tsx`) - Client-side content

### SEO Optimizations

#### Metadata Structure
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Andria Gvaramia - iOS Developer & Mathematician',
    template: '%s | Andria Gvaramia'
  },
  description: 'iOS Developer, Mathematician, and Technology Enthusiast...',
  keywords: ['iOS Developer', 'Mathematician', 'Mobile App Development', ...],
  openGraph: {
    type: 'website',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: '...',
    images: [{ url: '/me.PNG', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    images: ['/me.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### Sitemap Generation
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://andrialife.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ... more routes
  ]
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://andrialife.com
```

## 📊 SEO Benefits

### Before (Client-Side Rendering)
- ❌ Content not visible to search engines
- ❌ ChatGPT cannot access page content
- ❌ Poor Core Web Vitals
- ❌ No structured data

### After (Server-Side Rendering)
- ✅ Content fully accessible to search engines
- ✅ ChatGPT can read and understand content
- ✅ Improved Core Web Vitals
- ✅ Rich structured data and metadata
- ✅ Automatic sitemap generation
- ✅ Optimized social media sharing

## 🔍 Testing SEO

### View Page Source
1. Right-click on the page
2. Select "View Page Source"
3. Verify content is present in HTML

### Google Search Console
1. Submit sitemap: `https://andrialife.com/sitemap.xml`
2. Monitor indexing status
3. Check Core Web Vitals

### Social Media Testing
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

## 🎯 Performance Optimizations

### Build Optimizations
- **Tree Shaking** - Unused code elimination
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Google Fonts optimization

### Runtime Optimizations
- **Server Components** - Reduced client bundle size
- **Streaming** - Progressive content loading
- **Caching** - Automatic static optimization

## 📱 PWA Features

### Manifest
- App name and description
- Icons for different sizes
- Theme colors
- Display mode

### Service Worker (Future)
- Offline functionality
- Background sync
- Push notifications

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### One-Command Setup
```bash
# Clone repository and setup everything in one command
git clone https://github.com/andriagv/AndriaLife.git && cd AndriaLife && npm install && npm run dev
```

### Manual Setup
```bash
# 1. Clone the repository
git clone https://github.com/andriagv/AndriaLife.git

# 2. Navigate to project directory
cd AndriaLife

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

### Available Scripts
```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Build & Production
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Export as static site

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Development Workflow
1. **Start Development**: `npm run dev`
2. **Open Browser**: http://localhost:3000
3. **Make Changes**: Edit files in `src/` or `app/`
4. **Hot Reload**: Changes appear automatically
5. **Build Test**: `npm run build` before committing

## 🔧 Development

### Code Quality
```bash
# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

### Performance Monitoring
- **Lighthouse** - Core Web Vitals
- **WebPageTest** - Performance testing
- **Google PageSpeed Insights** - SEO and performance

## 📈 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure build settings
3. Deploy automatically

### Other Platforms
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack hosting
- **DigitalOcean App Platform** - Container hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent SSR/SSG support
- Vercel for the deployment platform
- Tailwind CSS for the utility-first approach
- Radix UI for accessible components

---

**Note**: This migration ensures that your portfolio content is fully accessible to search engines, ChatGPT, and other AI tools, while maintaining the beautiful interactive experience for users.
