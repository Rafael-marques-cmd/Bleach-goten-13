import { PageType } from "@/app/types/bleach";

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const links: { label: string; page: PageType }[] = [
    { label: "Home", page: "home" },
    { label: "Personagens", page: "personagens" },
    { label: "Assistir ou Ler", page: "assistir" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              BL<span className="text-orange-500">E</span>ACH
            </h1>
          </div>
          
          <ul className="flex items-center gap-6">
            {links.map(link => (
              <li key={link.page}>
                <button
                  onClick={() => onPageChange(link.page)}
                  className={`text-sm transition-colors hover:text-orange-500 ${
                    currentPage === link.page
                      ? 'text-orange-500 font-semibold'
                      : 'text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
