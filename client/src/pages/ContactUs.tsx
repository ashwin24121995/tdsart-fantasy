import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_TITLE } from "@/const";
import { Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you within 24-48 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      <div className="container py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Have questions or need assistance? We're here to help! Reach out to our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your question or issue in detail..."
                  rows={6}
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                      Email Support
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      <a
                        href="mailto:support@tdsartfantasy.com"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        support@tdsartfantasy.com
                      </a>
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                      Office Address
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      Office No-11, Fifth Floor, A-Building
                      <br />
                      City Vista, Vadgaon Sheri
                      <br />
                      Pune-411014, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                      Response Time
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      We typically respond within 24-48 hours
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Urgent issues are prioritized
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Before You Contact Us
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Check our FAQ page for quick answers to common questions. You might find the
                solution you're looking for instantly!
              </p>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Additional Help */}
        <Card className="p-6 md:p-8 bg-gray-800/50 border-gray-700 mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Other Ways to Get Help
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-gray-900/50 border-gray-600 text-center">
              <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                Technical Issues
              </h4>
              <p className="text-xs md:text-sm text-gray-400 mb-3">
                Bugs, errors, or website problems
              </p>
              <a
                href="mailto:tech@tdsartfantasy.com"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                tech@tdsartfantasy.com
              </a>
            </Card>

            <Card className="p-4 bg-gray-900/50 border-gray-600 text-center">
              <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                Legal & Compliance
              </h4>
              <p className="text-xs md:text-sm text-gray-400 mb-3">
                Terms, privacy, or legal questions
              </p>
              <a
                href="mailto:legal@tdsartfantasy.com"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                legal@tdsartfantasy.com
              </a>
            </Card>

            <Card className="p-4 bg-gray-900/50 border-gray-600 text-center">
              <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                Business Inquiries
              </h4>
              <p className="text-xs md:text-sm text-gray-400 mb-3">
                Partnerships or collaborations
              </p>
              <a
                href="mailto:business@tdsartfantasy.com"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                business@tdsartfantasy.com
              </a>
            </Card>
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
