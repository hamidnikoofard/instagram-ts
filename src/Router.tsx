import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <Login />
    },
    {
        path : "/auth/sign-up",
        element : <SignUp />
    },
    {
        path :"/profile",
        element : <Profile />
    }
])