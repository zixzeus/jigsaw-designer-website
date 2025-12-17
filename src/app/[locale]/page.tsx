import Image from "next/image";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations();
  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('Hero');
  const tFeat = useTranslations('Features');
  const tFoot = useTranslations('Footer');

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
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">{tNav('features')}</a>
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{tNav('download')}</a>
            <div className="h-4 w-px bg-border"></div>
            <LanguageSwitcher />
            <div className="h-4 w-px bg-border"></div>
            <a href="https://github.com/zixzeus/jigsaw-designer-website" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{tNav('github')}</a>
            <Link href="/help#getting-started" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              {tNav('getStarted')}
            </Link>
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
            {tHero('version')}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
             <span dangerouslySetInnerHTML={{__html: tHero.raw('titlePart1')}} />
            <span className="text-primary">{tHero('titleProfessional')}</span>
          </h1>
          
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {tHero('subtitle')}
          </p>

          <div id="download" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="https://apps.apple.com/app/jigsawdesigner/id6751882340" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/app-store-badge.svg" alt="Download on the App Store" style={{height: '54px', width: 'auto'}} />
            </a>
            <a href="https://www.producthunt.com/products/jigsawdesigner?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-jigsawdesigner" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1050002&theme=dark&t=1765934501716" alt="JigsawDesigner - Professional jigsaw puzzle design tool for Apple platforms. | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" />
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
            <h2 className="text-3xl font-bold mb-4">{tFeat('title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{tFeat('subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
              title={tFeat('list.customization.title')}
              description={tFeat('list.customization.description')}
            />
            <FeatureCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
              title={tFeat('list.workflow.title')}
              description={tFeat('list.workflow.description')}
            />
            <FeatureCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />}
              title={tFeat('list.anywhere.title')}
              description={tFeat('list.anywhere.description')}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-background-secondary py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 opacity-80">
            <div className="relative w-6 h-6 rounded overflow-hidden">
                 <Image
                 src="/app-icon.png"
                 alt="JigsawDesigner Icon"
                 fill
                 className="object-cover"
                 />
            </div>
            <span className="font-semibold">JigsawDesigner</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
             <Link href="/privacy" className="hover:text-primary transition-colors">{tFoot('privacy')}</Link>
             <Link href="/support" className="hover:text-primary transition-colors">{tFoot('support')}</Link>
             <a href="https://github.com/zixzeus/jigsaw-designer-website" className="hover:text-primary transition-colors">{tFoot('github')}</a>
          </div>
          
          <div className="text-sm text-gray-400">
            {tFoot('rights', {year: new Date().getFullYear()})}
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
