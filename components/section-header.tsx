type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  id?: string;
  children?: React.ReactNode;
};

export function SectionHeader({ index, eyebrow, title, id, children }: SectionHeaderProps) {
  return (
    <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[1fr_minmax(0,26rem)] md:items-end md:gap-12">
      <div>
        <p className="eyebrow mb-4">
          <span className="text-accent">{index}</span> / {eyebrow}
        </p>
        <h2
          id={id}
          className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          {title}
        </h2>
      </div>
      {children ? <div className="text-muted text-pretty md:pb-1.5">{children}</div> : null}
    </div>
  );
}
