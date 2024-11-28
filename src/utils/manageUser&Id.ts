const getUser = () => localStorage.getItem("username");
const setUser = (username:string) => localStorage.setItem("username", username);
const removeUser = () => localStorage.removeItem("username");
const getId = () => localStorage.getItem("id");
const setId = (id:string) => localStorage.setItem("id", id);
const removeId = () => localStorage.removeItem("id");
export { getUser, setUser, removeUser , getId , setId , removeId };