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

const POEM_FOLDERS = ["poem-001", "poem-002", "poem-003", "poem-004", "poem-005", "poem-006", "poem-007", "poem-008", "poem-009", "poem-010"];

export async function getAllPoems(): Promise<Poem[]> {
  const poems: Poem[] = [];

  for (const folder of POEM_FOLDERS) {
    try {
      const response = await fetch(`/poems/${folder}/meta.json`);
      if (!response.ok) continue;
      
      const meta: PoemMeta = await response.json();
      
      const audioResponse = await fetch(`/poems/${folder}/audio.mp3`, { method: "HEAD" }).catch(() => null);
      const deityResponse = await fetch(`/poems/${folder}/deity.png`, { method: "HEAD" }).catch(() => null);
      const backgroundResponse = await fetch(`/poems/${folder}/background.jpg`, { method: "HEAD" }).catch(() => null);

      poems.push({
        ...meta,
        audioUrl: `/poems/${folder}/audio.mp3`,
        deityImageUrl: `/poems/${folder}/deity.png`,
        backgroundUrl: `/poems/${folder}/background.jpg`,
        hasAudio: audioResponse?.ok ?? false,
        hasDeityImage: deityResponse?.ok ?? false,
        hasBackground: backgroundResponse?.ok ?? false,
      });
    } catch {
      continue;
    }
  }

  return poems;
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
