export function emitAuthExpired() {
  window.dispatchEvent(new Event("auth-expired"));
}