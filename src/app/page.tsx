import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { HomeMenu } from "@/components/HomeMenu";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="grid flex-1 grid-rows-[auto_1fr] gap-4 px-4 pb-6 sm:px-6 md:gap-6 lg:px-10 xl:px-12 xl:pb-10">
        <HomeHero />
        <HomeMenu />
      </section>
    </main>
  );
}
