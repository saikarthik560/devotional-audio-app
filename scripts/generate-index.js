const fs = require('fs');
const path = require('path');

const POEM_FOLDERS = ["poem-001", "poem-002", "poem-003", "poem-004", "poem-005", "poem-006", "poem-007", "poem-008", "poem-009", "poem-010"];

const poems = [];

for (const folder of POEM_FOLDERS) {
  const metaPath = path.join('public', 'poems', folder, 'meta.json');
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    
    // Check for asset existence
    const hasAudio = fs.existsSync(path.join('public', 'poems', folder, 'audio.mp3'));
    const hasDeityImage = fs.existsSync(path.join('public', 'poems', folder, 'deity.png'));
    const hasBackground = fs.existsSync(path.join('public', 'poems', folder, 'background.jpg'));

    poems.push({
      ...meta,
      audioUrl: `/poems/${folder}/audio.mp3`,
      deityImageUrl: `/poems/${folder}/deity.png`,
      backgroundUrl: `/poems/${folder}/background.jpg`,
      hasAudio,
      hasDeityImage,
      hasBackground
    });
  }
}

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

fs.writeFileSync('src/data/poems-index.json', JSON.stringify(poems, null, 2));
console.log('Index created successfully');
