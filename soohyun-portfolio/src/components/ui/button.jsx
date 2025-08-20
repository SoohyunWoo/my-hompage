export function Button({ className = "", variant = "ghost", size = "sm", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md transition focus:outline-none focus-visible:ring-2";
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-sm px-4 py-2" };
  const variants = {
    ghost: "bg-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/50",
    solid: "bg-[#002D56] text-white hover:bg-[#002D56]/90"
  };
  return <button className={[base, sizes[size], variants[variant], className].join(" ")} {...props} />;
}
