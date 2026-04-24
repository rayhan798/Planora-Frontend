"use client";

import React from "react";
import * as z from "zod";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "../../../hooks/use-forgot-password";

export default function ForgotPasswordForm() {
  const { step, isLoading, countdown, emailForm, resetForm } = useForgotPassword();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2">
          {step === 1 ? <Mail size={24} /> : <KeyRound size={24} />}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          {step === 1 ? "Forgot Password" : "Set New Password"}
        </h1>
      </div>

      {step === 1 ? (
        <form 
            onSubmit={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                emailForm.handleSubmit(); 
            }} 
            className="space-y-6"
        >
          <emailForm.Field 
            name="email"
            validators={{
              onChange: ({ value }) => {
                const res = z.string().email().safeParse(value);
                return res.success ? undefined : "Invalid email address";
              }
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase text-slate-500 ml-1">Email Address</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="name@gmail.com"
                  className={field.state.meta.errors.length > 0 ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {field.state.meta.errors.map(err => (
                  <p key={err as string} className="text-red-500 text-[11px] font-medium ml-1 italic">
                    {err as string}
                  </p>
                ))}
              </div>
            )}
          </emailForm.Field>
          <Button type="submit" disabled={isLoading} className="w-full h-12 bg-slate-900 hover:bg-indigo-600 transition-colors">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Send Reset Code"}
          </Button>
        </form>
      ) : (
        <form 
            onSubmit={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                resetForm.handleSubmit(); 
            }} 
            className="space-y-6"
        >
          <resetForm.Field 
            name="otp"
            validators={{
              onChange: ({ value }) => value.length !== 6 ? "Must be 6 digits" : undefined
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase text-slate-500 ml-1">6-Digit Code</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-[0.5em] font-bold"
                />
                {field.state.meta.errors.map(err => (
                  <p key={err as string} className="text-red-500 text-[11px] font-medium ml-1">{err as string}</p>
                ))}
              </div>
            )}
          </resetForm.Field>

          <resetForm.Field 
            name="newPassword"
            validators={{
              onChange: ({ value }) => value.length < 8 ? "At least 8 characters" : undefined
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase text-slate-500 ml-1">New Password</Label>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                />
                {field.state.meta.errors.map(err => (
                  <p key={err as string} className="text-red-500 text-[11px] font-medium ml-1">{err as string}</p>
                ))}
              </div>
            )}
          </resetForm.Field>

          <div className="space-y-4">
            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-slate-900 hover:bg-indigo-600 transition-colors text-white font-bold">
              {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
            </Button>
            
            <p className="text-center text-sm text-slate-500">
                Didn't get code? {" "}
                <button 
                    type="button"
                    disabled={countdown > 0} 
                    className="text-indigo-600 font-bold disabled:text-slate-300"
                >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
                </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}