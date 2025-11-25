import React from 'react';
import { NutritionData } from '../types';
import MacroChart from './MacroChart';
import { Icons } from './Icons';

interface NutritionCardProps {
  data: NutritionData;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
  const macroData = [
    { name: 'Protein', value: data.macros.protein, unit: 'g', color: '#3b82f6' }, // Blue
    { name: 'Carbs', value: data.macros.carbs, unit: 'g', color: '#fbbf24' },   // Amber
    { name: 'Fat', value: data.macros.fat, unit: 'g', color: '#ef4444' },     // Red
  ];

  const getHealthColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in-up">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black opacity-5 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold capitalize tracking-tight">{data.foodName}</h2>
            <p className="text-emerald-100 mt-1 flex items-center gap-2">
              <Icons.Utensils className="w-4 h-4" />
              Serving Size: {data.servingSize}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-center min-w-[100px]">
              <span className="block text-3xl font-bold">{data.calories}</span>
              <span className="text-xs font-medium uppercase tracking-wider opacity-80">Calories</span>
            </div>
            <div className={`px-4 py-2 rounded-xl flex flex-col items-center justify-center ${getHealthColor(data.healthRating)} bg-opacity-90 backdrop-blur-sm`}>
               <span className="text-xl font-bold">{data.healthRating}/10</span>
               <span className="text-[10px] font-bold uppercase tracking-wider">Health Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Stats & Macros */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Icons.Activity className="w-5 h-5 text-emerald-500" />
              Macronutrient Breakdown
            </h3>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
               <MacroChart data={macroData} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-blue-600 font-medium mb-1">Protein</span>
                <span className="text-2xl font-bold text-slate-800">{data.macros.protein}g</span>
             </div>
             <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-amber-600 font-medium mb-1">Carbs</span>
                <span className="text-2xl font-bold text-slate-800">{data.macros.carbs}g</span>
             </div>
             <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-red-600 font-medium mb-1">Fat</span>
                <span className="text-2xl font-bold text-slate-800">{data.macros.fat}g</span>
             </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-emerald-600 font-medium mb-1">Fiber</span>
                <span className="text-2xl font-bold text-slate-800">{data.macros.fiber}g</span>
             </div>
          </div>
        </div>

        {/* Right Column: Details & Micros */}
        <div className="space-y-8 flex flex-col h-full">
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex-grow">
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Leaf className="w-5 h-5 text-emerald-500" />
              Nutritional Summary
             </h3>
             <p className="text-slate-600 leading-relaxed">
               {data.summary}
             </p>
             <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 italic">
                  <span className="font-semibold text-slate-700 not-italic">Why {data.healthRating}/10? </span> 
                  {data.healthRatingReason}
                </p>
             </div>
          </div>

          <div>
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Droplets className="w-5 h-5 text-blue-500" />
              Key Micronutrients
             </h3>
             <div className="flex flex-wrap gap-2">
                {data.micros.vitamins.length === 0 && data.micros.minerals.length === 0 && (
                   <span className="text-slate-400 text-sm italic">No significant micronutrients found.</span>
                )}
                {data.micros.vitamins.map((vit, idx) => (
                   <span key={`vit-${idx}`} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                      {vit}
                   </span>
                ))}
                {data.micros.minerals.map((min, idx) => (
                   <span key={`min-${idx}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                      {min}
                   </span>
                ))}
             </div>
          </div>

          {/* Quick Stats Row */}
          <div className="flex items-center justify-between bg-slate-100 rounded-xl p-4">
             <div className="flex items-center gap-2">
                <Icons.Wheat className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-slate-600 font-medium">Sugar: <span className="text-slate-900 font-bold">{data.macros.sugar}g</span></span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
