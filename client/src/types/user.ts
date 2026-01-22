export interface Avatar{
    url:string;
    publicId:string
}
export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  avatar?:Avatar;
  phone?:string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export type EditUserInput={
  name?:string,
  email?:string,
  phone?:string
}