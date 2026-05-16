import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { HomeMenu } from "@/components/HomeMenu";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <section className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-7 px-12 pb-10">
        <HomeHero />
        <HomeMenu />
      </section>
    </main>
  );
}
