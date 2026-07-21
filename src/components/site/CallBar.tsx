import Image from "next/image";

export default function CallBar() {
  return (
    <a 
      href="#" 
      className="fixed bottom-6 right-6 z-50 transition-transform hover:scale-110 active:scale-95"
      aria-label="Chamar no WhatsApp"
    >
      <Image 
        src="/images/image-removebg-preview.png" 
        alt="WhatsApp" 
        width={60} 
        height={60} 
        className="drop-shadow-lg"
      />
    </a>
  );
}
