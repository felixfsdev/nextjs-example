import { Article, ArticleContainer } from "@/components/layout/article";

export default function PrivacyPolicyPage() {
  return (
    <ArticleContainer>
      <Article>
        <h1>Privacy policy</h1>
        <p className="text-muted-foreground text-sm">
          Last Updated: April 2026
        </p>

        <h3>1. Information we collect</h3>
        <p>
          When you sign in with Google or GitHub, we collect your email address
          and profile picture. This information is used strictly to create your
          account and manage your login session.
        </p>

        <h3>2. Public content</h3>
        <p>
          When you upload a post, your username and the date of the upload will
          be visible to all visitors. Your email address is kept private and is
          not displayed to the public.
        </p>

        <h3>3. Data usage & sharing</h3>
        <ul>
          <li>
            We use your data only to provide the core functionality of this
            website.
          </li>
          <li>We do not use analytics, tracking scripts, or advertisements.</li>
          <li>
            We do not sell or share your personal information with third
            parties.
          </li>
        </ul>

        <h3>4. Your rights</h3>
        <p>
          If you wish to have your account or posts deleted, please contact us
          at [Insert Your Contact Email].
        </p>
      </Article>
    </ArticleContainer>
  );
}
