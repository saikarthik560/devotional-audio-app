import type { Poem, PoemMeta } from "./poems-server";

export type { Poem, PoemMeta };

export async function getAllPoems(): Promise<Poem[]> {
  if (typeof window === "undefined") {
    const { getPoemsData } = await import("./poems-server");
    return getPoemsData();
  }
  
  try {
    const response = await fetch("/api/poems");
    if (!response.ok) throw new Error("Failed to fetch poems");
    return await response.json();
  } catch (error) {
    console.error("Error fetching poems:", error);
    return [];
  }
}

export async function getPoemById(id: string): Promise<Poem | null> {
  const poems = await getAllPoems();
  return poems.find((p) => p.id === id) || null;
}

export function getUniqueDeities(poems: Poem[]): string[] {
  return [...new Set(poems.map((p) => p.deity))];
}

export function getUniqueMoods(poems: Poem[]): string[] {
  return [...new Set(poems.map((p) => p.mood))];
}
