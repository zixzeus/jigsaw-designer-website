import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function PrivacyPage() {
  const tNav = useTranslations('Navigation');
  const tFoot = useTranslations('Footer');
  const tPrivacy = useTranslations('Privacy');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold tracking-tight">JigsawDesigner</span>
          </Link>
          <div className="flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">{tNav('home')}</Link>
            <Link href="/support" className="hover:text-primary transition-colors">{tNav('support')}</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 pt-32 pb-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">{tPrivacy('title')}</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{tPrivacy('introduction.title')}</h2>
                <p>
                    {tPrivacy('introduction.content')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{tPrivacy('dataCollection.title')}</h2>
                <p>
                    <strong>{tPrivacy('dataCollection.content')}</strong> {tPrivacy('dataCollection.content2')}
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>{tPrivacy('dataCollection.list.behavior')}</li>
                    <li>{tPrivacy('dataCollection.list.upload')}</li>
                    <li>{tPrivacy('dataCollection.list.sell')}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{tPrivacy('analytics.title')}</h2>
                <p>
                   {tPrivacy('analytics.content')}
                </p>
            </section>

             <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{tPrivacy('contact.title')}</h2>
                <p>
                    {tPrivacy('contact.content')}
                    <br/>
                    <a href="mailto:zixzeus@jigsawdesigner.com" className="text-primary hover:underline">zixzeus@jigsawdesigner.com</a>
                </p>
            </section>
            
            <section className="pt-8 border-t border-border text-sm text-gray-500">
                <p>{tPrivacy('lastUpdated')}</p>
            </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function Footer() {
    const tNav = useTranslations('Navigation');
    const tFoot = useTranslations('Footer');

    return (
      <footer className="border-t border-border bg-background-secondary py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
             {tFoot('rights', {year: new Date().getFullYear()})}
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
             <Link href="/" className="hover:text-primary transition-colors">{tNav('home')}</Link>
             <Link href="/support" className="hover:text-primary transition-colors">{tNav('support')}</Link>
          </div>
        </div>
      </footer>
    )
}