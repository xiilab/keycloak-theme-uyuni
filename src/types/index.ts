export type PAGE = 'viewProfile' | 'editProfile' | 'changePW'

export type USER = {
  id: string
  createdTimestamp: number
  username: string
  enabled: boolean
  totp: boolean
  emailVerified: boolean
  firstName: string
  lastName: string
  email: string
  disableableCredentialTypes: any[]
  requiredActions: any[]
  notBefore: number
  realmRoles?: any[]
  credentials?: CREDENTIALS[]
}

export type CREDENTIALS = {
  type: 'password'
  value: string
  temporary: false
}
