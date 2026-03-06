import { Button } from '@/components/ui/button';

type Props = {
  onPrevAction: () => void;
  onNextAction: () => void;
  onPrevStreet: () => void;
  onNextStreet: () => void;
  onReset: () => void;
  onToggleAutoplay: () => void;
  autoplay: boolean;
};

export const ReplayControls = ({ onPrevAction, onNextAction, onPrevStreet, onNextStreet, onReset, onToggleAutoplay, autoplay }: Props): JSX.Element => (
  <div className="grid grid-cols-2 gap-2">
    <Button onClick={onPrevAction}>Ação anterior</Button>
    <Button onClick={onNextAction}>Próxima ação</Button>
    <Button onClick={onPrevStreet} className="bg-transparent border-slate-600 text-slate-300">Street anterior</Button>
    <Button onClick={onNextStreet} className="bg-transparent border-slate-600 text-slate-300">Próxima street</Button>
    <Button onClick={onReset} className="bg-transparent border-slate-600 text-slate-300">Reset replay</Button>
    <Button onClick={onToggleAutoplay} className={autoplay ? 'bg-mint/20 text-mint border-mint/40' : ''}>{autoplay ? 'Autoplay ON' : 'Autoplay OFF'}</Button>
  </div>
);
