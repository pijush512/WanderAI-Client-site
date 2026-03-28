"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapPin, Tooltip, Wrench, Search as SearchIcon } from "lucide-react";

interface ServiceResult {
  id: number;
  serviceName: string;
  location: string;
  providerName: string;
  price: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const mockServices: ServiceResult[] = [
        { id: 1, serviceName: "AC Repair & Services", location: "Tangail", providerName: "Karim Electronics", price: "500 BDT" },
        { id: 2, serviceName: "Professional Plumbing", location: "Dhaka", providerName: "Quick Fix Ltd", price: "300 BDT" },
        { id: 3, serviceName: "Home Cleaning", location: "Tangail", providerName: "Clean Squad", price: "1200 BDT" },
        { id: 4, serviceName: "Electrical Wiring", location: "Chittagong", providerName: "Power Solutions", price: "800 BDT" },
      ];

      const filtered = mockServices.filter(
        (item) =>
          item.serviceName.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <SearchIcon className="text-blue-600" size={28} />
          Search Results
        </h1>
        <p className="text-slate-500 mt-2">
          Showing local services for: <span className="font-bold text-blue-600 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg">"{query}"</span>
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 w-full bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse border border-slate-200 dark:border-slate-700"></div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((service) => (
            <div key={service.id} className="group p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                  <Wrench size={24} />
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                {service.serviceName}
              </h3>
              <p className="text-slate-500 text-sm mb-4">By {service.providerName}</p>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={16} className="text-red-500" />
                <span>{service.location}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
             <SearchIcon size={32} className="text-slate-300" />
           </div>
           <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Services Found</h2>
           <p className="text-slate-500 mt-2 max-w-xs mx-auto">
             We couldn't find any service matching "{query}". Try searching for "Tangail" or "AC Repair".
           </p>
        </div>
      )}
    </div>
  );
}