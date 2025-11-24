import { Card } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  const lastUpdated = "November 25, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
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
                At {APP_TITLE}, we are committed to protecting your personal information and
                being transparent about how we collect, use, and safeguard your data.
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
              When you register for an account on {APP_TITLE}, we collect personal information that you voluntarily provide, including your full name, email address, phone number, date of birth, and gender. This information is necessary to create and manage your account, verify your identity, and ensure compliance with legal age requirements.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Financial Information
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              For payment processing and withdrawals, we collect bank account details, UPI IDs, digital wallet information, and payment card details. This financial information is encrypted and processed through secure, PCI-DSS compliant payment gateways. We do not store complete credit card numbers on our servers.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Verification Documents
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              To comply with Know Your Customer (KYC) regulations and prevent fraud, we may collect copies of government-issued identification documents (such as Aadhaar card, PAN card, passport, or driver's license), proof of address, and bank account verification documents. These documents are stored securely and used solely for verification purposes.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-6">
              Usage Data
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              We automatically collect information about how you interact with our platform, including your IP address, device type and model, operating system, browser type and version, pages visited, time spent on pages, click patterns, team creation history, contest participation, and transaction history. This data helps us improve our services and provide a better user experience.
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
                  To create and maintain your account, authenticate your identity, process your registrations, and provide customer support. We use your email and phone number to send important account notifications, security alerts, and password reset instructions.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Service Delivery
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To facilitate your participation in fantasy cricket contests, process team creations, calculate scores, determine winners, and distribute prizes. We use your financial information to process deposits and withdrawals securely.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Legal Compliance
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To verify your age and identity, comply with KYC regulations, prevent fraud and money laundering, calculate and deduct applicable taxes (TDS), and respond to legal requests from authorities.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Platform Improvement
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To analyze usage patterns, identify and fix technical issues, develop new features, personalize your experience, and conduct research to improve our services.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Marketing Communications
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  To send you promotional offers, contest announcements, newsletters, and updates about new features. You can opt out of marketing communications at any time through your account settings or by clicking the unsubscribe link in emails.
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
              We do not sell your personal information to third parties. However, we may share your information in the following circumstances:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Service Providers
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We work with trusted third-party service providers who assist us in operating our platform, including payment processors, cloud hosting providers, email service providers, SMS gateways, analytics platforms, and customer support tools. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your data.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Legal Requirements
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights, prevent fraud, ensure platform security, or respond to legal processes.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Business Transfers
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change in ownership or control of your personal information.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Public Information
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Your username, profile picture, and contest rankings may be visible to other users on leaderboards and public contest pages. You can control some of these visibility settings in your account preferences.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-gray-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>SSL/TLS encryption for all data transmission between your device and our servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Encrypted storage of sensitive information, including passwords and financial data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Regular security audits and penetration testing by independent security experts</span>
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
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously work to improve our security measures.
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
                  You can request a copy of your personal data in a structured, machine-readable format. You can access most of your information directly through your account dashboard.
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Correction
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can update or correct your personal information at any time through your account settings. For information you cannot update yourself, contact our support team.
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Deletion
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can request deletion of your account and personal information. Note that we may retain certain information as required by law or for legitimate business purposes (such as fraud prevention and tax compliance).
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Opt-Out
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  You can opt out of marketing communications, push notifications, and certain data collection practices through your account settings.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              6. Cookies & Tracking Technologies
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. Cookies are small text files stored on your device that help us remember your preferences and improve platform functionality.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              You can control cookie settings through your browser preferences. However, disabling cookies may limit your ability to use certain features of our platform.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              7. Data Retention
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              We retain your personal information for as long as your account is active or as needed to provide services. After account closure, we may retain certain information for legal, tax, audit, and fraud prevention purposes as required by applicable laws. Financial transaction records are typically retained for 7 years in compliance with Indian tax regulations.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              {APP_TITLE} is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected information from a minor, we will promptly delete it. Parents or guardians who believe their child has provided us with personal information should contact us immediately.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of significant changes via email or prominent notice on our platform. Your continued use of {APP_TITLE} after such modifications constitutes acceptance of the updated policy.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-sm md:text-base text-gray-300">
              <p><strong className="text-white">Privacy Officer:</strong> privacy@{APP_TITLE.toLowerCase().replace(/\s+/g, '')}.com</p>
              <p><strong className="text-white">Data Protection:</strong> dpo@{APP_TITLE.toLowerCase().replace(/\s+/g, '')}.com</p>
              <p><strong className="text-white">General Support:</strong> support@{APP_TITLE.toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
          </Card>
        </div>

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
