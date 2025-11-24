import { Card } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import {
  HelpCircle,
  Users,
  Trophy,
  Shield,
  CreditCard,
  UserPlus,
  Target,
  Award,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: UserPlus,
      faqs: [
        {
          question: "What is TDSART Fantasy?",
          answer:
            "TDSART Fantasy is India's premier free-to-play fantasy cricket platform where you can create virtual teams of real cricket players and compete based on their actual match performances. It's 100% skill-based, completely legal, and requires no real money.",
        },
        {
          question: "How do I sign up?",
          answer:
            'Click the "Sign Up" button on the homepage, fill in your details including name, email, and password, verify your email address, and you\'re ready to start playing! The entire process takes less than 2 minutes.',
        },
        {
          question: "Is it really free?",
          answer:
            "Yes, absolutely! TDSART Fantasy is 100% free to play. There are no deposits, no entry fees, no hidden charges, and no in-app purchases. You can create unlimited teams and join unlimited contests without spending a single rupee.",
        },
        {
          question: "Do I need to download an app?",
          answer:
            "No, TDSART Fantasy works directly in your web browser on any device – mobile, tablet, or desktop. Simply visit our website and start playing. No downloads or installations required!",
        },
      ],
    },
    {
      title: "Gameplay & Rules",
      icon: Trophy,
      faqs: [
        {
          question: "How do I create a team?",
          answer:
            "Select an upcoming match, choose 11 players within the 100-credit budget (you must pick players from both teams), select a captain (2x points) and vice-captain (1.5x points), and save your team. You can create multiple teams for the same match with different combinations.",
        },
        {
          question: "How is the 100-credit budget distributed?",
          answer:
            "Each player is assigned a credit value based on their recent performance and role. Star players cost more credits (9-10), while emerging players cost less (7-8). You must strategically balance your team within the 100-credit limit to maximize points potential.",
        },
        {
          question: "What is the team composition requirement?",
          answer:
            "You must select exactly 11 players: 1-4 Wicketkeepers, 3-6 Batsmen, 1-4 All-Rounders, and 3-6 Bowlers. Additionally, you must pick at least 1 player from each of the two competing teams, with a maximum of 7 players from any single team.",
        },
        {
          question: "How are points calculated?",
          answer:
            "Points are awarded based on real match performance: Runs (1 point per run), Boundaries (1 bonus for 4s, 2 for 6s), Strike Rate bonuses, Wickets (25 points each), Economy Rate bonuses, Catches (8 points), Run Outs (6 points), and more. Your captain earns 2x points and vice-captain earns 1.5x points.",
        },
        {
          question: "Can I edit my team after creating it?",
          answer:
            "Yes, you can edit your team unlimited times before the match deadline (usually when the match starts). Once the deadline passes, your team is locked and cannot be changed. Make sure to finalize your team before the deadline!",
        },
        {
          question: "Can I create multiple teams for one match?",
          answer:
            "Yes! You can create multiple teams with different player combinations and strategies for the same match. This increases your chances of winning and lets you experiment with various approaches. There's no limit to the number of teams you can create.",
        },
      ],
    },
    {
      title: "Contests & Winning",
      icon: Target,
      faqs: [
        {
          question: "What types of contests are available?",
          answer:
            "We offer various contest types: Public Contests (join with other users), Private Contests (create and invite friends), Head-to-Head (compete against one player), Small Leagues (2-10 players), and Mega Contests (100+ players). All contests are completely free to join.",
        },
        {
          question: "How do I win?",
          answer:
            "Your team earns points based on the real-life performance of your selected players in the match. The teams with the highest total points win prizes. Rankings are determined by total points, and in case of a tie, the team created earlier ranks higher.",
        },
        {
          question: "What prizes can I win?",
          answer:
            "Since TDSART Fantasy is a free-to-play platform with no real money involved, prizes include achievement badges, leaderboard rankings, exclusive titles, and bragging rights among your friends. We focus on the skill and enjoyment of fantasy cricket rather than monetary rewards.",
        },
        {
          question: "How are winners determined?",
          answer:
            "Winners are determined by the highest total fantasy points scored by their team. Points are calculated automatically based on live match data. Results are updated in real-time during the match and finalized after the match concludes.",
        },
        {
          question: "What happens if a match is cancelled?",
          answer:
            "If a match is cancelled or abandoned before it starts, all contests for that match are cancelled and no points are awarded. If a match is abandoned after it starts, contests may be settled based on the points scored up to that point, depending on the situation.",
        },
      ],
    },
    {
      title: "Account & Profile",
      icon: Users,
      faqs: [
        {
          question: "How do I verify my account?",
          answer:
            "After signing up, you'll receive a verification email. Click the link in the email to verify your account. If you don't receive the email, check your spam folder or request a new verification email from your account settings.",
        },
        {
          question: "Can I change my username?",
          answer:
            "Your username is set during registration and cannot be changed later. However, you can update your display name, profile picture, and other profile information from your account settings at any time.",
        },
        {
          question: "How do I reset my password?",
          answer:
            'Click "Forgot Password" on the login page, enter your registered email address, and you\'ll receive a password reset link. Follow the link to create a new password. Make sure to use a strong, unique password for security.',
        },
        {
          question: "Can I delete my account?",
          answer:
            'Yes, you can request account deletion by contacting our support team at support@tdsartfantasy.com. Account deletion is permanent and irreversible. All your data, teams, and contest history will be permanently removed in accordance with our Privacy Policy.',
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Yes, we take data security very seriously. We use industry-standard SSL/TLS encryption, secure data storage, and strict access controls. We never share your personal information with third parties without your consent. Read our Privacy Policy for complete details.",
        },
      ],
    },
    {
      title: "Legal & Compliance",
      icon: Shield,
      faqs: [
        {
          question: "Is fantasy cricket legal in India?",
          answer:
            "Yes, fantasy cricket is completely legal in India as it is recognized as a game of skill, not chance. The Supreme Court of India has upheld that games requiring substantial skill are legal. However, we are not available in certain states due to local regulations.",
        },
        {
          question: "Which states is TDSART Fantasy not available in?",
          answer:
            "Due to state-specific regulations, TDSART Fantasy is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Users from these states cannot create accounts or participate in contests.",
        },
        {
          question: "What is the minimum age to play?",
          answer:
            "You must be at least 18 years old to create an account and play on TDSART Fantasy. We strictly enforce age verification and will permanently ban any accounts found to belong to minors. Parents should monitor their children's online activities.",
        },
        {
          question: "Is this gambling?",
          answer:
            "No, TDSART Fantasy is not gambling. It is a skill-based game where success depends on your knowledge of cricket, player analysis, and strategic team selection. Additionally, since it's completely free with no real money involved, it does not fall under gambling regulations.",
        },
        {
          question: "Do I need to pay any taxes?",
          answer:
            "Since TDSART Fantasy is a free-to-play platform with no real money prizes, there are no tax implications for users. You don't need to report any winnings or pay any taxes related to your fantasy cricket activities on our platform.",
        },
      ],
    },
    {
      title: "Technical & Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "What if I face technical issues?",
          answer:
            'If you encounter any technical problems, first try refreshing the page or clearing your browser cache. If the issue persists, contact our support team at support@tdsartfantasy.com with details about the problem, including screenshots if possible.',
        },
        {
          question: "Which browsers are supported?",
          answer:
            "TDSART Fantasy works best on modern browsers including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. We recommend using the latest version of your preferred browser for the best experience. Mobile browsers are fully supported.",
        },
        {
          question: "Why are live scores not updating?",
          answer:
            "Live scores are updated automatically every few minutes. If scores aren't updating, try refreshing the page. Occasionally, there may be delays from our data provider during high-traffic periods. Points are always finalized correctly after the match ends.",
        },
        {
          question: "How do I report a bug or issue?",
          answer:
            'To report bugs or issues, email us at support@tdsartfantasy.com with a detailed description of the problem, steps to reproduce it, and screenshots if applicable. We investigate all reports and typically respond within 24-48 hours.',
        },
        {
          question: "Can I suggest new features?",
          answer:
            "Absolutely! We love hearing from our users. Send your feature suggestions to support@tdsartfantasy.com. While we can't implement every suggestion, we carefully review all feedback and prioritize features that will benefit the community.",
        },
      ],
    },
    {
      title: "Scoring & Points",
      icon: Award,
      faqs: [
        {
          question: "What are the detailed scoring rules?",
          answer:
            "Batting: 1 point per run, +1 for boundary 4, +2 for boundary 6, bonuses for strike rate (50+ runs). Bowling: 25 points per wicket, bonuses for economy rate, +8 for maiden over. Fielding: +8 for catch, +12 for stumping, +6 for run out. Captain gets 2x points, vice-captain gets 1.5x points.",
        },
        {
          question: "Do substitute players earn points?",
          answer:
            "No, substitute players (who replace injured players during a match) do not earn fantasy points. Only the 11 players who are part of the official playing XI at the start of the match earn points based on their performance.",
        },
        {
          question: "What if a player doesn't play?",
          answer:
            "If a player in your team doesn't play in the match (not in the playing XI), they will score 0 points. This is why it's important to check team announcements and make changes to your team before the deadline if needed.",
        },
        {
          question: "Are points awarded for super overs?",
          answer:
            "Yes, points earned during super overs count towards your fantasy total. All runs, wickets, boundaries, and other actions during the super over are scored according to the same rules as the main match.",
        },
      ],
    },
    {
      title: "Matches & Timing",
      icon: Clock,
      faqs: [
        {
          question: "What cricket formats are covered?",
          answer:
            "TDSART Fantasy covers all major cricket formats including T20 Internationals, One Day Internationals (ODIs), Test Matches, and domestic T20 leagues like IPL, BBL, CPL, and more. New matches are added regularly.",
        },
        {
          question: "When is the team deadline?",
          answer:
            "The team creation and editing deadline is typically set to the match start time. Once the match begins, your team is locked and cannot be changed. Make sure to finalize your team before the deadline to ensure it's counted.",
        },
        {
          question: "Can I join a contest after the match starts?",
          answer:
            "No, you cannot join contests or create teams after the match deadline (usually when the match starts). All teams must be created and contests joined before the deadline to ensure fair play.",
        },
        {
          question: "What timezone are match times shown in?",
          answer:
            "All match times are displayed in Indian Standard Time (IST) by default. If you're accessing from a different timezone, match times will automatically adjust to your local timezone based on your device settings.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <HelpCircle className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Find answers to common questions about {APP_TITLE}. Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8 md:space-y-12">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <Card
                      key={faqIndex}
                      className="p-4 md:p-6 bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors"
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 text-center mt-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            Our support team is here to help you with any questions or concerns.
          </p>
          <Link href="/contact">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-colors">
              Contact Support
            </button>
          </Link>
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
