export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
export interface AuthUser{
  id:string,
  email:string,
  role:'admin'|'user'
  status:'active'|'inactive'
}