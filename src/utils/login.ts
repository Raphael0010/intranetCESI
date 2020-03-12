export const logged = (): void => {
  localStorage.setItem("login", "true");
};

export const storeUser = (data: string): void => {
  localStorage.setItem("user", data);
};

export const isLogged = (): boolean => {
  if (localStorage.getItem("login") === "true") {
    return true;
  } else {
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem("login");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return localStorage.getItem("user");
};
