export async function getCSRFToken(): Promise<void> {
  await fetch("http://localhost:8000/api/csrf/", {
    method: "GET",
    credentials: "include",
  })
}

// utils/csrf.ts
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookie = cookies.find((c) => c.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

