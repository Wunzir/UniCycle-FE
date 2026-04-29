type Props = {
  title: string;
  subtitle: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <section className="section-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}