import { describe, it, expect } from 'vitest';
import { parseHandHistory } from '@/lib/parsers/hand-parser';

describe('hand parser', () => {
  it('parses GG hand and keeps required fields', () => {
    const raw = `GGPoker Hand #12345\nTournament: Sunday Special\nTable: 12\n*** HOLE CARDS ***\nDealt to Hero [As Kh]\nVillain: calls 2\n*** FLOP *** [Ah 7d 2c]\nHero: bets 3\nTotal pot 10`;
    const parsed = parseHandHistory(raw);
    expect(parsed.externalHandId).toBe('12345');
    expect(parsed.platform).toBe('GGPOKER');
    expect(parsed.heroCards).toEqual(['As', 'Kh']);
    expect(parsed.board.length).toBeGreaterThan(0);
  });

  it('falls back to unknown parser', () => {
    const parsed = parseHandHistory('random text');
    expect(parsed.platform).toBe('UNKNOWN');
    expect(parsed.resultLabel).toBe('UNKNOWN');
  });
});
