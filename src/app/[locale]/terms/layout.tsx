import type {Metadata} from "next";
import SeoRouteGuard from "../_route-guard";

export const metadata: Metadata = {
  robots: {index: false, follow: true},
};

export default function TermsLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{locale: string}>;
}) {
  return (
    <SeoRouteGuard pathname="/terms" params={params}>
      {children}
    </SeoRouteGuard>
  );
}
