import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - JigsawDesigner",
  description: "Privacy Policy for JigsawDesigner - Professional Jigsaw Design Software",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12">
        <div className="flex items-center space-x-2">
          <Image
            src="/app-icon.png"
            alt="JigsawDesigner Icon"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
            JigsawDesigner
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</Link>
          <Link href="/privacy" className="text-blue-600 font-semibold">Privacy</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 py-16 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                JigsawDesigner (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our jigsaw design software application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Information You Provide</h3>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Project files and designs you create within the application</li>
                    <li>Settings and preferences you configure</li>
                    <li>Support requests and communications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Device information (model, operating system version)</li>
                    <li>Application usage statistics (crash reports, performance metrics)</li>
                    <li>Local storage for app functionality</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>To provide and maintain the JigsawDesigner application</li>
                <li>To improve app performance and user experience</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To detect and prevent technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Storage and Security</h2>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Your project files and designs are stored locally on your device. We do not upload or store your creative content on our servers unless you explicitly choose to share or export it.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our application may integrate with third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Apple App Store:</strong> For app distribution and updates</li>
                <li><strong>Crash Analytics:</strong> To improve app stability (anonymized data only)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information</li>
                <li>Opt-out of certain data collection</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> zixzeus@gmail.com<br />
                  <strong>GitHub:</strong> <a href="https://github.com/zixzeus/jigsaw-designer-website" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">https://github.com/zixzeus/jigsaw-designer-website</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 JigsawDesigner. Professional jigsaw design software solutions.</p>
        </div>
      </footer>
    </div>
  );
}