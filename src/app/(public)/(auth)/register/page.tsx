import RegisterForm from "@/components/modules/authentication/RegisterForm";
// import AnimatedBg from "@/components/ui/AnimatedBg";

const RegisterPage = () => {
  return (
    <>
         <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
           <RegisterForm />
         </div>
        </>
  );
};

export default RegisterPage;