import logoUrl from "../assets/logos/logo.svg";

export default function Logo({ className }) {
  return (
    <img
      className={className}
      src={logoUrl}
      alt=""
      width={128}
      height={32}
      decoding="async"
    />
  );
}
