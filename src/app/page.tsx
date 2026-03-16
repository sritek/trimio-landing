import { HeroSection } from "@/components/blocks/hero-section-1";
import { FeatureZigzag } from "@/components/blocks/feature-zigzag";
import { FeatureBentoGrid } from "@/components/blocks/feature-bento";
import { Testimonials } from "@/components/blocks/testimonials";
import { Pricing } from "@/components/blocks/pricing";
import { FAQ } from "@/components/blocks/faq";
import { Footer } from "@/components/blocks/footer";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      
      <section className="relative mx-auto max-w-7xl py-16 md:py-24 px-6 overflow-hidden">
        <h2 className="mb-8 text-center font-bold text-foreground text-3xl tracking-tighter md:text-6xl leading-[1.1]">
          <span className="text-muted-foreground/60">Trusted by over 4,000+ experts.</span>
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



