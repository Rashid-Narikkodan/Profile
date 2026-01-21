export interface Avatar{
    url:string;
    publicId:string
}
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  avatar?:Avatar;
  phone?:string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}