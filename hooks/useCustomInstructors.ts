"use client";

import { useCallback, useEffect, useState } from "react";
import type { Instructor } from "@/data/instructors";
import { addCustomInstructor, getCustomInstructors } from "@/lib/customInstructors";

export function useCustomInstructors() {
  const [customInstructors, setCustomInstructors] = useState<Instructor[]>([]);

  // Hydration-safe: read localStorage only after mount
  useEffect(() => {
    setCustomInstructors(getCustomInstructors());
  }, []);

  const addInstructor = useCallback((instructor: Instructor) => {
    addCustomInstructor(instructor);
    setCustomInstructors(getCustomInstructors());
  }, []);

  return { customInstructors, addInstructor };
}
