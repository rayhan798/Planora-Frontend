"use client";

import React from "react";
import { MailOpen, Loader2, ArrowRight, ShieldCheck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyEmail, verifySchema } from "../../../hooks/use-verify-email";

export default function VerifyEmailForm() {
  const {
    form,
    email,
    isLoading,
    resendLoading,
    countdown,
    error,
    handleResend
  } = useVerifyEmail();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
        <MailOpen size={32} />
      </div>

      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Verify Your <span className="text-indigo-600">Email</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          We've sent a 6-digit verification code to <br />
          <span className="text-slate-900 font-bold">{email || "your email"}</span>
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-xl text-center animate-shake">
          {error}
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
          name="code"
          validators={{
            onChange: verifySchema.shape.code,
          }}
        >
          {(field: any) => (
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                Verification Code
              </Label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className={`pl-12 h-16 bg-slate-50/50 border-slate-200 rounded-2xl text-2xl tracking-[0.5em] font-black text-center focus:ring-4 focus:ring-indigo-500/10 transition-all ${
                    field.state.meta.errors.length > 0 ? "border-red-500 ring-red-500/10" : ""
                  }`}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                  {field.state.meta.errors.map((err: any) => typeof err === 'object' ? err.message : err).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
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
              className={`text-xs font-bold flex items-center justify-center gap-2 mx-auto transition-all ${
                countdown > 0 ? "text-slate-300 cursor-not-allowed" : "text-indigo-600 hover:text-indigo-700 hover:scale-105"
              }`}
            >
              {resendLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCcw size={14} className={countdown === 0 ? "animate-pulse" : ""} />
              )}
              {countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}