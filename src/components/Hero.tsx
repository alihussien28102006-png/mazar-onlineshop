import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          mazar
        </h2>
        <p className="text-xl md:text-2xl text-emerald-100 mb-4 font-medium">
          visit your style
        </p>
        <p className="text-emerald-50 max-w-2xl mx-auto text-lg leading-relaxed">
          A place of visitation for your personal style journey. Discover streetwear that speaks to your authentic self.
        </p>
        <button className="mt-8 bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
          Shop Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;