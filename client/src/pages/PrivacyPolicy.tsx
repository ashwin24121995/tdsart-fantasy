import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { APP_TITLE } from "@/const";
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  const lastUpdated = "December 22, 2025";

  return (
    <PageLayout>
      <div className="container py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Shield className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Trust Banner */}
        <Card className="p-4 md:p-6 bg-green-900/20 border-green-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <Lock className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-green-500 mb-2">
                Your Privacy Matters
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                At {APP_TITLE}, we are committed to protecting your personal information and being
                transparent about how we collect, use, and safeguard your data. This policy explains our use of cookies and analytics services.
              </p>
            </div>
          </div>
        </Card>

        {/* Cookie Notice */}
        <Card className="p-4 md:p-6 bg-yellow-900/20 border-yellow-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-yellow-500 mb-2">
                Cookie & Analytics Disclosure
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-3">
                We use cookies and third-party analytics services to improve your experience and understand how you use our platform. You can manage your cookie preferences at any time.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-gray-300">Analytics Services:</strong> Umami Analytics, Plausible Analytics, Amplitude</p>
                <p><strong className="text-gray-300">Purpose:</strong> Website usage analysis, performance monitoring, user experience improvement</p>
                <p><strong className="text-gray-300">Data Collected:</strong> Page views, clicks, session duration, device information, browser type</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FREE Platform Notice */}
        <Card className="p-4 md:p-6 bg-blue-900/20 border-blue-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-blue-500 mb-2">
                100% Free Platform - No Financial Data Collected
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Since {APP_TITLE} is a completely FREE platform with NO real money involved, we do
                NOT collect any financial information, bank details, payment card information, or
                conduct KYC verification. We only collect basic information necessary to provide our
                free gaming services.
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Database className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  1. Information We Collect
                </h2>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
              Personal Information
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              When you register for an account on {APP_TITLE}, we collect personal information that
              you voluntarily provide, including your full name, email address, and date of birth.
              This information is necessary to create and manage your account, verify your identity,
              and ensure compliance with legal age requirements (18+ only).
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Profile Information
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              You may optionally provide additional profile information such as your profile picture,
              username, favorite cricket teams, and other preferences to personalize your experience
              on the platform.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Usage Data
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We automatically collect information about how you interact with our platform,
              including your IP address, device type and model, operating system, browser type and
              version, pages visited, time spent on pages, click patterns, team creation history,
              and contest participation. This data helps us improve our services and provide a
              better user experience.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Cookies & Tracking Technologies
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              We use cookies, web beacons, and similar tracking technologies to enhance your
              experience, remember your preferences, analyze usage patterns, and improve our
              platform. You can control cookie settings through your browser, but disabling cookies
              may affect some platform features.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Eye className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  2. How We Use Your Information
                </h2>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-300 mb-4">
              We use the collected information for the following purposes:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Account Management
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To create and maintain your account, authenticate your identity, process your
                  registrations, and provide customer support. We use your email to send important
                  account notifications, security alerts, and password reset instructions.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Service Delivery
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To facilitate your participation in free fantasy cricket contests, process team
                  creations, calculate scores, determine rankings, and manage leaderboards. Since
                  this is a free platform, there are no financial transactions or prize
                  distributions.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Legal Compliance
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To verify your age (18+ requirement), prevent platform abuse, ensure compliance
                  with geographic restrictions (not available in certain states), and respond to
                  legal requests from authorities when required by law.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Platform Improvement
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To analyze usage patterns, identify and fix technical issues, develop new
                  features, personalize your experience, and conduct research to improve our
                  services.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Marketing Communications
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To send you promotional offers, contest announcements, newsletters, and updates
                  about new features. You can opt out of marketing communications at any time
                  through your account settings or by clicking the unsubscribe link in emails.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <UserCheck className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  3. Information Sharing & Disclosure
                </h2>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-300 mb-4">
              We do not sell your personal information to third parties. However, we may share your
              information in the following circumstances:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Service Providers
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We work with trusted third-party service providers who assist us in operating our
                  platform, including cloud hosting providers, email service providers, SMS
                  gateways, analytics platforms, and customer support tools. These providers have
                  access to your information only to perform specific tasks on our behalf and are
                  obligated to protect your data.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Legal Requirements
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We may disclose your information if required by law, court order, or government
                  regulation, or if we believe disclosure is necessary to protect our rights,
                  prevent fraud, ensure platform security, or respond to legal processes.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Business Transfers
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  In the event of a merger, acquisition, reorganization, or sale of assets, your
                  information may be transferred to the acquiring entity. We will notify you of any
                  such change in ownership or control of your personal information.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Public Information
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Your username, profile picture, and contest rankings may be visible to other users
                  on leaderboards and public contest pages. You can control some of these visibility
                  settings in your account preferences.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We implement industry-standard security measures to protect your personal information
              from unauthorized access, alteration, disclosure, or destruction. Our security
              practices include:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-gray-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>
                  SSL/TLS encryption for all data transmission between your device and our servers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Encrypted storage of sensitive information, including passwords</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Regular security audits and vulnerability assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Restricted access to personal information on a need-to-know basis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Secure data centers with physical and network security controls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Two-factor authentication options for enhanced account security</span>
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-300 mt-4">
              While we strive to protect your information, no method of transmission over the
              internet or electronic storage is 100% secure. We cannot guarantee absolute security,
              but we continuously work to improve our security measures.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              5. Your Privacy Rights
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Access & Portability
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can request a copy of your personal data in a structured, machine-readable
                  format. You can access most of your information directly through your account
                  dashboard.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Correction & Update
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can update or correct your personal information at any time through your
                  account settings. If you need assistance, contact our support team.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Deletion
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can request deletion of your account and associated personal data by
                  contacting our support team. We will delete your data within 30 days, except where
                  retention is required by law.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Opt-Out
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can opt out of marketing communications, push notifications, and certain data
                  collection practices through your account settings or by following unsubscribe
                  instructions in our emails.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We retain your personal information for as long as your account is active or as needed
              to provide you with our services. If you close your account, we will delete or
              anonymize your personal data within 30 days, except where we are required to retain
              certain information for legal, regulatory, or legitimate business purposes.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              We may retain anonymized or aggregated data indefinitely for analytics and platform
              improvement purposes, as this data cannot be used to identify you personally.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              {APP_TITLE} is not intended for users under the age of 18. We do not knowingly collect
              personal information from children under 18. If we become aware that we have collected
              personal information from a child under 18, we will take steps to delete such
              information immediately. If you believe we have collected information from a child
              under 18, please contact us immediately.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              8. Changes to Privacy Policy
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, legal requirements, or other factors. We will notify you of
              significant changes by posting the new Privacy Policy on this page and updating the
              "Last Updated" date. We encourage you to review this Privacy Policy periodically to
              stay informed about how we protect your information.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              9. Contact Information
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div className="space-y-2 text-sm md:text-base text-gray-300">
              <p>
                <strong className="text-white">Email:</strong> privacy@tdsartfantasy.com
              </p>
              <p>
                <strong className="text-white">Support:</strong> support@tdsartfantasy.com
              </p>
              <p>
                <strong className="text-white">Address:</strong> Office No-11, Fifth Floor,
                A-Building, City Vista, Vadgaon Sheri, Pune-411014, Maharashtra, India
              </p>
            </div>
          </Card>
        </div>

        {/* Legal Disclaimer */}
        <Card className="p-4 md:p-6 bg-red-900/20 border-red-700/50 mt-8">
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
