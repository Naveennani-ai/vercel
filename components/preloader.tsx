@@ .. @@
 "use client"
 
-import { useEffect, useRef } from "react"
+import { useEffect, useRef, useState } from "react"
 import { gsap } from "gsap"
 
 export default function Preloader() {
   const preloaderRef = useRef<HTMLDivElement>(null)
   const progressBarRef = useRef<HTMLDivElement>(null)
   const logoRef = useRef<HTMLDivElement>(null)
+  const [isLoaded, setIsLoaded] = useState(false)
 
   useEffect(() => {
+    // Preload critical resources
+    const preloadResources = async () => {
+      const promises = [
+        // Preload GSAP
+        import('gsap'),
+        // Preload critical images
+        new Promise((resolve) => {
+          const img = new Image()
+          img.onload = resolve
+          img.onerror = resolve
+          img.src = '/images/profile.jpg'
+        })
+      ]
+      
+      await Promise.all(promises)
+      setIsLoaded(true)
+    }
+
+    preloadResources()
+
     const tl = gsap.timeline()
 
     // Logo animation
@@ .. @@
     // Progress bar animation
     tl.to(
       progressBarRef.current,
       {
         width: "100%",
-        duration: 2,
+        duration: isLoaded ? 1 : 2,
         ease: "power2.out",
         onComplete: () => {
           // Hide preloader after loading
           gsap.to(preloaderRef.current, {
             opacity: 0,
             scale: 0.9,
             duration: 1,
-            delay: 0.5,
+            delay: 0.3,
             onComplete: () => {
               if (preloaderRef.current) {
                 preloaderRef.current.style.display = "none"
@@ -32,7 +54,7 @@ export default function Preloader() {
     return () => {
       tl.kill()
     }
-  }, [])
+  }, [isLoaded])