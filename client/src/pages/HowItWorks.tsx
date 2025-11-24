import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import {
  UserPlus,
  Users,
  Trophy,
  BarChart3,
  Shield,
  Clock,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Sign up for free in seconds using your email or social media accounts. No credit card required, no hidden fees—just pure fantasy cricket fun.",
      details: [
        "Quick registration process",
        "Secure authentication",
        "100% free forever",
        "No payment information needed",
      ],
    },
    {
      number: 2,
      icon: Users,
      title: "Create Your Dream Team",
      description:
        "Select 11 players from upcoming cricket matches. Use your cricket knowledge to build a winning combination within the 100-credit budget.",
      details: [
        "Choose from real match players",
        "100-credit budget limit",
        "Select 1-4 wicketkeepers",
        "Pick 3-6 batsmen, 1-4 all-rounders, 3-6 bowlers",
        "Appoint a captain (2x points) and vice-captain (1.5x points)",
      ],
    },
    {
      number: 3,
      icon: Trophy,
      title: "Join Free Contests",
      description:
        "Enter completely free contests and compete with thousands of players. Test your skills, climb the leaderboards, and earn achievements.",
      details: [
        "100% free contests",
        "Compete with real players",
        "Multiple contest formats",
        "No entry fees ever",
      ],
    },
    {
      number: 4,
      icon: BarChart3,
      title: "Track Live Scores & Rankings",
      description:
        "Watch your team's performance in real-time as the match progresses. See live points, rankings, and player statistics to track your progress.",
      details: [
        "Real-time score updates",
        "Live leaderboard rankings",
        "Detailed player statistics",
        "Match progress tracking",
      ],
    },
    {
      number: 5,
      icon: Target,
      title: "Earn Achievements & Rankings",
      description:
        "Earn points based on your players' real match performance. Climb the leaderboards, unlock achievements, and showcase your fantasy cricket expertise.",
      details: [
        "Achievement badges",
        "Leaderboard rankings",
        "Skill-based progression",
        "Exclusive titles and honors",
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Target className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            How It Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
            Your complete guide to playing fantasy cricket on India's premier free-to-play
            platform. Follow these simple steps to start your journey to glory.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <a href={getLoginUrl()}>
              <Button size="lg" className="gap-2">
                <UserPlus className="h-5 w-5" />
                Get Started Free
              </Button>
            </a>
            <Link href="/faq">
              <Button size="lg" variant="outline" className="gap-2">
                View FAQs
              </Button>
            </Link>
          </div>
        </div>

        {/* FREE Platform Notice */}
        <Card className="p-4 md:p-6 bg-green-900/20 border-green-700/50 mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className="flex gap-3 md:gap-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-green-500 mb-2">
                100% Free Forever - No Real Money
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                {APP_TITLE} is completely FREE with NO deposits, NO entry fees, and NO real money
                involved. Play for fun, achievements, and leaderboard rankings—not for cash prizes.
              </p>
            </div>
          </div>
        </Card>

        {/* Steps */}
        <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="p-6 md:p-8 bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Icon & Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <step.icon className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-gray-400">
                        <Zap className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Scoring System */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6">
            Scoring System
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8 md:mb-12">
            Understanding how points are awarded is key to building a strong team. Here's the
            complete breakdown of our scoring system.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { category: "Batting", points: ["+1 per run", "+4 for boundary", "+6 for six", "+8 for 30 runs", "+16 for half-century", "+32 for century"] },
              { category: "Bowling", points: ["+25 per wicket", "+8 for 2 wickets", "+16 for 3 wickets", "+8 for maiden over", "+12 for 4 wickets", "+16 for 5 wickets"] },
              { category: "Fielding", points: ["+8 per catch", "+12 per stumping", "+12 per run-out (direct)", "+6 per run-out (indirect)"] },
              { category: "Strike Rate Bonus", points: ["+6 (SR 130-150)", "+4 (SR 100-130)", "-2 (SR 50-70)", "-4 (SR below 50)"] },
              { category: "Economy Bonus", points: ["+12 (ER below 5)", "+6 (ER 5-6)", "-2 (ER 9-10)", "-4 (ER above 10)"] },
              { category: "Special", points: ["+10 for duck (batsman)", "+10 for LBW/Bowled", "Captain gets 2x points", "Vice-captain gets 1.5x points"] },
            ].map((section, index) => (
              <Card key={index} className="p-4 md:p-6 bg-gray-800/50 border-gray-700">
                <h4 className="text-base md:text-lg font-bold text-purple-400 mb-3 md:mb-4">
                  {section.category}
                </h4>
                <ul className="space-y-2">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="text-xs md:text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
            Why Choose {APP_TITLE}?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Shield,
                title: "100% Free Forever",
                description: "No deposits, no fees, no hidden charges. Play completely free with no real money involved.",
              },
              {
                icon: Clock,
                title: "Real-Time Updates",
                description: "Live scores, instant rankings, and real-time player statistics during matches.",
              },
              {
                icon: Trophy,
                title: "Daily Contests",
                description: "New free contests every day with exciting achievements and leaderboard rankings.",
              },
              {
                icon: Target,
                title: "Skill-Based Gaming",
                description: "Success depends on your cricket knowledge and strategy, not luck or money.",
              },
              {
                icon: Users,
                title: "Compete with Thousands",
                description: "Join a vibrant community of cricket fans and test your skills against real players.",
              },
              {
                icon: Zap,
                title: "Easy to Play",
                description: "Simple interface, quick team creation, and instant contest entry—start playing in minutes.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 md:p-6 bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-purple-400" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Playing?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
            Join thousands of cricket fans who are already enjoying free fantasy cricket every day.
            Sign up now and get started for free!
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="gap-2">
              <UserPlus className="h-5 w-5" />
              Create Free Account
            </Button>
          </a>
        </div>

        {/* Legal Disclaimer */}
        <Card className="p-4 md:p-6 bg-red-900/20 border-red-700/50 mt-8 md:mt-12 max-w-4xl mx-auto">
          <div className="flex gap-3 md:gap-4">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-red-500 mb-2">
                State Restrictions
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana,
                Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a
                skill-based, free-to-play platform with NO real money involved.
              </p>
            </div>
          </div>
        </Card>

        {/* Back Link */}
        <div className="mt-8 md:mt-12 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm md:text-base">
            ← Back to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
