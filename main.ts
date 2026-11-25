import { mkdirSync, writeFileSync } from "node:fs";

// The entry picks one word to erase from the dictionary forever.
// Six candidates are scored on the judge's criteria and the best
// score wins; the program writes that single word to the output.
type Candidate = {
  word: string;
  instant: number; // the joke lands the moment the word is gone
  itself: number; // humour from the word's sound and its meanings
  fresh: number; // a pick the rest of the field would not make first
};

// Duelled pairwise on the judge's criteria: onomatopoeia wins,
// because the word about sounds is itself unspellable, while moist
// loses on freshness since it is the first pick of the whole field.
const CANDIDATES: Candidate[] = [
  { word: "moist", instant: 9, itself: 8, fresh: 1 },
  { word: "synergy", instant: 7, itself: 6, fresh: 6 },
  { word: "irregardless", instant: 7, itself: 7, fresh: 7 },
  { word: "supercalifragilisticexpialidocious", instant: 8, itself: 7, fresh: 8 },
  { word: "discombobulate", instant: 7, itself: 8, fresh: 6 },
  { word: "onomatopoeia", instant: 9, itself: 10, fresh: 9 },
];

function score(c: Candidate): number {
  return c.instant * 3 + c.itself * 3 + c.fresh * 2;
}

function pickBest(list: Candidate[]): Candidate {
  let best = list[0];
  for (const c of list.slice(1)) {
    if (score(c) > score(best)) {
      best = c;
    }
  }
  return best;
}

// The winner is written alone: one word, spelled correctly,
// with nothing added around it.
const winner = pickBest(CANDIDATES);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.word, "utf8");
