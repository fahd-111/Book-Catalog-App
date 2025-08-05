export interface User {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  books?: Book[];
  accounts?: Account[];
  sessions?: Session[];
}


export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  userId: string;
  user?: User | null;
}


export interface BookWithUser {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  userId: string;
  user: {
    name: string;
  } | null;
}


export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string | null;
  expires_at?: number | null;
  refresh_token?: string | null;
  session_state?: string | null;
  user?: User;
}


export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user?: User;
}


export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}


export interface BookFormData {
  title: string;
  author: string;
  genre: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}


export interface ApiResponse<A = any> {
  data?: A;
  error?: string;
  message?: string;
}

export interface BookApiResponse extends ApiResponse<Book> {}
export interface BooksApiResponse extends ApiResponse<Book[]> {}
export interface UserApiResponse extends ApiResponse<User> {}
