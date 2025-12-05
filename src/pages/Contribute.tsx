import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, MessageSquare, Send, Loader2, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const languages = [
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' },
  { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
];

const tones = [
  { value: 'formal', label: 'Formal', description: 'Professional, respectful' },
  { value: 'casual', label: 'Casual', description: 'Friendly, everyday' },
  { value: 'polite', label: 'Polite', description: 'Extra courteous' },
  { value: 'humorous', label: 'Humorous', description: 'Light-hearted, fun' },
];

const sampleTexts = [
  "How can I help you today?",
  "The weather is quite pleasant.",
  "Please share your feedback with us.",
  "Thank you for your contribution!",
];

const Contribute = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [originalText, setOriginalText] = useState(sampleTexts[0]);
  const [translation, setTranslation] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLanguage || !translation || !selectedTone) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Contribution submitted successfully!');

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setTranslation('');
      setSelectedTone('');
      setOriginalText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    }, 2000);
  };

  const getRandomText = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setOriginalText(newText);
    setTranslation('');
    setSelectedTone('');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">Make an Impact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Contribute</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Help train Saarthi AI by providing translations and tone tags. Every contribution makes a difference!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: 'Your Contributions', value: '47' },
              { label: 'Points Earned', value: '235' },
              { label: 'Rank', value: '#128' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl border border-border p-4 text-center"
              >
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Contribution Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-soft"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Your contribution has been submitted for review.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Language Selection */}
                <div className="space-y-2">
                  <Label>Target Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Original Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Original Text (English)</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={getRandomText}>
                      <Sparkles className="w-4 h-4 mr-1" />
                      New Text
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-border">
                    <p className="text-foreground">{originalText}</p>
                  </div>
                </div>

                {/* Translation */}
                <div className="space-y-2">
                  <Label htmlFor="translation">Your Translation</Label>
                  <Textarea
                    id="translation"
                    placeholder={`Type your translation in ${languages.find(l => l.value === selectedLanguage)?.label || 'selected language'}...`}
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-3">
                  <Label>Tone Tag</Label>
                  <RadioGroup value={selectedTone} onValueChange={setSelectedTone} className="grid grid-cols-2 gap-3">
                    {tones.map((tone) => (
                      <div key={tone.value}>
                        <RadioGroupItem
                          value={tone.value}
                          id={tone.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={tone.value}
                          className="flex flex-col p-4 rounded-xl border-2 border-border cursor-pointer hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <span className="font-medium text-foreground">{tone.label}</span>
                          <span className="text-xs text-muted-foreground">{tone.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !selectedLanguage || !translation || !selectedTone}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Contribution
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 rounded-2xl bg-accent border border-primary/20"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Contribution Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Provide natural, conversational translations that sound native</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Maintain the original meaning while adapting to cultural context</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Choose the tone that best matches how the text would be spoken</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Quality contributions earn more points and higher rankings!</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
