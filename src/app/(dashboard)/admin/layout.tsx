import React from "react";
import QueryProviders from "@/providers/QueryProvider"; 
import DashboardWrapper from "@/components/modules/dashboard/admin/dashboardLayouts/DashboardWrapper";

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (

      <>
        <QueryProviders>
          <DashboardWrapper>
            {children}
          </DashboardWrapper>
        </QueryProviders>
      </>
  );
}