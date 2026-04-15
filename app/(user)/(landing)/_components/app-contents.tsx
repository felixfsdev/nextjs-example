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
import features from "../../config/feature";

export default function AppContents() {
  const cards = [
    ...features,
    {
      title: "Coming soon",
      description: "Stay tuned!",
      href: null,
    },
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
