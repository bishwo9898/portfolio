# 🚀 Modern Portfolio Website

A beautiful, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a contact form with nodemailer integration, smooth animations, and full dark mode support.

## ✨ Features

- 🎨 Modern, clean, and professional design
- 📱 Fully responsive across all devices
- 🌓 Dark mode support
- 💌 Working contact form with email integration
- ⚡ Fast page loads with Next.js 16
- 🎭 Smooth animations and transitions
- 📊 Project showcase section
- 🛠️ Skills display with categorized tech stack
- 🎯 Interactive navigation with smooth scrolling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository (or you're already here!)

2. Install dependencies:

```bash
npm install
```

3. Set up email configuration:
   - Copy `.env.local.example` to `.env.local`
   - Add your email credentials (see Email Setup section below)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📧 Email Setup

To enable the contact form:

1. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

2. For Gmail users:
   - Enable 2-factor authentication on your Google account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Add your credentials to `.env.local`:

   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ```

3. For other email providers, update the service in `src/app/api/contact/route.ts`

## 🎨 Customization

### Personal Information

Edit `src/app/page.tsx` to update:

- Your name (line 153)
- Profile photo (line 140-143, uncomment and add your image)
- Bio and description
- Contact information
- Social media links
- Project details
- Skills and technologies

### Add Your Profile Photo

1. Add your image to the `/public` folder (e.g., `profile.jpg`)
2. Uncomment line 143 in `page.tsx` and update:

```tsx
<Image src="/profile.jpg" alt="Your Name" fill className="object-cover" />
```

### Colors and Styling

The design uses a gradient color scheme with blue, indigo, and purple tones. To customize:

- Edit Tailwind classes in components
- Modify `globals.css` for global styles
- Update gradient colors throughout `page.tsx`

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # Contact form API endpoint
│   │   ├── globals.css            # Global styles & animations
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main portfolio page
│   └── ...
├── public/                        # Static assets
├── .env.local.example             # Environment variables template
└── package.json
```

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Nodemailer](https://nodemailer.com/) - Email functionality
- [Geist Font](https://vercel.com/font) - Typography

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Make sure to add your environment variables to the deployment platform.

## 📝 License

This project is open source and available for personal use. Feel free to customize it for your own portfolio!

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you have suggestions for improvements, please open an issue or submit a pull request.

## 💡 Tips

- Replace placeholder text with your actual information
- Add real project screenshots or demos
- Link to your actual GitHub and social media profiles
- Keep your resume PDF in the `/public` folder
- Test the contact form before deployment
- Optimize images before adding them

---

Built with ❤️ using Next.js and Tailwind CSS
