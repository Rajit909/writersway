type AdminHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

export function AdminHeader({ title, subtitle, children }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold font-headline">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
