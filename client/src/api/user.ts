import api from "./axios";

 export const getUser = () => api.get("/user/me")
