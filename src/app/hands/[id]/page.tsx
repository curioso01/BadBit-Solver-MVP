'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { PokerTable } from '@/components/replay/poker-table';
import { ActionTimeline } from '@/components/replay/action-timeline';
import { ReplayControls } from '@/components/replay/replay-controls';
import { Button } from '@/components/ui/button';
import { StrategicAnalysisPanel } from '@/components/replay/strategic-analysis-panel';
import { getStrategicAnalysis, replayHandMock } from '@/features/replay/mock-replay';
import type { ReplayAction, ReplayPlayer, Street } from '@/types/replay';

const streets: Street[] = ['PREFLOP', 'FLOP', 'TURN', 'RIVER'];

const getBoardByStreet = (street: Street): string[] => {
  if (street === 'PREFLOP') return [];
  if (street === 'FLOP') return replayHandMock.boardRunout.flop;
  if (street === 'TURN') return [...replayHandMock.boardRunout.flop, replayHandMock.boardRunout.turn];
  return [...replayHandMock.boardRunout.flop, replayHandMock.boardRunout.turn, replayHandMock.boardRunout.river];
};

const derivePlayersState = (players: ReplayPlayer[], actions: ReplayAction[]): ReplayPlayer[] => {
  const foldedOrAllInById = new Map<string, ReplayPlayer['status']>();
  actions.forEach((action) => {
    if (action.type === 'FOLD') foldedOrAllInById.set(action.actorId, 'folded');
    if (action.type === 'ALL-IN') foldedOrAllInById.set(action.actorId, 'all-in');
  });

  return players.map((player) => ({
    ...player,
    status: foldedOrAllInById.get(player.id) ?? 'active'
  }));
};

export default function ReplayPage(): JSX.Element {
  const [actionIndex, setActionIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);

  const currentAction = replayHandMock.actions[Math.max(actionIndex, 0)];
  const currentStreet = currentAction?.street ?? 'PREFLOP';
  const actionsUntilCurrent = replayHandMock.actions.slice(0, actionIndex + 1);
  const board = getBoardByStreet(currentStreet);
  const players = derivePlayersState(replayHandMock.players, actionsUntilCurrent);
  const pot = currentAction?.potAfterAction ?? 1.5;
  const analysis = useMemo(() => getStrategicAnalysis(currentStreet), [currentStreet]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActionIndex((idx) => (idx >= replayHandMock.actions.length - 1 ? idx : idx + 1));
    }, 1200);
    return () => clearInterval(timer);
  }, [autoplay]);

  const jumpStreet = (direction: 1 | -1): void => {
    const currentStreetIndex = streets.indexOf(currentStreet);
    const nextStreetIndex = Math.min(Math.max(currentStreetIndex + direction, 0), streets.length - 1);
    const nextStreet = streets[nextStreetIndex];
    const actionTargetIndex = replayHandMock.actions.findIndex((action) => action.street === nextStreet);
    if (actionTargetIndex >= 0) setActionIndex(actionTargetIndex);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Replay de mão premium</h1>
          <p className="text-sm text-slate-400">{replayHandMock.tournamentName} · {replayHandMock.tableName} · Hand {replayHandMock.handId}</p>
        </div>
        <Button className="bg-transparent text-slate-200 border-slate-600" onClick={() => setShowAnalysis((current) => !current)}>
          {showAnalysis ? 'Ocultar análise' : 'Abrir análise estratégica'}
        </Button>
      </div>

      <div className="grid xl:grid-cols-[1fr_380px] gap-4">
        <PokerTable players={players} boardCards={board} pot={pot} actingPlayerId={currentAction?.actorId} />

        <Card className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-electric">Street atual</p>
            <p className="text-xl font-semibold">{currentStreet}</p>
            <p className="text-sm text-slate-300 mt-1">Blinds: {replayHandMock.blinds}</p>
          </div>

          <ReplayControls
            onPrevAction={() => setActionIndex((idx) => Math.max(0, idx - 1))}
            onNextAction={() => setActionIndex((idx) => Math.min(replayHandMock.actions.length - 1, idx + 1))}
            onPrevStreet={() => jumpStreet(-1)}
            onNextStreet={() => jumpStreet(1)}
            onReset={() => {
              setActionIndex(0);
              setAutoplay(false);
            }}
            onToggleAutoplay={() => setAutoplay((state) => !state)}
            autoplay={autoplay}
          />

          <ActionTimeline actions={replayHandMock.actions} players={replayHandMock.players} currentActionIndex={actionIndex} />
        </Card>
      </div>

      {showAnalysis ? <StrategicAnalysisPanel analysis={analysis} /> : null}
    </section>
  );
}
