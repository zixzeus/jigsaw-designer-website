import SeoRouteGuard from "../_route-guard";

export default function PricingLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{locale: string}>;
}) {
  return (
    <SeoRouteGuard pathname="/pricing" params={params}>
      {children}
    </SeoRouteGuard>
  );
}
