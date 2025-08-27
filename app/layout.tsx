@@ .. @@
 import type React from "react"
 import type { Metadata } from "next"
-import { Inter } from "next/font/google"
+import { Inter } from "next/font/google"
 import "./globals.css"
 import Script from "next/script"
 
 const inter = Inter({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
   variable: "--font-inter",
+  display: "swap",
+  preload: true,
 })
 
 export const metadata: Metadata = {
   title: "Somesh - Web Developer Portfolio",
   description: "Futuristic portfolio showcasing cutting-edge web development skills",
-    generator: 'v0.dev'
+  generator: 'v0.dev',
+  viewport: "width=device-width, initial-scale=1",
+  themeColor: "#020617",
 }
 
 export default function RootLayout({
@@ -25,11 +29,19 @@ export default function RootLayout({
       <body className={`${inter.className} antialiased`}>
         {children}
 
-        {/* GSAP */}
-        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
-        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />
-
-        {/* Locomotive Scroll */}
+        {/* Load GSAP with priority for critical animations */}
+        <Script 
+          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" 
+          strategy="beforeInteractive"
+        />
+        <Script 
+          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" 
+          strategy="lazyOnload"
+        />
+        
+        {/* Preconnect to external domains */}
+        <link rel="preconnect" href="https://my.spline.design" />
+        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
       </body>
     </html>
   )