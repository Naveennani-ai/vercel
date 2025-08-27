@@ .. @@
   useEffect(() => {
     const data = getPortfolioData()
     setAboutData(data.about)
 
     const handleDataChange = (event: CustomEvent) => {
       setAboutData(event.detail.about)
     }
 
     window.addEventListener("portfolioDataChanged", handleDataChange as EventListener)
 
     return () => {
       window.removeEventListener("portfolioDataChanged", handleDataChange as EventListener)
     }
   }, [])
 
   useEffect(() => {
+    if (!sectionRef.current) return
+    
     const ctx = gsap.context(() => {
       // Section fade in
       gsap.fromTo(
@@ .. @@
     }, sectionRef)
 
     return () => ctx.revert()
-  }, [])
+  }, [aboutData]) // Re-run when data changes