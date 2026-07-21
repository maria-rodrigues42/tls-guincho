import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import ChevronDivider from "@/components/site/ChevronDivider";
import WeightScale from "@/components/site/WeightScale";
import TruckProof from "@/components/site/TruckProof";
import Coverage from "@/components/site/Coverage";
import Payment from "@/components/site/Payment";
import Footer from "@/components/site/Footer";
import CallBar from "@/components/site/CallBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChevronDivider />
        <WeightScale />
        <TruckProof />
        <Coverage />
        <Payment />
      </main>
      <Footer />
      <CallBar />
    </>
  );
}
