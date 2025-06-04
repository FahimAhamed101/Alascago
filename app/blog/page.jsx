import { Play, Apple } from "lucide-react"
export default function Blogpage(){
    return ( <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
   

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border-8 border-black p-12 relative">
      

          {/* Coming Soon Text */}
          <div className="text-center mt-16 mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="text-red-600">C</span>
              <span className="text-red-800">o</span>
              <span className="text-blue-500">m</span>
              <span className="text-blue-600">i</span>
              <span className="text-blue-700">n</span>
              <span className="text-blue-800">g</span>
              <span className="text-black"> </span>
              <span className="text-black">S</span>
              <span className="text-blue-600">o</span>
              <span className="text-blue-700">o</span>
              <span className="text-black">n</span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              All the Tourist Blog Contents will be shown here
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Google Play Button */}
              <div className="border-2 border-gray-300 rounded-lg px-6 py-3 flex items-center gap-3 hover:border-gray-400 transition-colors">
                <Play className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Coming soon on</div>
                  <div className="font-semibold text-gray-800">Google Play</div>
                </div>
              </div>

              {/* App Store Button */}
              <div className="border-2 border-gray-300 rounded-lg px-6 py-3 flex items-center gap-3 hover:border-gray-400 transition-colors">
                <Apple className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Coming soon on</div>
                  <div className="font-semibold text-gray-800">App Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}