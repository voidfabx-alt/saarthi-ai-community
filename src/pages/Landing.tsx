import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Brain, Globe, Languages, MessageSquare, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.png';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Join thousands of contributors helping build India\'s most inclusive AI. Every translation matters.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Our models learn from your contributions, becoming smarter and more culturally aware every day.',
    },
    {
      icon: Globe,
      title: 'All Dialects Supported',
      description: 'From major languages to regional dialects, we\'re building AI that speaks like India does.',
    },
  ];

  const steps = [
    {
      icon: Languages,
      title: 'Translate',
      description: 'Help translate AI responses into your native language. Your expertise makes Vyuha understand India better.',
    },
    {
      icon: MessageSquare,
      title: 'Tone-Tag',
      description: 'Add context about tone, formality, and cultural nuances. Help AI understand not just what we say, but how.',
    },
    {
      icon: Sparkles,
      title: 'AI Learns',
      description: 'Watch as Vyuha grows smarter with each contribution. Track your impact on the leaderboard.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">India's First Community-Built AI</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Building India's{' '}
              <span className="text-gradient">Multilingual AI</span>{' '}
              Together
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Experience Vyuha AI and give your valuable feedback to help us make 
              India's most inclusive AI assistant even better.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button variant="hero" size="xl" className="group">
                  Experience Vyuha AI
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="hero-outline" size="xl" className="group">
                  <Play className="w-5 h-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats - Empty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: '-', label: 'Languages' },
                { value: '-', label: 'Contributors' },
                { value: '-', label: 'Translations' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-primary">Vyuha AI</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building AI that truly understands India's linguistic diversity, 
              powered by the community, for the community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How You Can <span className="text-primary">Contribute</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Every contribution, big or small, helps shape the future of AI in India. 
                  Here's how you can make an impact.
                </p>
              </motion.div>

              <div className="space-y-2">
                {steps.map((step, index) => (
                  <StepCard
                    key={step.title}
                    step={index + 1}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary-light/10 to-primary/5 p-8 flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl bg-card shadow-large border border-border overflow-hidden">
                  {/* Mock Chat Interface */}
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center overflow-hidden">
                      <img src={logo} alt="Vyuha AI" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Vyuha AI</div>
                      <div className="text-xs text-primary">Online</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-accent rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                        <p className="text-sm">नमस्ते! मैं Vyuha हूं। आज मैं आपकी कैसे मदद कर सकता हूं?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                        <p className="text-sm">Tell me about Indian festivals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-medium"
              >
                22+ Languages
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-primary-light text-primary-foreground text-sm font-medium shadow-medium"
              >
                Made in India 🇮🇳
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-primary-light/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Shape the Future of AI?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our growing community of contributors and help build AI that speaks every Indian language.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="cta" size="lg">
                  Join the Community
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" size="lg">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;