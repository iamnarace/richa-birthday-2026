export type Memory = {
  id: number;
  eyebrow: string;
  title: string;
  date: string;
  location: string;
  message: string;
  image?: string;
  tone: "rose" | "gold" | "plum" | "midnight";
  secret?: string;
};

// Replace these starter entries with Richa and Naresh's real memories.
// Add the matching images under /public/memories and set image: "/memories/file.webp".
export const memories: Memory[] = [
  {
    id: 1,
    eyebrow: "ARCHIVE_001",
    title: "The beginning of us",
    date: "Add your date",
    location: "Add your place",
    message:
      "This space is waiting for the story of one of those early moments that became more important with time.",
    tone: "rose",
    secret: "You looked beautiful here. I noticed. I always notice.",
  },
  {
    id: 2,
    eyebrow: "ARCHIVE_002",
    title: "An ordinary day I still remember",
    date: "Add your date",
    location: "Somewhere that became special",
    message:
      "Not every favourite memory needs a grand plan. Sometimes it is simply you, me, and a day I wish had lasted longer.",
    tone: "gold",
    secret: "Ordinary days with you have never felt ordinary to me.",
  },
  {
    id: 3,
    eyebrow: "ARCHIVE_003",
    title: "One of our adventures",
    date: "Add your date",
    location: "Add your destination",
    message:
      "A place, a hundred photographs, a little chaos, and the person who makes every trip feel like home.",
    tone: "plum",
    secret: "I would take the long way again, as long as it was with you.",
  },
  {
    id: 4,
    eyebrow: "BIRTHDAY_ARCHIVE",
    title: "A birthday from before",
    date: "20 September",
    location: "Our version history",
    message:
      "Every birthday adds another chapter. This one deserves a place in the archive beside all the celebrations that came before it.",
    tone: "midnight",
    secret: "Some traditions deserve to be saved forever.",
  },
];

export const reasons = [
  ["01", "Your heart", "The kindness you give so naturally, even when nobody is watching."],
  ["02", "Your laugh", "The sound that can rescue an ordinary day in a second."],
  ["03", "Your strength", "The quiet way you keep going, growing and caring."],
  ["04", "Your beautiful chaos", "The little habits, expressions and surprises that are completely you."],
  ["05", "The way you love", "Warmly, deeply, and in all the small things that matter most."],
  ["06", "Simply you", "No list could hold every reason—and that might be my favourite part."],
] as const;

export const wishes = [
  "More mornings that begin with a smile.",
  "More reasons to feel proud of yourself.",
  "More places that become our stories.",
  "More peace on the days that feel heavy.",
  "More laughter until our stomachs hurt.",
  "And me beside you through all of it.",
];
