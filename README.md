# Book Catalog App

A modern, full-stack web application built with Next.js that allows users to create, manage, and discover book collections. Users can sign up, authenticate via Google or email/password, and maintain their personal book libraries while exploring books shared by the community.

## 🚀 Features

- **User Authentication**: Google OAuth and email/password authentication using NextAuth.js
- **Personal Book Management**: Add, view, and delete books from your personal collection
- **Community Discovery**: Browse all books shared by the community on the home page
- **Individual Book Views**: Detailed view pages for each book with author, genre, and publication information
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Type-Safe**: Built with TypeScript and centralized type definitions
- **Database Integration**: PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js for authentication
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google Provider and Credentials Provider
- **Styling**: Tailwind CSS with custom components
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
- PostgreSQL database
- Google OAuth credentials (for Google authentication)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd book-catalog-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/book_catalog"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Setup

1. Set up your PostgreSQL database and update the `DATABASE_URL` in your `.env` file

2. Run Prisma migrations:
```bash
npx prisma migrate deploy
npx prisma generate
```

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

## 📱 Application Features

### Authentication
- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional registration and login system
- **Session Management**: Secure session handling with NextAuth.js
- **Protected Routes**: Automatic redirection for unauthenticated users

### Book Management
- **Add Books**: Create new book entries with title, author, and genre
- **View Collections**: Browse your personal book collection
- **Delete Books**: Remove books from your collection
- **Book Details**: View detailed information about individual books

### Community Features
- **Public Discovery**: Browse books shared by all users on the home page
- **User Attribution**: See who added each book to the community
- **Book Sharing**: Your books are automatically shared with the community

## 🏗️ API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `GET /api/auth/[...nextauth]` - NextAuth.js authentication handling

### Books
- `GET /api/books` - Get authenticated user's books
- `POST /api/books` - Create a new book (authenticated)
- `GET /api/books/all` - Get all books from all users (public)
- `GET /api/books/[id]` - Get individual book details
- `DELETE /api/books/[id]` - Delete a book (authenticated, owner only)

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

The application uses the following main models:
- **User**: User accounts with authentication details
- **Book**: Book entries with title, author, genre, and relationships
- **Account/Session**: NextAuth.js authentication tables

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For deployment:
1. Set up your environment variables in your hosting platform
2. Configure your PostgreSQL database
3. Run database migrations in production
4. Deploy your application

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication for Next.js
- [Prisma Documentation](https://www.prisma.io/docs/) - Database ORM and migrations
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
