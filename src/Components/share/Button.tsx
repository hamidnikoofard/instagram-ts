interface ButtonPropsType {
  title: string;
  variant?: keyof Variants;
  icon?: JSX.Element;
}

type Variants = {
  primary: string;
  secondary: string;
  follow: string;
  unfollow: string;
};

function Button({ title, variant = "primary", icon }: ButtonPropsType) {
  const baseStyles: string =
    "py-1 rounded-md font-semibold transition-all duration-300 w-full";
  const variants: Variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-black hover:bg-gray-300",
    follow: "bg-blue-500 text-white hover:bg-blue-600",
    unfollow: "bg-white text-black border border-gray-400 hover:bg-gray-100",
  };

  return (
    <div>
      <button className={`${baseStyles} ${variants[variant]}`}>
        <div className="flex gap-2 justify-center items-center">
          {icon}
          {title}
        </div>
      </button>
    </div>
  );
}

export default Button;
