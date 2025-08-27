export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminAuth")
}

export function requireAuth(): boolean {
  const authenticated = isAuthenticated()
  if (!authenticated && typeof window !== "undefined") {
    window.location.href = "/admin/login"
  }
  return authenticated
}
