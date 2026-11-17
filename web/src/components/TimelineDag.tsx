"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Position,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TimelineResponse, TimelineNode } from "@/types/timeline";

export interface TimelineDagProps {
  timeline?: TimelineResponse;
  data?: TimelineResponse;
  branch_info?: TimelineResponse["branch_info"];
  nodes?: TimelineResponse["nodes"];
  edges?: TimelineResponse["edges"];
  snapshots_by_tick?: TimelineResponse["snapshots_by_tick"];
}

function getNodeStyle(node: TimelineNode): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "pre-line",
    width: 120,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  if (!node.gate_passed) {
    return {
      ...baseStyle,
      background: "#ef4444",
      backgroundColor: "#ef4444",
      color: "#ffffff",
      border: "2px solid #b91c1c",
    };
  }

  if (node.is_cached_cow) {
    return {
      ...baseStyle,
      background: "#9ca3af",
      backgroundColor: "#9ca3af",
      color: "#1f2937",
      border: "2px solid #6b7280",
    };
  }

  return {
    ...baseStyle,
    background: "#ffffff",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    border: "2px solid #cbd5e1",
  };
}

export default function TimelineDag(props: TimelineDagProps) {
  const timeline =
    props.timeline ??
    props.data ??
    (props.nodes ? (props as unknown as TimelineResponse) : undefined);

  const nodes: Node[] = useMemo(() => {
    if (!timeline?.nodes) return [];
    const TICK_SPACING = 180;
    const START_X = 60;
    const MAIN_Y = 100;
    const FORK_Y = 260;

    return timeline.nodes.map((node) => {
      const isMain = node.branch_id === "main";
      const x = START_X + node.lamport_tick * TICK_SPACING;
      const y = isMain ? MAIN_Y : FORK_Y;

      return {
        id: node.node_id,
        position: { x, y },
        data: {
          label: `T${node.lamport_tick}\n${node.agent_id}`,
          ...node,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: getNodeStyle(node),
      };
    });
  }, [timeline]);

  const edges: Edge[] = useMemo(() => {
    if (!timeline?.edges) return [];
    return timeline.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));
  }, [timeline]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

