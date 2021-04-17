import { createContext } from "react";

export type UserType = {
    userId: number,
    name: string,
    role: string,
    emailAddress: string,
    phone: string,
};

export type UserContextType = {
    token?: string,
    refreshToken?: string,
    user?: UserType,
    updateToken: (token?: string, refreshToken?: string, user?: UserType) => void,
    updateRefreshToken: (refreshToken: string) => void,
};

export const UserContext = createContext<UserContextType>({
    token: null,
    refreshToken: null,
    user: null,
    updateToken: () => {},
    updateRefreshToken: () => {},
  });