"use client";

import { useState, useEffect } from "react";

export default function ApiMessage() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <p>{message}</p>;
}
