@@ .. @@
 /** @type {import('next').NextConfig} */
 const nextConfig = {
   eslint: {
     ignoreDuringBuilds: true,
   },
   typescript: {
     ignoreBuildErrors: true,
   },
   images: {
     unoptimized: true,
+    domains: ['my.spline.design'],
+    formats: ['image/webp', 'image/avif'],
   },
+  experimental: {
+    optimizeCss: true,
+  },
+  compiler: {
+    removeConsole: process.env.NODE_ENV === 'production',
+  },
 }
 
 export default nextConfig