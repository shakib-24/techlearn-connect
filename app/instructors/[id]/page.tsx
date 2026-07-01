import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { instructors } from "@/data/instructors";
import DetailContent from "./DetailContent";

export function generateStaticParams() {
  return instructors.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const instructor = instructors.find((i) => i.id === params.id);
  if (!instructor) return { title: "講師が見つかりません" };
  return {
    title: instructor.name,
    description: `${instructor.tagline}。専門分野: ${instructor.category}。対応形式: ${instructor.format}。${instructor.price}`,
  };
}

export default function InstructorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const instructor = instructors.find((i) => i.id === params.id);
  if (!instructor) notFound();
  return <DetailContent instructor={instructor} />;
}
