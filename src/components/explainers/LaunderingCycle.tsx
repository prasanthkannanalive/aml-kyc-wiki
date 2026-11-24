"use client";

import { useMemo } from "react";
import {
  Background,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Interactive laundering-cycle explainer: placement → layering → integration,
// looping back as "clean" money re-enters the economy.

const nodeStyle = (accent = false): React.CSSProperties => ({
  background: "var(--surface)",
  border: `1px solid ${accent ? "#34d399" : "var(--line)"}`,
  borderRadius: 8,
  padding: "4px 10px",
  fontSize: 10,
  lineHeight: 1.3,
  color: "var(--ink)",
  width: 92,
  textAlign: "center",
});

function label(title: string, sub: string, accent = false) {
  return (
    <div>
      <div style={{ fontWeight: 700, color: accent ? "#6ee7b7" : "var(--ink)" }}>{title}</div>
      <div style={{ fontSize: 8.5, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

export default function LaunderingCycle() {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [
      {
        id: "placement",
        position: { x: 0, y: 0 },
        data: { label: label("1 · Placement", "dirty cash enters via front business") },
        style: nodeStyle(),
        draggable: false,
        selectable: false,
      },
      {
        id: "layering",
        position: { x: 128, y: 0 },
        data: { label: label("2 · Layering", "shell companies and wires obscure origin") },
        style: nodeStyle(),
        draggable: false,
        selectable: false,
      },
      {
        id: "integration",
        position: { x: 64, y: 92 },
        data: { label: label("3 · Integration", "funds return as loans, assets, profits", true) },
        style: nodeStyle(true),
        draggable: false,
        selectable: false,
      },
    ];
    const edgeStyle = { stroke: "#34d399", strokeWidth: 1.4, strokeOpacity: 0.65 };
    const lbl = { fill: "var(--muted)", fontSize: 8.5 };
    const edges: Edge[] = [
      { id: "e1", source: "placement", target: "layering", label: "commingle", animated: true, style: edgeStyle, labelStyle: lbl, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e2", source: "layering", target: "integration", label: "multi-hop wires", animated: true, style: edgeStyle, labelStyle: lbl, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
      { id: "e3", source: "integration", target: "placement", label: "cycle repeats", animated: true, style: { ...edgeStyle, strokeDasharray: "4 4" }, labelStyle: lbl, labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9 }, labelBgPadding: [2, 3] as [number, number], labelBgBorderRadius: 3 },
    ];
    return { nodes, edges };
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.1, maxZoom: 1.2 }}
        minZoom={0.4}
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
