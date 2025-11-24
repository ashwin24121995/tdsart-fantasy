import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { APP_TITLE, APP_LOGO } from "@/const";
import {
  Target,
  Heart,
  Shield,
  Users,
  Trophy,
  Zap,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Link } from "wouter";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-16 md:h-20 md:w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About {APP_TITLE}
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            India's premier free-to-play fantasy cricket platform, bringing the excitement of
            cricket strategy to millions of fans.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Target className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                To democratize fantasy cricket in India by providing a completely free, skill-based
                platform where every cricket fan can showcase their knowledge, strategic thinking,
                and passion for the game without any financial barriers. We believe cricket is more
                than just a sport—it's a way to connect, compete, and celebrate the game we all
                love.
              </p>
            </div>
          </div>
        </Card>

        {/* Our Story */}
        <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700 mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed">
            <p>
              {APP_TITLE} was born from a simple observation: while millions of Indians are
              passionate about cricket, many fantasy platforms require financial investment, creating
              barriers for fans who simply want to enjoy the strategic aspect of the game. We set out
              to change that.
            </p>
            <p>
              Founded in 2023 by a team of cricket enthusiasts and technology professionals, we built
              {APP_TITLE} with one clear goal: to create a platform where anyone can experience the
              thrill of fantasy cricket without spending a single rupee. We wanted to focus purely on
              skill, strategy, and the love of cricket.
            </p>
            <p>
              Today, we're proud to serve thousands of users across India, providing a safe, legal,
              and completely free platform for fantasy cricket. Our community includes students,
              professionals, homemakers, and cricket fans from all walks of life, united by their
              passion for the game.
            </p>
          </div>
        </Card>

        {/* Core Values */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                100% Free Forever
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                No deposits, no entry fees, no hidden charges. Fantasy cricket should be accessible
                to everyone, regardless of their financial situation.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Fair & Transparent
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Clear rules, transparent scoring, and equal opportunities for all players. We
                believe in creating a level playing field where skill determines success.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Community First
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Our users are at the heart of everything we do. We listen to feedback, continuously
                improve, and build features that enhance the community experience.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Skill-Based Gaming
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Success on our platform comes from cricket knowledge, strategic thinking, and player
                analysis—not luck or chance.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Innovation
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                We constantly innovate to bring new features, better user experience, and enhanced
                functionality to our platform.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Legal Compliance
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                We operate in full compliance with Indian laws and regulations, ensuring a safe and
                legal platform for all users.
              </p>
            </Card>
          </div>
        </div>

        {/* What Makes Us Different */}
        <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700 mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
            What Makes Us Different
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Truly Free Platform
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Unlike other platforms that require deposits or entry fees, {APP_TITLE} is
                  completely free. No credit card, no wallet, no money—just pure cricket strategy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  No Real Money Involved
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We don't deal with real money, which means no financial risk, no tax complications,
                  and no gambling concerns. Just enjoy the game!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  User-Friendly Design
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Our platform is designed to be intuitive and easy to use, whether you're a fantasy
                  cricket veteran or a complete beginner. Clean interface, simple navigation, and
                  helpful guides.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Comprehensive Coverage
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We cover all major cricket formats and tournaments—T20Is, ODIs, Tests, IPL, and
                  international leagues. Never miss a chance to play!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Responsive Support
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Our dedicated support team is always ready to help with any questions or issues.
                  We typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Company Information */}
        <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Building2 className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                Company Information
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 text-sm md:text-base text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Legal Entity</h4>
              <p>TDSART STUDIO LLP</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">LLP Identification</h4>
              <p>ACA-7621</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">PAN</h4>
              <p>AAUFT5447L</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">TAN</h4>
              <p>PNET17465A</p>
            </div>
            <div className="sm:col-span-2">
              <h4 className="font-semibold text-white mb-2">Registered Office</h4>
              <p>
                Office No-11, Fifth Floor, A-Building
                <br />
                City Vista, Vadgaon Sheri
                <br />
                Pune-411014, Maharashtra, India
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Incorporation</h4>
              <p>Limited Liability Partnership Act 2008</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Established</h4>
              <p>April 25, 2023</p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            Become part of India's fastest-growing free fantasy cricket community. Start playing
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-sm md:text-base">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm md:text-base">
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </Card>

        {/* Back Link */}
        <div className="mt-8 md:mt-12 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm md:text-base">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
