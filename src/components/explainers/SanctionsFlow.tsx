"use client";

import { useMemo } from "react";
import {
  Background,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Interactive sanctions-screening explainer: name → engine → match branches.

const nodeStyle = (accent: "neutral" | "warn" | "ok" = "neutral"): React.CSSProperties => ({
  background: "var(--surface)",
  border: `1px solid ${
    accent === "warn" ? "#f59e0b" : accent === "ok" ? "#34d399" : "var(--line)"
  }`,
  borderRadius: 8,
  padding: "4px 10px",
  fontSize: 10,
  lineHeight: 1.3,
  color: "var(--ink)",
  width: 96,
  textAlign: "center",
});

function label(title: string, sub: string, accent: "neutral" | "warn" | "ok" = "neutral") {
  const color = accent === "warn" ? "#fcd34d" : accent === "ok" ? "#6ee7b7" : "var(--ink)";
  return (
    <div>
      <div style={{ fontWeight: 700, color }}>{title}</div>
      <div style={{ fontSize: 8.5, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

export default function SanctionsFlow() {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [
      {
        id: "name",
        position: { x: 0, y: 46 },
        data: { label: label("Customer / payment name", "onboarding or transaction") },
        style: nodeStyle(),
        draggable: false,
        selectable: false,
      },
      {
        id: "engine",
        position: { x: 128, y: 46 },
        data: { label: label("Screening engine", "OFAC · EU · UN · local lists", "warn") },
        style: nodeStyle("warn"),
        draggable: false,
        selectable: false,
      },
      {
        id: "match",
        position: { x: 256, y: 0 },
        data: { label: label("Potential match", "fuzzy name + DOB + nationality", "warn") },
        style: nodeStyle("warn"),
        draggable: false,
        selectable: false,
      },
      {
        id: "alert",
        position: { x: 384, y: 0 },
        data: { label: label("Alert → freeze & escalate", "analyst: TP / FP / partial", "warn") },
        style: nodeStyle("warn"),
        draggable: false,
        selectable: false,
      },
      {
        id: "clear",
        position: { x: 256, y: 108 },
        data: { label: label("No match → cleared", "payment / onboarding proceeds", "ok") },
        style: nodeStyle("ok"),
        draggable: false,
        selectable: false,
      },
    ];
    const edgeStyle = { stroke: "#34d399", strokeWidth: 1.4, strokeOpacity: 0.65 };
    const lbl = { fill: "var(--muted)", fontSize: 8.5 };
    const warnEdge = { stroke: "#f59e0b", strokeWidth: 1.4, strokeOpacity: 0.7 };
    const edges: Edge[] = [
      { id: "e1", source: "name", target: "engine", animated: true, style: edgeStyle, labelStyle: lbl, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e2", source: "engine", target: "match", label: "hit", animated: true, style: warnEdge, labelStyle: { ...lbl, fill: "#fcd34d" }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e3", source: "match", target: "alert", label: "true pos.", animated: true, style: warnEdge, labelStyle: { ...lbl, fill: "#fcd34d" }, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e4", source: "engine", target: "clear", label: "clear", animated: true, style: { ...edgeStyle, strokeDasharray: "4 4" }, labelStyle: lbl, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
    ];
    return { nodes, edges };
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.08, maxZoom: 1.1 }}
        minZoom={0.35}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
      >
        <Background gap={18} size={1} color="var(--line)" />
      </ReactFlow>
    </div>
  );
}
