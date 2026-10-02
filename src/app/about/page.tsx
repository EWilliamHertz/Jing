import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-32">
      <div className="container mx-auto max-w-3xl px-6">
        <Link href="/" className="text-white/50 hover:text-white mb-12 inline-block">← Back to home</Link>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8">Life is complicated enough.</h1>
        
        <div className="space-y-6 text-xl text-white/70 leading-relaxed font-light">
          <p>
            Jing isn't about squeezing more productivity out of every minute. It isn't a tool for maximizing output at the expense of your sanity.
          </p>
          <p>
            It is about reducing mental clutter.
          </p>
          <p>
            We built Jing because we were tired of bouncing between ten different apps to manage a single life. We had tasks in one app, financial spreadsheets in another, notes scattered everywhere, and habits completely forgotten.
          </p>
          <p>
            Our philosophy is simple: <strong className="text-white font-medium">Less chaos. More clarity.</strong>
          </p>
          <p>
            When everything in your head has somewhere to go, you can stop stressing about what you might be forgetting, and start actually living.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">Your life is your data.</h2>
          <p className="text-white/70 leading-relaxed">
            Because Jing contains personal information, privacy is central to our product. We design our architecture to ensure that you own your data, and we do not sell it to third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
