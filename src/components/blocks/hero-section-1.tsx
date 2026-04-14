'use client';

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Menu, X } from 'lucide-react'
import { GridVignetteBackground } from '@/components/ui/vignette-grid-background'
import { cn } from '@/lib/utils'
import { OptimizedImage } from '@/components/seo/optimized-image'
import { useContactForm } from '@/components/ui/contact-form'

const ThemeToggle = dynamic(() => import('@/components/theme-toggle').then(mod => ({ default: mod.ThemeToggle })), { ssr: false })

export function HeroSection() {
    const contactForm = useContactForm()
    return (
        <>
            <HeroHeader />
            <main id="main-content" className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section className="relative">
                    <GridVignetteBackground
                        className="opacity-20 dark:opacity-40"
                        x={50}
                        y={50}
                        intensity={100}
                        horizontalVignetteSize={70}
                        verticalVignetteSize={50}
                    />
                    <div className="relative pt-24 md:pt-36">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <div className="hero-stagger">
                                    <div className="hero-stagger-item">
                                        <Link
                                            href="#link"
                                            className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                            <span className="text-foreground text-sm">Meet Trimio: The Future of Salon Management</span>
                                            <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                                            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                    <span className="flex size-6">
                                                        <ArrowRight className="m-auto size-3" />
                                                    </span>
                                                    <span className="flex size-6">
                                                        <ArrowRight className="m-auto size-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="hero-stagger-item">
                                        <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                            The Only Salon Management Software Built for Modern Salons
                                        </h1>
                                    </div>

                                    <div className="hero-stagger-item">
                                        <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                            Streamline bookings, empower your staff, and elevate client experiences with Trimio's all-in-one platform built for beauty and wellness professionals.
                                        </p>
                                    </div>
                                </div>

                                <div className="hero-stagger mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div className="hero-stagger-item">
                                        <div className="bg-foreground/10 rounded-[14px] border p-0.5">
                                            <button
                                                onClick={() => contactForm.open()}
                                                className="group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-primary text-primary-foreground text-base font-medium px-5 h-9 transition-all hover:bg-primary/80 cursor-pointer">
                                                <span className="text-nowrap">Start Free Trial</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hero-stagger-item">
                                        <button
                                            onClick={() => contactForm.open()}
                                            className="inline-flex shrink-0 items-center justify-center rounded-xl text-base font-medium px-5 h-10.5 transition-all hover:bg-muted hover:text-foreground cursor-pointer">
                                            <span className="text-nowrap">Watch 2-min Demo</span>
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-6 text-sm text-gray-600 dark:text-gray-300 text-center hero-stagger-item" style={{ animationDelay: '0.4s' }}>
                                    Trusted by 500+ salons · No credit card required · Cancel anytime
                                </p>
                            </div>
                        </div>

                        <div className="hero-stagger-item" style={{ animationDelay: '0.5s' }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <OptimizedImage
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block object-cover"
                                        src="/hero-dark.webp"
                                        alt="Trimio salon management software dashboard showing appointment scheduling, client management, and real-time analytics"
                                        width={2700}
                                        height={1440}
                                        priority={false}
                                    />
                                    <OptimizedImage
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden object-cover"
                                        src="/hero-light.webp"
                                        alt="Trimio salon management software dashboard showing appointment scheduling, client management, and real-time analytics"
                                        width={2700}
                                        height={1440}
                                        priority={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="h-12" />
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Solution', href: '#solution' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '/contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const contactForm = useContactForm()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-[1000] w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border shadow-xl backdrop-blur-xl lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 md:w-fit">
                                <ThemeToggle />
                                <button
                                    onClick={() => contactForm.open()}
                                    className={cn(
                                      'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none bg-primary text-primary-foreground [a]:hover:bg-primary/80 h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] cursor-pointer',
                                      isScrolled ? 'lg:inline-flex' : 'hidden md:inline-flex'
                                    )}>
                                    <span>Start Free Trial</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <>
            <img
                src="/logo-black.svg"
                alt="Trimio salon management software logo"
                width={120}
                height={28}
                className={cn('h-7 w-auto dark:hidden', className)}
            />
            <img
                src="/logo-white.svg"
                alt="Trimio salon management software logo"
                width={120}
                height={28}
                className={cn('h-7 w-auto hidden dark:block', className)}
            />
        </>
    )
}
