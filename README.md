# 🌱 LifeAtlas - Digital Life Lessons Platform

## 📖 Project Overview

LifeAtlas is a full-stack web application where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered from real-life experiences.

The platform encourages self-reflection, knowledge sharing, and community learning by allowing users to publish lessons publicly or privately, save favorite lessons, interact through likes and comments, and access premium content through a subscription system.

---

## 🚀 Live Website

🔗 Live URL: https://life-atlas-client.vercel.app/

---

## 🎯 Project Purpose

People often learn valuable lessons throughout life but eventually forget many of them. LifeAtlas provides a centralized platform where users can:

- Preserve personal experiences and wisdom
- Learn from other people's life lessons
- Track personal growth
- Save meaningful lessons for future reference
- Access premium educational content

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Email & Password Authentication
- Google Login Authentication
- Better Auth Integration
- Protected Routes
- Role-Based Access (User / Admin)

### 👤 User Features
- Create Life Lessons
- Upload Lesson Images (ImgBB Integration)
- Save Lessons to Favorites
- Like Lessons
- Comment on Lessons
- Update Existing Lessons
- Delete Lessons
- Manage User Profile

### 📚 Lesson Management
- Public & Private Visibility
- Free & Premium Access Levels
- Category Filtering
- Emotional Tone Filtering
- Search Functionality
- Pagination Support

### ⭐ Premium Features
- Stripe Payment Integration
- Premium Lesson Creation
- Access Premium Lessons
- Premium Badge System

### 🛠️ Admin Features
- Dashboard Analytics
- Manage Users
- Manage Lessons
- Feature Lessons
- Review Content
- Handle Reported Lessons
- Promote Users to Admin

### 📊 Dashboard
- User Statistics
- Saved Lessons Count
- Created Lessons Count
- Recent Activities
- Analytics Charts

### 🎨 UI/UX
- Fully Responsive Design
- Modern Dashboard Layout
- Loading States
- Custom 404 Page
- Toast Notifications
- DaisyUI Components
- Framer Motion Animations

---

## 🗄️ Database Collections

### Users
- name
- email
- image
- role
- plan
- isPremium

### Lessons
- title
- description
- category
- tone
- visibility
- access
- image
- likes
- likesCount
- savesCount
- creatorInfo

### Favorites
- lessonId
- userId
- savedAt

### Comments
- lessonId
- userId
- comment
- createdAt

### Reports
- lessonId
- reporterId
- reason
- createdAt

---

## 🛠️ Technologies Used

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- DaisyUI
- React Icons
- Framer Motion
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- Stripe

### Cloud Services
- ImgBB Image Hosting
- MongoDB Atlas
- Vercel Deployment

---

## 📦 NPM Packages Used

### Client Side

```bash
next.js
react
tailwindcss
daisyui
react-icons
react-toastify
framer-motion
rechart
better-auth
```

### Server Side

```bash
express
mongodb
cors
dotenv
better-auth
stripe
```


## 📱 Responsive Design

The application is fully optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---

## 🌟 Future Improvements

- Social Sharing
- PDF Export
- Activity Heatmap
- Lesson Streak Tracking
- AI Lesson Recommendations
- Dark / Light Theme Switcher

---

### Developed with ❤️ using Next.js, MongoDB, Better Auth & Stripe