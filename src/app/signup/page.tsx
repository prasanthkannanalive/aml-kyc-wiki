import type { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return <AuthLayout mode="signup" />;
}
