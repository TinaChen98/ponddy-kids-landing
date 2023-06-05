export interface UserResponseInterface {
  email: any;
  image: any;
  url: any;
  username: any;
  uuid: any;
}

export interface UserStateResponseInterface {
  email: any;
  is_valid: any;
}

export interface UserRegisterResponseInterface {
  email: any;
}

export interface UserVerifyResponseInterface {
  email: any;
  code: any;
  uuid: any;
  jwt: any;
}

export interface UserLoginResponseInterface {
  token: any;
  uuid: any;
}

export interface UserTokenResponseInterface {
  token: any;
  uuid: any;
  urls: any;
}
