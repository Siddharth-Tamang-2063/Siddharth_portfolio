import { useState } from "react";

// Styles
import "../src/index.css";

// Components
import Loader  from "./components/Loader";
import Nav     from "./components/Nav";
import Hero    from "./components/Hero";
import Marquee from "./components/Marquee";
import AboutMe from "./components/AboutMe";
import Work    from "./components/Work";
import Skills  from "./components/Skills";
import WhyMe   from "./components/whyMe";
import Contact from "./components/Contact";
import Footer  from "./components/Footer";

/**
 * App — Root component
 * Controls the loader gate: renders the main layout only after
 * the intro animation completes.
 */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ background: "var(--cream)" }}>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
        
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <AboutMe />
            <Work />
            <Skills />
            <WhyMe />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}