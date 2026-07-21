import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-10 flex items-center justify-center py-8 px-5 w-full bg-[#101e6f]">
      <Image 
        src="/logo.png" 
        alt="TLS Auto Guincho Logo" 
        width={220} 
        height={80} 
        className="object-contain h-auto max-h-[80px]"
        priority
      />
    </header>
  );
}
