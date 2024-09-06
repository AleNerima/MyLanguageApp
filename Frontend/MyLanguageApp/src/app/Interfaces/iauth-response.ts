import { IUsers } from "./iusers";

export interface IAuthResponse {
  accessToken: string;
  user: IUsers;
}
