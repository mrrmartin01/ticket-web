"use client";
import Balatro from "@/components/Balatro";

export default function DashboardNotFound() {
  return (
    <div className="relative flex h-[85dvh] w-full  items-center justify-center overflow-hidden">
      <div className="absolute m-auto h-2/6 max-w-xl inset-0 pointer-events-none">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={900}
          color1="#242424"
          color2="#1c1b1b"
          color3="#080808"
          contrast={1}
        />
      </div>

      <div className="max-w-md text-center z-50 ">
        <h1 className="text-5xl font-semibold text-white">Page Not Found</h1>
        <p className="text-white mt-2">
          This dashboard section doesn&apos;t exist.
        </p>
      </div>
    </div>
  );
}
