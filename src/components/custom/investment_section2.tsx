export function InvestmentSection2()
{
    return (
        <section className="flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-start p-4">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-4">
            A hackable <span className="text-primary-600 dark:text-primary-500">text editor</span> for the 21st Century
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Here at Flowbite, we focus on markets where technology, innovation, and capital can unlock long-term value.
          </p>
          <div className="flex flex-wrap gap-4">
            <div>
              <div className="text-lg font-medium">1.60.0</div>
              <div className="text-gray-500 dark:text-gray-400">Release notes</div>
            </div>
            <div>
              <div className="text-lg font-medium">macOS</div>
              <div className="text-gray-500 dark:text-gray-400">For macOS 10.10 or later</div>
            </div>
            <div>
              <div className="text-lg font-medium">Windows</div>
              <div className="text-gray-500 dark:text-gray-400">For Windows 7 or later</div>
            </div>
          </div>
          <a
            href="#"
            className="mt-6 inline-flex items-center px-4 py-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 rounded-lg"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Download
          </a>
          <div className="text-gray-500 dark:text-gray-400 mt-4">
            By using Flowbite, you agree to its <a href="#" className="text-primary-600 dark:text-primary-500">license</a> and <a href="#" className="text-primary-600 dark:text-primary-500">privacy statement</a>.
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-4">
        <img
          className="hidden dark:block max-w-xs"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/text-editor-dark.svg"
          alt="mockup dark"
        />
        <img
          className="dark:hidden max-w-xs"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/text-editor-light.svg"
          alt="mockup light"
        />
      </div>
    </section>
    );
}