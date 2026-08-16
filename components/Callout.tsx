type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="callout">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
