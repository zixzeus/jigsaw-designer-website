import Image from "next/image";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HelpPage() {
  const tNav = useTranslations('Navigation');
  const tHelp = useTranslations('Help');
  const tFoot = useTranslations('Footer');

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
            <Link href="/" className="hover:text-primary transition-colors">{tNav('home')}</Link>
            <Link href="/support" className="hover:text-primary transition-colors">{tNav('support')}</Link>
            <div className="h-4 w-px bg-border"></div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 pt-32 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {tHelp('title')}
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 border-l-4 border-primary pl-6">
          {tHelp('subtitle')}
        </p>

        {/* Table of Contents */}
        <div className="bg-background-secondary rounded-2xl p-8 mb-16 border border-border">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-500 mb-6">{tHelp('toc')}</h2>
          <nav className="space-y-3 font-medium">
            <a href="#getting-started" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.gettingStarted')}
            </a>
            <a href="#tools" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.tools')}
            </a>
            <a href="#operations" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.operations')}
            </a>
            <a href="#generation" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.generation')}
            </a>
            <a href="#import-export" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.importExport')}
            </a>
            <a href="#shortcuts" className="flex items-center gap-2 hover:text-primary transition-colors">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.shortcuts')}
            </a>
          </nav>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">1</span>
            {tHelp('sections.gettingStarted')}
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">{tHelp('gettingStartedContent.title')}</h3>
                <ol className="space-y-4">
                <li className="flex gap-4">
                    <span className="font-bold text-primary">01</span>
                    <div>
                        <strong className="block text-foreground">{tHelp('gettingStartedContent.steps.1.title')}</strong>
                        <span className="text-gray-500">{tHelp('gettingStartedContent.steps.1.desc')}</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">02</span>
                    <div>
                        <strong className="block text-foreground">{tHelp('gettingStartedContent.steps.2.title')}</strong>
                        <span className="text-gray-500">{tHelp('gettingStartedContent.steps.2.desc')}</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">03</span>
                    <div>
                        <strong className="block text-foreground">{tHelp('gettingStartedContent.steps.3.title')}</strong>
                        <span className="text-gray-500">{tHelp('gettingStartedContent.steps.3.desc')}</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">04</span>
                    <div>
                        <strong className="block text-foreground">{tHelp('gettingStartedContent.steps.4.title')}</strong>
                        <span className="text-gray-500">{tHelp('gettingStartedContent.steps.4.desc')}</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="font-bold text-primary">05</span>
                    <div>
                        <strong className="block text-foreground">{tHelp('gettingStartedContent.steps.5.title')}</strong>
                        <span className="text-gray-500">{tHelp('gettingStartedContent.steps.5.desc')}</span>
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
             {tHelp('sections.tools')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ToolCard icon="🖱️" title={tHelp('toolsContent.select.title')} description={tHelp('toolsContent.select.desc')} />
            <ToolCard icon="✏️" title={tHelp('toolsContent.edit.title')} description={tHelp('toolsContent.edit.desc')} />
            <ToolCard icon="✒️" title={tHelp('toolsContent.pen.title')} description={tHelp('toolsContent.pen.desc')} />
            <ToolCard icon="📏" title={tHelp('toolsContent.line.title')} description={tHelp('toolsContent.line.desc')} />
            <ToolCard icon="▭" title={tHelp('toolsContent.rect.title')} description={tHelp('toolsContent.rect.desc')} />
            <ToolCard icon="⭕" title={tHelp('toolsContent.circle.title')} description={tHelp('toolsContent.circle.desc')} />
            <ToolCard icon="⬟" title={tHelp('toolsContent.polygon.title')} description={tHelp('toolsContent.polygon.desc')} />
            <ToolCard icon="🎨" title={tHelp('toolsContent.bezier.title')} description={tHelp('toolsContent.bezier.desc')} />
          </div>
        </section>

        {/* Element Operations */}
        <section id="operations" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">3</span>
            {tHelp('sections.operations')}
          </h2>
          
          <div className="space-y-6">
             <OperationCard title={tHelp('operationsContent.selection.title')} items={[
                 tHelp('operationsContent.selection.items.0'),
                 tHelp('operationsContent.selection.items.1'),
                 tHelp('operationsContent.selection.items.2'),
                 tHelp('operationsContent.selection.items.3')
             ]} />
             <OperationCard title={tHelp('operationsContent.grouping.title')} items={[
                 tHelp('operationsContent.grouping.items.0'),
                 tHelp('operationsContent.grouping.items.1'),
                 tHelp('operationsContent.grouping.items.2')
             ]} />
             <OperationCard title={tHelp('operationsContent.editing.title')} items={[
                 tHelp('operationsContent.editing.items.0'),
                 tHelp('operationsContent.editing.items.1'),
                 tHelp('operationsContent.editing.items.2')
             ]} />
          </div>
        </section>

        {/* Jigsaw Generation */}
        <section id="generation" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">4</span>
            {tHelp('sections.generation')}
          </h2>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary-dark dark:text-primary-light">{tHelp('generationContent.howItWorks.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {tHelp('generationContent.howItWorks.desc')}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <StepCard number="1" title={tHelp('generationContent.steps.1.title')} description={tHelp('generationContent.steps.1.desc')} />
              <StepCard number="2" title={tHelp('generationContent.steps.2.title')} description={tHelp('generationContent.steps.2.desc')} />
              <StepCard number="3" title={tHelp('generationContent.steps.3.title')} description={tHelp('generationContent.steps.3.desc')} />
              <StepCard number="4" title={tHelp('generationContent.steps.4.title')} description={tHelp('generationContent.steps.4.desc')} />
            </div>
          </div>
        </section>

        {/* Import & Export */}
        <section id="import-export" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">5</span>
            {tHelp('sections.importExport')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">📥</span> {tHelp('importExportContent.import.title')}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {tHelp('importExportContent.import.desc')}
              </p>
              <div className="text-sm">
                <p className="font-semibold mb-2">{tHelp('importExportContent.import.shortcut')} <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">⌘I</kbd></p>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  <li>{tHelp('importExportContent.import.items.0')}</li>
                  <li>{tHelp('importExportContent.import.items.1')}</li>
                  <li>{tHelp('importExportContent.import.items.2')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">📤</span> {tHelp('importExportContent.export.title')}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {tHelp('importExportContent.export.desc')}
              </p>
              <div className="text-sm">
                <p className="font-semibold mb-2">{tHelp('importExportContent.export.shortcut')} <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">⌘E</kbd></p>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  <li>{tHelp('importExportContent.export.items.0')}</li>
                  <li>{tHelp('importExportContent.export.items.1')}</li>
                  <li>{tHelp('importExportContent.export.items.2')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4 flex gap-4 items-start">
            <span className="text-2xl">⚡️</span>
            <div>
                 <h4 className="font-bold text-orange-900 dark:text-orange-200">{tHelp('importExportContent.premium.title')}</h4>
                 <p className="text-orange-800 dark:text-orange-300 text-sm">{tHelp('importExportContent.premium.desc')}</p>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="shortcuts" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">6</span>
             {tHelp('sections.shortcuts')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ShortcutGroup title={tHelp('shortcutsContent.file.title')} shortcuts={[
                { key: "⌘N", action: tHelp('shortcutsContent.file.new') },
                { key: "⌘I", action: tHelp('shortcutsContent.file.import') },
                { key: "⌘E", action: tHelp('shortcutsContent.file.export') },
            ]} />
             <ShortcutGroup title={tHelp('shortcutsContent.edit.title')} shortcuts={[
                { key: "⌘C", action: tHelp('shortcutsContent.edit.copy') },
                { key: "Delete", action: tHelp('shortcutsContent.edit.delete') },
                { key: "⌘A", action: tHelp('shortcutsContent.edit.selectAll') },
                { key: "G", action: tHelp('shortcutsContent.edit.group') },
                { key: "⌘G", action: tHelp('shortcutsContent.edit.ungroup') },
            ]} />
            <ShortcutGroup title={tHelp('shortcutsContent.selection.title')} shortcuts={[
                { key: "Shift+Click", action: tHelp('shortcutsContent.selection.multi') },
                { key: "Ctrl+Click", action: tHelp('shortcutsContent.selection.drillDown') },
                { key: "Esc", action: tHelp('shortcutsContent.selection.drillUp') },
            ]} />
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8">{tHelp('troubleshooting.title')}</h2>
          
          <div className="space-y-4">
             <TroubleshootItem title={tHelp('troubleshooting.items.shapes.title')} content={tHelp('troubleshooting.items.shapes.content')} />
             <TroubleshootItem title={tHelp('troubleshooting.items.select.title')} content={tHelp('troubleshooting.items.select.content')} />
             <TroubleshootItem title={tHelp('troubleshooting.items.fail.title')} content={tHelp('troubleshooting.items.fail.content')} />
             <TroubleshootItem title={tHelp('troubleshooting.items.export.title')} content={tHelp('troubleshooting.items.export.content')} />
          </div>
        </section>

        {/* Get More Help */}
        <div className="bg-primary rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">{tHelp('needHelp.title')}</h2>
            <p className="text-primary-ultra-light mb-8 max-w-lg mx-auto">
                {tHelp('needHelp.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md">
                {tHelp('needHelp.contact')}
                </Link>
                <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="bg-primary-dark/80 backdrop-blur text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all">
                {tHelp('needHelp.download')}
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
             <Link href="/privacy" className="hover:text-primary transition-colors">{tFoot('privacy')}</Link>
             <Link href="/support" className="hover:text-primary transition-colors">{tFoot('support')}</Link>
             <Link href="/" className="hover:text-primary transition-colors">{tFoot('rights', {year: new Date().getFullYear()})}</Link>
          </div>
          
          <div className="text-sm text-gray-400">
            {tFoot('rights', {year: new Date().getFullYear()})}
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
