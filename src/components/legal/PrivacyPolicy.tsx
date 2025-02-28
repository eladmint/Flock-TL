import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Flock ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our Twitter
              campaign management platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you
              register for an account, create or modify your profile, or
              interact with our platform. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name, email address, and Twitter profile information</li>
              <li>Content of campaigns and posts you create</li>
              <li>Scheduling preferences and settings</li>
              <li>Information about your interactions with our platform</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Develop new products and services</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Twitter Integration</h2>
            <p>
              Our service integrates with Twitter to provide campaign management
              functionality. When you connect your Twitter account, we request
              permission to access certain information from your Twitter account
              and to perform actions on your behalf, such as posting tweets and
              liking content. We only use these permissions for the purposes of
              providing our services to you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Storage and Security</h2>
            <p>
              We use Supabase to store your data securely. We implement
              appropriate technical and organizational measures to protect your
              personal information against unauthorized or unlawful processing,
              accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p>
              We use Auth0 for authentication services. When you sign in using
              Auth0, your authentication data is processed according to Auth0's
              privacy policy. We also use Twitter's API services, which are
              governed by Twitter's privacy policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as the right to access, correct,
              or delete your data. To exercise these rights, please contact us
              using the information provided below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              Email: support@flockapp.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
