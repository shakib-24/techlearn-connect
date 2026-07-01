import { notFound } from "next/navigation";
import { instructors } from "@/data/instructors";
import DetailContent from "./DetailContent";

export default function InstructorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const instructor = instructors.find((i) => i.id === params.id);
  if (!instructor) notFound();
  return <DetailContent instructor={instructor} />;
}
