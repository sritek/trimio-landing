"use client";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useContactForm } from "@/components/ui/contact-form";
import { detectCurrency, convertPrice } from "@/lib/currency";

// Trimio-specific plans but with the User's requested color/structure
type PlanFeature = string | { text: string; chargeable: boolean };

const plans = [
  {
    name: "Starter",
    description: "Great for small salons and startups looking to digitize their operations with Trimio",
    price: 699,
    yearlyPrice: 6999,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    includes: [
      "Lite features:",
      "Up to 5 staff members",
      "Unlimited appointments",
      "Basic inventory alerts",
      "UPI & Cash billing",
      "2-factor authentication",
      "Staff Attendence",
    ],
  },
  {
    name: "Growth",
    description: "Best value for growing salons that need more advanced marketing and analytics",
    price: 999,
    yearlyPrice: 9999,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Everything in Starter, plus:",
      "Up to 20 staff members",
      { text: "AI-Voice Booking Assistant", chargeable: true },
      "WhatsApp automated marketing",
      "Advanced commission tracking",
      "Loyalty program management",
      "Custom branded app",
    ] as PlanFeature[],
  },
  {
    name: "Enterprise",
    description: "Built for multi-branch chains requiring absolute control and custom integrations",
    price: 1299,
    yearlyPrice: 12999,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    includes: [
      "Everything in Growth, plus:",
      "Unlimited staff for branch",
      "Multi-board management",
      "Cross-branch inventory",
      "Dedicated account manager",
      "Custom API integrations",
      "Advanced role-based access",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-500 dark:text-gray-400",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-500 dark:text-gray-400",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full  rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const contactForm = useContactForm();
  const [currency, setCurrency] = useState({ code: "INR", symbol: "₹", rate: 1 });
  
  useEffect(() => {
    setMounted(true);
    const detected = detectCurrency();
    console.log("[Trimio Currency]", {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language,
      detected: detected.code,
      symbol: detected.symbol,
    });
    setCurrency(detected);

    const updateTheme = () => {
      setResolvedTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="py-24 md:py-32 mx-auto relative bg-background overflow-hidden"
      ref={pricingRef}
      id="pricing"
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#88888815_1px,transparent_1px),linear-gradient(to_bottom,#88888805_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <SparklesComp
          density={1800}
          direction="bottom"
          speed={1}
          color={isDark ? "#FFFFFF" : "#000000"}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none"
      >
        <div className="framer-1i5axl2">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
              opacity: isDark ? 0.4 : 0.12
            }}
            data-border="true"
          ></div>
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
              opacity: isDark ? 0.2 : 0.08
            }}
            data-border="true"
          ></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-6 pt-16 max-w-3xl mx-auto space-y-2 relative z-50">
        <h2 className="text-4xl md:text-5xl font-medium text-foreground px-6">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center "
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Plans that works best for you
          </VerticalCutReveal>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground px-6"
        >
          Trusted by thousands of salons, we help teams all around the world. Explore which
          option is right for you.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-4"
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </motion.div>
      </article>

      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
          opacity: isDark ? 0.6 : 0.15,
          mixBlendMode: isDark ? "multiply" : "normal",
        }}
      />

      <div className="grid md:grid-cols-3 max-w-5xl gap-6 py-12 mx-auto px-6 relative z-20 items-stretch">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex-1 overflow-visible hover:z-[60]"
          >
            <Card
              className={cn(
                "relative flex flex-col h-full text-foreground border shadow-sm transition-colors duration-300 overflow-visible",
                isDark 
                  ? "bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-800 shadow-[0px_0px_100px_-20px_#3131f5]"
                  : "bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-neutral-200 shadow-[0px_20px_80px_-25px_#3131f560]",
                plan.popular && "ring-2 ring-blue-500/50 z-20",
                !plan.popular && "z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-left p-6">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                </div>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold">
                    {currency.symbol}
                    <NumberFlow
                      format={{
                        notation: "standard",
                      }}
                      value={convertPrice(isYearly ? plan.yearlyPrice : plan.price, currency)}
                      className="text-4xl font-bold"
                    />
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-6 pt-0 flex flex-col gap-8">
                <button
                  className={cn(
                    "w-full p-4 text-xl font-bold rounded-xl transition-all",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white hover:opacity-90"
                      : "bg-gradient-to-t from-neutral-200 to-neutral-100 dark:from-neutral-950 dark:to-neutral-600 shadow-lg border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white hover:opacity-90 shadow-neutral-400/20 dark:shadow-neutral-900"
                  )}
                  onClick={() => contactForm.open()}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                  <h4 className="font-bold text-base mb-3 text-foreground">
                    {typeof plan.includes[0] === 'string' ? plan.includes[0] : (plan.includes[0] as { text: string }).text}
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, featureIndex) => {
                      const isChargeable = typeof feature === 'object' && feature.chargeable;
                      const featureText = typeof feature === 'string' ? feature : feature.text;
                      return (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <span className="h-2 w-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                          <span className="text-sm text-muted-foreground">
                            {featureText}
                            {isChargeable && (
                              <span className="relative group/tip ml-0.5 cursor-help inline-block">
                                <span className="text-blue-500 font-medium">*</span>
                                <span className="fixed-tooltip pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all whitespace-nowrap shadow-lg z-[9999]">
                                  Pay-as-you-use · Charged based on usage
                                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100"></span>
                                </span>
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 px-6">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  );
}
