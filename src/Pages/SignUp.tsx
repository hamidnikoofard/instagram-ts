import Logo from "../assets/logos_instagram.png";
import { FaFacebookSquare } from "react-icons/fa";
import Button from "../Components/share/Button";
import Input from "../Components/share/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface InputTypeForm {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  const navigate = useNavigate()
  const resolver = yup.object({
    email: yup
      .string()
      .required("Please enter your mobile number or email address")
      .email(),
    password: yup.string().required("Please enter your password"),
    username: yup.string().required("Please enter your username"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypeForm>({
    resolver: yupResolver(resolver),
  });

  const subnitForm = handleSubmit(async (data: InputTypeForm) => {
    try {
      const response = await axios.post(
        "https://instagram-backend-ugd3.onrender.com/api/user/signup",
        {
          username: data.username,
          password: data.password,
          email: data.email
        }
      );
      console.log(response);
      navigate("/")
      reset()
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen flex-col px-4">
      <div className="w-full max-w-[350px] p-6 md:p-10 bg-white border border-gray-300 flex flex-col items-center mb-3 rounded-sm mt-4">
        <img src={Logo} alt="" className="mb-5" />
        <p className="text-center font-semibold text-gray-500">
          Sign up to see photos and videos from your friends
        </p>
        <div className="w-full mt-5">
          <Button icon={<FaFacebookSquare />} title={"Log in with Facebook"} />
        </div>
        <div className="w-full my-4 flex items-center mt-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form onSubmit={subnitForm} className="w-full flex flex-col gap-2 mt-1">
          <Input
            {...register("email")}
            id="email"
            label="Mobile Number or Email"
            type="text"
            error={errors?.email?.message}
          />
          <Input
            {...register("password")}
            type="password"
            id="password"
            label="Password"
            error={errors?.password?.message}
          />
          <Input
            {...register("username")}
            id="username"
            label="User Name"
            type="text"
            error={errors?.username?.message}
          />
          <p className="text-center text-xs mt-2 text-gray-500">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="text-blue-900 cursor-pointer">Learn More</span>
          </p>
          <p className="text-center text-xs mt-2 text-gray-500">
            By signing up, you agree to our Terms. Learn how we collect, use and
            share your data in our Privacy Policy and how we use cookies and
            similar technology in our Cookies Policy.
          </p>
          <div className="mt-3">
            <Button title={"Sign Up"} />
          </div>
        </form>
      </div>
      <div className="w-full max-w-[350px] p-6 bg-white border border-gray-300 flex flex-col items-center mb-3 rounded-sm">
        <div className="flex items-center justify-center gap-1">
          <span>Have an account?</span>
          <Link className="text-[#0095f6] font-semibold" to={"/"}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
