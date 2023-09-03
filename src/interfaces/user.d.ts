export interface IUserEmailLogin {
  email: string;
  password: string;
}

export interface IUserEmailSignup {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

export interface IUserProfile {
  id: number;
  username: string;
  email: string;
  avatar: string;
  subscriptionLevel: number;
  userSetting: any;
  createTime: string;
  updateTime: string;
}
