import ResetPasswordForm from "@/components/modules/authentication/ResetPasswordForm"; // আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী এটি চেক করুন

const ResetPasswordPage = () => {
  return (
    <>
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
        <ResetPasswordForm />
      </div>
    </>
  );
};

export default ResetPasswordPage;
