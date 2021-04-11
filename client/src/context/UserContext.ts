import { createContext } from "react";

export type UserContextType = {
    token?: string,
    refreshToken?: string,
    updateToken: (token: string, refreshToken: string) => void,
    updateRefreshToken: (refreshToken: string) => void,
};

export const UserContext = createContext<UserContextType>({
    token: null,
    refreshToken: null,
    updateToken: () => {},
    updateRefreshToken: () => {},
  });