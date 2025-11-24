import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_TITLE, getLoginUrl } from "@/const";
import {
  UserPlus,
  Users,
  Trophy,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Target,
} from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Verify",
      description:
        "Create your free account in seconds using your email or social login. Complete a quick verification to ensure fair play and secure your account.",
      details: [
        "No credit card required to start",
        "Quick email or social login",
        "Secure account verification",
        "100% free to join",
      ],
    },
    {
      icon: Users,
      title: "Create Your Dream Team",
      description:
        "Select 11 players from upcoming cricket matches. Use your cricket knowledge to build a winning combination within the 100-credit budget.",
      details: [
        "Choose from real match players",
        "100-credit budget per team",
        "Pick 1-4 Wicketkeepers, 3-6 Batsmen, 1-4 All-rounders, 3-6 Bowlers",
        "Select Captain (2x points) & Vice-Captain (1.5x points)",
      ],
    },
    {
      icon: Trophy,
      title: "Join Contests",
      description:
        "Enter free or paid contests based on your skill level and budget. Compete with thousands of players for exciting prizes and glory.",
      details: [
        "Practice contests (100% free)",
        "Head-to-head battles",
        "Small leagues (2-10 players)",
        "Mega contests (10,000+ players)",
      ],
    },
    {
      icon: Target,
      title: "Track Live Scores",
      description:
        "Watch your team perform in real-time as the match progresses. See live points, rankings, and player performances updated ball-by-ball.",
      details: [
        "Real-time score updates",
        "Live leaderboard rankings",
        "Player performance stats",
        "Match commentary",
      ],
    },
    {
      icon: Wallet,
      title: "Win & Withdraw",
      description:
        "Earn points based on your players' real match performance. Win cash prizes and withdraw instantly to your bank account or digital wallet.",
      details: [
        "Instant prize distribution",
        "Multiple withdrawal options",
        "Minimum withdrawal: ₹200",
        "Fast & secure transactions",
      ],
    },
  ];

  const scoringRules = [
    {
      category: "Batting",
      rules: [
        { action: "Run scored", points: "+1 per run" },
        { action: "Boundary (4s)", points: "+1 bonus" },
        { action: "Six (6s)", points: "+2 bonus" },
        { action: "Half-century (50 runs)", points: "+8 bonus" },
        { action: "Century (100 runs)", points: "+16 bonus" },
        { action: "Duck (out for 0)", points: "-2" },
      ],
    },
    {
      category: "Bowling",
      rules: [
        { action: "Wicket taken", points: "+25" },
        { action: "3 wickets bonus", points: "+4" },
        { action: "4 wickets bonus", points: "+8" },
        { action: "5 wickets bonus", points: "+16" },
        { action: "Maiden over", points: "+12" },
        { action: "Dot ball", points: "+1" },
      ],
    },
    {
      category: "Fielding",
      rules: [
        { action: "Catch", points: "+8" },
        { action: "3 catches bonus", points: "+4" },
        { action: "Stumping", points: "+12" },
        { action: "Run out (direct)", points: "+12" },
        { action: "Run out (assist)", points: "+6" },
      ],
    },
    {
      category: "Other",
      rules: [
        { action: "Captain (all points)", points: "×2" },
        { action: "Vice-Captain (all points)", points: "×1.5" },
        { action: "Playing 11", points: "+4" },
        { action: "Substitute", points: "0" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            How {APP_TITLE} Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
            Your complete guide to playing fantasy cricket and winning real cash prizes.
            Follow these simple steps to start your journey to glory.
          </p>
          {!isAuthenticated && (
            <Button asChild size="lg" className="text-sm md:text-base">
              <a href={getLoginUrl()}>
                Get Started Free <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Steps Section */}
      <section className="container py-8 md:py-16">
        <div className="space-y-8 md:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 md:p-8 bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-purple-400 font-semibold text-sm md:text-base">
                          Step {index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
                      {step.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Scoring Rules Section */}
      <section className="container py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Scoring System
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Understanding how points are awarded is key to building a winning team. Here's the
            complete breakdown of our scoring system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {scoringRules.map((category, index) => (
            <Card
              key={index}
              className="p-6 md:p-8 bg-gray-800/50 border-gray-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-3 border-b border-gray-700 last:border-0"
                  >
                    <span className="text-sm md:text-base text-gray-300">{rule.action}</span>
                    <span className="text-sm md:text-base font-semibold text-purple-400">
                      {rule.points}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="container py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose {APP_TITLE}?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "100% Safe & Secure",
              description: "Your data and money are protected with bank-grade security.",
            },
            {
              icon: Clock,
              title: "Instant Withdrawals",
              description: "Get your winnings in your account within 24 hours.",
            },
            {
              icon: Trophy,
              title: "Daily Contests",
              description: "New contests every day with exciting prizes to win.",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-gray-800/50 border-gray-700 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-20">
        <Card className="p-8 md:p-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Winning?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans who are already winning real cash prizes every day.
            Sign up now and get started for free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <Button asChild size="lg" className="text-sm md:text-base">
                <a href={getLoginUrl()}>Create Free Account</a>
              </Button>
            ) : (
              <Button asChild size="lg" className="text-sm md:text-base">
                <Link href="/contests">Browse Contests</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="text-sm md:text-base">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
