'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TestimonialSection = () => {
const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide the button when near the bottom of the page
      if (scrollPosition + windowHeight > documentHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
    <section className="text-center px-8 sm:mt-32 md:mt-40 ">
      <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">
      &quot;Best practices&quot; don&apos;t actually work.
      </h2>
      <figure>
        <blockquote>
          <p className="mt-6 max-w-3xl mx-auto text-lg">
            I&apos;ve written{' '}
            <Link href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/" className="text-sky-500 font-semibold dark:text-sky-400">
              a few thousand words
            </Link>{' '}
            on why traditional &quot;semantic class names&quot; are the reason CSS is hard to maintain, but the truth is you&apos;re never going to believe me until you actually try it. If you can suppress the urge to retch long enough to give it a chance, I really think you&apos;ll wonder how you ever worked with CSS any other way.
          </p>
        </blockquote>
        <figcaption className="mt-6 flex items-center justify-center space-x-4 text-left">
          <Image
            src="/logo.png"
            alt=""
            className="w-14 h-14 rounded-full"
            width={56}
            height={56}
          />
          <div>
            <div className="text-slate-900 font-semibold dark:text-white">Adam Wathan</div>
            <div className="mt-0.5 text-sm leading-6">Creator of Tailwind CSS</div>
          </div>
        </figcaption>
      </figure>
    </section>
    {/* Floating button */}
    <div 
        className={`
          fixed inset-x-0 bottom-0 flex justify-center 
          bg-gradient-to-t from-white pt-32 pb-8 
          dark:from-slate-900 
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* <button 
          type="button" 
          className="
            relative bg-slate-900 hover:bg-slate-700 
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
            text-sm text-white font-semibold h-12 px-6 rounded-lg 
            flex items-center 
            dark:bg-slate-700 dark:hover:bg-slate-600 
            transition-transform
          "
          onClick={() => console.log('Button clicked')}
        >
          Read our testimonials
        </button> */}
      </div>
      </>
  );
};

export default TestimonialSection;