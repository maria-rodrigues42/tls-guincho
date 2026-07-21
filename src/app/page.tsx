import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import WeightScale from "@/components/site/WeightScale";
import TruckProof from "@/components/site/TruckProof";
import Coverage from "@/components/site/Coverage";
import Payment from "@/components/site/Payment";
import CallBar from "@/components/site/CallBar";

export default function Home() {
  return (
    <div className="max-w-[440px] md:max-w-4xl lg:max-w-5xl mx-auto min-h-screen relative bg-fundo shadow-2xl pb-10 overflow-hidden md:rounded-xl md:my-8 md:shadow-3xl border border-gray-100">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WeightScale />
        <TruckProof />
        <Coverage />
        <Payment />
      </main>
      <CallBar />
    </div>
  );
}
