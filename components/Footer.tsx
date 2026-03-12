type FooterProps = {
  text: string;
};

export default function Footer({ text }: FooterProps) {
  return (
    <footer className="flex flex-col items-center border-t border-border mx-5 p-3">
      <p className="text-border text-xs">{text}</p>
    </footer>
  );
}
