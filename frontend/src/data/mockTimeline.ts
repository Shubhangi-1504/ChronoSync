
import type { Node, Edge } from "@xyflow/react";

export type ExecutionStatus = "success" | "failed" | "running";

export type ExecutionNodeData = {
  label: string;
  tick: number;
  status: ExecutionStatus;
  branch: string;
  description: string;
};

export const initialNodes: Node<ExecutionNodeData>[] = [
  {
    id: "0",
    position: { x: 0, y: 180 },
    data: {
      label: "Agent Started",
      tick: 0,
      status: "success",
      branch: "main",
      description: "Agent execution initialized.",
    },
    style: { background: "#142d2a", color: "#86efac", border: "1px solid #22c55e", width: 190, padding: 16, borderRadius: 12 },
  },
  {
    id: "1",
    position: { x: 250, y: 180 },
    data: {
      label: "Read Task",
      tick: 1,
      status: "success",
      branch: "main",
      description: "Agent reads and understands the task.",
    },
    style: { background: "#142d2a", color: "#86efac", border: "1px solid #22c55e", width: 190, padding: 16, borderRadius: 12 },
  },
  {
    id: "2",
    position: { x: 500, y: 180 },
    data: {
      label: "Generate Code",
      tick: 2,
      status: "success",
      branch: "main",
      description: "Agent generates the first implementation.",
    },
    style: { background: "#142d2a", color: "#86efac", border: "1px solid #22c55e", width: 190, padding: 16, borderRadius: 12 },
  },
  {
    id: "3",
    position: { x: 750, y: 40 },
    data: {
      label: "Execution Failed",
      tick: 3,
      status: "failed",
      branch: "main",
      description: "The generated code failed during execution.",
    },
    style: { background: "#351b25", color: "#fca5a5", border: "1px solid #ef4444", width: 190, padding: 16, borderRadius: 12 },
  },
  {
    id: "4",
    position: { x: 750, y: 330 },
    data: {
      label: "Fork Created",
      tick: 3,
      status: "running",
      branch: "branch-1",
      description: "A new execution branch is created from Tick 2.",
    },
    style: { background: "#292442", color: "#c4b5fd", border: "1px solid #8b5cf6", width: 190, padding: 16, borderRadius: 12 },
  },
  {
    id: "5",
    position: { x: 1000, y: 330 },
    data: {
      label: "Execution Passed",
      tick: 4,
      status: "success",
      branch: "branch-1",
      description: "The alternative execution completes successfully.",
    },
    style: { background: "#142d2a", color: "#86efac", border: "1px solid #22c55e", width: 190, padding: 16, borderRadius: 12 },
  },
];

export const initialEdges: Edge[] = [
  { id: "e0-1", source: "0", target: "1", animated: true },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
];
