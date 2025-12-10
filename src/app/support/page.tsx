import Link from "next/link";

export default function SupportPage() {
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
            <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          How can we <span className="text-primary">help you?</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We are here to support your creative journey. Find answers or get in touch with our team.
        </p>
      </div>

      {/* Support Options */}
      <div className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Documentation */}
          <div className="bg-background border border-border p-8 rounded-2xl hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Documentation</h2>
            <p className="text-gray-500 mb-6">
              Explore our comprehensive guides to master JigsawDesigner features and tools.
            </p>
            <Link href="/help" className="text-primary font-semibold hover:underline flex items-center gap-1">
              Browse Articles <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Email Support */}
          <div className="bg-background border border-border p-8 rounded-2xl hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Email Support</h2>
            <p className="text-gray-500 mb-6">
              Need help with a specific issue? Our support team is ready to assist you directly.
            </p>
            <a href="mailto:zixzeus@jigsawdesigner.com" className="text-primary font-semibold hover:underline flex items-center gap-1">
              zixzeus@jigsawdesigner.com <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-background-secondary py-24 mt-12">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
           <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
           
           <div className="space-y-6">
             <FaqItem 
               question="Is JigsawDesigner a one-time purchase?"
               answer="Yes, JigsawDesigner offers a lifetime license option as well as subscription plans. Check the App Store for the latest pricing."
             />
             <FaqItem 
               question="Can I export my designs for commercial use?"
               answer="Absolutely. All designs created with JigsawDesigner are yours. You can export them as SVG or PDF for manufacturing or commercial printing."
             />
             <FaqItem 
               question="Does it support custom die lines?"
               answer="Yes, you can import custom SVG paths to use as die lines, or use our advanced algorithms to generate unique patterns automatically."
             />
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-500">{answer}</p>
    </div>
  );
}

function Footer() {
    return (
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
             &copy; {new Date().getFullYear()} JigsawDesigner. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
             <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
             <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    )
}