import { HandsTable } from '@/components/hands/hands-table';

export default function HandsPage(): JSX.Element {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Mãos</h1>
      <HandsTable />
    </section>
  );
}
