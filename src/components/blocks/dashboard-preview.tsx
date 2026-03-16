'use client';

import React from 'react';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful Analytics</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Manage Your Entire Salon Chain from Your Pocket
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get a birds-eye view of your business revenue, staff performance, and inventory stock levels in real-time.
          </p>
        </div>
      </div>
      
      <div className="relative mt-16 pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
             {/* Desktop Mockup */}
             <div className="relative mx-auto max-w-[1000px] rounded-2xl border bg-muted p-2 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                  alt="Trimio Desktop Dashboard"
                  className="rounded-xl border bg-background object-cover shadow-sm aspect-video"
                />
                
                {/* Mobile Mockup Overlay */}
                <div className="absolute -bottom-10 -right-10 hidden w-64 rounded-3xl border-8 border-background bg-background shadow-2xl lg:block">
                  <div className="relative overflow-hidden rounded-2xl bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop"
                      alt="Trimio Mobile Dashboard"
                      className="aspect-[9/19] w-full object-cover"
                    />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
