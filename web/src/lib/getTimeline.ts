import timelineData from "@/mocks/timeline.json";
import { TimelineResponse } from "@/types/timeline";

export async function getTimeline(branchId: string): Promise<TimelineResponse> {
  void branchId;
  return timelineData as TimelineResponse;
}

