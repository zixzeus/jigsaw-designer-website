import {Link} from "@/i18n/navigation";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
  ariaLabel,
}: {
  items: BreadcrumbItem[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="mb-8 text-sm text-gray-600 dark:text-gray-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-primary-dark dark:hover:text-primary-light">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
