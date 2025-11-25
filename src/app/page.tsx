import Image from "next/image";

export default function Home() {
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
          <span className="text-xl font-bold text-gray-900 dark:text-white">JigsawDesigner</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
          <a href="#download" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Download</a>
          <a href="/help" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Help</a>
          <a href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
          <a href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy</a>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Try Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Professional
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Jigsaw Design</span>
            <br />Software
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Create stunning custom jigsaw puzzles with multi-platform support, advanced SVG editing, and powerful C++ algorithm engine
          </p>

          {/* Video Demo */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
              <video
                className="w-full"
                controls
                poster="/video-poster.jpg"
              >
                <source src="/user-guide.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Download Now
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Native SVG Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built on SVGView library, supporting native SVG elements like circles, rectangles, and polygons for professional vector editing experience
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">C++ Algorithm Engine</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Integrated OpenCV and Boost libraries using Voronoi diagrams and DCEL data structures for high-quality jigsaw cutting algorithms
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cross-Platform Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Supports macOS, iOS, iPad, watchOS, tvOS, and visionOS - develop once, deploy everywhere
            </p>
          </div>
        </div>

        {/* Download Section */}
        <div id="download" className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get Started with JigsawDesigner</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Download for free and experience professional jigsaw design tools today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Mac App Store</span>
            </a>
            <a
              href="https://github.com/zixzeus/jigsaw-designer-website"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-block"
            >
              GitHub Releases
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; 2024 JigsawDesigner. Professional jigsaw design software solutions.
            </p>
            <div className="flex space-x-6">
              <a href="/support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Support
              </a>
              <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="https://github.com/zixzeus/jigsaw-designer-website" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
