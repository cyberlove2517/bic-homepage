import Header from "../sections/Header";
import Hero from "../sections/Hero";
import TrustStrip from "../sections/TrustStrip";
import Services from "../sections/Services";
import Process from "../sections/Process";
import Cabinet from "../sections/Cabinet";
import Cast from "../sections/Cast";
import FeaturedWork from "../sections/FeaturedWork";
import Closing from "../sections/Closing";
import { useRevealRoot } from "../hooks/useReveal";

export default function Home() {
  const root = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={root}>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Cabinet />
        <Cast />
        <FeaturedWork />
        <Closing />
      </main>
    </div>
  );
}
