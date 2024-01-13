import { User } from "./types";

export type MessageResponse = {
    success: boolean;
    message: string;

}

export type userResponse =  {
    success:boolean,
    user:User
}