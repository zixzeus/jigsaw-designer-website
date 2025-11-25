import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">JigsawDesigner</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          JigsawDesigner <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Help</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Complete guide to using JigsawDesigner for creating professional jigsaw puzzles
        </p>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#getting-started" className="block text-blue-600 hover:underline">Getting Started</a>
            <a href="#tools" className="block text-blue-600 hover:underline">Drawing Tools</a>
            <a href="#operations" className="block text-blue-600 hover:underline">Element Operations</a>
            <a href="#generation" className="block text-blue-600 hover:underline">Jigsaw Generation</a>
            <a href="#import-export" className="block text-blue-600 hover:underline">Import & Export</a>
            <a href="#shortcuts" className="block text-blue-600 hover:underline">Keyboard Shortcuts</a>
          </nav>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Getting Started</h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Create Your First Project</h3>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Launch JigsawDesigner</strong> - Open the application on your Mac or iOS device</li>
              <li><strong>Choose a Tool</strong> - Select from 8 drawing tools in the toolbar</li>
              <li><strong>Draw Your Design</strong> - Create shapes, paths, or import existing SVG files</li>
              <li><strong>Generate Jigsaw</strong> - Click "Generate Jigsaw" to create puzzle pieces</li>
              <li><strong>Export</strong> - Save your puzzle as SVG for manufacturing or printing</li>
            </ol>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Drawing Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🖱️ Select Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Select and move shapes on the canvas</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click to select shapes</li>
                <li>• Shift+Click for multi-select</li>
                <li>• Ctrl+Click to drill into groups</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">✏️ Edit Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Edit control points of shapes</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Select a shape first</li>
                <li>• Click and drag control points</li>
                <li>• Adjust shape geometry precisely</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">✒️ Pen Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Free-form path drawing</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click and drag to create paths</li>
                <li>• Close paths by clicking near start</li>
                <li>• Great for organic shapes</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">📏 Line Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Draw straight lines</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click start point</li>
                <li>• Click end point</li>
                <li>• Perfect for geometric designs</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">▭ Rectangle Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Draw rectangular shapes</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click and drag from corner</li>
                <li>• Release to create rectangle</li>
                <li>• Adjust size and position later</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">⭕ Circle Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Draw circles and ellipses</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click center point</li>
                <li>• Drag to set radius</li>
                <li>• Creates perfect circles</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">⬟ Polygon Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Draw multi-sided polygons</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click to place each vertex</li>
                <li>• Double-click or press Enter to finish</li>
                <li>• Create any polygon shape</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🎨 Bezier Tool</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Draw precise Bezier curves</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Click to place anchor points</li>
                <li>• Drag to create control handles</li>
                <li>• Enter to finish, Esc to cancel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Element Operations */}
        <section id="operations" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Element Operations</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Selection</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Single Select:</strong> Click on any shape</li>
                  <li><strong>Multi-Select:</strong> Shift+Click multiple shapes</li>
                  <li><strong>Select All:</strong> Press ⌘A to select all shapes</li>
                  <li><strong>Deep Selection:</strong> Ctrl+Click to select child elements in groups</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Grouping</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Group Shapes:</strong> Select multiple shapes and press G</li>
                  <li><strong>Ungroup:</strong> Select a group and press ⌘G</li>
                  <li><strong>Nested Groups:</strong> Groups can contain other groups for complex hierarchies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Editing</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Copy:</strong> Press ⌘C to duplicate selected elements</li>
                  <li><strong>Delete:</strong> Press Delete or Backspace to remove</li>
                  <li><strong>Transform:</strong> Use Inspector panel to adjust position, scale, and rotation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Jigsaw Generation */}
        <section id="generation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Jigsaw Generation</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              JigsawDesigner uses advanced C++ algorithms with OpenCV and Boost libraries to generate high-quality puzzle pieces using Voronoi diagrams and DCEL data structures.
            </p>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Draw or Import Boundary</h4>
                <p className="text-gray-600 dark:text-gray-400">Create the outline shape that will be divided into puzzle pieces</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Configure Settings</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Set piece count (e.g., 100 pieces), slot min/max distance, and choose slot templates
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Generate Jigsaw</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Click "Generate Jigsaw" button - the algorithm will process and create interlocking pieces
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">4. Export Results</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Export as SVG for manufacturing, printing, or further editing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Import & Export */}
        <section id="import-export" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Import & Export</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📥 Import SVG</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Import existing SVG files to use as puzzle boundaries or design elements.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Shortcut: ⌘I</p>
                <p className="text-gray-600 dark:text-gray-400">Supported:</p>
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>Paths, rectangles, circles</li>
                  <li>Groups and transforms</li>
                  <li>ViewBox and coordinates</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📤 Export SVG</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Export your designs and generated puzzles as standard SVG files.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Shortcut: ⌘E</p>
                <p className="text-gray-600 dark:text-gray-400">Features:</p>
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>Standard SVG 1.1 format</li>
                  <li>Preserves all transforms</li>
                  <li>Maintains group hierarchies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Premium subscription required for exporting generated jigsaw puzzles.
            </p>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="shortcuts" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Keyboard Shortcuts</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">File Operations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">New Project</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘N</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Import SVG</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘I</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Export SVG</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘E</kbd>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit Operations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Copy</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘C</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Delete</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">Delete</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Select All</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘A</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Group Shapes</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">G</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Ungroup</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">⌘G</kbd>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selection Shortcuts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Multi-Select</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">Shift+Click</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Drill Down</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">Ctrl+Click</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Drill Up</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Troubleshooting</h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Shapes aren't appearing
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Check that you're in the correct drawing mode. Verify canvas size has space for your shape. 
                Check shape fill/stroke colors aren't transparent.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Can't select a shape
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Switch to Select Tool (cursor icon). Ensure the shape isn't hidden behind others. 
                Try using Ctrl+Click to drill into groups.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Jigsaw generation fails
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Ensure your boundary shape is a closed path. Reduce piece count for complex shapes. 
                Check that slot templates are valid.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Export is disabled
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Premium subscription required for exporting generated puzzles. 
                Free tier allows design but limits export functionality.
              </p>
            </details>
          </div>
        </section>

        {/* Get More Help */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
          <p className="text-blue-100 mb-6">
            Visit our support page or contact us directly for personalized assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Contact Support
            </Link>
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all">
              Download JigsawDesigner
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400">
              © 2024 JigsawDesigner. Professional jigsaw design software.
            </p>
            <div className="flex space-x-6">
              <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Support
              </Link>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
