import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Instructor } from "@/data/instructors";
import { createClient } from "@/lib/supabase";
import DetailContent from "./DetailContent";
import CustomDetailWrapper from "./CustomDetailWrapper";

export const dynamic = "force-dynamic";

async function fetchInstructor(id: string): Promise<Instructor | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("instructors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch instructor:", error.message);
    return null;
  }
  return data as Instructor | null;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (params.id.startsWith("custom-")) {
    return { title: "講師プロフィール" };
  }
  const instructor = await fetchInstructor(params.id);
  if (!instructor) return { title: "講師が見つかりません" };
  return {
    title: instructor.name,
    description: `${instructor.tagline}。専門分野: ${instructor.category}。対応形式: ${instructor.format}。${instructor.price}`,
  };
}

export default async function InstructorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Custom instructors live only in localStorage — delegate to client component
  if (params.id.startsWith("custom-")) {
    return <CustomDetailWrapper id={params.id} />;
  }

  const instructor = await fetchInstructor(params.id);
  if (!instructor) notFound();
  return <DetailContent instructor={instructor} />;
}
