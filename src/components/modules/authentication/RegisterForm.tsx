"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterForm, registerSchema } from "../../../hooks/use-register-form";

export default function RegisterForm() {
  const { form, error, isLoading, showPassword, setShowPassword } = useRegisterForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[450px] bg-white/80 backdrop-blur-2xl border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] rounded-[3rem] p-8 md:p-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Planora <span className="text-indigo-600">Register</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">Create your account</p>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }} 
        className="space-y-6"
      >
        <form.Field
          name="name"
          validators={{ onChange: registerSchema.shape.name }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                  className={`pl-12 h-14 bg-slate-50/50 border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium ${
                    field.state.meta.errors.length > 0 ? "border-red-500 ring-red-500/10" : ""
                  }`}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-[10px] font-bold ml-2 italic animate-in slide-in-from-top-1">
                  {field.state.meta.errors.map((err: any) => err.message || err).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{ onChange: registerSchema.shape.email }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="name@company.com"
                  className={`pl-12 h-14 bg-slate-50/50 border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium ${
                    field.state.meta.errors.length > 0 ? "border-red-500 ring-red-500/10" : ""
                  }`}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-[10px] font-bold ml-2 italic animate-in slide-in-from-top-1">
                  {field.state.meta.errors.map((err: any) => err.message || err).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: registerSchema.shape.password }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-12 pr-12 h-14 bg-slate-50/50 border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium ${
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
                <p className="text-red-500 text-[10px] font-bold ml-2 italic animate-in slide-in-from-top-1">
                  {field.state.meta.errors.map((err: any) => err.message || err).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white rounded-[1.25rem] font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-indigo-100/10 group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center mt-10 text-slate-400 text-sm font-medium">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 font-bold hover:underline ml-1">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}