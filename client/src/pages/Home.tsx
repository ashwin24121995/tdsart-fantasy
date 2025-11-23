import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { AlertTriangle, Trophy, Users, Target, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">Free Fantasy Cricket</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-foreground">Welcome, {user?.name}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={getLoginUrl()}>Login</a>
                  </Button>
                  <Button size="sm" className="btn-gradient" asChild>
                    <a href={getLoginUrl()}>Get Started</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Legal Compliance Banner */}
      <div className="bg-destructive/20 border-b border-destructive/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-foreground mb-1">Important Legal Notice</p>
              <p className="text-muted-foreground">
                <strong>⚠️ State Restrictions:</strong> This platform is NOT permitted in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. 
                <strong className="ml-3">⚠️ Age Restriction:</strong> 18+ Users Only. 
                <strong className="ml-3">✓ Skill-Based:</strong> Not chance-based. 
                <strong className="ml-3">✓ 100% Free:</strong> No real money involved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-lg px-6 py-2 bg-primary/20 text-primary border-primary/50">
              <Zap className="h-4 w-4 mr-2" />
              100% Free to Play
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-gradient">Fantasy Cricket</span>
              <br />
              <span className="text-foreground">Unleashed</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build your dream cricket team, compete in exciting contests, and climb the leaderboards. 
              Pure skill, zero investment, infinite fun!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Button size="lg" className="btn-gradient text-lg px-8 py-6" asChild>
                  <Link href="/dashboard">
                    <Trophy className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="btn-gradient text-lg px-8 py-6" asChild>
                    <a href={getLoginUrl()}>
                      <Trophy className="mr-2 h-5 w-5" />
                      Start Playing Now
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    <Shield className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </>
              )}
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Free to Play</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">0₹</div>
                <div className="text-sm text-muted-foreground">No Money Needed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient mb-1">Skill</div>
                <div className="text-sm text-muted-foreground">Based Platform</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">TDSART Fantasy</span>?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket with our feature-packed platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card border-border card-glow hover:scale-105 transition-transform">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Create Dream Teams</h4>
              <p className="text-muted-foreground">
                Select your favorite cricket players and build winning combinations
              </p>
            </Card>

            <Card className="p-6 bg-card border-border card-glow hover:scale-105 transition-transform">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Join Contests</h4>
              <p className="text-muted-foreground">
                Compete with thousands of cricket fans in exciting free contests
              </p>
            </Card>

            <Card className="p-6 bg-card border-border card-glow hover:scale-105 transition-transform">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2">Earn Achievements</h4>
              <p className="text-muted-foreground">
                Unlock badges, level up, and showcase your fantasy cricket skills
              </p>
            </Card>

            <Card className="p-6 bg-card border-border card-glow hover:scale-105 transition-transform">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Climb Leaderboards</h4>
              <p className="text-muted-foreground">
                Rise through the ranks and become a fantasy cricket champion
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cricket Feature Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">
                Fantasy Cricket
              </Badge>
              <h3 className="text-4xl font-bold mb-6">
                Master the Art of <span className="text-gradient">Cricket Strategy</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Select batsmen, bowlers, all-rounders, and wicket-keepers to create the perfect balanced team. 
                Choose your captain and vice-captain wisely to maximize points!
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Real-time Points:</strong>
                    <span className="text-muted-foreground ml-2">Watch your team score points as matches unfold</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Multiple Contests:</strong>
                    <span className="text-muted-foreground ml-2">Join various contests with different formats</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Player Stats:</strong>
                    <span className="text-muted-foreground ml-2">Access detailed statistics to make informed decisions</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="/cricket-feature.png" 
                alt="Fantasy Cricket" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/20 via-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-gradient">Cricket Journey</span>?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans already playing on India's most exciting free fantasy cricket platform
          </p>
          {!isAuthenticated && (
            <Button size="lg" className="btn-gradient text-lg px-12 py-6" asChild>
              <a href={getLoginUrl()}>
                <Trophy className="mr-2 h-5 w-5" />
                Create Free Account
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
                <span className="font-bold text-lg">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                India's premier free-to-play fantasy cricket platform. 100% skill-based, 0% investment.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">How to Play</a></li>
                <li><a href="#" className="hover:text-foreground">Contests</a></li>
                <li><a href="#" className="hover:text-foreground">Leaderboard</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Responsible Gaming</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold text-foreground">TDSART STUDIO LLP</p>
              <p>LLP Identification Number: ACA-7621 | PAN: AAUFT5447L | TAN: PNET17465A</p>
              <p>Office No-11, Fifth Floor, A-Building, City Vista, Vadgaon Sheri, Pune-411014, Maharashtra, India</p>
              <p>Incorporated under Limited Liability Partnership Act 2008 | Established: April 25, 2023</p>
              <p className="mt-4">© 2024 TDSART STUDIO LLP. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
