'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      {/* Bottom CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary px-6 py-24 shadow-2xl rounded-3xl sm:px-24">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Scale Your Salon Business?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-primary-foreground/80">
            Join 4,000+ professionals who trust Trimio to manage their daily operations. Start your 30-day free trial today.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Button size="lg" variant="secondary" className="rounded-xl px-10 text-base">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 rounded-xl">
              Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-2xl font-bold tracking-tighter text-foreground">trimio.</span>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              The operating system for modern salon and spa chains. Empowering beauty professionals to scale with intelligence.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Booking System</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Inventory</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Multi-Branch</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Individual Salons</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Beauty Chains</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Luxury Spas</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Barber Shops</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Community</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Trimio Salon Ops. All rights reserved. Built for beauty, scaled with intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
