# Book Catalog App - Scaylar Technologies Challenge

A full-stack web application built with Next.js for the **Scaylar Technologies Associate Software Engineer Challenge**. This application demonstrates proficiency in building scalable applications with user authentication, database integration, and modern web development practices.

## 📋 Challenge Overview

**Company:** Scaylar Technologies  
**Position:** Associate Software Engineer  
**Deadline:** 4-5 days  
**Objective:** Build a full-stack book catalog app with PostgreSQL and NextAuth.js authentication

### Challenge Requirements Met ✅

- ✅ **Backend API** (Next.js + Prisma)
- ✅ **Authentication** (NextAuth.js)
- ✅ **TypeScript Usage**
- ✅ **Code Structure & Organization**
- ✅ **UI Design & UX**
- ✅ **Deployment**

## 🌐 Live Demo

**Visit the live application:** [https://book-catalog-app-new.vercel.app/](https://book-catalog-app-new.vercel.app/)

**GitHub Repository:** [https://github.com/fahd-111/Book-Catalog-App](https://github.com/fahd-111/Book-Catalog-App)

Experience all features including:
- Google OAuth authentication
- Email/password registration and login
- Personal book collection management
- Community book discovery
- Responsive design across all devices

## 🚀 Features Implemented

### Core Requirements ✅
- **User Authentication**: Google OAuth and email/password authentication using NextAuth.js
- **Book Management**: Add, view, and delete books from your personal collection
- **Database Integration**: PostgreSQL (Neon) database with Prisma ORM
- **Responsive Design**: Mobile-friendly interface optimized for mobile and desktop
- **Type Safety**: Built with TypeScript throughout the application

### Additional Features 🌟
- **Community Discovery**: Browse all books shared by the community on the home page
- **Individual Book Views**: Detailed view pages for each book with author, genre, and publication information
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Error Handling**: Comprehensive error handling for authentication and API operations
- **Loading States**: User-friendly loading indicators throughout the app

## 🛠️ Tech Stack used

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password + Google OAuth)
- **Database**: PostgreSQL hosted via Neon (Serverless)
- **ORM**: Prisma
- **Deployment**: Vercel Platform with automated CI/CD
- **Styling**: Tailwind CSS with responsive design
- **Password Hashing**: bcryptjs for secure password storage

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── books/         # Book management endpoints
│   ├── books/             # Book-related pages
│   │   ├── add/           # Add new book page
│   │   └── view/[id]/     # Individual book view
│   ├── auth/              # Authentication page
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   └── prisma.ts          # Prisma client
├── types/                 # TypeScript type definitions
│   └── index.ts           # Centralized type exports
└── globals.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon PostgreSQL database (free serverless PostgreSQL)
- Google OAuth credentials (for Google authentication)
- Vercel account (for deployment)

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/fahd-111/Book-Catalog-App-.git
cd book-catalog-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"  # Use your production URL for deployment
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Setup

1. **Create a Neon Database:**
   - Sign up at [Neon](https://neon.tech/)
   - Create a new project
   - Copy the connection string to your `.env` file as `DATABASE_URL`

2. **Run Prisma migrations:**
```bash
npx prisma migrate deploy
npx prisma generate
```

3. **Seed the database (optional):**
```bash
npx prisma db seed
```

### Google OAuth Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Set authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.vercel.app/api/auth/callback/google` (production)
   - Copy Client ID and Client Secret to your `.env` file

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📱 Frontend Pages (App Router)

### Challenge Requirements Implementation ✅

#### Home Page (/)
- ✅ Fetches and displays all books using client-side rendering
- ✅ Card-based layout with Tailwind CSS styling
- ✅ Responsive design for mobile and desktop
- ✅ Shows books from all users in the community

#### Add Book Page (/books/add)
- ✅ Form with inputs for title, author, and genre
- ✅ Input validation before submission
- ✅ Redirects to books page after successful submission
- ✅ Error handling and user feedback

#### Authentication Pages
- ✅ **Login/Signup Page (/auth)**: Combined page with toggle between login and signup
- ✅ **Email/Password Authentication**: Full credentials-based authentication
- ✅ **Google OAuth**: One-click Google sign-in integration
- ✅ **User Profile**: Shows user details and logout functionality when logged in
- ✅ **Protected Routes**: Automatic redirection for unauthenticated users

#### Additional Pages
- ✅ **My Books (/books)**: Personal book collection management
- ✅ **Book Details (/books/view/[id])**: Individual book view pages
- ✅ **Delete Functionality**: Delete buttons on each book entry

### Responsive Design
- ✅ 70%+ responsive for mobile devices (iPhone, Android)
- ✅ Optimized desktop views
- ✅ Tailwind CSS responsive utilities
- ✅ Touch-friendly interface elements

## 🏗️ API Endpoints (Challenge Requirements)

### Authentication
- `POST /api/auth/signup` - Create new user account
- `GET /api/auth/[...nextauth]` - NextAuth.js authentication handling

### Books (Core Challenge Routes)
- `GET /api/books` - Get authenticated user's books
- `POST /api/books` - Add a new book (authenticated)
- `DELETE /api/books/[id]` - Delete a book (authenticated, owner only)

### Additional Routes
- `GET /api/books/all` - Get all books from all users (public)
- `GET /api/books/[id]` - Get individual book details

## 🎨 Styling and UI

The application uses Tailwind CSS for styling with:
- Custom color schemes and responsive design
- Hover effects and smooth transitions
- Modern card-based layouts
- Mobile-first responsive design principles

## 🔧 Type Safety

The application features centralized TypeScript definitions in `src/types/index.ts`:
- **User Types**: User, Account, Session interfaces
- **Book Types**: Book, BookWithUser interfaces
- **Form Types**: BookFormData, SignupFormData, LoginFormData
- **API Types**: Standardized API response interfaces

## 📄 Database Schema

The application uses the following main models with Neon PostgreSQL:

### User Model
```prisma
model User {
  id       String   @id @default(cuid())
  name     String?
  email    String   @unique
  googleId String?  @unique
  password String?  // Only used for CredentialsProvider
  books    Book[]
  accounts Account[]
  sessions Session[]
}
```

### Book Model
```prisma
model Book {
  id        String   @id @default(cuid())
  title     String
  author    String
  genre     String
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

### NextAuth Models
- **Account**: OAuth account information
- **Session**: User session management
- **VerificationToken**: Email verification tokens

## 🚀 Deployment

The application is deployed on Vercel with the following setup:

### Vercel Deployment

1. **Connect Repository:**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect it's a Next.js project

2. **Environment Variables:**
   Set the following environment variables in Vercel dashboard:
   ```env
   DATABASE_URL=your-neon-postgres-connection-string
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Database Migration:**
   - Vercel will automatically run `npx prisma generate` during build
   - For migrations, use: `npx prisma migrate deploy`

4. **Google OAuth Configuration:**
   - Update authorized redirect URIs in Google Cloud Console
   - Add: `https://your-app.vercel.app/api/auth/callback/google`

### Live Application (Challenge Deliverables)

- ✅ **Production URL**: [https://book-catalog-app-new.vercel.app/](https://book-catalog-app-new.vercel.app/)
- ✅ **GitHub Repository**: [https://github.com/fahd-111/Book-Catalog-App](https://github.com/fahd-111/Book-Catalog-App)
- ✅ **Database**: Neon PostgreSQL (Serverless)
- ✅ **Authentication**: Google OAuth + Credentials working in production
- ✅ **Automatic Deployments**: Connected to GitHub for CI/CD
- ✅ **Environment Variables**: Properly configured in Vercel
- ✅ **All Features Working**: Authentication, CRUD operations, responsive design

### Build and Deploy Commands

```bash
# Build the application
npm run build

# Start production server
npm start

# Database operations
npx prisma migrate deploy
npx prisma generate
```


## 🚨 Troubleshooting

### Common Issues

1. **OAuth Errors**: 
   - Verify Google OAuth credentials and redirect URIs
   - Check NEXTAUTH_URL matches your domain

2. **Database Connection**:
   - Ensure Neon database connection string is correct
   - Verify SSL mode is enabled

3. **Build Errors**:
   - Run `npx prisma generate` after schema changes
   - Clear `.next` folder and rebuild

4. **Environment Variables**:
   - Double-check all required environment variables are set
   - Ensure production and development URLs are correct


