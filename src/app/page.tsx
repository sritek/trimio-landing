import dynamic from "next/dynamic";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { LazySection } from "@/components/ui/lazy-section";

// Dynamic imports for below-fold sections — code-split from initial bundle
const LogoCloudSection = dynamic(() => import("@/components/blocks/logo-cloud-section"));
const FeatureZigzag = dynamic(() => import("@/components/blocks/feature-zigzag").then(mod => ({ default: mod.FeatureZigzag })));
const FeatureBentoGrid = dynamic(() => import("@/components/blocks/feature-bento").then(mod => ({ default: mod.FeatureBentoGrid })));
const Testimonials = dynamic(() => import("@/components/blocks/testimonials").then(mod => ({ default: mod.Testimonials })));
const Pricing = dynamic(() => import("@/components/blocks/pricing").then(mod => ({ default: mod.Pricing })));
const FAQ = dynamic(() => import("@/components/blocks/faq").then(mod => ({ default: mod.FAQ })));
const Footer = dynamic(() => import("@/components/blocks/footer").then(mod => ({ default: mod.Footer })));

export default function Home() {
  return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <HeroSection />
        <LogoCloudSection />
        <LazySection>
          <FeatureZigzag />
        </LazySection>
        <LazySection>
          <FeatureBentoGrid />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
        <LazySection>
          <Pricing />
        </LazySection>
        <FAQ />
        <Footer />
      </div>
  );
}
