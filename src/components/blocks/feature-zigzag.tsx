"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  CheckCircle2, Clock, MapPin, Receipt, Users, AlertCircle, 
  CalendarClock, CreditCard, Loader2, UserPlus, ArrowRight, 
  Sparkles, Award, BarChart3, TrendingUp
} from 'lucide-react'

// --- Setup default animation variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } 
  }
}

// --- Interactive Component: Queue Card ---
function InteractiveQueueCard() {
  const [queue, setQueue] = useState([
    { id: 'T-01', name: 'Sunita Reddy', status: 'In chair — Stylist Riya', type: 'serving', wait: 0 },
    { id: 'T-02', name: 'Walk-in guest', status: 'Waiting in lobby', type: 'waiting', wait: 8 },
    { id: 'T-03', name: 'Meena Joshi', status: 'Waiting in lobby', type: 'waiting', wait: 20 },
  ])

  const callNext = () => {
    setQueue(prev => {
      if (prev.length <= 1) return prev;
      const newQueue = [...prev];
      newQueue.shift(); // Remove the currently serving
      newQueue[0] = { ...newQueue[0], type: 'serving', status: 'In chair — Stylist Riya', wait: 0 };
      return newQueue;
    });
  }

  const addWalkIn = () => {
    setQueue(prev => [
      ...prev,
      { 
        id: `T-0${prev.length + 4}`, 
        name: 'New Walk-in', 
        status: 'Waiting in lobby', 
        type: 'waiting', 
        wait: prev.length > 0 ? (prev[prev.length-1].wait || 0) + 15 : 10 
      }
    ]);
  }

  return (
    <div className="relative rounded-2xl border bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col h-full ring-1 ring-border/50">
      <div className="border-b bg-muted/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex space-x-2">
          <button onClick={addWalkIn} className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1 rounded-md transition font-medium flex items-center">
            <UserPlus className="w-3 h-3 mr-1" /> Add
          </button>
          <span className="text-sm font-medium text-muted-foreground px-2 py-1">Live Queue</span>
        </div>
      </div>
      
      <div className="p-6 space-y-4 bg-gradient-to-b from-background to-muted/10 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {queue.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border shadow-sm",
                item.type === 'serving' 
                  ? "border-primary/20 bg-primary/5" 
                  : "bg-card border-border/50 opacity-80 hover:opacity-100 transition-opacity"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-lg font-bold",
                  item.type === 'serving' ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                )}>
                  {item.id}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className={cn("text-sm flex items-center mt-1", item.type === 'serving' ? "text-primary" : "text-amber-500")}>
                    {item.type === 'serving' ? (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 mr-1" />
                    )}
                    {item.type === 'serving' ? item.status : `Wait ~${item.wait} min`}
                  </p>
                </div>
              </div>
              
              {item.type === 'serving' && queue.length > 1 && (
                <button 
                  onClick={callNext}
                  className="hidden sm:flex items-center text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition shadow-sm"
                >
                  Call Next <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {queue.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm font-medium">Queue is empty.</div>
        )}
      </div>
    </div>
  )
}

