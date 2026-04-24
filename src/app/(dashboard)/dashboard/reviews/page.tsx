// src/app/(dashboard)/invitations/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import { getReviews } from "@/app/(public)/events/_actions";
import ReviewsModule from "@/components/modules/dashboard/reviews/ReviewsModule";

const ReviewsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reviews", "my"],
    queryFn: () => getReviews(),
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
          <span className="hover:text-indigo-600 cursor-pointer">Dashboard</span>
          <span>/</span>
          <span className="text-slate-900">Reviews</span>
        </nav>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReviewsModule />
        </HydrationBoundary>

      </div>
    </main>
  );
};

export default ReviewsPage;