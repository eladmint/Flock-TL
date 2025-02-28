import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Flock's Twitter campaign management
              platform, you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. Description of Service</h2>
            <p>
              Flock provides a platform for creating, scheduling, and managing
              Twitter campaigns. Our service allows you to plan, organize, and
              automate your Twitter content through an intuitive dashboard
              interface.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Account Registration</h2>
            <p>
              To use our service, you must authenticate with your Twitter
              account through Auth0. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Twitter Integration</h2>
            <p>
              Our service integrates with Twitter's API. By using Flock, you
              authorize us to access your Twitter account and perform actions on
              your behalf, such as posting tweets and liking content. You
              acknowledge that your use of Twitter through our service is
              subject to Twitter's Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. User Conduct</h2>
            <p>You agree not to use our service to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Distribute spam, malware, or other harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of our service</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">6. Content Responsibility</h2>
            <p>
              You are solely responsible for the content you create and publish
              through our service. We do not monitor or control the content you
              post, and we are not liable for any content that violates
              Twitter's policies or any applicable laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our service, including
              but not limited to text, graphics, logos, and software, are owned
              by Flock and are protected by copyright, trademark, and other
              intellectual property laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Flock shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or
              use, arising out of or in connection with your use of our service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              9. Modifications to Service
            </h2>
            <p>
              We reserve the right to modify or discontinue, temporarily or
              permanently, our service with or without notice. We shall not be
              liable to you or any third party for any modification, suspension,
              or discontinuance of the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will
              notify you of any changes by posting the new Terms on this page.
              Your continued use of the service after such changes constitutes
              your acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Flock operates, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: support@flockapp.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
