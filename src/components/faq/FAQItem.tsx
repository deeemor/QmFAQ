import React, { useState, useRef } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { FAQ } from '../../types';
import { likeFaq, dislikeFaq } from '../../hooks/faqService';

interface FAQItemProps {
  faq: FAQ;
  isOpen?: boolean;
  toggleOpen?: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  isOpen = false,
  toggleOpen,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(isOpen);
  const [likesCount, setLikesCount] = useState(faq.likes || 0);
  const [dislikesCount, setDislikesCount] = useState(faq.dislikes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [lastVoteType, setLastVoteType] = useState<'like' | 'dislike' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isExpanded = toggleOpen ? isOpen : isOpenInternal;
  const handleToggle = toggleOpen || (() => setIsOpenInternal(!isOpenInternal));

  const handleVote = async (isLike: boolean) => {
    if (hasVoted || isVoting) return;

    setIsVoting(true);
    setVoteError(null);

    try {
      const apiCall = isLike ? likeFaq(faq.id) : dislikeFaq(faq.id);
      const updatedFaq = await apiCall;

      if (updatedFaq) {
        if (typeof updatedFaq.likes === 'number') {
          setLikesCount(updatedFaq.likes);
        }
        if (typeof updatedFaq.dislikes === 'number') {
          setDislikesCount(updatedFaq.dislikes);
        }
        setLastVoteType(isLike ? 'like' : 'dislike');
        setHasVoted(true);
        createParticles(isLike ? 'green' : 'red');
      }
    } catch (error) {
      setVoteError(error instanceof Error ? error.message : 'Failed to record your vote');
      console.error('Voting error:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const createParticles = (color: string) => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 60 - 30,
        y: Math.random() * -50 - 10,
        color: color === 'green'
          ? `rgb(${134 + Math.floor(Math.random() * 40)}, ${239 + Math.floor(Math.random() * 16)}, ${172 + Math.floor(Math.random() * 40)})`
          : `rgb(${239 + Math.floor(Math.random() * 16)}, ${134 + Math.floor(Math.random() * 40)}, ${134 + Math.floor(Math.random() * 40)})`
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);
  };

  const handleShare = () => {
    setShowShareTooltip(!showShareTooltip);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}?faq=${faq.id}`);
    setShowShareTooltip(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative rounded-xl overflow-hidden transition-all duration-500
                backdrop-blur-md bg-white/70 dark:bg-gray-900/80
                border border-indigo-100/70 dark:border-indigo-900/40
                transform hover:scale-[1.01]
                ${isHovering ? 'shadow-lg shadow-indigo-500/10' : 'shadow-md'}`}
    >
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none
                      bg-gradient-to-r from-indigo-400/20 via-purple-500/20 to-indigo-400/20
                      ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>

      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left group relative overflow-hidden"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`faq-content-${faq.id}`}
      >
        <div className="relative z-10 flex-1">
          <h3 className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {faq.question}
            <span className={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 
                              bg-gradient-to-r from-purple-600 to-indigo-600
                              dark:from-purple-400 dark:to-indigo-400
                              ${isExpanded ? 'max-w-full' : ''}`}></span>
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-indigo-600 dark:text-indigo-400 
                      transition-transform duration-500 ease-in-out
                      ${isExpanded ? 'transform rotate-180' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        id={`faq-content-${faq.id}`}
        role="region"
      >
        <div ref={contentRef} className="p-6 bg-gradient-to-b from-transparent via-indigo-50/20 to-purple-50/20 dark:from-transparent dark:via-indigo-900/5 dark:to-purple-900/5 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div className="prose dark:prose-invert max-w-none">{faq.answer}</div>

          {faq.tags && faq.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {faq.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full transform transition-all duration-200 hover:scale-105 text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-900/30 border border-indigo-200/70 dark:border-indigo-700/50 shadow-sm hover:shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {voteError && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
              <p>Error: {voteError}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote(true)}
                disabled={hasVoted || isVoting}
                className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-full transform transition-all duration-200 
                          text-emerald-600 dark:text-emerald-400
                          ${isVoting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                aria-label="Like"
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-medium">{likesCount}</span>

                {particles.length > 0 && lastVoteType === 'like' && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {particles.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute rounded-full w-1.5 h-1.5 opacity-0 animate-particle"
                        style={{
                          backgroundColor: particle.color,
                          left: `${particle.x}%`,
                          top: `${particle.y}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>

              <button
                onClick={() => handleVote(false)}
                disabled={hasVoted || isVoting}
                className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-full transform transition-all duration-200 
                          text-rose-600 dark:text-rose-400
                          ${isVoting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                aria-label="Dislike"
              >
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm font-medium">{dislikesCount}</span>

                {particles.length > 0 && lastVoteType === 'dislike' && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {particles.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute rounded-full w-1.5 h-1.5 opacity-0 animate-particle"
                        style={{
                          backgroundColor: particle.color,
                          left: `${particle.x}%`,
                          top: `${particle.y}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            </div>

            <button 
              onClick={handleShare} 
              className="px-3 py-1.5 rounded-full hover:scale-105 transition-all duration-200 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Share className="w-5 h-5" />
            </button>

            {showShareTooltip && (
              <div className="absolute z-20 top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md text-sm shadow-lg border border-indigo-100 dark:border-indigo-800">
                <button 
                  onClick={copyToClipboard} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;