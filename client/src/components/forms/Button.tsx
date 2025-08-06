// src/components/forms/Button.tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({ children, onClick, type = "button", className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-secondary)] transition ${className}`}
    >
      {children}
    </button>
  );
}
