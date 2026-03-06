import type { MatrixCell, RangeAction, ReplayAction, ReplayHand, ReplayPlayer, StrategicAnalysis, Street } from '@/types/replay';

const players: ReplayPlayer[] = [
  { id: 'p1', name: 'MarinaGTO', position: 'UTG', stack: 37.4, status: 'active' },
  { id: 'p2', name: 'NashRanger', position: 'UTG+1', stack: 42.1, status: 'active' },
  { id: 'p3', name: 'EdgeLab', position: 'MP', stack: 55.8, status: 'active' },
  { id: 'p4', name: 'ChipHunter', position: 'LJ', stack: 26.2, status: 'active' },
  { id: 'p5', name: 'RiverMind', position: 'HJ', stack: 31.6, status: 'active' },
  { id: 'p6', name: 'ICMGrip', position: 'CO', stack: 23.9, status: 'active' },
  { id: 'p7', name: 'Hero', position: 'BTN', stack: 33.2, status: 'active', isHero: true, cards: ['A♠', 'K♥'] },
  { id: 'p8', name: 'BlindShield', position: 'SB', stack: 18.9, status: 'active' },
  { id: 'p9', name: 'BigStackBB', position: 'BB', stack: 61.5, status: 'active' }
];

const actions: ReplayAction[] = [
  { id: 'a1', street: 'PREFLOP', actorId: 'p1', type: 'FOLD', potAfterAction: 1.5 },
  { id: 'a2', street: 'PREFLOP', actorId: 'p2', type: 'FOLD', potAfterAction: 1.5 },
  { id: 'a3', street: 'PREFLOP', actorId: 'p3', type: 'FOLD', potAfterAction: 1.5 },
  { id: 'a4', street: 'PREFLOP', actorId: 'p4', type: 'RAISE', amount: 2.2, potAfterAction: 3.7 },
  { id: 'a5', street: 'PREFLOP', actorId: 'p5', type: 'FOLD', potAfterAction: 3.7 },
  { id: 'a6', street: 'PREFLOP', actorId: 'p6', type: 'CALL', amount: 2.2, potAfterAction: 5.9 },
  { id: 'a7', street: 'PREFLOP', actorId: 'p7', type: 'RAISE', amount: 8.4, potAfterAction: 14.3, note: '3-bet light/value mix' },
  { id: 'a8', street: 'PREFLOP', actorId: 'p8', type: 'FOLD', potAfterAction: 14.3 },
  { id: 'a9', street: 'PREFLOP', actorId: 'p9', type: 'FOLD', potAfterAction: 14.3 },
  { id: 'a10', street: 'PREFLOP', actorId: 'p4', type: 'CALL', amount: 6.2, potAfterAction: 20.5 },
  { id: 'a11', street: 'PREFLOP', actorId: 'p6', type: 'FOLD', potAfterAction: 20.5 },
  { id: 'a12', street: 'FLOP', actorId: 'p4', type: 'CHECK', potAfterAction: 20.5 },
  { id: 'a13', street: 'FLOP', actorId: 'p7', type: 'BET', amount: 6.1, potAfterAction: 26.6 },
  { id: 'a14', street: 'FLOP', actorId: 'p4', type: 'CALL', amount: 6.1, potAfterAction: 32.7 },
  { id: 'a15', street: 'TURN', actorId: 'p4', type: 'CHECK', potAfterAction: 32.7 },
  { id: 'a16', street: 'TURN', actorId: 'p7', type: 'BET', amount: 13, potAfterAction: 45.7 },
  { id: 'a17', street: 'TURN', actorId: 'p4', type: 'FOLD', potAfterAction: 45.7 }
];

export const replayHandMock: ReplayHand = {
  handId: 'BB-2026-000178',
  blinds: '500 / 1000 / 125',
  heroId: 'p7',
  players,
  boardRunout: { flop: ['A♥', '7♦', '2♣'], turn: 'K♠', river: '4♣' },
  actions,
  tournamentName: 'BADBIT High Roller 55',
  tableName: 'Table 12'
};

const combos = ['AA','AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s','AKo','KK','KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s','AQo','KQo','QQ','QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s','AJo','KJo','QJo','JJ','JTs','J9s','J8s','J7s','J6s','J5s','J4s','J3s','J2s','ATo','KTo','QTo','JTo','TT','T9s','T8s','T7s','T6s','T5s','T4s','T3s','T2s','A9o','K9o','Q9o','J9o','T9o','99','98s','97s','96s','95s','94s','93s','92s','A8o','K8o','Q8o','J8o','T8o','98o','88','87s','86s','85s','84s','83s','82s','A7o','K7o','Q7o','J7o','T7o','97o','87o','77','76s','75s','74s','73s','72s','A6o','K6o','Q6o','J6o','T6o','96o','86o','76o','66','65s','64s','63s','62s','A5o','K5o','Q5o','J5o','T5o','95o','85o','75o','65o','55','54s','53s','52s','A4o','K4o','Q4o','J4o','T4o','94o','84o','74o','64o','54o','44','43s','42s','A3o','K3o','Q3o','J3o','T3o','93o','83o','73o','63o','53o','43o','33','32s','A2o','K2o','Q2o','J2o','T2o','92o','82o','72o','62o','52o','42o','32o','22'];

const actionForCombo = (combo: string): RangeAction => {
  if (['AA', 'KK', 'QQ', 'AKs', 'AKo', 'AQs', 'JJ'].includes(combo)) return 'RAISE';
  if (['AJs', 'KQs', 'TT', '99', 'AQo', 'KQo', 'ATs'].includes(combo)) return '3BET';
  if (combo.includes('s') && ['98s', '87s', '76s', '65s', '54s', 'T9s', 'JTs', 'QJs'].includes(combo)) return 'CALL';
  return combo.startsWith('A') || combo.startsWith('K') ? 'CALL' : 'FOLD';
};

export const rangeMatrix: MatrixCell[] = combos.map((combo) => ({ combo, action: actionForCombo(combo), weight: actionForCombo(combo) === 'FOLD' ? 0.15 : 0.7 }));

export const getStrategicAnalysis = (street: Street): StrategicAnalysis => ({
  title: 'Análise sugerida — IA / Assistente estratégico',
  modeLabel: 'Heurística contextual (MVP)',
  idealAction: street === 'PREFLOP' ? '3-bet para 8.0bb–9.0bb no BTN vs LJ open + CO flat.' : street === 'FLOP' ? 'C-bet 30-40% pot com vantagem de range e top pair/top kicker.' : street === 'TURN' ? 'Segundo barrel polarizado com blockers fortes e pressão de stack.' : 'Check back parte média do range e value thin em rivers seguros.',
  rationale: [
    'Posição do herói: BTN com vantagem de informação pós-flop.',
    'Stack efetivo ~26bb favorece sizings agressivos controlados.',
    'Pressão de blinds e antes aumenta EV de agressão pré-flop.',
    'Perfil da linha indica tendência passiva do vilão fora de posição.'
  ],
  stats: [
    { label: 'openRaise', value: 22 },
    { label: 'fold', value: 41 },
    { label: 'threeBet', value: 11 },
    { label: 'call', value: 26 },
    { label: 'cbet', value: 63 },
    { label: 'foldToThreeBet', value: 49 }
  ],
  matrix: rangeMatrix
});
