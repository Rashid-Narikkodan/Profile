export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  profileImg:string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
}