import type { Gallo } from "../data/gallosData";
import ProductImage from "./ProductImage";
import ContactButton from "./ContactButton";

interface ProductCardProps {
  gallo: Gallo;
  isFirst: boolean;
}

export default function ProductCard({ gallo, isFirst }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row group">
      <ProductImage
        src={gallo.image}
        alt={`${gallo.name} — ${gallo.peso}, ${gallo.edad}`}
        preload={isFirst}
      />

      <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">
            {gallo.name}
          </h2>
          <p className="text-stone-500 mb-6 text-lg">
            Peso: {gallo.peso} &bull; Edad: {gallo.edad}
          </p>
        </div>

        <ContactButton galloName={gallo.name} />
      </div>
    </article>
  );
}
