import { Link } from "wouter";

export function Footer() {
  const quickLinks = [
    { name: "Find Ensembles", href: "/directory" },
    { name: "Submit Your Group", href: "/submit-group" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-dark-bg dark:bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Local Vocal</h3>
            <p className="text-gray-400 text-sm">
              Connecting voices across Kansas City's vibrant choral community.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Local Vocal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
