'use client';

import Link from "next/link";
import { SparklesIcon, Users, Star, Github, ArrowRight } from "lucide-react";
import PixelBlast from "./PixelBlast";
import { FaGithub } from 'react-icons/fa';
import {Icon} from '@chakra-ui/react';

const OpenCodeHero = () => {
  const handleLoginWithGitHub = () => {
    window.location.assign(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/github`,
    );
  };

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

    
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center text-center md:items-start md:justify-center px-6 md:px-20 pt-32 pb-20 w-full gap-8">
        <div className="max-w-4xl flex flex-col items-center gap-6 md:items-start md:text-left">

  
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
            {/* <Link href="/auth/sign-in">
              
            </Link> */}
            <button
              className="px-8 py-3 rounded-full font-semibold text-black
                          bg-gradient-to-r from-[#7551FF] to-[#E9E3FF]
                          hover:scale-105 transition-transform"
              onClick={handleLoginWithGitHub}
            >
              Sign In <Icon as={FaGithub} w="20px" h="20px"/>
            </button>

            <Link href="https://opencode.geekhaven.in">
              <button
                className="px-8 py-3 rounded-full font-semibold text-white
                           border border-white/20 hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </Link>
          </div>

        </div>
        {/* Sidebar - visible on md+ */}
        <aside className="hidden md:flex flex-col w-80 p-5 rounded-2xl border border-white/6 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7551FF] to-[#E9E3FF] flex items-center justify-center text-black font-bold text-lg">OC</div>
            <div>
              <h3 className="text-lg font-semibold">OpenCode</h3>
              <p className="text-xs text-white/70">Join projects, earn stars, and grow.</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 text-sm">
            <div className="flex-1 p-3 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-white/70">Participants</div>
              <div className="mt-1 font-semibold flex items-center justify-center gap-2"><Users className="w-4 h-4" /> 1.2k</div>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-white/70">Repos</div>
              <div className="mt-1 font-semibold flex items-center justify-center gap-2"><Github className="w-4 h-4" /> 420</div>
            </div>
          </div>

          {/* <div className="mt-4 p-3 rounded-lg bg-white/3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/70">Top Projects</div>
              <div className="text-xs text-white/60">Updated</div>
            </div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-white/6 flex items-center justify-center text-xs">#</span>
                  <span>Web Starter</span>
                </div>
                <div className="text-white/70 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-300"/> 1.5k</div>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-white/6 flex items-center justify-center text-xs">#</span>
                  <span>Design System</span>
                </div>
                <div className="text-white/70 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-300"/> 980</div>
              </li>
            </ul>
          </div> */}

          <div className=" ml-10 mt-8 flex gap-2 ">
            <Link href="https://github.com/OpenCode2025">
              <button className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-[#7551FF] to-[#E9E3FF] font-semibold text-black flex items-center justify-center gap-2">
                Explore Projects <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

          </div>
        </aside>
      </div>
    </section>
  );
};

export default OpenCodeHero;
