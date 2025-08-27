@@ .. @@
 "use client"
 
-import { useEffect, useRef } from "react"
+import { useEffect, useRef, Suspense, lazy } from "react"
 import { gsap } from "gsap"
 import { ScrollTrigger } from "gsap/ScrollTrigger"
-import Hero from "@/components/hero"
-import About from "@/components/about"
-import Projects from "@/components/projects"
-import Contact from "@/components/contact"
-import Footer from "@/components/footer"
 import Preloader from "@/components/preloader"
 import Navigation from "@/components/navigation"
-import Lenis from "@studio-freight/lenis"
+
+// Lazy load components for better performance
+const Hero = lazy(() => import("@/components/hero"))
+const About = lazy(() => import("@/components/about"))
+const Projects = lazy(() => import("@/components/projects"))
+const Contact = lazy(() => import("@/components/contact"))
+const Footer = lazy(() => import("@/components/footer"))
+
+// Lazy load Lenis for smooth scrolling
+const LenisScroll = lazy(() => import("@studio-freight/lenis"))
 
 gsap.registerPlugin(ScrollTrigger)
 
@@ .. @@
   useEffect(() => {
-    // Smooth scroll setup
-    const lenis = new Lenis({
-      duration: 1.2,
-      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
-      direction: "vertical",
-      gestureDirection: "vertical",
-      smooth: true,
-      mouseMultiplier: 1,
-      smoothTouch: false,
-      touchMultiplier: 2,
-      infinite: false,
-    })
-
-    function raf(time: number) {
-      lenis.raf(time)
-      requestAnimationFrame(raf)
-    }
-
-    requestAnimationFrame(raf)
+    // Initialize smooth scrolling asynchronously
+    const initSmoothScroll = async () => {
+      const Lenis = (await import("@studio-freight/lenis")).default
+      const lenis = new Lenis({
+        duration: 1.2,
+        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
+        direction: "vertical",
+        gestureDirection: "vertical",
+        smooth: true,
+        mouseMultiplier: 1,
+        smoothTouch: false,
+        touchMultiplier: 2,
+        infinite: false,
+      })
+
+      function raf(time: number) {
+        lenis.raf(time)
+        requestAnimationFrame(raf)
+      }
+
+      requestAnimationFrame(raf)
+      
+      return () => lenis.destroy()
+    }
+
+    let cleanup: (() => void) | undefined
+    initSmoothScroll().then(cleanupFn => {
+      cleanup = cleanupFn
+    })
 
     // Floating background elements animation
-    gsap.to(".glow-orb", {
+    const orbAnimation = gsap.to(".glow-orb", {
       y: -20,
       duration: 3,
       repeat: -1,
@@ -49,7 +68,8 @@ export default function Home() {
     })
 
     return () => {
-      lenis.destroy()
+      cleanup?.()
+      orbAnimation.kill()
     }
   }, [])
 
@@ .. @@
       </div>
 
       <main ref={mainRef} className="relative z-10">
-        <Hero />
-        <About />
-        <Projects />
-        <Contact />
-        <Footer />
+        <Suspense fallback={<div className="h-screen bg-slate-950" />}>
+          <Hero />
+        </Suspense>
+        <Suspense fallback={<div className="h-96 bg-slate-950" />}>
+          <About />
+        </Suspense>
+        <Suspense fallback={<div className="h-96 bg-slate-950" />}>
+          <Projects />
+        </Suspense>
+        <Suspense fallback={<div className="h-96 bg-slate-950" />}>
+          <Contact />
+        </Suspense>
+        <Suspense fallback={<div className="h-32 bg-slate-950" />}>
+          <Footer />
+        </Suspense>
       </main>
     </div>
   )