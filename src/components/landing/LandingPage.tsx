'use client';

import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import PixelBlast from "./PixelBlast";

const OpenCodeHero = () => {
  return (
    <section
      id="opencode"
      className="relative flex justify-center w-full min-h-[650px] md:min-h-screen overflow-hidden bg-[#0b1437]"
    >

      <div
        className="absolute inset-0 z-10"
        style={{ height: "140%", top: "-260px" }}
      >
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#7551FF"
          patternScale={3}
          patternDensity={1.1}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.45}
          rippleThickness={0.1}
          rippleIntensityScale={1.4}
          liquid
          liquidStrength={0.15}
          liquidRadius={1.3}
          speed={0.65}
          edgeFade={0.6}
          transparent
        />

        {/* Bottom Fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-[35%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,20,55,0) 0%, rgba(11,20,55,1) 100%)",
          }}
        />
      </div>

    
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 md:px-20 pt-32 pb-20 w-full">
        <div className="max-w-4xl flex flex-col items-center gap-6">

  
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <SparklesIcon className="h-5 w-5 text-[#E9E3FF]" />
            <span className="text-xs md:text-sm text-white font-medium">
              A Month-Long Open-Source Event!
            </span>
          </div>

        
          <h1 className="font-bold leading-tight text-white">
            <span className="block text-[22px] md:text-[34px]">
              Welcome to
            </span>
            <span className="block text-[42px] md:text-[72px] text-transparent bg-clip-text bg-gradient-to-r from-[#7551FF] to-[#E9E3FF]">
              OpenCode
            </span>
          </h1>

  
          <p className="text-[16px] md:text-lg text-[#E0E5F2] max-w-[720px]">
            OpenCode is a month-long open-source journey where students learn by
            building real projects, collaborating with mentors, and contributing
            to impactful codebases.
          </p>

        
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/auth/register">
              <button
                className="px-8 py-3 rounded-full font-semibold text-black
                           bg-gradient-to-r from-[#7551FF] to-[#E9E3FF]
                           hover:scale-105 transition-transform"
              >
                Get Started
              </button>
            </Link>

            <Link href="https://opencode.geekahven.com">
              <button
                className="px-8 py-3 rounded-full font-semibold text-white
                           border border-white/20 hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OpenCodeHero;
