import { useRouter } from "next/navigation";
import { Globe, Lock, CircleDollarSign, Zap } from "lucide-react";

export const categories = [
  {
    id: "public-free",
    label: "Public Free",
    description: "Anyone can join instantly for free.",
    icon: Globe,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    params: { isPublic: "true", fee: "0" }
  },
  {
    id: "public-paid",
    label: "Public Paid",
    description: "Open to all with a registration fee.",
    icon: CircleDollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    params: { isPublic: "true", fee_type: "paid" } 
  },
  {
    id: "private-free",
    label: "Private Free",
    description: "Request to join restricted events.",
    icon: Lock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    params: { isPublic: "false", fee: "0" }
  },
  {
    id: "private-paid",
    label: "Private Paid",
    description: "Exclusive events requiring payment.",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    params: { isPublic: "false", fee_type: "paid" }
  },
];

export const useEventCategories = () => {
  const router = useRouter();

  const handleFilter = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });

    router.push(`/events?${searchParams.toString()}`);
  };

  return {
    handleFilter,
    categories
  };
};