
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-base font-semibold tracking-wide text-nawaa-yellow uppercase">
                The future of learning
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Mix & Match Your</span>
                <span className="block text-nawaa-yellow">Learning Bundle</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Empower children to learn technology through hands-on experiences with a fully customizable learning journey. Connect trainers, spaces, tools, and courses in one seamless platform.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center lg:justify-start">
                <Button className="px-6 py-6 text-lg" size="lg">
                  Build a Bundle
                </Button>
                <Button variant="outline" className="px-6 py-6 text-lg" size="lg">
                  Explore Trainers
                </Button>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Join our community of trainers, parents, and shared spaces.
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-nawaa-yellow rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="flex items-center justify-center h-full">
                    <div className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nawaa-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">See how it works</h3>
                      <p className="text-white/80 mb-4">Watch a quick overview of Nawaa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
