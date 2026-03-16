"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineContentProps {
  children: React.ReactNode
  animationNum: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: any
  className?: string
  as?: React.ElementType
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as: Component = "div" as React.ElementType,
}: TimelineContentProps) {
  const localRef = useRef<HTMLElement>(null)
  
  // Use timelineRef if provided, otherwise fallback to standard inView detection
  const elementRef = localRef
  const isInView = useInView(timelineRef || elementRef, { once: true, margin: "-10%" })

  const variants = customVariants || {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: animationNum * 0.1 } }
  }

  return (
    <Component ref={elementRef} className={cn("flex flex-col", className)}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        custom={animationNum}
        className="block w-full h-full flex-1"
      >
        {children}
      </motion.span>
    </Component>
  )
}
