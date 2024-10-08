export interface UserInfo {
  userName: string;
  fullName?: string;
  password?: string;
  token: string;
  isLoggedIn: boolean;
  permission: Permission[];
}

export interface Permission {
  code: string;
  name: string;
  description?: string;
}
