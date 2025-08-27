@@ .. @@
   useEffect(() => {
+    if (!sectionRef.current || projects.length === 0) return
+    
     const ctx = gsap.context(() => {
       // Title animation
       gsap.fromTo(
@@ .. @@
     }, sectionRef)
 
     return () => ctx.revert()
-  }, [])
+  }, [projects]) // Re-run when projects change