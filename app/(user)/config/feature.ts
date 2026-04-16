interface Feature {
  title: string;
  description?: string;
  href: string | null;
}

const features: Feature[] = [
  {
    title: "Tailwind Animations",
    description:
      "Tailwind provides utility classes to animate your components without CSS.",
    href: "/feature/tailwind-animations",
  },
  {
    title: "Posts",
    description: "Write your own posts or read posts written by other users.",
    href: "/feature/post",
  },
  {
    title: "Status",
    description: "Check the status of the website and its services.",
    href: "/feature/status",
  },
];

export default features;
