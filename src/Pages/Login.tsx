import Input from "../Components/share/Input";
import Logo from "../assets/logos_instagram.png";
import Signupimg from "../assets/img/signup/1.png";
import Button from "../Components/share/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToken } from "../utils/manageToken";
import { setId, setUser } from "../utils/manageUser&Id";


interface FormInputType {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate()
  const resolver = yup.object(
    {
      username : yup.string().required("Please enter your username"),
      password : yup.string().required("Please enter your password")
    }
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputType>({
    resolver : yupResolver(resolver)
  });

  const submitForm = handleSubmit(async (data: FormInputType) => {
    try {
      const response = await axios.post(
        "https://instagram-backend-ugd3.onrender.com/api/user/login",
        {
          username: data.username,
          password: data.password,
        }
      );
      console.log(response);
      setToken(response.data.accessToken)
      setUser(response.data.data.username)
      setId(response.data.data._id)
      reset();

    } catch (error) {
      console.log(error);
    }finally{
      navigate("/profile")
    }
  });
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-[935px] mx-auto">
        <div className="hidden md:flex w-[380px] h-[580px]">
          <img src={Signupimg} alt="" className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-col items-center w-full md:w-[350px]">
          <div className="w-full p-8 bg-white border border-gray-300 rounded-lg shadow-sm">
            <img
              src={Logo}
              alt="Instagram"
              className="mb-8 mx-auto max-w-[175px]"
            />

            <form onSubmit={submitForm} className="w-full flex flex-col gap-4">
              <Input
                type="text"
                id="username"
                label="UserName"
                {...register("username")}
                error={errors?.username?.message}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                {...register("password")}
                error={errors?.password?.message}
              />
              <Button title="Login" />
            </form>
            <div className="w-full my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm font-semibold">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <FaFacebookSquare size={20} color="#385185" />
              <p className="text-[#385185] font-semibold text-sm cursor-pointer">
                Log in with Facebook
              </p>
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs text-[#385185] cursor-pointer">
                Forgotten your password?
              </p>
            </div>
          </div>
          <div className="w-full p-6 mt-3 bg-white border border-gray-300 flex flex-col items-center mb-3 rounded-md">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                className="text-[#0095f6] font-semibold cursor-pointer"
                to={"/auth/sign-up"}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
