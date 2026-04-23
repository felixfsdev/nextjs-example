import { Prose, StandardContainer } from "@/components/layout/prose";
import Terminal from "./_components/terminal";

export default async function Test() {
  return (
    <StandardContainer>
      <Prose>
        <h1>Status</h1>
        <p>
          See the real-time health and availability of this website and its
          individual services (e.g., API, database, login).
        </p>
      </Prose>
      <Terminal />
    </StandardContainer>
  );
}
