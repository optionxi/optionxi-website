const InvestmentSection = () => {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We invest in the world&apos;s potential</h1>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">The need for energy is universal. That&apos;s why Flowbite scientists and engineers are pioneering new research and pursuing new technologies to reduce emissions while creating more efficient fuels. We&apos;re committed to responsibly meeting the world&apos;s energy needs.</p>
            <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
              Learn more about the plan
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { title: "Fourth quarter 2021", description: "We announced fourth quarter 2021 results" },
              { title: "Zero emissions", description: "Flowbite aims to achieve net-zero emissions" },
              { title: "New York", description: "Plans for net zero emissions in New York" },
              { title: "2022 plans", description: "Investing in the future of Africa" },
            ].map((item, index) => (
              <div key={index}>
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{item.description}</p>
                <a href="#" className="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                  Read more
                  <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default InvestmentSection;