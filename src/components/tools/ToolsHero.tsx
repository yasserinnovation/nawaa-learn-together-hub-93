
import { Package } from "lucide-react";

const ToolsHero = () => {
  return (
    <section className="bg-yellow-50 py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=1920" 
          alt="Tools background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
          <Package className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Access Tools
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
          Rent or buy the right tools from our community-powered marketplace for your training sessions and workshops.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
          {["Find affordable tools", "Rent instead of buy", "Share equipment", "Support local makers"].map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
