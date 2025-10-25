import Header from "./components/Header";
import Hero from "./components/Hero";
import Differentials from "./components/Differentials";
import Configurator from "./components/Configurator";
import WorksGallery from "./components/WorksGallery";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="antialiased" >
      <Header />
      <Hero />
      <Differentials />
      <Configurator />
      <WorksGallery />
      <Footer />
    </main>
  );
}
