import type { Metadata } from "next";
import Navbar from "@/components/modules/layout/Navbar";
import Footer from "@/components/modules/layout/Footer";

export const metadata: Metadata = {
  title: "Planora | Discover & Manage Events",
  description: "Secure, JWT-protected platform for managing public and private events.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>

      <Navbar />
      
      <main className="flex-grow bg-white">
        {children}
      </main>

      <Footer />
    </div>
  );
}