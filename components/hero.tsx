@@ .. @@
 "use client"
 
-import { useEffect, useRef, useState } from "react"
+import { useEffect, useRef, useState, Suspense, lazy } from "react"
 import { gsap } from "gsap"
 import { Button } from "@/components/ui/button"
 import { Code } from "lucide-react"
 import { getPortfolioData } from "@/lib/portfolio-data"
 
+// Lazy load the Spline iframe for better performance
+const SplineBackground = lazy(() => Promise.resolve({
+  default: () => (
+    <iframe
+      src="https://my.spline.design/orb-jQw5ARB286530C2pyyguaZbf/"
+      frameBorder="0"
+      width="100%"
+      height="100%"
+      className="w-full h-full object-cover"
+      loading="lazy"
+    />
+  )
+}))
+
 export default function Hero() {
   const heroRef = useRef<HTMLDivElement>(null)
   const headlineRef = useRef<HTMLHeadingElement>(null)
@@ .. @@
       className="relative h-screen flex items-center justify-center px-6 overflow-hidden"
     >
       {/* Spline 3D Background - Full Hero Coverage */}
       <div className="absolute inset-0 w-full h-full">
-        <iframe
-          src="https://my.spline.design/orb-jQw5ARB286530C2pyyguaZbf/"
-          frameBorder="0"
-          width="100%"
-          height="100%"
-          className="w-full h-full object-cover"
-        />
+        <Suspense fallback={
+          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 animate-pulse" />
+        }>
+          <SplineBackground />
+        </Suspense>
       </div>
 
       {/* Overlay for better text readability */}