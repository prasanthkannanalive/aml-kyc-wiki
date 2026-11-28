import type { ModuleQuizQuestion } from "./module-quizzes";
import { IIBF_AML_KYC } from "./cert-banks/iibf-aml-kyc";
import { NISM_XXIV } from "./cert-banks/nism-xxiv";
import { CAMS } from "./cert-banks/cams";
import { OPS_TOOLING } from "./cert-banks/ops-tooling";

export interface CertMock {
  id: string;
  cert: string;
  body: string;
  fee: string;
  format: string;
  durationMin: number;
  /** pass rule: minimum correct answers OR minimum percentage — whichever the cert uses */
  passCount?: number;
  passPct?: number;
  questions: ModuleQuizQuestion[];
}

export const CERT_MOCKS: CertMock[] = [
  {
    id: "iibf-aml-kyc",
    cert: "IIBF Certificate in AML/KYC",
    body: "Indian Institute of Banking & Finance",
    fee: "₹1,100 (members) / ₹1,600 (non-members) + taxes",
    format: "120 MCQs (100 marks) · 2 hours · 60% to pass",
    durationMin: 120,
    passPct: 0.6,
    questions: IIBF_AML_KYC,
  },
  {
    id: "nism-xxiv",
    cert: "NISM Series XXIV — AML & CFT",
    body: "National Institute of Securities Markets",
    fee: "₹885 + gateway charges",
    format: "50 MCQs (50 marks) · 1 hour · 50% to pass",
    durationMin: 60,
    passPct: 0.5,
    questions: NISM_XXIV,
  },
  {
    id: "cams",
    cert: "CAMS — Certified Anti-Money Laundering Specialist",
    body: "ACAMS (Global)",
    fee: "~$1,595 – $2,095 (includes membership & study materials)",
    format: "120 MCQs · 3.5 hours · 75 correct answers to pass",
    durationMin: 210,
    passCount: 75,
    questions: CAMS,
  },
  {
    id: "ops-tooling",
    cert: "Operations & Tooling Readiness Mock",
    body: "Internal readiness assessment — not a certification",
    fee: "Free",
    format: "50 MCQs · self-paced · aim for 80%+",
    durationMin: 60,
    passPct: 0.8,
    questions: OPS_TOOLING,
  },
];

export function getCertMock(id: string): CertMock | undefined {
  return CERT_MOCKS.find((c) => c.id === id);
}
