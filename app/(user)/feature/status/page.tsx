import { Article, ArticleContainer } from "@/components/layout/article";
import Terminal from "./_components/terminal";

export default async function Test() {
  return (
    <ArticleContainer>
      <Article>
        <h1>Status</h1>
        <p>
          See the real-time health and availability of this website and its
          individual services (e.g., API, database, login).
        </p>
      </Article>
      <Terminal />
    </ArticleContainer>
  );
}
