
"use client";

import { useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import type { Node } from "@xyflow/react";

import {
  initialNodes,
  initialEdges,
  type ExecutionNodeData,
} from "../data/mockTimeline";

import "@xyflow/react/dist/style.css";

export default function ExecutionGraph() {
  const [nodes, , onNodesChange] =
  useNodesState(initialNodes);

  const [edges, , onEdgesChange] =
  useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] =
    useState<Node<ExecutionNodeData> | null>(null);

  return (
    <div className="flex flex-col gap-4">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Execution DAG
          </h2>

          <p className="text-sm text-gray-400">
            Explore agent execution and branching history
          </p>
        </div>

        <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg">
          Demo Timeline
        </span>
      </div>

      <div className="h-[550px] w-full rounded-xl border border-white/10 overflow-hidden bg-[#101624]">

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) =>
            setSelectedNode(node as Node<ExecutionNodeData>)
          }
          fitView
          nodesConnectable={false}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#818cf8", strokeWidth: 2 },
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#475569"
          />

          <Controls />

          <MiniMap
            nodeColor={(node) => {
              const status = (
                node.data as ExecutionNodeData
              ).status;

              if (status === "success") return "#22c55e";
              if (status === "failed") return "#ef4444";
              return "#8b5cf6";
            }}
          />
        </ReactFlow>

      </div>

      {selectedNode && (
        <div className="rounded-xl border border-white/10 bg-[#151d2d] p-4">

          <h3 className="text-white font-semibold">
            {selectedNode.data.label}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">

            <p className="text-gray-400">
              Tick: <span className="text-white">
                {selectedNode.data.tick}
              </span>
            </p>

            <p className="text-gray-400">
              Branch: <span className="text-white">
                {selectedNode.data.branch}
              </span>
            </p>

            <p className="text-gray-400">
              Status: <span className="text-white">
                {selectedNode.data.status}
              </span>
            </p>

          </div>

          <p className="mt-3 text-sm text-gray-400">
            {selectedNode.data.description}
          </p>

        </div>
      )}

    </div>
  );
}
