export default function Spinner() {
  return (
    <div className="flex space-x-2">
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
    </div>
  );
}
