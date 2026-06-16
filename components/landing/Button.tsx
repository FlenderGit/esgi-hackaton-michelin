import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "secondary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90";

  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-neutral",
    outline: "border-2 border-white text-white",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
