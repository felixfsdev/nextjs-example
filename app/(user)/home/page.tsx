"use client";

import Article from "@/components/ui/article";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Article>
        <h1>Homepage</h1>
        <p>{message}</p>
      </Article>
    </div>
  );
}
