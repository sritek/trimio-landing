import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Trimio eliminated our front desk chaos completely. The live waitlist and automated scheduling have been a game-changer.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    name: "Aisha Patel",
    role: "Salon Owner",
  },
  {
    text: "The split payment system makes our checkout process frictionless. We no longer make mistakes when clients want to use UPI and cash.",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=150&auto=format&fit=crop",
    name: "Marcus Thorne",
    role: "Manager, Luxe Spa",
  },
  {
    text: "Moving our 5 branches to Trimio was shockingly easy. Multi-branch reporting is now instantaneous instead of taking hours to compile.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    name: "Sara Lin",
    role: "Operations Director",
  },
  {
    text: "My stylists finally understand their commissions! The transparent payroll system built into Trimio builds so much trust with my team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    name: "James Kovac",
    role: "Studio Director",
  },
  {
    text: "The AI Voice Assistant handles our overflow calls seamlessly. We've captured 30% more bookings that previously went to voicemail.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    name: "Priya Singh",
    role: "General Manager",
  },
  {
    text: "We used to run out of color tubes mid-service. Trimio's inventory tracking prevents that entirely with smart low-stock warnings.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    name: "Elena Rodriguez",
    role: "Lead Colorist",
  },
  {
    text: "Marketing integrations let us re-engage clients exactly 6 weeks after their last haircut. It's almost automatic revenue.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    name: "David Chen",
    role: "Marketing Head",
  },
  {
    text: "An absolutely premium feel. It matches the high-end experience we provide to our salon clients. Easily the best UI we've used.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
    name: "Natasha Roman",
    role: "Founder",
  },
  {
    text: "Support is top-notch. When we needed help setting up GST invoices for our unique structure, the Trimio team walked us right through it.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
    name: "Amit Desai",
    role: "Finance Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="container z-10 mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
            Wall of Love
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-2 leading-[1.1] text-foreground">
            Loved by leaders in <br className="hidden md:block"/> Beauty & Wellness
          </h2>
          <p className="text-center mt-6 text-lg text-muted-foreground leading-relaxed max-w-[500px]">
            See why over 4,000+ salons, spas, and aesthetic clinics trust Trimio to run their operations seamlessly.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[600px] lg:h-[740px] overflow-hidden -mx-6 px-6 relative">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden xl:block" duration={28} />
        </div>
      </div>
    </section>
  );
};
