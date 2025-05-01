export interface Member {
  _id?: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  bio?: string;
  skills?: string[] | string;
  profileImage?: string;
  joinDate?: string;
}

export interface AddMemberFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  skills: string;
  profileImage: File | null;
}