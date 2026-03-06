import type { ParsedHand, HandAction, Street } from '@/types/domain';

const parseAmount = (line: string): number | undefined => {
  const match = line.match(/(\d+(?:\.\d+)?)/g);
  if (!match?.length) return undefined;
  return Number(match[match.length - 1]);
};

const detectStreet = (line: string): Street | null => {
  if (line.includes('*** HOLE CARDS ***')) return 'PREFLOP';
  if (line.includes('*** FLOP ***')) return 'FLOP';
  if (line.includes('*** TURN ***')) return 'TURN';
  if (line.includes('*** RIVER ***')) return 'RIVER';
  return null;
};

export const parseGGHand = (rawText: string): ParsedHand => {
  const lines = rawText.split('\n').map((line) => line.trim()).filter(Boolean);
  let currentStreet: Street = 'PREFLOP';
  const actions: HandAction[] = [];
  const board: string[] = [];

  const idMatch = rawText.match(/Hand\s+#?(\d+)/i);
  const handId = idMatch?.[1] ?? `UNKNOWN-${Date.now()}`;

  for (const line of lines) {
    const street = detectStreet(line);
    if (street) {
      currentStreet = street;
      const cards = line.match(/\[(.*?)\]/g);
      if (cards) {
        cards.forEach((chunk) => {
          chunk.replace(/[\[\]]/g, '').split(' ').forEach((card) => {
            if (card) board.push(card);
          });
        });
      }
      continue;
    }

    const actionMatch = line.match(/^(.+?):\s(folds|calls|raises|bets|checks)(?:\s.*)?$/i);
    if (actionMatch) {
      actions.push({
        street: currentStreet,
        actor: actionMatch[1],
        action: actionMatch[2].toUpperCase(),
        amount: parseAmount(line)
      });
    }
  }

  const heroCards = rawText.match(/Dealt to\s.+?\s\[(.*?)\]/i)?.[1]?.split(' ') ?? [];

  return {
    externalHandId: handId,
    platform: rawText.includes('GGPoker') ? 'GGPOKER' : 'UNKNOWN',
    tournamentName: rawText.match(/Tournament\s*:?\s*(.+)/i)?.[1] ?? 'Unknown Tournament',
    tableName: rawText.match(/Table\s*:?\s*(.+)/i)?.[1] ?? 'Unknown Table',
    blindsSmall: parseAmount(rawText.match(/small blind\s*(\d+(?:\.\d+)?)/i)?.[0] ?? ''),
    blindsBig: parseAmount(rawText.match(/big blind\s*(\d+(?:\.\d+)?)/i)?.[0] ?? ''),
    heroCards,
    board,
    actions,
    showdown: lines.filter((line) => line.includes('shows')).slice(0, 4),
    potTotal: parseAmount(rawText.match(/Total pot\s*(\d+(?:\.\d+)?)/i)?.[0] ?? ''),
    resultLabel: rawText.includes('collected') ? 'WIN' : 'LOSE'
  };
};

export const parseGenericHand = (rawText: string): ParsedHand => ({
  externalHandId: `GEN-${Date.now()}`,
  platform: 'UNKNOWN',
  tournamentName: 'Unknown Tournament',
  tableName: 'Unknown Table',
  heroCards: [],
  board: [],
  actions: [],
  showdown: [],
  resultLabel: 'UNKNOWN'
});

export const parseHandHistory = (rawText: string): ParsedHand => {
  try {
    if (/ggpoker|holdem\s+no\s+limit/i.test(rawText)) {
      return parseGGHand(rawText);
    }
    return parseGenericHand(rawText);
  } catch {
    return parseGenericHand(rawText);
  }
};
