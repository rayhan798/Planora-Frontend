import React from "react";
import QueryProviders from "@/providers/QueryProvider"; 
import DashboardWrapper from "@/components/modules/dashboard/dashboardLayouts/DashboardWrapper";

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