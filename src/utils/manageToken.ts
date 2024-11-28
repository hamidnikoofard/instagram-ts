export const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };
  
  export const setToken = (token: string) => {
    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  };
  
  export const removeToken = () => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
  