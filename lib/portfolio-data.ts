@@ .. @@
+// Cache for portfolio data to avoid repeated localStorage reads
+let cachedData: PortfolioData | null = null
+let lastCacheTime = 0
+const CACHE_DURATION = 5000 // 5 seconds
+
 export function getPortfolioData(): PortfolioData {
   if (typeof window === "undefined") return defaultData
 
+  // Use cached data if available and fresh
+  const now = Date.now()
+  if (cachedData && (now - lastCacheTime) < CACHE_DURATION) {
+    return cachedData
+  }
+
   const stored = localStorage.getItem("portfolioData")
   if (stored) {
     try {
       const parsed = JSON.parse(stored)
-      return { ...defaultData, ...parsed }
+      cachedData = { ...defaultData, ...parsed }
+      lastCacheTime = now
+      return cachedData
     } catch {
+      cachedData = defaultData
+      lastCacheTime = now
       return defaultData
     }
   }
+  
+  cachedData = defaultData
+  lastCacheTime = now
   return defaultData
 }
 
 export function savePortfolioData(data: Partial<PortfolioData>) {
   if (typeof window === "undefined") return
 
   const current = getPortfolioData()
   const updated = { ...current, ...data }
+  
+  // Update cache
+  cachedData = updated
+  lastCacheTime = Date.now()
+  
   localStorage.setItem("portfolioData", JSON.stringify(updated))
 
   window.dispatchEvent(new CustomEvent("portfolioDataChanged", { detail: updated }))
 }