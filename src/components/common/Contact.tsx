import React, { useState, useRef } from 'react';
import { Mail, Send, CheckCircle, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 60 }
  });
  
  const successSpring = useSpring({
    opacity: isSubmitted ? 1 : 0,
    transform: isSubmitted ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 20 }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formState.email || !/^\S+@\S+\.\S+$/.test(formState.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-16">
      <animated.div style={fadeIn} className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg border border-indigo-100 dark:border-gray-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-500 dark:to-purple-600 p-8 md:p-12 lg:col-span-2 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-white/20 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Our Location</h4>
                        <p className="text-indigo-100">Dortmund</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-white/20 p-2 rounded-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Phone</h4>
                        <p className="text-indigo-100">+4915510410090</p>
                        <p className="text-indigo-200 text-sm">Mon-Fri from 8am to 6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-white/20 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Email</h4>
                        <p className="text-indigo-100">support@QmFAQ.app</p>
                        <p className="text-indigo-200 text-sm">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-indigo-500/30">
                    <h4 className="text-white font-medium mb-4">Connect with us</h4>
                    <div className="flex space-x-4">
                      {['twitter', 'facebook', 'linkedin', 'instagram'].map((platform) => (
                        <a 
                          key={platform}
                          href="#" 
                          className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                          aria-label={`Visit our ${platform} page`}
                        >
                          <div className="w-5 h-5 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 lg:col-span-3 relative">
                {isSubmitted && (
                  <animated.div 
                    style={successSpring}
                    className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-gray-800/95 z-10 backdrop-blur-sm"
                  >
                    <div className="text-center p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Thanks for reaching out! We'll get back to you as soon as possible.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </animated.div>
                )}
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                  Send Us a Message
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Youssef"
                        className="block w-full px-4 py-3 rounded-lg
                                  bg-gray-50 dark:bg-gray-800 
                                  border border-gray-300 dark:border-gray-700
                                  text-gray-900 dark:text-white
                                  placeholder-gray-500 dark:placeholder-gray-400
                                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                  transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="block w-full pl-10 pr-3 py-3 rounded-lg
                                    bg-gray-50 dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-700
                                    text-gray-900 dark:text-white
                                    placeholder-gray-500 dark:placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                    transition-all duration-200"
                          required
                        />
                      </div>
                      {error && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="block w-full pl-10 pr-3 py-3 rounded-lg
                                  bg-gray-50 dark:bg-gray-800
                                  border border-gray-300 dark:border-gray-700
                                  text-gray-900 dark:text-white
                                  placeholder-gray-500 dark:placeholder-gray-400
                                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                  transition-all duration-200
                                  resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-indigo-600 dark:text-indigo-400 
                                focus:ring-indigo-500 dark:focus:ring-indigo-400
                                border-gray-300 dark:border-gray-700 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I agree to the <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a>
                    </label>
                  </div>
                  
                  <div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg
                                text-white font-medium
                                transition-all duration-300
                                ${isSubmitting 
                                  ? 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed' 
                                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We typically respond within 24 hours
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                        4.9/5 customer satisfaction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
};