import { ImageResponse } from "next/og";

export const alt = "AML/KYC Wiki — Financial Crime Operations Knowledge Base";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c0c0e 0%, #101418 60%, #0e1a14 100%)",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 900,
              color: "#052e1b",
            }}
          >
            A
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "0.08em" }}>
            AML/KYC WIKI
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Financial Crime Operations Knowledge Base
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: "28px",
            color: "#a1a1aa",
            lineHeight: 1.4,
          }}
        >
          7 certification courses · 207 chapters · interactive simulations,
          field-craft labs and verifiable certificates
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "14px",
          }}
        >
          {["Fraud", "Sanctions", "CTF", "TBML", "Crypto", "FIU"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#6ee7b7",
                border: "1px solid #34d39955",
                borderRadius: "999px",
                padding: "8px 20px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
