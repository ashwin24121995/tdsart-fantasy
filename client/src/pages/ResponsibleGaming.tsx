import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { Heart, AlertCircle, Phone, Clock, Shield, Users, Ban, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function ResponsibleGaming() {
  const lastUpdated = "November 25, 2025";

  return (
    <PageLayout>
      <div className="container py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Heart className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Responsible Gaming
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Important Message */}
        <Card className="p-4 md:p-6 bg-blue-900/20 border-blue-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-blue-500 mb-2">
                Our Commitment to You
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                At {APP_TITLE}, we are committed to promoting responsible gaming practices and
                ensuring that fantasy cricket remains an enjoyable, skill-based activity for all
                our users.
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Users className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  What is Responsible Gaming?
                </h2>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              Responsible gaming means playing fantasy cricket in a way that is enjoyable,
              controlled, and does not negatively impact your life, relationships, or finances.
              While {APP_TITLE} is a free-to-play platform with no real money involved, we still
              encourage healthy gaming habits to ensure the best experience for all users.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              Fantasy cricket should be a fun, skill-based activity that enhances your enjoyment
              of the sport, not a source of stress or compulsion. We want all our users to play
              responsibly and maintain a healthy balance in their lives.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Signs of Problem Gaming
                </h2>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              It's important to recognize when gaming may be becoming problematic. Watch for these
              warning signs:
            </p>
            <div className="space-y-3">
              {[
                "Spending more time on fantasy cricket than intended or planned",
                "Neglecting work, studies, or personal responsibilities to play",
                "Feeling irritable, anxious, or restless when not playing",
                "Using fantasy cricket to escape from problems or negative emotions",
                "Lying to friends or family about the amount of time spent playing",
                "Experiencing conflicts in relationships due to gaming habits",
                "Continuing to play despite negative consequences",
                "Losing interest in other hobbies or activities you once enjoyed",
              ].map((sign, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                  <p className="text-sm md:text-base text-gray-300">{sign}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Tips for Responsible Gaming
                </h2>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Set Time Limits
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  Decide in advance how much time you want to spend on fantasy cricket each day or
                  week. Use timers or reminders to help you stick to your limits. Remember to take
                  regular breaks and maintain a healthy balance with other activities.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Keep It Fun
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  Fantasy cricket should enhance your enjoyment of the sport, not become a source
                  of stress. If you find yourself getting frustrated or anxious, take a step back
                  and remember that it's meant to be entertaining. Focus on the strategic and
                  analytical aspects that make the game enjoyable.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Maintain Balance
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  Don't let fantasy cricket interfere with your work, studies, family time, or
                  other important responsibilities. Make sure you're maintaining a healthy balance
                  in all areas of your life. Schedule your gaming time around your other
                  commitments, not the other way around.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Know When to Stop
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  If you're feeling tired, frustrated, or if gaming is no longer enjoyable, it's
                  time to take a break. Listen to your body and mind. It's perfectly okay to step
                  away and come back when you're feeling refreshed.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Seek Support
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  If you're concerned about your gaming habits or those of someone you know, don't
                  hesitate to reach out for help. Talk to friends, family, or professional
                  counselors. There's no shame in seeking support – it's a sign of strength and
                  self-awareness.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Ban className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Self-Exclusion Options
                </h2>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              If you feel you need to take a break from fantasy cricket, we offer self-exclusion
              options to help you maintain control:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Temporary Suspension
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can request a temporary suspension of your account for a period of 24 hours,
                  7 days, 30 days, or 90 days. During this time, you will not be able to access
                  your account or participate in any contests.
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Permanent Closure
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  If you wish to permanently close your account, you can request account deletion
                  through our support team. This action is irreversible, and all your data will be
                  permanently removed in accordance with our Privacy Policy.
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  How to Request
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  To request self-exclusion, contact our support team at{" "}
                  <a
                    href={`mailto:support@${APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com`}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    support@{APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com
                  </a>{" "}
                  with your request. We will process it within 24 hours.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Phone className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Get Help & Support
                </h2>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-6">
              If you or someone you know is struggling with gaming-related issues, professional
              help is available. Here are some resources:
            </p>
            <div className="space-y-4">
              <Card className="p-4 bg-gray-900/50 border-gray-600">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  National Helpline (India)
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  <strong>NIMHANS Helpline:</strong> 080-46110007
                </p>
                <p className="text-sm text-gray-400">
                  Available 24/7 for mental health support and counseling
                </p>
              </Card>

              <Card className="p-4 bg-gray-900/50 border-gray-600">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Gamblers Anonymous India
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Website:{" "}
                  <a
                    href="https://www.gamblersanonymous.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    www.gamblersanonymous.org
                  </a>
                </p>
                <p className="text-sm text-gray-400">
                  Support groups and resources for problem gaming
                </p>
              </Card>

              <Card className="p-4 bg-gray-900/50 border-gray-600">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  {APP_TITLE} Support
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Email:{" "}
                  <a
                    href={`mailto:support@${APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com`}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    support@{APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com
                  </a>
                </p>
                <p className="text-sm text-gray-400">
                  Our team is here to help with account management and responsible gaming tools
                </p>
              </Card>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <HelpCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  For Parents & Guardians
                </h2>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              {APP_TITLE} is strictly for users 18 years and older. If you are a parent or
              guardian, we encourage you to:
            </p>
            <div className="space-y-3">
              {[
                "Monitor your children's online activities and device usage",
                "Use parental control software to restrict access to gaming platforms",
                "Have open conversations about responsible internet and gaming habits",
                "Set clear rules and boundaries around screen time and online activities",
                "Report any underage users you encounter on the platform",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-2" />
                  <p className="text-sm md:text-base text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-base text-gray-300 mt-6">
              If you discover that a minor has created an account on {APP_TITLE}, please contact
              us immediately at{" "}
              <a
                href={`mailto:support@${APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com`}
                className="text-purple-400 hover:text-purple-300"
              >
                support@{APP_TITLE.toLowerCase().replace(/\s+/g, "")}.com
              </a>{" "}
              so we can take appropriate action.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 text-center mt-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help or Have Questions?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            Our support team is here to assist you with responsible gaming tools and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-sm md:text-base">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm md:text-base">
              <Link href="/faq">View FAQ</Link>
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
    </PageLayout>
  );
}