// --- Interactive Component: Invoice Card ---
function InteractiveInvoiceCard() {
  const [useLoyalty, setUseLoyalty] = useState(false)
  
  const baseTotal = 2200;
  const loyaltyDiscount = 300;
  const csgtPerc = 0.09;
  
  const subtotalAfterLoyalty = baseTotal - (useLoyalty ? loyaltyDiscount : 0);
  const tax = subtotalAfterLoyalty * (csgtPerc * 2);
  const total = subtotalAfterLoyalty + tax;

  return (
    <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden ring-1 ring-border/50 transition-all duration-300">
      <div className="border-b border-border/50 bg-muted/20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-foreground">
          <Receipt className="w-5 h-5 text-primary" />
          <span className="font-semibold">Invoice #INV-[Live]</span>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-600 text-xs font-bold border border-green-500/20 shadow-sm">PAYING...</span>
      </div>
      
      <div className="p-6 space-y-4 relative">
        <div className="flex justify-between items-center pb-3 border-b border-border/50 border-dashed">
          <span className="text-foreground">Haircut + Highlights</span>
          <span className="font-medium">₹1,800</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-border/50 border-dashed">
          <span className="text-foreground">Hair Spa Add-on</span>
          <span className="font-medium">₹400</span>
        </div>
        
        {/* Interactive Loyalty Toggle */}
        <div className="py-2">
          <button 
            onClick={() => setUseLoyalty(!useLoyalty)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300",
              useLoyalty ? "bg-primary/5 border-primary/30" : "bg-muted/30 border-border hover:bg-muted/50"
            )}
          >
            <div className="flex items-center text-sm font-medium">
              <Award className={cn("w-4 h-4 mr-2", useLoyalty ? "text-primary" : "text-muted-foreground")} />
              {useLoyalty ? "Loyalty Applied" : "Redeem 3,000 Points?"}
            </div>
            {useLoyalty && <span className="text-primary font-bold">– ₹{loyaltyDiscount}</span>}
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="flex justify-between items-center pb-3 border-b border-border/50 text-muted-foreground text-sm pt-2"
          >
            <span>CGST 9% + SGST 9%</span>
            <span>₹{tax.toFixed(2)}</span>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-between items-center py-2 text-xl font-bold text-foreground">
          <span>Total</span>
          <motion.span 
            key={total}
            initial={{ opacity: 0, scale: 0.8, color: "var(--primary)" }}
            animate={{ opacity: 1, scale: 1, color: "var(--foreground)" }}
            transition={{ duration: 0.4 }}
          >
            ₹{total.toFixed(2)}
          </motion.span>
        </div>
        
        <div className="pt-4 flex items-center gap-3">
          <div className="flex-1 rounded-lg bg-muted p-3 text-center text-xs sm:text-sm font-medium border border-border/50 flex items-center justify-center hover:bg-muted/80 transition cursor-pointer">
            <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" /> Split: UPI
          </div>
          <div className="flex-1 rounded-lg bg-primary text-primary-foreground p-3 text-center text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition cursor-pointer">
            Pay ₹{total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Interactive Component: Payroll Card ---
function InteractivePayrollCard() {
  const [tab, setTab] = useState<'this' | 'last'>('this');
  
  const data = {
    this: { rev: 124500, comm: 14940, base: 18000, completion: 87, target: 100 },
    last: { rev: 98000, comm: 9800, base: 18000, completion: 65, target: 100 }
  }

  const current = data[tab];

  return (
    <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden ring-1 ring-border/50 transition-all duration-500">
      <div className="bg-primary/5 border-b p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img src="https://avatars.githubusercontent.com/u/102558960?v=4" alt="Staff" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-background shadow-sm relative z-10" />
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg leading-tight">Riya Kapoor</h4>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Senior Stylist</span>
          </div>
        </div>
        
        {/* Interactive Tabs */}
        <div className="flex bg-muted rounded-lg p-1 border shadow-inner">
          <button 
            onClick={() => setTab('last')}
            className={cn("px-3 py-1.5 text-xs font-bold rounded-md transition", tab === 'last' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Jan
          </button>
          <button 
            onClick={() => setTab('this')}
            className={cn("px-3 py-1.5 text-xs font-bold rounded-md transition", tab === 'this' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Feb
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-muted-foreground flex items-center"><BarChart3 className="w-4 h-4 mr-1"/> Target Progress</span>
            <motion.span key={current.completion} initial={{opacity:0}} animate={{opacity:1}}>{current.completion} / {current.target} services</motion.span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(current.completion / current.target) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <motion.div layout className="flex justify-between items-center">
            <span className="text-muted-foreground">Service revenue</span>
            <motion.span key={current.rev} initial={{ opacity: 0, x:-10 }} animate={{ opacity: 1, x:0 }} className="font-semibold text-foreground">₹{current.rev.toLocaleString()}</motion.span>
          </motion.div>

          <motion.div 
            layout
            className="flex justify-between items-center p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-sm"
          >
            <span className="font-bold text-primary flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Commission (12%)
            </span>
            <motion.span key={current.comm} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="font-extrabold text-primary text-xl">
              ₹{current.comm.toLocaleString()}
            </motion.span>
          </motion.div>
          
          <motion.div layout className="flex justify-between items-center">
            <span className="text-muted-foreground">Base salary</span>
            <span className="font-medium text-foreground">₹{current.base.toLocaleString()}</span>
          </motion.div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-dashed flex justify-between items-center text-xl sm:text-2xl">
          <span className="font-bold text-foreground flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary" /> Net Payout</span>
          <motion.span key={current.comm+current.base} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
            ₹{(current.comm + current.base).toLocaleString()}
          </motion.span>
        </div>
      </div>
    </div>
  )
}

// --- Interactive Component: Inventory Alert Card ---
function InteractiveInventoryAlert() {
  const [poState, setPoState] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handlePO = () => {
    if (poState !== 'idle') return;
    setPoState('loading');
    setTimeout(() => {
      setPoState('sent');
    }, 1500);
  }

  return (
    <div className="relative rounded-2xl border bg-card shadow-2xl ring-1 ring-border/50 overflow-hidden">
      <div className="border-b bg-muted/20 p-5 flex justify-between items-center">
        <h4 className="font-bold flex items-center text-foreground">
          <AlertCircle className="w-5 h-5 mr-2 text-amber-500" /> Action Required
        </h4>
        <span className="text-xs font-semibold px-2 py-1 bg-background rounded-full border shadow-sm flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Live
        </span>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4 bg-gradient-to-b from-background to-muted/10">
        {/* Alert 1: Low Stock (Interactive) */}
        <motion.div 
          layout
          className={cn(
            "flex flex-col sm:flex-row p-4 rounded-xl shadow-sm transition-all duration-500",
            poState === 'sent' ? "bg-green-500/5 border border-green-500/30" : "bg-red-500/5 border border-red-500/30"
          )}
        >
          <div className="flex-shrink-0 mt-0.5 mb-3 sm:mb-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
              poState === 'sent' ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
            )}>
              {poState === 'sent' ? "✓" : "⚠️"}
            </div>
          </div>
          <div className="sm:ml-4 w-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1">
                <p className="font-bold text-foreground leading-none">Wella Color 5/7 (50g)</p>
                {poState !== 'sent' && (
                  <span className="text-[10px] uppercase font-black tracking-wider text-red-600 bg-red-500/10 px-2 py-0.5 rounded-sm">Low Stock</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">2 units left · Reorder level: 5</p>
            </div>
            
            <button 
              onClick={handlePO}
              disabled={poState !== 'idle'}
              className={cn(
                "relative text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center overflow-hidden",
                poState === 'idle' ? "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg" : "",
                poState === 'loading' ? "bg-muted text-muted-foreground border cursor-not-allowed" : "",
                poState === 'sent' ? "bg-green-600 text-white shadow-md cursor-default pointer-events-none" : ""
              )}
            >
              <AnimatePresence mode="wait">
                {poState === 'idle' && (
                  <motion.span key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center">
                    Generate PO (10 units) <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.span>
                )}
                {poState === 'loading' && (
                  <motion.span key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending to Vendor...
                  </motion.span>
                )}
                {poState === 'sent' && (
                  <motion.span key="sent" initial={{opacity:0, scale: 0.8}} animate={{opacity:1, scale: 1}} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> PO Sent (Email & WA)
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* Healthy Stock Item */}
        <motion.div 
          className="flex p-4 rounded-xl border border-border/50 bg-card shadow-sm opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center font-bold">✓</div>
          </div>
          <div className="ml-4">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-foreground text-sm">Loreal Shampoo Pro (500ml)</p>
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> 24 units · Good stock
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


// --- Main Layout Component ---
export function FeatureZigzag() {
  return (
    <section className="bg-background py-24 md:py-32 overflow-hidden relative">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center mb-24 md:mb-32"
        >
          <h2 className="text-sm font-black tracking-widest uppercase text-primary mb-4 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2" /> What Trimio Solves
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl mb-8 leading-[1.1]">
            The work that happens <br className="hidden md:block"/> before & after the chair
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Most salon software is built by people who've never run a salon. We built Trimio by spending months in salons, observing the real problems unfold.
          </p>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          
          {/* Feature 1: Walk-ins */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
                <CalendarClock className="mr-2 h-4 w-4" /> Appointments & Walk-ins
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                The front desk shouldn't be the bottleneck
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A busy Saturday shouldn't mean a stressed receptionist and confused clients. Trimio manages your scheduled appointments alongside an automated live walk-in queue.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Smart walk-in token queue with real-time position tracking",
                  "Conflict detection before double-booking happens",
                  "Appointment status flow: Booked → Confirmed → In chair → Done"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-4" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/30 to-background blur-2xl opacity-50" />
              <InteractiveQueueCard />
            </motion.div>
          </div>

          {/* Feature 2: Billing (Reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-background to-primary/20 blur-2xl opacity-50" />
              <InteractiveInvoiceCard />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="order-2"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
                <Receipt className="mr-2 h-4 w-4" /> Billing & Checkout
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Billing that doesn't slow down the flow
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Cash, UPI, card, wallet, loyalty points, membership — customers pay how they want. Trimio handles the arithmetic, generates GST-compliant invoices instantly, and clears the queue fast.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Split payments across multiple methods in a single tap",
                  "GST-ready invoices with auto CGST/SGST breakdowns",
                  "Loyalty points earned and instantly redeemable at the counter"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-4" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Feature 3: Payroll */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
                <Users className="mr-2 h-4 w-4" /> Staff & Payroll
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Your team deserves absolute clarity
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Commission confusion is the biggest source of staff distrust. Trimio tracks every service and attendance entry transparently — making payroll day a brief verification.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Attendance with geofenced smartphone check-in/out",
                  "Per-service commission tracking (split for primary + assistant)",
                  "One-click payroll with visually clean payslip formats"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-4" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/30 to-background blur-2xl opacity-50" />
              <InteractivePayrollCard />
            </motion.div>
          </div>

          {/* Feature 4: Inventory (Reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-background to-amber-500/20 blur-2xl opacity-50" />
              <InteractiveInventoryAlert />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="order-2"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
                <MapPin className="mr-2 h-4 w-4" /> Inventory & Products
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                No more mid-service product shortages
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Trimio tracks your consumables by batch, alerts you before expiry, and generates purchase orders in one click. Stop guessing your stock and start running audits easily.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Batch-level stock tracking with predictive expiry alerts",
                  "Auto-deduct consumables strictly per service rendered",
                  "Cross-branch stock transfers with streamlined approvals"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-4" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
