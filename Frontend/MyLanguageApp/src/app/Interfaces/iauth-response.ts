import { IUsers } from "./iusers";

export interface IAuthResponse {
  token: string;
  user: IUsers;
}
