"use client";
import SearchBar from "./searchBar";
import { HexagonBackground } from "./ui/hexagon";

export const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      <HexagonBackground className="absolute inset-0 flex items-center justify-center" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-t from-gray-500 to-black">
          Discover. Book. Experience.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
          Find concerts, festivals, sporting events, and unforgettable moments.
          Secure your tickets instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};
