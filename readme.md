# ⚛️ Krypton

A modern chemistry learning platform built for any student — structured learning and conceptual understanding over mechanical memorization.

[![Live Site](https://img.shields.io/badge/Live-krypton181.vercel.app-F59E0B?style=for-the-badge&logo=vercel&logoColor=white)](https://krypton181.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better%20Auth-18181B?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-18181B?style=for-the-badge)

---

## 🌍 About

Krypton was built to make chemistry easier, clearer, and more engaging to learn. Instead of overwhelming students with memorization, the platform presents material in a logical, step-by-step structure that supports real understanding — built end-to-end as a full-stack application, not a static template.

Krypton helps students:

- Understand chemistry concepts step-by-step
- Build analytical and critical thinking skills
- Learn through clear, structured explanations
- Explore chemistry through interactive resources

---

## 🧩 Core Features

**Learning experience**
- Browsable Resources, Projects, and Tasks, organized by category
- Real-time search across titles and descriptions
- Filtering by language and grade level
- Per-user saved/bookmarked resources, persisted to the database

**Accounts & authentication**
- Email/password authentication via Better Auth, backed by custom Next.js route handlers
- Email verification flow with automated transactional emails via Nodemailer
- Resend-verification with cooldown handling
- Guest access for browsing without an account
- Full account management — password changes, logout, account deletion

**Interface**
- Fully custom dark theme with a consistent design system across every page
- Fully responsive layout — distinct mobile, tablet, and desktop behavior throughout
- Custom slide-in mobile navigation
- Accessible interactive states (keyboard focus rings, `aria` labeling) on every control

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
| -------------- | ------------------------------------ |
| Framework      | Next.js (App Router, Route Handlers) |
| Language       | TypeScript                           |
| Styling        | Tailwind CSS                         |
| Database       | MongoDB                              |
| Authentication | Better Auth                          |
| Email          | Nodemailer                           |
| Deployment     | Vercel                               |

---

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── verify-email/
├── (main)/
├── api/
components/
├── Header.tsx
├── HeaderNav.tsx
├── HeaderMobileMenu.tsx
├── Footer.tsx
├── Filter.tsx
├── FilterControls.tsx
├── SearchBar.tsx
├── ResourceCard.tsx
└── SaveButton.tsx
lib/
public/
└── navIcons/
```

---

## 🎯 Goal

Krypton's goal is to turn chemistry from a difficult, overwhelming subject into something intuitive and genuinely interesting to learn. The platform aims to:

- Support students at every level
- Improve access to clear educational material
- Simplify difficult chemistry concepts
- Encourage curiosity and critical thinking

---

## 👤 Developer

Built by **Levani Kapanadze**
[Socials](https://my-contacts-hazel.vercel.app)

---

## 📄 License

This project is currently private and developed for educational purposes.
