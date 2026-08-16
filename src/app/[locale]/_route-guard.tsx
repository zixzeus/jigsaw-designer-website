import {notFound} from "next/navigation";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";

export default async function SeoRouteGuard({
  children,
  params,
  pathname,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{locale: string}>;
  readonly pathname: string;
}) {
  const {locale} = await params;

  if (!isSiteLocale(locale) || !isRouteAvailable(pathname, locale)) {
    notFound();
  }

  return children;
}
