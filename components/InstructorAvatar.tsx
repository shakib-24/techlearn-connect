"use client";

import { useState } from "react";
import Image from "next/image";
import type { Instructor } from "@/data/instructors";
import { CATEGORY_AVATAR_COLOR } from "@/lib/categoryStyles";

export default function InstructorAvatar({
  instructor,
  size,
  textSizeClass = "text-base",
  className = "",
}: {
  instructor: Instructor;
  size: number;
  textSizeClass?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!instructor.avatar || failed) {
    return (
      <div
        className={`rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${textSizeClass} ${className}`}
        style={{ width: size, height: size, backgroundColor: CATEGORY_AVATAR_COLOR[instructor.category] }}
      >
        {instructor.initials}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-full flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={instructor.avatar}
        alt={instructor.name}
        width={size}
        height={size}
        className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
