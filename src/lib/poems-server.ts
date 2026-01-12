import { promises as fs } from 'fs';
import path from 'path';

export interface PoemMeta {
  id: string;
  title: string;
  deity: string;
  mood: string;
  language: string;
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

let cachedPoems: Poem[] | null = null;
let lastFetch = 0;
const CACHE_TTL = 5000; // 5 seconds cache to balance speed and "automatic" updates

export async function getPoemsData(): Promise<Poem[]> {
  const now = Date.now();
  return (cachedPoems && (now - lastFetch < CACHE_TTL)) ? cachedPoems : await (async () => {
    const poemsDir = path.join(process.cwd(), 'public', 'poems');
    
    try {
      const folders = (await fs.readdir(poemsDir, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      const poems = await Promise.all(folders.map(async (folder) => {
        const folderPath = path.join(poemsDir, folder);
        const metaPath = path.join(folderPath, 'meta.json');
        
        try {
          const [metaContent, ...assets] = await Promise.all([
            fs.readFile(metaPath, 'utf8'),
            fs.access(path.join(folderPath, 'audio.mp3')).then(() => true).catch(() => false),
            fs.access(path.join(folderPath, 'deity.png')).then(() => true).catch(() => false),
            fs.access(path.join(folderPath, 'background.jpg')).then(() => true).catch(() => false),
          ]);

          const meta = JSON.parse(metaContent);
          return {
            ...meta,
            audioUrl: `/poems/${folder}/audio.mp3`,
            deityImageUrl: `/poems/${folder}/deity.png`,
            backgroundUrl: `/poems/${folder}/background.jpg`,
            hasAudio: assets[0],
            hasDeityImage: assets[1],
            hasBackground: assets[2]
          } as Poem;
        } catch (e) {
          return null;
        }
      }));

      const result = poems.filter((p): p is Poem => p !== null);
      cachedPoems = result;
      lastFetch = now;
      return result;
    } catch (error) {
      console.error('Error fetching poems:', error);
      return [];
    }
  })();
}
