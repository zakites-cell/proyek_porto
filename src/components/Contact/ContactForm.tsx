import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/data/constants';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="w-[340px] md:w-[480px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-hover rounded-3xl p-8 relative overflow-hidden"
      >
        <h2 className="text-3xl font-bold mb-2 text-white">Initialize Connection</h2>
        <p className="text-white/50 text-sm mb-6">Transmit a message across the network.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input 
              {...register('name', { required: true })}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
            />
            {errors.name && <span className="text-xs text-red-400 mt-1 ml-1 block">Name is required</span>}
          </div>
          
          <div>
            <input 
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-300"
            />
            {errors.email && <span className="text-xs text-red-400 mt-1 ml-1 block">Valid email is required</span>}
          </div>

          <div>
            <textarea 
              {...register('message', { required: true })}
              placeholder="Your Message"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none"
            />
            {errors.message && <span className="text-xs text-red-400 mt-1 ml-1 block">Message is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden
              ${isSuccess ? 'bg-green-500 text-white' : 'bg-primary/20 hover:bg-primary/40 text-primary hover:text-white border border-primary/50'}
              ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}
            `}
            style={{ 
              boxShadow: isSuccess ? '0 0 20px #22c55e40' : '0 0 20px #00CFFF20' 
            }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="submitting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="block"
                >
                  TRANSMITTING...
                </motion.span>
              ) : isSuccess ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="block"
                >
                  RECEIVED
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="block"
                >
                  SEND TRANSMISSION
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              title={link.name}
            >
              <span className="text-white/70 capitalize text-xs">{link.name.substring(0, 2)}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
