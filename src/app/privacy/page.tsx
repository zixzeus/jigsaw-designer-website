import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold tracking-tight">JigsawDesigner</span>
          </Link>
          <div className="flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 pt-32 pb-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p>
                    JigsawDesigner ("we", "our", or "us") respects your privacy and is committed to protecting it. 
                    This Privacy Policy explains how we collect, use, and safeguard your information when you use our application and website.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Collection</h2>
                <p>
                    <strong>We do not collect personal data.</strong> JigsawDesigner is designed to process your files locally on your device. 
                    Your designs, images, and projects never leave your device unless you explicitly choose to export or share them.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>We do not track your usage behavior.</li>
                    <li>We do not upload your photos such as puzzle images to any server.</li>
                    <li>We do not sell your data to third parties.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">App Analytics</h2>
                <p>
                   We may use Apple's standard opt-in analytics to improve app performance and stability (e.g., crash reports). 
                   This data is anonymous and does not identify you personally. You can opt-out of this at any time through your device settings.
                </p>
            </section>

             <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br/>
                    <a href="mailto:privacy@jigsawdesigner.com" className="text-primary hover:underline">privacy@jigsawdesigner.com</a>
                </p>
            </section>
            
            <section className="pt-8 border-t border-border text-sm text-gray-500">
                <p>Last updated: December 10, 2025</p>
            </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function Footer() {
    return (
      <footer className="border-t border-border bg-background-secondary py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
             &copy; {new Date().getFullYear()} JigsawDesigner. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
             <Link href="/" className="hover:text-primary transition-colors">Home</Link>
             <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    )
}