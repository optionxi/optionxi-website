import { Twitter } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface TestimonialProps {
  author: string;
  content: string;
  avatarUrl: string;
  twitterHandle: string;
  tweetUrl: string;
}

const testimonials: TestimonialProps[] = [
  {
    author: "thatguy_tex",
    content: "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
    avatarUrl: "/images/twitter-profiles/09HouOSt_400x400.jpg",
    twitterHandle: "@thatguy_tex",
    tweetUrl: "https://twitter.com/thatguy_tex/status/1497602628410388480"
  },
  {
    author: "IxoyeDesign",
    content: "@supabase is just 🤯 Now I see why a lot of people love using it as a backend for their applications. I am really impressed with how easy it is to set up an Auth and then just code it together for the frontend.",
    avatarUrl: "/images/twitter-profiles/C8opIL-g_400x400.jpg",
    twitterHandle: "@IxoyeDesign",
    tweetUrl: "https://twitter.com/IxoyeDesign/status/1497473731777728512"
  },
  {
    author: "varlenneto",
    content: "I've been using @supabase for two personal projects and it has been amazing being able to use the power of Postgres and don't have to worry about the backend",
    avatarUrl: "/images/twitter-profiles/wkXN0t_F_400x400.jpg",
    twitterHandle: "@varlenneto",
    tweetUrl: "https://twitter.com/varlenneto/status/1496595780475535366"
  }
];
const TestimonialCard = ({ author, content, avatarUrl, twitterHandle, tweetUrl }: TestimonialProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.open(tweetUrl, '_blank');
    };
  
    return (
      <a 
        href={tweetUrl}
        onClick={handleClick}
        className="block group min-w-[320px] max-w-[320px] h-[300px] md:min-w-[380px] md:max-w-[380px] px-3"
      >
        <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-700">
              <img
                alt={`${twitterHandle} twitter image`}
                src={avatarUrl}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-200">{twitterHandle}</p>
            <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
              <svg className="h-3 w-3" fill="white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-base text-gray-400">{content}</p>
        </div>
      </a>
    );
  };
  


const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
  
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
    useEffect(() => {
      let scrollInterval: NodeJS.Timeout;
  
      const startScroll = () => {
        scrollInterval = setInterval(() => {
          if (scrollRef.current && !isHovered) {
            scrollRef.current.scrollLeft += 1;
  
            if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth) / 2) {
              scrollRef.current.scrollLeft = 0;
            }
          }
        }, 20);
      };
  
      startScroll();
  
      return () => {
        if (scrollInterval) {
          clearInterval(scrollInterval);
        }
      };
    }, [isHovered]);
  
    return (
      <section className="py-16 px-6 md:py-24 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Join the community</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover what our community has to say about their experience.
          </p>
  
          <div className="flex gap-4 justify-center mt-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              <Twitter className="w-4 h-4" />
              Twitter discussions
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              Discord discussions
            </button>
          </div>
        </div>
  
        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-auto">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              ←
            </button>
            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              →
            </button>
          </div>
        </div>
  
        {/* Desktop Infinite Scroll */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hidden lg:block overflow-hidden relative py-20"
        >
          <div className="flex gap-6 transition-transform duration-300">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
export default TestimonialSection;