export function parseOrigins(origin: string): string[] {
  return origin.split('/').map((part) => part.trim());
}
