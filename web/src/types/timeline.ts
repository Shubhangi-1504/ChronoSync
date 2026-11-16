export interface BranchInfo {
  branch_id: string;
  name: string;
  parent_branch_id: string | null;
  fork_lamport_tick: number | null;
  locked_prng_seed: number | string;
}

export interface TimelineNode {
  node_id: string;
  branch_id: string;
  lamport_tick: number;
  agent_id: string;
  state_hash: string;
  token_cost: number;
  is_cached_cow: boolean;
  gate_passed: boolean;
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
}

export interface TimelineSnapshot {
  state_hash: string;
  llm_output: string;
}

export interface TimelineResponse {
  branch_info: BranchInfo;
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  snapshots_by_tick: Record<string | number, TimelineSnapshot>;
}

// Aliases for convenience
export type Node = TimelineNode;
export type Edge = TimelineEdge;
export type Snapshot = TimelineSnapshot;
export type SnapshotsByTick = Record<string | number, TimelineSnapshot>;

