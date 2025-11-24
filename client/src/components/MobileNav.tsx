import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Trophy, Users, BarChart3, User, LogOut, Bell, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { APP_LOGO, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/contests", label: "Contests", icon: Trophy },
    { href: "/create-team", label: "Create Team", icon: Users },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/analytics", label: "Analytics", icon: TrendingUp },
  ];

  // Add admin links only for admin users
  if (user?.role === "admin") {
    navItems.push({ href: "/traffic", label: "Traffic Analytics", icon: BarChart3 });
    navItems.push({ href: "/admin", label: "Admin Panel", icon: Shield });
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
              <span className="font-bold text-lg">{APP_TITLE}</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          {/* User Info */}
          {isAuthenticated && user && (
            <div className="mb-6 pb-4 border-b border-border">
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <span className="text-xs text-muted-foreground">Level</span>
                  <p className="font-bold text-primary">{user.level || 1}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Points</span>
                  <p className="font-bold text-gradient">{user.totalPoints || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {isAuthenticated ? (
              navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })
            ) : (
              <>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Home
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Logout Button */}
          {isAuthenticated && (
            <Button
              variant="outline"
              className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
