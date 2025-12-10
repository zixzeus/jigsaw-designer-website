import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                <Image
                src="/app-icon.png"
                alt="JigsawDesigner Icon"
                fill
                className="object-cover"
                />
            </div>
            <span className="text-xl font-bold tracking-tight">JigsawDesigner</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#download" className="hover:text-primary transition-colors">Download</a>
            <div className="h-4 w-px bg-border"></div>
            <a href="https://github.com/zixzeus/jigsaw-designer-website" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 md:px-12 text-center">
            
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-ultra-light text-primary text-sm font-semibold mb-8 border border-primary/10 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v1.0 Now Available on App Store
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            Design Puzzles like a <br/>
            <span className="text-primary">Professional</span>
          </h1>
          
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The most powerful jigsaw puzzle design tool for Apple platforms. 
            Native performance, SVG precision, and algorithm-driven generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-primary h-12 px-8 rounded-full text-white font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 min-w-[180px]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Download
            </a>
            <a href="#features" className="h-12 px-8 rounded-full bg-background-secondary text-foreground font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center min-w-[160px]">
              Learn More
            </a>
          </div>

          {/* Video / Preview */}
          <div className="relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-gray-200 to-gray-50 dark:from-gray-700 dark:to-gray-900 shadow-2xl">
             <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
             <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-inner">
               <video className="w-full h-full object-cover" controls poster="/video-poster.jpg">
                 <source src="/user-guide.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
             </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="container mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to create professional quality puzzles.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
              title="Limitless Customization"
              description="Customize everything from slot templates and contours to puzzle interiors. Create unique designs that stand out."
            />
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
              title="Lightning Fast Workflow"
              description="Turn hours of manual work into seconds. Generate complex jigsaw patterns in just 3 seconds with our advanced engine."
            />
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />}
              title="Design Anywhere"
              description="Start on your Mac, refine on your iPad, and review on your iPhone. Your workspace moves with you."
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-background-secondary py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 opacity-80">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                 <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            <span className="font-semibold">JigsawDesigner</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
             <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
             <a href="/support" className="hover:text-primary transition-colors">Support</a>
             <a href="https://github.com/zixzeus/jigsaw-designer-website" className="hover:text-primary transition-colors">GitHub</a>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} JigsawDesigner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background border border-border p-8 rounded-2xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
      <div className="w-12 h-12 bg-primary-ultra-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

