
import { MapPin } from "lucide-react";

const ShareSpaceHero = () => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-2 bg-yellow-200 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Share Your Space
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Turn your garage, library room, classroom, or makerspace into a creative learning hub for kids.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">🙋‍♂️ Who is this for?</h2>
            <p className="mb-4">
              Anyone from the community can contribute to tech education by listing a space they own or manage, including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏫</span>
                <span>School classrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <span>Library activity rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏢</span>
                <span>Company meeting rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🛠️</span>
                <span>Home workshops</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕌</span>
                <span>Community centers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏠</span>
                <span>Garages & personal spaces</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSpaceHero;
