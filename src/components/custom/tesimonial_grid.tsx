import Image from 'next/image'

interface TestimonialItemProps {
    imageSrc: string;
    quote: string;
    name: string;
    title: string;
    twitterLink: string;
  }
  
  const TestimonialItem: React.FC<TestimonialItemProps> = ({ imageSrc, quote, name, title, twitterLink }) => (

//   <li className="text-sm leading-6">
    <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
      <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="flex items-center space-x-4">
        <Image
          src={imageSrc}
          alt=""
          className="flex-none w-14 h-14 rounded-full object-cover"
          width={56}
          height={56}
          loading="lazy"
        />
        <div className="flex-auto">
          <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
            <a href={twitterLink} className="relative">
              <span className="absolute inset-0"></span>
              {name}
            </a>
          </div>
          <div className="mt-0.5">{title}</div>
        </div>
      </figcaption>
    </figure>
//   </li>
)

const TestimonialGrid = () => {
  const testimonials = [
    {
      imageSrc: "/logo.png",
      quote: "I feel like an idiot for not using Tailwind CSS until now.",
      name: "Ryan Florence",
      title: "Remix & React Training",
      twitterLink: "https://twitter.com/ryanflorence"
    },
    {
      imageSrc: "/logo.png",
      quote: "Tailwind makes writing code feel like I'm using a design tool.",
      name: "Didier Catz",
      title: "Co-Founder @StyptApp",
      twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
    },
    {
        imageSrc: "/logo.png",
        quote: "Tailwind makes writing code feel like I'm using a design tool.",
        name: "Didier Catz",
        title: "Co-Founder @StyptApp",
        twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
      },
      {
        imageSrc: "/logo.png",
        quote: "Tailwind makes writing code feel like I'm using a design tool.",
        name: "Didier Catz",
        title: "Co-Founder @StyptApp",
        twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
      },
      {
        imageSrc: "/logo.png",
        quote: "Tailwind makes writing code feel like I'm using a design tool.",
        name: "Didier Catz",
        title: "Co-Founder @StyptApp",
        twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
      },
      {
        imageSrc: "/logo.png",
        quote: "Tailwind makes writing code feel like I'm using a design tool.",
        name: "Didier Catz",
        title: "Co-Founder @StyptApp",
        twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
      },
      {
        imageSrc: "/logo.png",
        quote: "Tailwind makes writing code feel like I'm using a design tool.",
        name: "Didier Catz",
        title: "Co-Founder @StyptApp",
        twitterLink: "https://twitter.com/didiercatz/status/1468657403382181901"
      },
      
    // Add a third testimonial here
  ]

  return (
    <section className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5">
      <h2 className="sr-only">Testimonials</h2>
      <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialItem key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}

export default TestimonialGrid