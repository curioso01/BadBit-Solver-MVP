export type PlayerStatus = 'active' | 'folded' | 'all-in' | 'sitting-out';
export type TablePosition = 'UTG' | 'UTG+1' | 'MP' | 'LJ' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';
export type ActionKind = 'FOLD' | 'CALL' | 'RAISE' | 'BET' | 'CHECK' | 'ALL-IN';
export type Street = 'PREFLOP' | 'FLOP' | 'TURN' | 'RIVER';

export type ReplayPlayer = {
  id: string;
  name: string;
  position: TablePosition;
  stack: number;
  status: PlayerStatus;
  isHero?: boolean;
  cards?: [string, string];
};

export type ReplayAction = {
  id: string;
  street: Street;
  actorId: string;
  type: ActionKind;
  amount?: number;
  potAfterAction: number;
  note?: string;
};

export type ReplayHand = {
  handId: string;
  blinds: string;
  heroId: string;
  players: ReplayPlayer[];
  boardRunout: { flop: [string, string, string]; turn: string; river: string };
  actions: ReplayAction[];
  tournamentName: string;
  tableName: string;
};

export type StrategicStat = {
  label: 'openRaise' | 'fold' | 'threeBet' | 'call' | 'cbet' | 'foldToThreeBet';
  value: number;
};

export type RangeAction = 'RAISE' | 'CALL' | 'FOLD' | '3BET';
export type MatrixCell = { combo: string; action: RangeAction; weight: number };

export type StrategicAnalysis = {
  title: string;
  modeLabel: string;
  idealAction: string;
  rationale: string[];
  stats: StrategicStat[];
  matrix: MatrixCell[];
};
