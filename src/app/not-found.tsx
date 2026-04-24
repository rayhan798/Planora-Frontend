"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-2xl w-full text-center z-10">
        {/* Animated Ghost Icon */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 0, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
             <Ghost size={120} className="text-indigo-500/30 absolute -top-2 -left-2 blur-sm" />
             <Ghost size={120} className="text-indigo-400 opacity-90" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-700 select-none"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lost in <span className="text-indigo-400">Cyberspace?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for has been moved, deleted, or perhaps never existed in this dimension.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            asChild
            variant="default" 
            className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={20} />
              Return Home
            </Link>
          </Button>

          <Button 
            onClick={() => window.history.back()}
            variant="outline" 
            className="h-14 px-8 rounded-2xl border-slate-700 text-slate-300 font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Go Back
            </span>
          </Button>
        </motion.div>

        {/* Bottom Decorative Lines */}
        <div className="mt-20 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              className="h-1 w-12 bg-indigo-500/30 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}