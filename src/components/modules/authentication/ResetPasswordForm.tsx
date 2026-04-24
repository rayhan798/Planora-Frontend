"use client";

import React from "react";
import { Lock, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword, passwordSchema } from "../../../hooks/use-reset-password";

export default function ResetPasswordForm() {
  const { form, showPassword, setShowPassword, isLoading } = useResetPassword();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck size={32} />
      </div>
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Set New <span className="text-indigo-600">Password</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">Almost there! Choose a strong password.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field
          name="password"
          validators={{
            onChange: passwordSchema.shape.password,
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <Label 
                htmlFor={field.name}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2"
              >
                New Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className={`pl-12 pr-12 h-14 bg-slate-50/50 rounded-2xl border-slate-200 focus:ring-4 focus:ring-indigo-500/10 transition-all ${
                    field.state.meta.errors.length > 0 ? "border-red-500 ring-red-500/10" : ""
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
                  {field.state.meta.errors.map((err: any) => 
                    typeof err === 'object' ? err.message : err
                  ).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return "Passwords don't match";
              }
              return undefined;
            },
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <Label 
                htmlFor={field.name}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2"
              >
                Confirm New Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className={`pl-12 h-14 bg-slate-50/50 rounded-2xl border-slate-200 focus:ring-4 focus:ring-indigo-500/10 transition-all ${
                    field.state.meta.errors.length > 0 ? "border-red-500 ring-red-500/10" : ""
                  }`}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] text-red-500 font-bold ml-2 italic animate-in slide-in-from-top-1">
                  {field.state.meta.errors.map((err: any) => 
                    typeof err === 'object' ? err.message : err
                  ).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}