export interface DecodedToken {
  email: string;
  role: 'admin' | 'user';
  exp: number; 
}
