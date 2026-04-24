"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t pt-20 pb-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-2xl font-black text-indigo-600 tracking-tighter uppercase italic">
              Planora
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm font-medium max-w-xs mx-auto md:mx-0">
              The most secure and seamless platform to manage your public and
              private events. Organize, invite, and track with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-900 mb-6 uppercase text-[11px] tracking-[0.2em] text-indigo-600">
              Quick Links
            </h3>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li>
                <FooterLink href="/events">All Events</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-900 mb-6 uppercase text-[11px] tracking-[0.2em] text-indigo-600">
              Legal
            </h3>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li>
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-900 mb-6 uppercase text-[11px] tracking-[0.2em] text-indigo-600">
              Contact Info
            </h3>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-indigo-600 transition-colors cursor-default">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <MapPin size={16} />
                </div>
                Chattogram, Bangladesh
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-indigo-600 transition-colors">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Phone size={16} />
                </div>
                <a href="tel:+880123456789">+880 123 456 789</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-indigo-600 transition-colors">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Mail size={16} />
                </div>
                <a href="mailto:support@planora.com">support@planora.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest text-center md:text-left">
          <p>© {currentYear} Planora Inc. All rights reserved.</p>

          <p className="flex items-center justify-center gap-2 italic">
            Designed & Developed by
            <a
              href="https://www.facebook.com/RxUnknownCreations7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
            >
              RAYHAN
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-center md:justify-start gap-1 hover:text-indigo-600 transition-all"
    >
      {children}
      <ArrowUpRight
        size={12}
        className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1"
      />
    </Link>
  );
}

function SocialIcon({ Icon, href }: { Icon: any; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-90 mx-auto md:mx-0"
    >
      <Icon size={18} />
    </a>
  );
}