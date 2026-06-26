"use client";

import { MessageCircle } from "lucide-react";

const PHONE_NUMBER = "970823354"; // Reemplazar con el número de WhatsApp real

interface ContactButtonProps {
  galloName: string;
}

export default function ContactButton({ galloName }: ContactButtonProps) {
  const handleContact = () => {
    const text = `Hola, me interesa el ${galloName} que vi en el catálogo.`;
    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleContact}
      className="w-full bg-rose-900 hover:bg-orange-800 border-2 border-transparent hover:border-orange-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-lg">Contactar</span>
    </button>
  );
}
