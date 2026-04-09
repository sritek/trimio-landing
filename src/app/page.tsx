import { HeroSection } from "@/components/blocks/hero-section-1";
import { FeatureZigzag } from "@/components/blocks/feature-zigzag";
import { FeatureBentoGrid } from "@/components/blocks/feature-bento";
import { Testimonials } from "@/components/blocks/testimonials";
import { Pricing } from "@/components/blocks/pricing";
import { FAQ } from "@/components/blocks/faq";
import { Footer } from "@/components/blocks/footer";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

const logos = [
  { src: "/customers/1.png", alt: "Salon customer testimonial logo", width: 128, height: 128 },
  { src: "/customers/2.png", alt: "Beauty spa client logo", width: 128, height: 128 },
  { src: "/customers/3.png", alt: "Wellness center partner logo", width: 128, height: 128 },
  { src: "/customers/4.png", alt: "Hair salon client testimonial", width: 128, height: 128 },
  { src: "/customers/5.png", alt: "Beauty business customer logo", width: 128, height: 128 },
  { src: "/customers/6.png", alt: "Spa management client logo", width: 128, height: 128 },
  { src: "/customers/7.png", alt: "Salon chain partner logo", width: 128, height: 128 },
  { src: "/customers/8.png", alt: "Beauty industry client testimonial", width: 128, height: 128 },
  { src: "/customers/9.png", alt: "Wellness business customer logo", width: 128, height: 128 },
  { src: "/customers/10.png", alt: "Premium salon client logo", width: 128, height: 128 },
];

export default function Home() {
  return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <HeroSection />
        
        <section className="relative mx-auto max-w-7xl py-16 md:py-24 px-6 overflow-hidden">
          <h2 className="mb-8 text-center font-bold text-foreground text-3xl tracking-tighter md:text-6xl leading-[1.1]">
            <span className="text-muted-foreground/60">Trusted by over 1,000+ experts.</span>
            <br />
            <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">Used by the leaders in Beauty & Wellness.</span>
          </h2>
          <div className="mx-auto my-8 h-px w-full bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

          <LogoCloud logos={logos} />

          <div className="mt-8 h-px w-full bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </section>

        <FeatureZigzag />
        <FeatureBentoGrid />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
  );
}



