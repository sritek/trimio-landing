import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={48} reverse duration={40}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-24 w-auto select-none object-contain md:h-32 dark:brightness-0 dark:invert"
            height={logo.height || 128}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || 128}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
