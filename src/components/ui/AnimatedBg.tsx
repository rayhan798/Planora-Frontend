"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { MailOpen, Loader2, ArrowRight, ShieldCheck, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// স্কিমা ডিফাইন করা
const verifySchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

export default function VerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  // Countdown for Resend Button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const form = useForm({
    defaultValues: { code: "" },
    // টাইপ এরর এড়াতে validatorAdapter রিমুভ করা হয়েছে
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        // API Call Simulation
        await new Promise((r) => setTimeout(r, 2000)); 
        router.push("/login?verified=true");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleResend = async () => {
    setResendLoading(true);
    // API Call Simulation
    await new Promise((r) => setTimeout(r, 1500));
    setResendLoading(false);
    setCountdown(60); // Reset countdown
  };

  return (
    <div className="space-y-8">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6">
        <MailOpen size={32} />
      </div>

      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Verify Your <span className="text-indigo-600">Email</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          We've sent a 6-digit verification code to <br />
          <span className="text-slate-900 font-bold">{email}</span>
        </p>
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
          name="code"
          // ফিক্স: এখানে ম্যানুয়াল ভ্যালিডেশন ফাংশন ব্যবহার করা হয়েছে
          validators={{
            onChange: ({ value }) => {
              if (!value) return undefined;
              const result = verifySchema.shape.code.safeParse(value);
              return result.success ? undefined : result.error.issues[0].message;
            },
          }}
        >
          {(field) => (
            <div className="space-y-3">
              <Label 
                htmlFor={field.name}
                className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2"
              >
                Verification Code
              </Label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="pl-12 h-16 bg-slate-50/50 border-slate-200 rounded-2xl text-2xl tracking-[0.5em] font-black text-center focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
              
              {/* এরর মেসেজ রেন্ডারিং */}
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                  {field.state.meta.errors.map((err: any) => String(err)).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Verify Account <ArrowRight size={18} />
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              disabled={countdown > 0 || resendLoading}
              onClick={handleResend}
              className={`text-xs font-bold flex items-center justify-center gap-2 mx-auto transition-colors ${
                countdown > 0 ? "text-slate-300 cursor-not-allowed" : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              {resendLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCcw size={14} />
              )}
              {countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}