import dynamic from "next/dynamic";
import { HeroSection } from "@/components/blocks/hero-section-1";

// Dynamic imports — ssr:false not available in Server Components, using loading:null to prevent prefetch
const LogoCloudSection = dynamic(() => import("@/components/blocks/logo-cloud-section"), { loading: () => null });
const FeatureZigzag = dynamic(() => import("@/components/blocks/feature-zigzag").then(mod => ({ default: mod.FeatureZigzag })), { loading: () => null });
const FeatureBentoGrid = dynamic(() => import("@/components/blocks/feature-bento").then(mod => ({ default: mod.FeatureBentoGrid })), { loading: () => null });
const Testimonials = dynamic(() => import("@/components/blocks/testimonials").then(mod => ({ default: mod.Testimonials })), { loading: () => null });
const Pricing = dynamic(() => import("@/components/blocks/pricing").then(mod => ({ default: mod.Pricing })), { loading: () => null });
const FAQ = dynamic(() => import("@/components/blocks/faq").then(mod => ({ default: mod.FAQ })), { loading: () => null });
const Footer = dynamic(() => import("@/components/blocks/footer").then(mod => ({ default: mod.Footer })), { loading: () => null });

export default function Home() {
  return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <HeroSection />
        <LogoCloudSection />
        <FeatureZigzag />
        <FeatureBentoGrid />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
  );
}
