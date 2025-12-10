
export const getAdminToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

export const isAdminLoggedIn = () => !!getAdminToken();
