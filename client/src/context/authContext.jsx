import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();
    const register = async (data) => {
        await api.post("/auth/register", data).then((res) => {
            toast.success(res.data.message);
            navigate("/");
        }).catch((err) => {
            toast.error(err.response.data.message);
            console.log(err);
        })
    }
    const login = async (data) => {
        await api.post("/auth/login", data).then((res) => {            
            setUser(res.data.user);
            setToken(res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            navigate("/");
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }
    const logout = async () => {
        await api.post("/auth/logout").then((res) => {
            toast.success(res.data.message);
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }
    return (
        <AuthContext.Provider value={{register, login, user,logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}