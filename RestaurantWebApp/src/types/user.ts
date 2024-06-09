export interface UserInfo {
  username: string
  fullName?: string
  password?: string
  token: string
  isLoggedIn: string
  permission: Permission[]
}

export interface Permission {
  code: string
  name: string
  description?: string
}
