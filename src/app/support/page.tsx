import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Support - JigsawDesigner",
  description: "Technical support and help for JigsawDesigner - Professional Jigsaw Design Software",
};

export default function Support() {
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
          <Link href="/support" className="text-blue-600 font-semibold">Support</Link>
          <Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get help with JigsawDesigner and learn how to create amazing jigsaw puzzles
          </p>
        </div>

        {/* Quick Help Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">FAQ</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find answers to commonly asked questions about JigsawDesigner features and functionality.
            </p>
            <a href="#faq" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-semibold">
              View FAQ →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Guide</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn how to use all features of JigsawDesigner with our comprehensive user guide.
            </p>
            <a href="#guide" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-semibold">
              Read Guide →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need personalized help? Get in touch with our support team for assistance.
            </p>
            <a href="#contact" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-semibold">
              Contact Support →
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What platforms does JigsawDesigner support?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                JigsawDesigner supports macOS, iOS, iPad, watchOS, tvOS, and visionOS. You can create and edit jigsaw puzzles across all Apple platforms with seamless synchronization.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Can I import my own images?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! JigsawDesigner supports importing various image formats including SVG, PNG, and JPEG. You can use your own photos or artwork to create custom jigsaw puzzles.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How do I export my finished jigsaw puzzle?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can export your puzzles in multiple formats including SVG for vector graphics, PNG for high-quality images, or share directly to other apps. The export options are available in the File menu.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Is there a limit to the number of puzzle pieces?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                JigsawDesigner can handle puzzles with thousands of pieces. The actual limit depends on your device&apos;s performance, but most users can comfortably create puzzles with 500-2000 pieces.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How do I update the app?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                JigsawDesigner updates automatically through the App Store. You can also check for updates manually in the App Store app on your device.
              </p>
            </div>
          </div>
        </div>

        {/* User Guide Section */}
        <div id="guide" className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Getting Started Guide</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Creating Your First Puzzle</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Launch JigsawDesigner and select &ldquo;New Project&rdquo;</li>
                <li>Choose your canvas size and import an image</li>
                <li>Set the number of pieces and piece style</li>
                <li>Use the cutting algorithm to generate puzzle pieces</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Advanced Editing</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the Bezier tool for custom piece shapes</li>
                <li>Adjust interlocking patterns manually</li>
                <li>Apply different cutting styles to sections</li>
                <li>Preview your puzzle before finalizing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. SVG Features</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Work with native SVG elements</li>
                <li>Create scalable vector puzzles</li>
                <li>Use professional drawing tools</li>
                <li>Export high-quality vector graphics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Sharing & Export</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Export to various file formats</li>
                <li>Share via AirDrop or email</li>
                <li>Save projects for later editing</li>
                <li>Print physical puzzle templates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Support</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get Help</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our support team is here to help you get the most out of JigsawDesigner. We typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">zixzeus@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/zixzeus/jigsaw-designer-website" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">GitHub Repository</a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">macOS</h4>
                  <p className="text-gray-600 dark:text-gray-300">macOS 14.0 or later</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">iOS/iPadOS</h4>
                  <p className="text-gray-600 dark:text-gray-300">iOS 17.0 or later</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Other Platforms</h4>
                  <p className="text-gray-600 dark:text-gray-300">watchOS 10.0+, tvOS 17.0+, visionOS 1.0+</p>
                </div>
              </div>
            </div>
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