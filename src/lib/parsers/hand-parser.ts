import type { ParsedHand, HandAction, Street } from '@/types/domain';

// Extrai o último valor numérico encontrado em uma linha.
// Exemplo: "Player calls 12.5" -> 12.5
const parseAmount = (line: string): number | undefined => {
  const match = line.match(/(\d+(?:\.\d+)?)/g);

  // Se não encontrar nenhum número, retorna undefined
  if (!match?.length) return undefined;

  // Retorna o último número encontrado na linha
  return Number(match[match.length - 1]);
};

// Detecta em qual street a ação está acontecendo
const detectStreet = (line: string): Street | null => {
  if (line.includes('*** HOLE CARDS ***')) return 'PREFLOP';
  if (line.includes('*** FLOP ***')) return 'FLOP';
  if (line.includes('*** TURN ***')) return 'TURN';
  if (line.includes('*** RIVER ***')) return 'RIVER';
  return null;
};

// Faz o parser de uma hand history no formato esperado da GGPoker
export const parseGGHand = (rawText: string): ParsedHand => {
  // Divide o texto em linhas, remove espaços extras e elimina linhas vazias
  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  // Street atual usada para atribuir as ações corretamente
  let currentStreet: Street = 'PREFLOP';

  // Lista de ações da mão
  const actions: HandAction[] = [];

  // Cartas do board extraídas ao longo das streets
  const board: string[] = [];

  // Tenta extrair o ID da mão
  const idMatch = rawText.match(/Hand\s+#?(\d+)/i);
  const handId = idMatch?.[1] ?? `UNKNOWN-${Date.now()}`;

  // Percorre cada linha da hand history
  for (const line of lines) {
    // Verifica se a linha marca mudança de street
    const street = detectStreet(line);

    if (street) {
      currentStreet = street;

      // Procura blocos entre colchetes, como [Ah Kd 2c]
      const cards = line.match(/\[(.*?)\]/g);

      if (cards) {
        cards.forEach((chunk) => {
          chunk
            .replace(/[\[\]]/g, '') // Remove os colchetes
            .split(' ') // Divide as cartas
            .forEach((card) => {
              if (card) board.push(card);
            });
        });
      }

      // Vai para a próxima linha após processar a street
      continue;
    }

    // Detecta ações comuns dos jogadores
    const actionMatch = line.match(
      /^(.+?):\s(folds|calls|raises|bets|checks)(?:\s.*)?$/i
    );

    if (actionMatch) {
      actions.push({
        street: currentStreet,
        actor: actionMatch[1].trim(), // Nome do jogador
        action: actionMatch[2].toUpperCase().trim(), // Ação normalizada
        amount: parseAmount(line) // Valor envolvido na ação, se houver
      });
    }
  }

  // Extrai as cartas do herói
  const heroCards =
    rawText.match(/Dealt to\s.+?\s\[(.*?)\]/i)?.[1]?.split(' ') ?? [];

  // Monta e retorna o objeto final da mão parseada
  return {
    externalHandId: handId,
    platform: rawText.includes('GGPoker') ? 'GGPOKER' : 'UNKNOWN',

    // Extrai nome do torneio
    tournamentName:
      rawText.match(/Tournament\s*:?\s*(.+)/i)?.[1]?.trim() ??
      'Unknown Tournament',

    // Extrai nome da mesa
    tableName:
      rawText.match(/Table\s*:?\s*(.+)/i)?.[1]?.trim() ?? 'Unknown Table',

    // Extrai blind pequena; se não encontrar, usa 0
    blindsSmall:
      parseAmount(rawText.match(/small blind\s*(\d+(?:\.\d+)?)/i)?.[0] ?? '') ?? 0,

    // Extrai blind grande; se não encontrar, usa 0
    blindsBig:
      parseAmount(rawText.match(/big blind\s*(\d+(?:\.\d+)?)/i)?.[0] ?? '') ?? 0,

    heroCards,
    board,
    actions,

    // Captura linhas de showdown com "shows"
    showdown: lines.filter((line) => line.includes('shows')).slice(0, 4),

    // Extrai valor total do pote; se não encontrar, usa 0
    potTotal:
      parseAmount(rawText.match(/Total pot\s*(\d+(?:\.\d+)?)/i)?.[0] ?? '') ?? 0,

    // Heurística simples para resultado final
    resultLabel: rawText.includes('collected') ? 'WIN' : 'LOSE'
  };
};

// Retorna uma estrutura genérica quando o parser não reconhece o formato da mão
export const parseGenericHand = (): ParsedHand => ({
  externalHandId: `GEN-${Date.now()}`,
  platform: 'UNKNOWN',
  tournamentName: 'Unknown Tournament',
  tableName: 'Unknown Table',
  blindsSmall: 0,
  blindsBig: 0,
  heroCards: [],
  board: [],
  actions: [],
  showdown: [],
  potTotal: 0,
  resultLabel: 'UNKNOWN'
});

// Função principal: tenta identificar o tipo de hand history
export const parseHandHistory = (rawText: string): ParsedHand => {
  try {
    // Se encontrar indícios de GGPoker / Holdem No Limit, usa o parser principal
    if (/ggpoker|holdem\s+no\s+limit/i.test(rawText)) {
      return parseGGHand(rawText);
    }

    // Caso contrário, retorna estrutura genérica
    return parseGenericHand();
  } catch {
    // Em caso de erro inesperado no parser, evita quebrar a aplicação
    return parseGenericHand();
  }
};
