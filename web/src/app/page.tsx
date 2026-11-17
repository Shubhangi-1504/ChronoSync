import { getTimeline } from "@/lib/getTimeline";
import TimelineDag from "@/components/TimelineDag";

export default async function Home() {
  const timeline = await getTimeline("main");

  return (
    <main style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <TimelineDag timeline={timeline} />
    </main>
  );
}
