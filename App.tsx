import React, { useState } from 'react';
import { analyzeFood } from './services/geminiService';
import { NutritionData } from './types';
import NutritionCard from './components/NutritionCard';
import { Icons } from './components/Icons';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeFood(query);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = ["Avocado Toast", "Grilled Salmon", "Oatmeal with Blueberries", "Cheeseburger"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* Navbar / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Icons.Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">NutriWise</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 hidden sm:block">
            AI-Powered Nutrition Analyzer
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        
        {/* Hero / Search Section */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col items-center ${data ? 'mb-10' : 'min-h-[60vh] justify-center'}`}>
          
          {!data && !loading && (
             <div className="text-center mb-10 max-w-2xl mx-auto space-y-4 animate-fade-in-down">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                  What's on your plate?
                </h2>
                <p className="text-lg text-slate-600">
                  Instantly analyze calorie counts and macro breakdowns for any meal using advanced AI.
                </p>
             </div>
          )}

          <div className="w-full max-w-xl relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-2">
              <Icons.Search className="w-6 h-6 text-slate-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Chicken Caesar Salad' or '100g Almonds'"
                className="w-full h-14 px-4 text-lg text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Icons.Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze</span>
                )}
              </button>
            </form>
          </div>

          {!data && !loading && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-in text-sm text-slate-500">
              <span>Try:</span>
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 rounded-full transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-xl mx-auto mt-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-center shadow-sm flex flex-col items-center gap-2">
            <Icons.Activity className="w-6 h-6 text-red-500" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Loading State - Skeleton */}
        {loading && !data && (
           <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 animate-pulse">
              <div className="h-32 bg-slate-100 rounded-2xl mb-8 w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="h-64 bg-slate-100 rounded-2xl"></div>
                 <div className="space-y-4">
                    <div className="h-24 bg-slate-100 rounded-2xl"></div>
                    <div className="h-24 bg-slate-100 rounded-2xl"></div>
                 </div>
              </div>
           </div>
        )}

        {/* Results */}
        {data && (
          <div className="animate-fade-in-up">
            <NutritionCard data={data} />
          </div>
        )}

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NutriWise. Information is generated by AI and may be approximate.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
