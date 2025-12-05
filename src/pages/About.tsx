import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Globe, Brain, Heart, Target, Lightbulb, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    { name: 'Founding Team', role: 'Building the future of Indian AI', icon: Users },
    { name: 'Community Contributors', role: '10,000+ volunteers', icon: Heart },
    { name: 'Language Experts', role: 'Linguists & Native Speakers', icon: Globe },
  ];

  const values = [
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'AI that speaks every Indian language, from major languages to regional dialects.',
    },
    {
      icon: Users,
      title: 'Community-First',
      description: 'Built by Indians, for Indians. Every voice matters in shaping our AI.',
    },
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Cutting-edge technology combined with deep cultural understanding.',
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making AI accessible to everyone, regardless of their language.',
    },
  ];

  const faqs = [
    {
      question: 'What is Saarthi AI?',
      answer: "Saarthi AI is India's first community-built multilingual AI assistant. It's designed to understand and respond in 22+ Indian languages, making AI accessible to all Indians.",
    },
    {
      question: 'How can I contribute?',
      answer: 'You can contribute by translating AI responses, adding tone tags, and providing feedback. Every contribution helps improve Saarthi for millions of users.',
    },
    {
      question: 'Which languages are supported?',
      answer: 'We support Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, and many more. We\'re constantly adding new languages!',
    },
    {
      question: 'Is Saarthi AI free to use?',
      answer: 'Yes! Saarthi AI offers free credits to all users. Premium features are available for power users who need more.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI That Speaks <span className="text-gradient">Like India</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to build the most inclusive AI assistant that truly understands 
              India's linguistic and cultural diversity. Not just translation – real understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Why <span className="text-primary">Saarthi</span>?
              </h2>
              <p className="text-muted-foreground mb-6">
                "Saarthi" means guide or companion in Hindi. Just as Saarthi helped Arjuna navigate 
                the battlefield, we aim to guide India into the AI era – in every language, 
                for every Indian.
              </p>
              <p className="text-muted-foreground mb-6">
                Most AI systems are trained primarily on English data, making them less effective 
                for the 1.4 billion Indians who speak hundreds of different languages. We're 
                changing that.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/signup">
                  <Button variant="hero">
                    Join the Movement
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-soft transition-all"
                >
                  <value.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Powered by <span className="text-secondary">Community</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Saarthi AI is built by a passionate team and thousands of community contributors 
              who believe in making AI accessible to all.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <member.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make History?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of contributors shaping the future of AI in India. 
              Your language, your contribution, your impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" size="lg">
                  Try Saarthi AI
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center justify-center gap-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
