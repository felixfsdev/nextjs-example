import LoadingDots from "../ui/loading-dots";
import OpticalCenter from "./optical-center";

interface Props {
  text?: string | null;
}

export default function LoadingScreen({ text = "Loading" }: Props) {
  return (
    <OpticalCenter>
      <div className="flex flex-col items-center jufity-center gap-4">
        {text && <h1 className="text-2xl text-center">{text}</h1>}
        <LoadingDots />
      </div>
    </OpticalCenter>
  );
}
