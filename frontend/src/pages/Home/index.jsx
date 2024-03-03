import React from "react";
import { Promo } from "../../components/Promo";
import { Highlighteds } from "../../components/Highlighteds";

export default function Home() {
  return (
    <main>
      <section className="flex flex-wrap justify-center">
        <Promo />
        <Highlighteds />
      </section>
    </main>
  );
}
