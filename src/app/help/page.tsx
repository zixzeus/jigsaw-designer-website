import Link from 'next/link';
import Image from "next/image";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
             <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                <Image
                src="/app-icon.png"
                alt="JigsawDesigner Icon"
                fill
                className="object-cover"
                />
            </div>
            <span className="text-xl font-bold tracking-tight">JigsawDesigner</span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 pt-32 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Help Center
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 border-l-4 border-primary pl-6">
          Complete guide to using JigsawDesigner for creating professional jigsaw puzzles.
        </p>

        {/* Table of Contents */}
        <div className="bg-background-secondary rounded-2xl p-8 mb-16 border border-border">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-500 mb-6">Table of Contents</h2>
          <nav className="space-y-3 font-medium">
            <a href="#getting-started" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Getting Started
            </a>
            <a href="#tools" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Drawing Tools
            </a>
            <a href="#operations" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Element Operations
            </a>
            <a href="#generation" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Jigsaw Generation
            </a>
            <a href="#import-export" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Import & Export
            </a>
            <a href="#shortcuts" className="flex items-center gap-2 hover:text-primary transition-colors">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Keyboard Shortcuts
            </a>
          </nav>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">1</span>
            Getting Started
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Create Your First Project</h3>
                <ol className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold text-primary">01</span>
                    <div>
                        <strong className="block text-foreground">Launch JigsawDesigner</strong>
                        <span className="text-gray-500">Open the application on your Mac or iOS device.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">02</span>
                    <div>
                        <strong className="block text-foreground">Choose a Tool</strong>
                        <span className="text-gray-500">Select from 8 drawing tools in the toolbar.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">03</span>
                    <div>
                        <strong className="block text-foreground">Draw Your Design</strong>
                        <span className="text-gray-500">Create shapes, paths, or import existing SVG files.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">04</span>
                    <div>
                        <strong className="block text-foreground">Generate Jigsaw</strong>
                        <span className="text-gray-500">Click "Generate Jigsaw" to create puzzle pieces.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">05</span>
                    <div>
                        <strong className="block text-foreground">Export</strong>
                        <span className="text-gray-500">Save your puzzle as SVG for manufacturing or printing.</span>
                    </div>
                </li>
                </ol>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">2</span>
             Drawing Tools
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ToolCard icon="🖱️" title="Select Tool" description="Select and move shapes on the canvas. Shift+Click for multi-select, Ctrl+Click to drill into groups." />
            <ToolCard icon="✏️" title="Edit Tool" description="Edit control points of shapes. Adjust shape geometry precisely by dragging points." />
            <ToolCard icon="✒️" title="Pen Tool" description="Free-form path drawing. Click and drag to create bezier curves and organic shapes." />
            <ToolCard icon="📏" title="Line Tool" description="Draw straight lines. Perfect for geometric designs and precise connections." />
            <ToolCard icon="▭" title="Rectangle Tool" description="Draw rectangular shapes. Click and drag from corner to create." />
            <ToolCard icon="⭕" title="Circle Tool" description="Draw circles and ellipses. Drag from center to set radius." />
            <ToolCard icon="⬟" title="Polygon Tool" description="Draw multi-sided polygons. Click to place each vertex, double-click to finish." />
            <ToolCard icon="🎨" title="Bezier Tool" description="Draw precise Bezier curves with anchor points and control handles." />
          </div>
        </section>

        {/* Element Operations */}
        <section id="operations" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">3</span>
            Element Operations
          </h2>
          
          <div className="space-y-6">
             <OperationCard title="Selection" items={[
                 "Single Select: Click on any shape",
                 "Multi-Select: Shift+Click multiple shapes",
                 "Select All: Press ⌘A to select all shapes",
                 "Deep Selection: Ctrl+Click to select child elements in groups"
             ]} />
             <OperationCard title="Grouping" items={[
                 "Group Shapes: Select multiple shapes and press G",
                 "Ungroup: Select a group and press ⌘G",
                 "Nested Groups: Create complex hierarchies"
             ]} />
             <OperationCard title="Editing" items={[
                 "Copy: Press ⌘C to duplicate selected elements",
                 "Delete: Press Delete or Backspace to remove",
                 "Transform: Use Inspector panel to adjust position, scale, and rotation"
             ]} />
          </div>
        </section>

        {/* Jigsaw Generation */}
        <section id="generation" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">4</span>
            Jigsaw Generation
          </h2>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary-dark dark:text-primary-light">How It Works</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              JigsawDesigner uses advanced C++ algorithms with OpenCV and Boost libraries to generate high-quality puzzle pieces using Voronoi diagrams and DCEL data structures.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <StepCard number="1" title="Draw Boundary" description="Create the outline shape that will be divided into puzzle pieces." />
              <StepCard number="2" title="Configure" description="Set piece count, slot settings, and choose templates." />
              <StepCard number="3" title="Generate" description="Click 'Generate' to run the algorithm and create interlocking pieces." />
              <StepCard number="4" title="Export" description="Export as SVG for manufacturing or printing." />
            </div>
          </div>
        </section>

        {/* Import & Export */}
        <section id="import-export" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">5</span>
            Import & Export
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">📥</span> Import SVG
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                Import existing SVG files to use as puzzle boundaries or design elements.
              </p>
              <div className="text-sm">
                <p className="font-semibold mb-2">Shortcut: <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">⌘I</kbd></p>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  <li>Paths, rectangles, circles</li>
                  <li>Groups and transforms</li>
                  <li>ViewBox and coordinates</li>
                </ul>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">📤</span> Export SVG
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                Export your designs and generated puzzles as standard SVG files.
              </p>
              <div className="text-sm">
                <p className="font-semibold mb-2">Shortcut: <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">⌘E</kbd></p>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  <li>Standard SVG 1.1 format</li>
                  <li>Preserves all transforms</li>
                  <li>Maintains group hierarchies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4 flex gap-4 items-start">
            <span className="text-2xl">⚡️</span>
            <div>
                 <h4 className="font-bold text-orange-900 dark:text-orange-200">Premium Feature</h4>
                 <p className="text-orange-800 dark:text-orange-300 text-sm">Premium subscription required for exporting generated jigsaw puzzles. Free users can design and generate, but export is limited.</p>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="shortcuts" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">6</span>
             Keyboard Shortcuts
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ShortcutGroup title="File Operations" shortcuts={[
                { key: "⌘N", action: "New Project" },
                { key: "⌘I", action: "Import SVG" },
                { key: "⌘E", action: "Export SVG" },
            ]} />
             <ShortcutGroup title="Edit Operations" shortcuts={[
                { key: "⌘C", action: "Copy" },
                { key: "Delete", action: "Delete" },
                { key: "⌘A", action: "Select All" },
                { key: "G", action: "Group Shapes" },
                { key: "⌘G", action: "Ungroup" },
            ]} />
            <ShortcutGroup title="Selection" shortcuts={[
                { key: "Shift+Click", action: "Multi-Select" },
                { key: "Ctrl+Click", action: "Drill Down" },
                { key: "Esc", action: "Drill Up" },
            ]} />
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>
          
          <div className="space-y-4">
             <TroubleshootItem title="Shapes aren't appearing" content="Check that you're in the correct drawing mode. Verify canvas size has space for your shape. Check shape fill/stroke colors aren't transparent." />
             <TroubleshootItem title="Can't select a shape" content="Switch to Select Tool (cursor icon). Ensure the shape isn't hidden behind others. Try using Ctrl+Click to drill into groups." />
             <TroubleshootItem title="Jigsaw generation fails" content="Ensure your boundary shape is a closed path. Reduce piece count for complex shapes. Check that slot templates are valid." />
             <TroubleshootItem title="Export is disabled" content="Premium subscription required for exporting generated puzzles. Free tier allows design but limits export functionality." />
          </div>
        </section>

        {/* Get More Help */}
        <div className="bg-primary rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-primary-ultra-light mb-8 max-w-lg mx-auto">
                Visit our support page or contact us directly for personalized assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md">
                Contact Support
                </Link>
                <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-primary-dark/80 backdrop-blur text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all">
                Download App
                </a>
            </div>
          </div>
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 opacity-80">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                 <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            <span className="font-semibold">JigsawDesigner</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
             <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
             <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
             <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} JigsawDesigner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components

function ToolCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-background border border-border p-6 rounded-xl hover:border-primary/50 hover:shadow-sm transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function OperationCard({ title, items }: { title: string, items: string[] }) {
    return (
        <div className="bg-background border border-border rounded-xl p-6">
             <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">{title}</h3>
             <ul className="space-y-3">
                 {items.map((item, idx) => (
                     <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm">
                         <span className="text-primary">•</span>
                         <span>{item}</span>
                     </li>
                 ))}
             </ul>
        </div>
    )
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step {number}</div>
            <h4 className="font-bold text-foreground mb-1">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    )
}

function ShortcutGroup({ title, shortcuts }: { title: string, shortcuts: {key: string, action: string}[] }) {
    return (
        <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
            <div className="space-y-3">
                {shortcuts.map((s, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{s.action}</span>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs font-source-code min-w-[30px] text-center">{s.key}</kbd>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TroubleshootItem({ title, content }: { title: string, content: string }) {
    return (
        <details className="bg-background border border-border rounded-xl p-4 group">
            <summary className="font-bold cursor-pointer flex justify-between items-center list-none select-none">
                {title}
                <svg className="w-5 h-5 text-gray-400 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed pl-1">
                {content}
            </p>
        </details>
    )
}
