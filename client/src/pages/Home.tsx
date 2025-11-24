import { useAuth } from "@/_core/hooks/useAuth";
import { useTargetedAd } from "@/hooks/useTargetedAd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { LiveScores } from "@/components/LiveScores";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { initUTMTracking } from "@/lib/utm";
import {
  AlertTriangle,
  Trophy,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const isAuthenticated = !!user;
  const { shouldShowAd, isLoading: adLoading } = useTargetedAd();

  // Initialize UTM tracking on page load
  useEffect(() => {
    initUTMTracking();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-0">
      {/* Legal Compliance Banner */}
      <div className="bg-destructive/20 border-b border-destructive/50 py-2 md:py-3 px-2 md:px-4">
        <div className="container mx-auto flex items-start md:items-center justify-center gap-2 text-xs md:text-sm">
          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-destructive flex-shrink-0 mt-0.5 md:mt-0" />
          <p className="text-left md:text-center text-foreground">
            <strong>⚠️ State Restrictions:</strong> Not permitted in AP, Assam, Odisha, Telangana, Nagaland, Sikkim{" "}
            <span className="hidden md:inline">| </span>
            <br className="md:hidden" />
            <strong>⚠️ Age:</strong> 18+ Only{" "}
            <span className="hidden md:inline">| </span>
            <br className="md:hidden" />
            <strong>100% Free</strong> - No Real Money
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent">
                {APP_TITLE}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {loading ? (
              <div className="h-8 md:h-10 w-20 md:w-32 bg-muted animate-pulse rounded-md" />
            ) : isAuthenticated ? (
              <>
                <span className="text-xs md:text-sm text-muted-foreground hidden sm:block truncate max-w-[100px] md:max-w-none">
                  Welcome, {user.name}!
                </span>
                <Link href="/dashboard">
                  <Button variant="default" size="sm" className="md:h-10 md:px-4">Dashboard</Button>
                </Link>
                <Button variant="outline" size="sm" className="md:h-10 md:px-4" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="md:h-10 md:px-4">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="md:h-10 md:px-4 whitespace-nowrap">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Targeted Ad for Google Ads Traffic (India + Mobile only) */}
      {shouldShowAd && (
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 px-4">
          <div className="container mx-auto max-w-md">
            <a 
              href="https://wa.link/autoreddypromo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-95 transition-opacity"
            >
              <img 
                src="/fairplay-ad.png" 
                alt="FairPlay - 500% Joining Bonus" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: "url(/cricket-stadium.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              India's Premier Free Fantasy Cricket Platform
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 px-4">
              Build your dream team. Compete with millions. Win glory. 100% Free. 100% Skill-Based.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                  Start Playing Free <ChevronRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mt-8 md:mt-16 max-w-3xl mx-auto px-4">
              <Card className="p-3 md:p-6 bg-card/80 backdrop-blur-sm border-primary/20">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">10K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Players</div>
              </Card>
              <Card className="p-3 md:p-6 bg-card/80 backdrop-blur-sm border-primary/20">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">500+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Daily Contests</div>
              </Card>
              <Card className="p-3 md:p-6 bg-card/80 backdrop-blur-sm border-primary/20">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">100%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Free to Play</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in 3 simple steps and join thousands of cricket fans
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            <Card className="p-4 md:p-8 text-center hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
              <div className="mb-4 md:mb-6 flex justify-center">
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-primary">1</span>
                </div>
              </div>
              <img
                src="/how-it-works-1.png"
                alt="Select Players"
                className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-lg"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Create Your Team</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Select 11 players from upcoming matches. Choose your captain and vice-captain wisely!
              </p>
            </Card>

            <Card className="p-4 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="mb-4 md:mb-6 flex justify-center">
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-primary">2</span>
                </div>
              </div>
              <img
                src="/how-it-works-2.png"
                alt="Join Contests"
                className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-lg"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Join Contests</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Enter free contests and compete with thousands of other fantasy cricket enthusiasts.
              </p>
            </Card>

            <Card className="p-4 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="mb-4 md:mb-6 flex justify-center">
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-primary">3</span>
                </div>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-lg bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center">
                <Trophy className="h-20 w-20 md:h-32 md:w-32 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Win Glory</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Earn points based on real match performance. Climb leaderboards and earn achievements!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose TDSART Fantasy?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted and exciting fantasy cricket platform in India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
            <Card className="p-4 md:p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <img src="/feature-free.png" alt="Free to Play" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">100% Free</h3>
              <p className="text-muted-foreground text-center text-sm">
                No deposits, no payments. Play completely free forever.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <img src="/feature-skill.png" alt="Skill Based" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Skill-Based</h3>
              <p className="text-muted-foreground text-center text-sm">
                Win based on your cricket knowledge and strategy, not luck.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">100% Legal</h3>
              <p className="text-muted-foreground text-center text-sm">
                Fully compliant with Indian fantasy sports regulations.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Live Updates</h3>
              <p className="text-muted-foreground text-center text-sm">
                Real-time scores and leaderboard updates during matches.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Community</h3>
              <p className="text-muted-foreground text-center text-sm">
                Join thousands of cricket fans and compete together.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Easy to Play</h3>
              <p className="text-muted-foreground text-center text-sm">
                Simple interface designed for both beginners and experts.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Achievements</h3>
              <p className="text-muted-foreground text-center text-sm">
                Earn badges and unlock achievements as you play.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Leaderboards</h3>
              <p className="text-muted-foreground text-center text-sm">
                Climb global and contest-specific leaderboards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-orange-500/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Fantasy Cricket Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans already playing on India's most exciting free fantasy platform
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-12 py-6">
              Create Free Account <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Live Scores */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Live Cricket Action</h2>
            <p className="text-xl text-muted-foreground">Stay updated with live scores and upcoming matches</p>
          </div>
          <LiveScores />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Is TDSART Fantasy really 100% free?</h3>
              <p className="text-muted-foreground">
                Yes! TDSART Fantasy is completely free to play. There are no deposits, no entry fees, and no hidden charges. 
                You can create teams, join contests, and compete without spending a single rupee.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Is this legal in India?</h3>
              <p className="text-muted-foreground">
                Yes, TDSART Fantasy is 100% legal and compliant with Indian fantasy sports regulations. We operate as a skill-based 
                platform with no real money involved. However, we are not available in Andhra Pradesh, Assam, Odisha, Telangana, 
                Nagaland, and Sikkim due to state-specific restrictions.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">How do I earn points?</h3>
              <p className="text-muted-foreground">
                Points are awarded based on real match performance of the players in your fantasy team. Runs, wickets, catches, 
                and other cricket actions earn points. Your captain earns 2x points and vice-captain earns 1.5x points!
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Can I create multiple teams?</h3>
              <p className="text-muted-foreground">
                Yes! You can create multiple teams for the same match with different player combinations and strategies. 
                This increases your chances of winning and lets you experiment with different approaches.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">What are achievements?</h3>
              <p className="text-muted-foreground">
                Achievements are special badges you earn by completing challenges like creating your first team, winning contests, 
                reaching milestones, and more. Collect them all to showcase your fantasy cricket expertise!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10" />
                <span className="text-xl font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                India's premier free-to-play fantasy cricket platform. 100% skill-based, 100% legal, 100% free.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/register" className="hover:text-primary transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-primary transition-colors">Login</Link></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company Information</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>TDSART STUDIO LLP</strong></p>
                <p>LLP Identification: ACA-7621</p>
                <p>PAN: AAUFT5447L</p>
                <p>TAN: PNET17465A</p>
                <p className="mt-4">
                  Office No-11, Fifth Floor, A-Building<br />
                  City Vista, Vadgaon Sheri<br />
                  Pune-411014, Maharashtra, India
                </p>
                <p className="mt-4 text-xs">
                  Incorporated under Limited Liability Partnership Act 2008<br />
                  Established: April 25, 2023
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-4">
              <strong>Legal Disclaimer:</strong> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, 
              Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform 
              with no real money involved.
            </p>
            <p>&copy; {new Date().getFullYear()} TDSART STUDIO LLP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
