import React from "react";

export const DeviceContext = React.createContext({} as DeviceDetailsContext);
export const UserContext = React.createContext({} as iAuthContext);

interface DeviceDetailsContext {
  biometrics: boolean;
}

interface iAuthContext {
  user: User;
  setUser: (user: User) => void;
}

type User = {
  username: string;
  password: string;
};
