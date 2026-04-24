interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accent?: "primary" | "success" | "accent" | "destructive" | "info" | "none";
}

export function Card({
  className = "",
  children,
  accent = "none",
  ...props
}: CardProps) {
  const accentStyles: Record<string, string> = {
    primary: "border-t-2 border-t-primary",
    success: "border-t-2 border-t-success",
    accent: "border-t-2 border-t-accent",
    destructive: "border-t-2 border-t-destructive",
    info: "border-t-2 border-t-info",
    none: "",
  };

  return (
    <div
      className={`bg-card rounded-xl border border-border shadow-sm bg-gradient-card ${accentStyles[accent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-5 pb-0 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold text-card-foreground ${className}`}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-muted-foreground mt-1 ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-5 ${className}`} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-5 pt-0 flex items-center gap-2 ${className}`}
      {...props}
    />
  );
}
