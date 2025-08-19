import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-provider";
import { Music, Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/directory" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8"}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`font-medium transition-colors ${
            mobile 
              ? "text-lg text-gray-300 hover:text-primary-light"
              : "text-gray-300 hover:text-primary-light"
          }`}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="bg-dark-bg border-b border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 flex-shrink-0">
                                  <Link href="/" className="flex items-center" data-testid="link-home">
                        <h1 className="text-2xl font-sans font-bold text-[#E86C4F] tracking-wide">Local Vocal</h1>
                      </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 flex-shrink-0"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <NavLinks />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden p-2 rounded-lg bg-gray-700 text-gray-300 flex-shrink-0"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
