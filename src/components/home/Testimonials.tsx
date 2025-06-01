
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Nawaa has transformed how my child learns about robotics. The ability to find great trainers and appropriate spaces near us is invaluable.",
      author: "Amira Hassan",
      role: "Parent",
    },
    {
      quote: "As a trainer, I can focus on teaching while Nawaa helps me find the right spaces and tools. It's revolutionized my educational approach.",
      author: "Omar Al-Rashid",
      role: "Technology Trainer",
    },
    {
      quote: "Our library has welcomed so many new young learners since we listed our space on Nawaa. It's wonderful to see our resources being utilized.",
      author: "Fatma El-Sayed",
      role: "Community Space Provider",
    },
  ];

  return (
    <section className="py-16 bg-nawaa-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-white/80">
            Join the growing community of parents, trainers, and space providers.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 rounded-xl shadow-lg">
              <CardContent className="p-8">
                <svg className="h-8 w-8 text-nawaa-yellow mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
