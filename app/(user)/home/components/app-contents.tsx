import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppContents() {
  const cards = [
    {
      title: "Tailwind Animations",
      description:
        "Tailwind provides utility classes to animate your components without touching CSS.",
      href: "/feature/tailwind-animations",
      disabled: false,
    },
    ...Array(5).fill({
      title: "Coming soon",
      description:
        "I look around and, Sin city's cold and empty... No one's around to judge me...",
      href: null,
      disabled: true,
    }),
  ];

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{card.description}</CardDescription>
          </CardContent>
          <CardFooter>
            {card.href ? (
              <Link href={card.href}>
                <Button>Visit</Button>
              </Link>
            ) : (
              <Button disabled>Visit</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
