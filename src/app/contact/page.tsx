import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Reach the AML/KYC Wiki team — billing, subscriptions, technical support, enterprise enquiries and content corrections.",
};
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact &amp; Support</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Billing questions, enterprise plans, technical issues or spot something
        wrong in a chapter? Send us a message — we read everything.
      </p>
      <ViewTracker type="search" id="contact" />
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
