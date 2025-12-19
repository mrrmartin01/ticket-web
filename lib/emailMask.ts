export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  const [domainName, tld] = domain.split(".");

  // Local part: keep first 3–4 chars, mask the rest
  const visibleLocalCount = Math.min(local.length, 5);
  const maskedLocal =
    local.slice(0, visibleLocalCount) +
    "*".repeat(Math.max(local.length - visibleLocalCount, 0));

  // Domain: keep first 2 chars, mask the rest except last char
  const visibleDomainCount = Math.min(domainName.length, 2);
  const maskedDomain =
    domainName.slice(0, visibleDomainCount) +
    "*".repeat(Math.max(domainName.length - visibleDomainCount, 0)) +
    domainName.slice(-1);

  return `${maskedLocal}@${maskedDomain}.${tld}`;
}
