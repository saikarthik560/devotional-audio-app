import poemsIndex from "@/data/poems-index.json";

export interface PoemMeta {
  id: string;
  title: string;
  deity: "Krishna" | "Shiva" | "Rama" | "Devi" | "Other";
  mood: "Calm" | "Energetic" | "Meditative";
  language: "Sanskrit" | "Telugu" | "Hindi" | "Other";
  duration: string;
  recorded_by: string;
  recorded_year: string;
}

export interface Poem extends PoemMeta {
  audioUrl: string;
  deityImageUrl: string;
  backgroundUrl: string;
  hasAudio: boolean;
  hasDeityImage: boolean;
  hasBackground: boolean;
}

export async function getAllPoems(): Promise<Poem[]> {
  return poemsIndex as Poem[];
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
