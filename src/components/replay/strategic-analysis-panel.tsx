import { Card } from '@/components/ui/card';
import { RangeMatrix } from './range-matrix';
import type { StrategicAnalysis } from '@/types/replay';

export const StrategicAnalysisPanel = ({ analysis }: { analysis: StrategicAnalysis }): JSX.Element => (
  <Card className="space-y-4">
    <div>
      <p className="text-xs uppercase tracking-widest text-electric">{analysis.modeLabel}</p>
      <h3 className="text-lg font-semibold mt-1">{analysis.title}</h3>
      <p className="text-sm text-slate-300 mt-2">Ação ideal: {analysis.idealAction}</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {analysis.stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/60 p-2">
          <p className="text-[11px] text-slate-400">{stat.label}</p>
          <p className="text-xl font-semibold">{stat.value}%</p>
        </div>
      ))}
    </div>

    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4">
      {analysis.rationale.map((item) => <li key={item}>{item}</li>)}
    </ul>

    <RangeMatrix matrix={analysis.matrix} />
  </Card>
);
