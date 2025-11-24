import { Card } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { AlertTriangle, Shield, FileText } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function TermsAndConditions() {
  const lastUpdated = "November 25, 2025";

  return (
    <PageLayout>
      <div className="container py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <FileText className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Important Notice */}
        <Card className="p-4 md:p-6 bg-yellow-900/20 border-yellow-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-yellow-500 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                By accessing and using {APP_TITLE}, you agree to be bound by these Terms and
                Conditions. If you do not agree with any part of these terms, you must not use
                our platform.
              </p>
            </div>
          </div>
        </Card>

        {/* FREE Platform Notice */}
        <Card className="p-4 md:p-6 bg-green-900/20 border-green-700/50 mb-8">
          <div className="flex gap-3 md:gap-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-green-500 mb-2">
                100% Free Platform - No Real Money Involved
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                {APP_TITLE} is a completely FREE fantasy cricket platform. There are NO deposits,
                NO entry fees, NO withdrawals, and NO real money transactions of any kind. This is
                a skill-based gaming platform for entertainment purposes only.
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              These Terms and Conditions constitute a legally binding agreement between you and{" "}
              {APP_TITLE}. By creating an account, accessing our website, or using our services, you
              acknowledge that you have read, understood, and agree to be bound by these terms,
              along with our Privacy Policy.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              We reserve the right to modify these terms at any time. Continued use of the platform
              after changes constitutes acceptance of the modified terms. We will notify users of
              significant changes via email or platform notifications.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              2. Eligibility & Account Registration
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              <strong className="text-white">Age Requirement:</strong> You must be at least 18 years
              old to use {APP_TITLE}. By registering, you confirm that you meet this age requirement
              and have the legal capacity to enter into binding contracts.
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              <strong className="text-white">Geographic Restrictions:</strong> This platform is NOT
              available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Users
              from these states are prohibited from accessing or using our services. You are
              responsible for ensuring that your use of the platform complies with local laws and
              regulations.
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              <strong className="text-white">Account Security:</strong> You are responsible for
              maintaining the confidentiality of your account credentials. You must notify us
              immediately of any unauthorized access or security breach. {APP_TITLE} is not liable
              for losses resulting from unauthorized use of your account.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              <strong className="text-white">One Account Per Person:</strong> Each user may maintain
              only one account. Creating multiple accounts to gain unfair advantages is strictly
              prohibited and may result in permanent suspension.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              3. Free-to-Play Platform - No Real Money
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              {APP_TITLE} is a 100% FREE fantasy cricket platform. There are NO deposits, NO entry
              fees, NO prize money, NO withdrawals, and NO real money transactions of any kind.
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              All contests, competitions, and games on this platform are for entertainment purposes
              only. Any points, rankings, or achievements earned on the platform have NO monetary
              value and cannot be exchanged for real money or any other form of compensation.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              This is a skill-based gaming platform where success depends on your cricket knowledge,
              strategic thinking, and player analysis—not on any financial investment or gambling.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              4. Game of Skill
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              {APP_TITLE} operates as a game of skill, not chance. Success depends on your knowledge
              of cricket, player performance analysis, strategic team selection, and understanding of
              match conditions. The outcome is determined by the real-world performance of selected
              players, not random chance.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              Fantasy cricket is recognized as a game of skill in India. Since our platform involves
              NO real money, it does not fall under gambling or betting regulations. However, you are
              responsible for ensuring compliance with local gaming laws in your area.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              5. Contest Rules & Fair Play
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              <strong className="text-white">Team Creation:</strong> All teams must comply with the
              specified player selection rules, including position requirements and credit limits.
              Teams that violate these rules will be disqualified.
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              <strong className="text-white">Prohibited Activities:</strong> The following activities
              are strictly forbidden and may result in account suspension or termination:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-300 mb-4 ml-4">
              <li>Using bots, scripts, or automated tools to create teams or enter contests</li>
              <li>Colluding with other users to gain unfair advantages</li>
              <li>Sharing insider information about player availability or injuries</li>
              <li>Creating multiple accounts to circumvent contest entry limits</li>
              <li>Manipulating the platform through technical exploits or bugs</li>
            </ul>
            <p className="text-sm md:text-base text-gray-300">
              <strong className="text-white">Match Cancellations:</strong> If a match is abandoned,
              postponed, or canceled, contests related to that match will be voided. If a match is
              reduced (e.g., rain-affected), scoring will be adjusted based on actual play.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              6. User Conduct
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              Users must conduct themselves respectfully and ethically on the platform. Prohibited
              conduct includes but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-300 mb-4 ml-4">
              <li>Harassing, threatening, or abusing other users</li>
              <li>Posting offensive, defamatory, or inappropriate content</li>
              <li>Attempting to hack, disrupt, or damage the platform</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating other users or {APP_TITLE} staff</li>
            </ul>
            <p className="text-sm md:text-base text-gray-300">
              We reserve the right to remove any content or suspend any user who violates these
              conduct guidelines.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              All content on {APP_TITLE}, including but not limited to text, graphics, logos, images,
              software, and data compilations, is the property of {APP_TITLE} or its licensors and is
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              You may not reproduce, distribute, modify, create derivative works, publicly display, or
              exploit any content from the platform without our express written permission.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              {APP_TITLE} is provided "as is" without warranties of any kind, either express or
              implied. We do not guarantee uninterrupted or error-free service. To the fullest extent
              permitted by law, {APP_TITLE} shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the platform.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              Since this is a free platform with no real money involved, our total liability for any
              claims related to the platform shall be limited to the extent permitted by law.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              9. Termination
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              We reserve the right to suspend or terminate your account at any time for violations of
              these terms, suspicious activity, or at our sole discretion. Upon termination, your
              right to use the platform will immediately cease.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              You may close your account at any time by contacting customer support. Since there is no
              real money involved on this platform, there are no balances or refunds to process upon
              account closure.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              10. Dispute Resolution
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              Any disputes arising from these terms or your use of {APP_TITLE} shall first be
              attempted to be resolved through good-faith negotiations. If negotiations fail, disputes
              shall be resolved through binding arbitration in accordance with Indian law.
            </p>
            <p className="text-sm md:text-base text-gray-300">
              The arbitration shall be conducted in English, and the seat of arbitration shall be in
              Pune, Maharashtra, India. The decision of the arbitrator shall be final and binding on
              both parties.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              11. Governing Law
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              These Terms and Conditions shall be governed by and construed in accordance with the
              laws of India, without regard to its conflict of law provisions. You agree to submit to
              the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
            </p>
          </Card>

          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              12. Contact Information
            </h2>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-sm md:text-base text-gray-300">
              <p>
                <strong className="text-white">Email:</strong> legal@tdsartfantasy.com
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


      </div>
    </PageLayout>
  );
}
