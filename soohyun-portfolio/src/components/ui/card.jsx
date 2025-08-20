export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={
        "rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/60 backdrop-blur " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}
export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={"p-5 " + className} {...props}>
      {children}
    </div>
  );
}
