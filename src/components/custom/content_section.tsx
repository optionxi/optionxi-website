import Link from 'next/link';
import { LucideIcon, Layers, Paintbrush, Wand2, Boxes } from 'lucide-react';

interface DesignStyle {
  name: string;
  Icon: LucideIcon;
}

const ContentSection = () => {
  const designStyles: DesignStyle[] = [
    { name: 'Simple', Icon: Layers },
    { name: 'Playful', Icon: Paintbrush },
    { name: 'Elegant', Icon: Wand2 },
    { name: 'Brutalist', Icon: Boxes },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
     <div className="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-green-500 dark:highlight-white/30">
    <div
      className="w-full h-full bg-center bg-no-repeat bg-[length:100%] dark:hidden"
      style={{ backgroundImage: "url('/logo.png')" }}
    ></div>
    <div
      className="hidden w-full h-full bg-center bg-no-repeat bg-[length:100%] dark:block"
      style={{ backgroundImage: "url('/logo.png')" }}
    ></div>
    </div>

      <h2 className="mt-8 font-semibold text-green-500 dark:text-green-400">Build anything</h2>
      
      <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
        Build whatever you want,&nbsp;seriously.
      </p>
      
      <p className="mt-4 max-w-3xl space-y-6">
        Because Tailwind is so low-level, it never encourages you to design the same site twice. Even with the same color palette and sizing scale, it&apos;s easy to build the same component with a completely different look in the next project.
      </p>
      
      <Link href="/docs/installation" className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 focus:ring-green-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8">
        Get started
        <span className="sr-only">, installation</span>
        <svg className="overflow-visible ml-3 text-green-300 group-hover:text-green-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 0L3 3L0 6"></path>
        </svg>
      </Link>
      
      
      <div className="mt-10">
        <div className="flex overflow-auto -mx-4 sm:mx-0">
          <ul className="flex-none inline-grid gap-x-2 px-4 sm:px-0 xl:gap-x-6" style={{gridTemplateColumns: 'repeat(4, minmax(6rem, 1fr))'}}>
            {designStyles.map((style, index) => (
              <li key={index}>
                <button type="button" className={`group text-sm font-semibold w-full flex flex-col items-center ${index === 0 ? 'text-green-500 dark:text-green-400' : ''}`}>
                  <style.Icon className="mb-6 text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500" size={48} />
                  {style.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;