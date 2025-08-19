import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="bg-gradient-to-r from-primary to-primary-light dark:from-dark-card dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your Voice in <span className="text-gold">Kansas City</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover local choral organizations, connect with ensembles, and experience the vibrant vocal music scene across the Kansas City metro area.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search organizations and ensembles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="input-search"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
