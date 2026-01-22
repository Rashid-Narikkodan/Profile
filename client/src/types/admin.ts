import type { PublicUser } from "./user";

export type FetchUserResponse = {
  success: true;
  user: PublicUser;
};
export type ToggleUserStatusResponseType = {
  success: true;
  message: string;
  data: PublicUser;
};
export type DeleteUserResponseType = {
  userId: string;
  data: {
    success: true;
    message: string;
  };
};
export type FetchUsersResponse = {
  success: true;
  users: PublicUser[];
  meta: {
    page: string;
    limit: string;
    total: string;
    search: string;
  };
};
