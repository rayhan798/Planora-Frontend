"use client";

import { loginZodSchema } from "@/zod/auth.validation";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useLoginForm } from "../../../hooks/use-login-form";

const LoginForm = ({ redirectPath }: { redirectPath?: string }) => {
  const { form, serverError, showPassword, setShowPassword, isPending } =
    useLoginForm(redirectPath);

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/login/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-[450px] bg-white/80 backdrop-blur-2xl border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] rounded-[3rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Planora <span className="text-indigo-600">Login</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Start your journey
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl text-center animate-in zoom-in-95 duration-200">
            {serverError}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="email"
            validators={{ onChange: loginZodSchema.shape.email }}
          >
            {(field: any) => (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full pl-12 h-14 bg-slate-50 border rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500 ring-red-500/10"
                        : "border-slate-200"
                    }`}
                  />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[10px] text-red-500 font-bold ml-2 italic animate-in slide-in-from-top-1">
                    {field.state.meta.errors
                      .map((err: any) => err.message || err)
                      .join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: loginZodSchema.shape.password }}
          >
            {(field: any) => (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className={
                      buttonVariants({ variant: "link", size: "sm" }) +
                      " text-[10px] font-bold text-indigo-600"
                    }
                  >
                    FORGOT?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 h-14 bg-slate-50 border rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500 ring-red-500/10"
                        : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[10px] text-red-500 font-bold ml-2 italic animate-in slide-in-from-top-1">
                    {field.state.meta.errors
                      .map((err: any) => err.message || err)
                      .join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <button
            disabled={isPending}
            type="submit"
            className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white rounded-[1.25rem] font-bold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="border-t border-gray-100"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            Or continue with
          </span>
        </div>
{/* 
        <button
          className="w-full h-12 border border-slate-200 rounded-[1rem] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-sm text-slate-600"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
            />
          </svg>
          Google Login
        </button> */}

        <p className="text-center mt-10 text-slate-400 text-sm font-medium">
          New to Planora?
          <Link
            href="/register"
            className="text-indigo-600 font-bold ml-1 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
