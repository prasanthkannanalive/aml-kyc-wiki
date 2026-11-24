import type { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return <AuthLayout mode="login" />;
}
