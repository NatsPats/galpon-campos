import { gallosData } from "./data/gallosData";
import ProductCard from "./components/ProductCard";
import WelcomeScreen from "./components/welcome/WelcomeScreen";

export default function Catalogo() {
  return (
    <WelcomeScreen>
      <div className="min-h-screen bg-stone-100 font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-950/90 via-rose-900/80 to-rose-950/90 backdrop-blur-md border-b border-rose-800/30 shadow-lg shadow-rose-950/20 transition-all">
          <div className="max-w-4xl mx-auto px-4 py-4 md:py-5 text-center flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-widest text-rose-50 font-serif uppercase drop-shadow-md">
              Sombras y Arena
            </h1>
            <div className="w-12 h-1 bg-black/80 mt-2 rounded-full"></div>
          </div>
        </header>

        {/* Grid del Catálogo */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 gap-y-10">
            {gallosData.map((gallo, index) => (
              <ProductCard
                key={gallo.id}
                gallo={gallo}
                isFirst={index === 0}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-8 text-center border-t border-stone-200 mt-4">
          <p className="text-stone-400 text-sm tracking-wide">
            &copy; {new Date().getFullYear()} Sombras y Arena. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </WelcomeScreen>
  );
}

