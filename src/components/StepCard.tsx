import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const StepCard = ({ step, icon: Icon, title, description, delay = 0 }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-secondary-foreground font-bold text-lg shadow-soft">
          {step}
        </div>
        <div className="flex-1 w-0.5 bg-gradient-to-b from-secondary/50 to-transparent mt-2" />
      </div>
      <div className="flex-1 pb-12">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepCard;
