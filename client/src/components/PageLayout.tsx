import { ReactNode } from "react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8 md:h-10 md:w-10" />
                <span className="text-base md:text-xl font-bold text-white">{APP_TITLE}</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-3 md:gap-6">
              <Link href="/" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/how-it-works" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/faq" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gaming" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    Responsible Gaming
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">Company</h4>
              <div className="space-y-2 text-xs md:text-sm text-gray-400">
                <p>TDSART STUDIO LLP</p>
                <p>Skill-based gaming platform</p>
                <p>100% Free to Play</p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <p className="text-xs md:text-sm text-gray-400 mb-4 text-center">
              <strong>Legal Disclaimer:</strong> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana,
              Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform
              with NO real money involved.
            </p>
            <p className="text-xs md:text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} TDSART STUDIO LLP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
