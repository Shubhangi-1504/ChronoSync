
import ExecutionGraph from "../components/ExecutionGraph";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] p-8">

      <header className="mb-8 border-b border-white/10 pb-5">
        <h1 className="text-3xl font-bold text-white">
          ChronoSync
        </h1>

        <p className="mt-2 text-gray-400">
          Deterministic AI Agent Execution & Visual Debugger
        </p>
      </header>

      <ExecutionGraph />

    </main>
  );
}
