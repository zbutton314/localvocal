import { Button } from "@/components/ui/button";

interface QuickFiltersProps {
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
}

export function QuickFilters({ activeFilters, onFilterChange }: QuickFiltersProps) {
  const filters = [
    { key: "classical", label: "Classical" },
    { key: "contemporary", label: "Contemporary" },
    { key: "gospel", label: "Gospel" },
    { key: "no-audition", label: "No Audition Required" },
  ];

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 self-center mr-4">
            Quick Filters:
          </span>
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilters.includes(filter.key) ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className={`rounded-full text-sm font-medium transition-colors ${
                activeFilters.includes(filter.key)
                  ? "bg-primary text-white hover:bg-blue-700 dark:bg-primary-light"
                  : "bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary-light"
              }`}
              data-testid={`filter-${filter.key}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
