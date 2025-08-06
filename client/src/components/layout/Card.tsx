// src/components/layout/Card.tsx
export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">{children}</div>
  );
}
