import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Mic, Zap, TrendingUp, Sparkles } from 'lucide-react'
import { GridVignetteBackground } from '@/components/ui/vignette-grid-background'
import { cn } from "@/lib/utils"

export function FeatureBentoGrid() {
    return (
        <section className="relative bg-background py-16 md:py-32 overflow-hidden">
            <GridVignetteBackground 
                className="opacity-20 dark:opacity-40" 
                x={50} 
                y={50} 
                intensity={100} 
                horizontalVignetteSize={70} 
                verticalVignetteSize={50}
            />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-primary text-pretty">Next-Gen Management</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        Built for Premium Salons.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        The most sophisticated OS for beauty and wellness businesses. AI-powered, GST-ready, and beautifully designed.
                    </p>
                </div>

                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-4">
                        {/* 100% Automated Card */}
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 group min-h-[300px]">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-32 w-56 items-center">
                                    <svg className="text-primary/20 absolute inset-0 size-full transition-transform duration-500 group-hover:scale-110" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="mx-auto block w-fit text-7xl font-bold tracking-tighter">100%</span>
                                </div>
                                <h2 className="mt-8 text-center text-3xl font-bold">Automated</h2>
                                <p className="mt-2 text-center text-muted-foreground">Focus on your craft, we handle the rest.</p>
                            </CardContent>
                        </Card>

                        {/* AI-Voice Agent Card */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 group">
                            <CardContent className="pt-8 h-full flex flex-col items-center">
                                <div className="relative mx-auto flex aspect-square size-36 rounded-full border-2 border-primary/20 bg-primary/5 before:absolute before:-inset-3 before:rounded-full before:border before:border-primary/10 transition-all duration-500 group-hover:before:scale-110">
                                    <Mic className="m-auto size-14 text-primary animate-pulse" />
                                </div>
                                <div className="relative z-10 mt-8 space-y-2 text-center">
                                    <h2 className="text-2xl font-bold transition group-hover:text-primary">AI-Voice Assistant</h2>
                                    <p className="text-muted-foreground px-4 text-sm leading-relaxed">Let our AI handle your front-desk calls. Takes bookings, answers FAQs, and talks like a human.</p>
                                </div>
                                {/* Bottom Shaded Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent opacity-50 pointer-events-none" />
                            </CardContent>
                        </Card>

                        {/* Faster Than Light / Performance Card */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 group">
                            <CardContent className="pt-8 px-0 flex flex-col justify-between h-full">
                                <div className="px-8 flex flex-col items-center">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                                        <Zap className="h-7 w-7 text-primary-foreground fill-current" />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <h2 className="text-2xl font-bold group-hover:text-primary transition">Light Speed Search</h2>
                                        <p className="text-muted-foreground text-sm">Find any client, bill, or product in milliseconds. Zero lag, even with millions of records.</p>
                                    </div>
                                </div>
                                
                                {/* Animated SVG Chart Area */}
                                <div className="mt-8 px-6">
                                    <svg className="w-full text-primary" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                                            fill="url(#paint0_linear_bento)"
                                        />
                                        <path
                                            className="text-primary"
                                            d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                        <defs>
                                            <linearGradient id="paint0_linear_bento" x1="3" y1="60" x2="3" y2="123" gradientUnits="userSpaceOnUse">
                                                <stop className="text-primary/20" stopColor="currentColor" />
                                                <stop className="text-transparent" offset="1" stopColor="currentColor" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                {/* Bottom Shaded Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                            </CardContent>
                        </Card>

                        {/* Multi-Branch / Enterprise Card */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 group">
                            <CardContent className="grid h-full pt-8 sm:grid-cols-2 gap-8">
                                <div className="relative z-10 flex flex-col justify-between space-y-12">
                                    <div className="relative flex aspect-square size-14 rounded-2xl bg-muted border-2 group-hover:border-primary transition-colors">
                                        <Users className="m-auto size-7 text-primary" strokeWidth={2} />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-bold transition group-hover:text-primary leading-tight">Branch Scalability</h2>
                                        <p className="text-muted-foreground text-sm">Unified control for 1 to 100 locations. Real-time data sync, shared customer profiles, and location-wide marketing.</p>
                                    </div>
                                </div>
                                <div className="relative mt-6 sm:-my-8 sm:-mr-8 flex items-center justify-center p-8 bg-muted/30 border-l border-t rounded-tl-3xl group-hover:bg-muted/50 transition-colors">
                                    <div className="relative flex flex-col space-y-4 w-full">
                                        {[
                                            { name: "Priya S.", avatar: "https://avatars.githubusercontent.com/u/102558960?v=4", salon: "Bloom Salon" },
                                            { name: "M. Irung", avatar: "https://avatars.githubusercontent.com/u/47919550?v=4", salon: "Style Studio" },
                                            { name: "B. Ng", avatar: "https://avatars.githubusercontent.com/u/31113941?v=4", salon: "Elite Spa" }
                                        ].map((user, idx) => (
                                          <div key={idx} className={cn(
                                            "flex items-center gap-3 p-3 rounded-2xl bg-background border shadow-sm transition-all duration-500",
                                            idx === 1 ? "translate-x-4" : ""
                                          )}>
                                              <img className="size-8 rounded-full ring-2 ring-primary/10" src={user.avatar} alt="" />
                                              <div>
                                                <p className="text-xs font-bold leading-none">{user.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{user.salon}</p>
                                              </div>
                                          </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            {/* Bottom Shaded Effect */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                        </Card>

                        {/* Revenue Growth / Performance Card */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 group">
                            <CardContent className="grid h-full pt-8 sm:grid-cols-2 gap-8">
                                <div className="relative z-10 flex flex-col justify-between space-y-12">
                                    <div className="relative flex aspect-square size-14 rounded-2xl bg-primary/10 border-2 border-primary/20">
                                        <TrendingUp className="m-auto size-7 text-primary" strokeWidth={2} />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-bold group-hover:text-primary transition leading-tight">Revenue Intel</h2>
                                        <p className="text-muted-foreground text-sm">Deep analytics into your salon's performance. Track GST, commissions, and inventory wastage automatically.</p>
                                    </div>
                                </div>
                                <div className="relative -mb-8 -mr-8 mt-6 h-fit border-l border-t p-2 sm:ml-6 group-hover:translate-y-[-10px] transition-transform duration-700">
                                    <div className="bg-background rounded-2xl border p-4 shadow-2xl">
                                      <div className="flex gap-2 mb-4">
                                        <div className="size-3 rounded-full bg-red-400/20 border border-red-400/50" />
                                        <div className="size-3 rounded-full bg-yellow-400/20 border border-yellow-400/50" />
                                        <div className="size-3 rounded-full bg-green-400/20 border border-green-400/50" />
                                      </div>
                                      <div className="space-y-3">
                                          {[80, 45, 90, 60].map((w, i) => (
                                            <div key={i} className="h-2 bg-muted rounded-full overflow-hidden">
                                              <div 
                                                className="h-full bg-primary rounded-full transition-all duration-1000 delay-300" 
                                                style={{ width: `${w}%` }} 
                                              />
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                </div>
                            </CardContent>
                            {/* Bottom Shaded Effect */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
