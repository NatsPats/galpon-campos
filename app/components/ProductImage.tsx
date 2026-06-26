import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  preload?: boolean;
}

export default function ProductImage({
  src,
  alt,
  preload = false,
}: ProductImageProps) {
  return (
    <div className="relative overflow-hidden w-full md:w-2/5 aspect-[4/5]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 40vw, 100vw"
        quality={75}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        preload={preload}
      />
    </div>
  );
}
