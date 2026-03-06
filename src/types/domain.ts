export type Street = 'PREFLOP' | 'FLOP' | 'TURN' | 'RIVER';

export type HandAction = { street: Street; actor: string; action: string; amount?: number };

export type ParsedHand = {
  externalHandId: string;
  platform: 'GGPOKER' | 'UNKNOWN';
  tournamentName: string;
  tableName: string;
  blindsSmall?: number;
  blindsBig?: number;
  heroCards: string[];
  board: string[];
  actions: HandAction[];
  showdown: string[];
  potTotal?: number;
  resultLabel: string;
};
