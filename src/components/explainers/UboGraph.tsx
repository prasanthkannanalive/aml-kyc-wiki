"use client";

import { useMemo, useState } from "react";
import {
  Background,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Static UBO-chain explainer: layered entities resolving to natural persons.
// Declarative nodes/edges — no runtime graph engine needed beyond layout.

const nodeStyle = (accent = false): React.CSSProperties => ({
  background: "var(--surface)",
  border: `1px solid ${accent ? "#34d399" : "var(--line)"}`,
  borderRadius: 8,
  padding: "3px 8px",
  fontSize: 10,
  lineHeight: 1.25,
  color: "var(--ink)",
  width: "auto",
  whiteSpace: "nowrap",
});

const kindStyle = (kind: "entity" | "person"): React.CSSProperties => ({
  display: "block",
  fontSize: 8,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: kind === "person" ? "#34d399" : "var(--faint)",
});

function label(name: string, kind: "entity" | "person", sub?: string) {
  return (
    <div style={{ textAlign: "center" }}>
      <span style={kindStyle(kind)}>{kind === "person" ? "Natural person" : "Entity"}</span>
      <div style={{ fontWeight: 600 }}>{name}</div>
      {sub && <div style={{ fontSize: 9, color: "var(--muted)" }}>{sub}</div>}
    </div>
  );
}

// Step order for the guided walkthrough: each step reveals one ownership hop.
const EDGE_ORDER = ["e1", "e2", "e3", "e4"];
const NODES_PER_EDGE: Record<string, string[]> = {
  e1: ["top", "a"],
  e2: ["top", "b"],
  e3: ["a", "p1"],
  e4: ["b", "p2"],
};

export default function UboGraph() {
  const [step, setStep] = useState(0); // 0 = full graph, 1-4 = progressive reveal

  const { nodes, edges } = useMemo(() => {
    const lit = new Set<string>();
    if (step > 0) {
      EDGE_ORDER.slice(0, step).forEach((e) => NODES_PER_EDGE[e].forEach((n) => lit.add(n)));
    }
    const dim = (on: boolean): React.CSSProperties => ({ opacity: step === 0 || on ? 1 : 0.15, transition: "opacity 0.4s" });
    const nodes: Node[] = [
      {
        id: "top",
        position: { x: 0, y: 0 },
        data: { label: label("TopCo Ltd", "entity", "customer") },
        style: { ...nodeStyle(), ...dim(lit.has("top")) },
        draggable: false,
        selectable: false,
      },
      {
        id: "a",
        position: { x: -95, y: 78 },
        data: { label: label("HoldCo Alpha", "entity", "BVI") },
        style: { ...nodeStyle(), ...dim(lit.has("a")) },
        draggable: false,
        selectable: false,
      },
      {
        id: "b",
        position: { x: 55, y: 78 },
        data: { label: label("HoldCo Beta", "entity", "Delaware") },
        style: { ...nodeStyle(), ...dim(lit.has("b")) },
        draggable: false,
        selectable: false,
      },
      {
        id: "p1",
        position: { x: -120, y: 156 },
        data: { label: label("Jane Doe", "person", "64% indirect") },
        style: { ...nodeStyle(true), ...dim(lit.has("p1")) },
        draggable: false,
        selectable: false,
      },
      {
        id: "p2",
        position: { x: 80, y: 156 },
        data: { label: label("John Roe", "person", "48% indirect") },
        style: { ...nodeStyle(true), ...dim(lit.has("p2")) },
        draggable: false,
        selectable: false,
      },
    ];
    const edgeOn = (i: number) => step === 0 || i < step;
    const edgeDim = (i: number): React.CSSProperties => ({ opacity: edgeOn(i) ? 1 : 0.12, transition: "opacity 0.4s" });
    const edgeStyle = { stroke: "#34d399", strokeWidth: 1.4, strokeOpacity: 0.65 };
    const edges: Edge[] = [
      { id: "e1", source: "top", target: "a", label: "80%", animated: true, style: { ...edgeStyle, ...edgeDim(0) }, labelStyle: { fill: "var(--muted)", fontSize: 9 }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [3, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e2", source: "top", target: "b", label: "60%", animated: true, style: { ...edgeStyle, ...edgeDim(1) }, labelStyle: { fill: "var(--muted)", fontSize: 9 }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [3, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e3", source: "a", target: "p1", label: "64%", animated: true, style: { ...edgeStyle, strokeOpacity: 0.9, ...edgeDim(2) }, labelStyle: { fill: "#6ee7b7", fontSize: 9, fontWeight: 700 }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [3, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e4", source: "b", target: "p2", label: "48%", animated: true, style: { ...edgeStyle, strokeOpacity: 0.9, ...edgeDim(3) }, labelStyle: { fill: "#6ee7b7", fontSize: 9, fontWeight: 700 }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [3, 3] as [number, number], labelBgBorderRadius: 3 },
    ];
    return { nodes, edges };
  }, [step]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.08, maxZoom: 1.1 }}
        minZoom={0.4}
        maxZoom={1.4}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        preventScrolling={false}
      >
        <Background gap={18} size={1} color="var(--line)" />
      </ReactFlow>
      <button
        type="button"
        onClick={() => setStep((s) => (s + 1) % 5)}
        className="absolute right-1 top-1 z-10 rounded-md border border-line bg-surface/90 px-2 py-0.5 text-[10px] font-medium text-muted backdrop-blur transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
      >
        {step === 0 ? "Start walkthrough" : step === 4 ? "Show full graph" : `Step ${step}/4`}
      </button>
    </div>
  );
}
