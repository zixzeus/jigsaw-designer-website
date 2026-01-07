import Image from "next/image";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { locales, defaultLocale } from "@/i18n/config";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Help'});
  const BASE_URL = "https://jigsawdesigner.com";

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/help`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `${BASE_URL}/${loc}/help`])
      ),
    },
    openGraph: {
        title: t('metaTitle'),
        description: t('metaDescription'),
        url: `${BASE_URL}/${locale}/help`,
        type: "article",
    }
  };
}

export default function HelpPage() {
  const tNav = useTranslations('Navigation');
  const tHelp = useTranslations('Help');
  const tFoot = useTranslations('Footer');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tHelp('generationContent.title'),
    "description": tHelp('generationContent.desc'),
    "step": [1, 2, 3, 4].map((num) => ({
      "@type": "HowToStep",
      "name": tHelp(`generationContent.steps.${num}.title`),
      "text": tHelp(`generationContent.steps.${num}.desc`),
      "url": `https://jigsawdesigner.com/help#generation-step-${num}`
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <a href="#project-library" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.projectLibrary')}
            </a>
            <a href="#interface" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.interface')}
            </a>
            <a href="#jigsaw-cutline-generator" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.generation')}
            </a>
            <a href="#tools" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.tools')}
            </a>
            <a href="#operations" className="flex items-center gap-2 hover:text-primary transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> {tHelp('sections.operations')}
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

        {/* Project Library */}
        <section id="project-library" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">2</span>
            {tHelp('sections.projectLibrary')}
          </h2>
          
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            {tHelp('projectLibraryContent.intro')}
          </p>

          {/* My Projects */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{tHelp('projectLibraryContent.myProjects.icon')}</span>
              <h3 className="text-2xl font-bold">{tHelp('projectLibraryContent.myProjects.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <Image src="/my_projects.png" alt="My Projects" width={600} height={400} className="w-full h-auto" />
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('projectLibraryContent.myProjects.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-500">
                      <span className="text-primary">•</span>
                      {tHelp(`projectLibraryContent.myProjects.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm">
                  <strong className="text-blue-800 dark:text-blue-200">💡 </strong>
                  <span className="text-blue-700 dark:text-blue-300">{tHelp('projectLibraryContent.myProjects.howTo')}</span>
                </div>
              </div>
            </div>
            
            {/* Context Menu */}
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🖱️</span>
                <h4 className="text-xl font-bold">{tHelp('projectLibraryContent.myProjects.contextMenu.title')}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('projectLibraryContent.myProjects.contextMenu.desc')}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                  <Image src="/context_menu.png" alt="Context Menu" width={600} height={400} className="w-full h-auto" />
                </div>
                <div className="space-y-3">
                  {['open', 'rename', 'publish', 'share', 'delete'].map((key) => (
                    <div key={key} className={`p-3 rounded-lg border ${key === 'publish' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : key === 'share' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' : 'bg-background border-border'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{key === 'open' ? '📂' : key === 'rename' ? '✏️' : key === 'publish' ? '🌐' : key === 'share' ? '🔗' : '🗑️'}</span>
                        <strong className={`text-sm ${key === 'publish' ? 'text-green-800 dark:text-green-200' : key === 'share' ? 'text-purple-800 dark:text-purple-200' : ''}`}>
                          {tHelp(`projectLibraryContent.myProjects.contextMenu.options.${key}.title`)}
                        </strong>
                      </div>
                      <p className={`text-xs ${key === 'publish' ? 'text-green-700 dark:text-green-300' : key === 'share' ? 'text-purple-700 dark:text-purple-300' : 'text-gray-500'}`}>
                        {tHelp(`projectLibraryContent.myProjects.contextMenu.options.${key}.desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Public Projects */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{tHelp('projectLibraryContent.publicProjects.icon')}</span>
              <h3 className="text-2xl font-bold">{tHelp('projectLibraryContent.publicProjects.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <Image src="/public_projects.png" alt="Public Projects" width={600} height={400} className="w-full h-auto" />
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('projectLibraryContent.publicProjects.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-500">
                      <span className="text-primary">•</span>
                      {tHelp(`projectLibraryContent.publicProjects.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-sm">
                  <strong className="text-green-800 dark:text-green-200">💡 </strong>
                  <span className="text-green-700 dark:text-green-300">{tHelp('projectLibraryContent.publicProjects.howTo')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Projects */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{tHelp('projectLibraryContent.sharedProjects.icon')}</span>
              <h3 className="text-2xl font-bold">{tHelp('projectLibraryContent.sharedProjects.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <Image src="/shared_projects.png" alt="Shared Projects" width={600} height={400} className="w-full h-auto" />
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('projectLibraryContent.sharedProjects.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-500">
                      <span className="text-primary">•</span>
                      {tHelp(`projectLibraryContent.sharedProjects.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-sm">
                  <strong className="text-purple-800 dark:text-purple-200">💡 </strong>
                  <span className="text-purple-700 dark:text-purple-300">{tHelp('projectLibraryContent.sharedProjects.howTo')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editor Interface */}
        <section id="interface" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">3</span>
            {tHelp('sections.interface')}
          </h2>
          
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            {tHelp('interfaceContent.intro')}
          </p>

          {/* Top Toolbar */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">�</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.toolbar.title')}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.toolbar.desc')}</p>
            
            <div className="rounded-xl overflow-hidden border border-border shadow-lg mb-6">
              <Image src="/toolbar.png" alt="Top Toolbar" width={1200} height={100} className="w-full h-auto" />
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-3 text-center">
                  <span className="text-xl block mb-1">{tHelp(`interfaceContent.toolbar.tools.${i}.icon`)}</span>
                  <strong className="text-xs">{tHelp(`interfaceContent.toolbar.tools.${i}.name`)}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Infinite Canvas */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎨</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.canvas.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <Image src="/canvas_workspace.png" alt="Canvas Workspace" width={800} height={600} className="w-full h-auto" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.canvas.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary">•</span>
                      {tHelp(`interfaceContent.canvas.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
                  <strong className="text-blue-800 dark:text-blue-200">💡 Tip: </strong>
                  <span className="text-blue-700 dark:text-blue-300">{tHelp('interfaceContent.canvas.tip')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🛠️</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.toolsPanel.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/tools_panel.png" alt="Tools Panel" width={400} height={600} className="w-full h-auto" />
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">{tHelp('interfaceContent.toolsPanel.desc')}</p>
                {['currentTool', 'elementOps', 'canvasOps', 'quickOps'].map((key) => (
                  <div key={key} className="bg-background border border-border rounded-lg p-4">
                    <strong className="text-foreground">{tHelp(`interfaceContent.toolsPanel.sections.${key}.title`)}</strong>
                    <p className="text-sm text-gray-500 mt-1">{tHelp(`interfaceContent.toolsPanel.sections.${key}.desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layers Panel */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📚</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.layersPanel.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/layers_panel.png" alt="Layers Panel" width={400} height={600} className="w-full h-auto" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.layersPanel.desc')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary">•</span>
                      {tHelp(`interfaceContent.layersPanel.features.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Templates Panel */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧩</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.templatesPanel.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/templates_panel.png" alt="Templates Panel" width={400} height={600} className="w-full h-auto" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.templatesPanel.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary">•</span>
                      {tHelp(`interfaceContent.templatesPanel.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <strong className="text-blue-800 dark:text-blue-200 text-sm">{tHelp('interfaceContent.templatesPanel.templateTypes.builtin.title')}</strong>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{tHelp('interfaceContent.templatesPanel.templateTypes.builtin.desc')}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <strong className="text-green-800 dark:text-green-200 text-sm">{tHelp('interfaceContent.templatesPanel.templateTypes.custom.title')}</strong>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">{tHelp('interfaceContent.templatesPanel.templateTypes.custom.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Inspector */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.inspector.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/right_inspector.png" alt="Project Inspector" width={400} height={600} className="w-full h-auto" />
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300">{tHelp('interfaceContent.inspector.desc')}</p>
                {['projectInfo', 'canvasSettings', 'jigsawSettings', 'statistics', 'operations'].map((key) => (
                  <div key={key} className="bg-background border border-border rounded-lg p-4">
                    <strong className="text-foreground">{tHelp(`interfaceContent.inspector.sections.${key}.title`)}</strong>
                    <p className="text-sm text-gray-500 mt-1">{tHelp(`interfaceContent.inspector.sections.${key}.desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shape Inspector */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📐</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.shapeInfo.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/shape_info.png" alt="Shape Inspector" width={400} height={600} className="w-full h-auto" />
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300">{tHelp('interfaceContent.shapeInfo.desc')}</p>
                {['shapeInfo', 'transform', 'geometry', 'operations'].map((key) => (
                  <div key={key} className="bg-background border border-border rounded-lg p-4">
                    <strong className="text-foreground">{tHelp(`interfaceContent.shapeInfo.sections.${key}.title`)}</strong>
                    <p className="text-sm text-gray-500 mt-1">{tHelp(`interfaceContent.shapeInfo.sections.${key}.desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.advancedSettings.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/advanced_settings.png" alt="Advanced Settings" width={400} height={600} className="w-full h-auto" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.advancedSettings.desc')}</p>
                <div className="space-y-3 mb-4">
                  {['language', 'subscription'].map((key) => (
                    <div key={key} className="bg-background border border-border rounded-lg p-4">
                      <strong className="text-foreground">{tHelp(`interfaceContent.advancedSettings.sections.${key}.title`)}</strong>
                      <p className="text-sm text-gray-500 mt-1">{tHelp(`interfaceContent.advancedSettings.sections.${key}.desc`)}</p>
                    </div>
                  ))}
                  <div className="bg-background border border-border rounded-lg p-4">
                    <strong className="text-foreground">{tHelp('interfaceContent.advancedSettings.sections.editor.title')}</strong>
                    <p className="text-sm text-gray-500 mt-1">{tHelp('interfaceContent.advancedSettings.sections.editor.desc')}</p>
                    <ul className="space-y-1 mt-3">
                      {['showGrid', 'showRulers', 'snapToGrid', 'gridSpacing', 'strokeWidth'].map((key) => (
                        <li key={key} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="text-primary">•</span>
                          <span><strong>{tHelp(`interfaceContent.advancedSettings.options.${key}.title`)}</strong>: {tHelp(`interfaceContent.advancedSettings.options.${key}.desc`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Editor */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✏️</span>
              <h3 className="text-2xl font-bold">{tHelp('interfaceContent.templateEditor.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-gray-900">
                <Image src="/template_editor.png" alt="Template Editor" width={500} height={500} className="w-full h-auto" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tHelp('interfaceContent.templateEditor.desc')}</p>
                <ul className="space-y-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary">•</span>
                      {tHelp(`interfaceContent.templateEditor.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['clearPath', 'editPoints', 'importSVG', 'exportSVG'].map((key) => (
                    <div key={key} className="bg-background border border-border rounded-lg p-3 text-center">
                      <strong className="text-xs text-foreground">{tHelp(`interfaceContent.templateEditor.buttons.${key}.title`)}</strong>
                      <p className="text-xs text-gray-500 mt-1">{tHelp(`interfaceContent.templateEditor.buttons.${key}.desc`)}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="jigsaw-cutline-generator" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">4</span>
            {tHelp('sections.generation')}
          </h2>
          
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            {tHelp('generationContent.desc')}
          </p>

          <div className="space-y-12">
            {[1, 2, 3, 4].map((num) => (
              <StepDetail 
                key={num}
                number={num.toString()} 
                title={tHelp(`generationContent.steps.${num}.title`)} 
                description={tHelp(`generationContent.steps.${num}.desc`)} 
                imageSrc={`/gen_step${num}.png`}
              />
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">5</span>
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
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">6</span>
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


        {/* Import & Export */}
        <section id="import-export" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">7</span>
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
             <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-ultra-light text-primary text-lg">8</span>
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

        {/* Industry Focus - SEO Keywords */}
        <section className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8">{tHelp('industryKeywords.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['laserCutting', 'dieline', 'manufacturing'].map((key) => (
              <div key={key} className="bg-background-secondary border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {tHelp(`industryKeywords.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {tHelp(`industryKeywords.${key}.desc`)}
                </p>
              </div>
            ))}
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

function StepDetail({ number, title, description, imageSrc }: { number: string, title: string, description: string, imageSrc: string }) {
  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mb-4">{number}</div>
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
        <div className="md:w-1/2 bg-gray-900 border-l border-border flex items-center justify-center p-4">
          <Image src={imageSrc} alt={title} width={800} height={450} className="w-full h-auto object-contain rounded-lg" />
        </div>
      </div>
    </div>
  );
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
