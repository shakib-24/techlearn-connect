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
    <Image
      src={instructor.avatar}
      alt={instructor.name}
      width={size}
      height={size}
      className={`rounded-full object-cover flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}
