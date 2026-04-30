import LoadingDots from "../ui/loading-dots";

interface Props {
  text?: string | null;
}

export default function LoadingScreen({ text = "Loading" }: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="flex flex-col items-center jufity-center gap-4">
        {text && <h1 className="text-2xl text-center">{text}</h1>}
        <LoadingDots />
      </div>
    </div>
  );
}
