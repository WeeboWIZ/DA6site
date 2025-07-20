"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Music, VolumeX } from 'lucide-react';
import Link from 'next/link';

interface ModuleData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  color: string;
}

const modules: ModuleData[] = [
  {
    id: 'human-collection',
    title: 'Human Collection',
    subtitle: '人類收集計畫',
    description: 'Urban observations through photographic narratives',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/human-collection',
    color: 'from-purple-600/80 to-pink-600/80'
  },
  {
    id: 'kingdom-of-night',
    title: 'Kingdom of Night',
    subtitle: '夜之王國',
    description: 'Nocturnal chronicles from underground scenes',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/kingdom-of-night',
    color: 'from-indigo-600/80 to-purple-600/80'
  },
  {
    id: 'blog',
    title: 'BLOG',
    subtitle: '文字與影像的混合筆記',
    description: 'Fragments of thoughts and visual poetry',
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/blog',
    color: 'from-slate-600/80 to-indigo-600/80'
  }
];

const HomePage = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentModule((prev) => (prev + 1) % modules.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  const handleModuleChange = (index: number) => {
    setCurrentModule(index);
    setAutoPlay(false);
  };

  const currentModuleData = modules[currentModule];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentModule}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={currentModuleData.image}
            alt={currentModuleData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${currentModuleData.color}`} />
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`${currentModule}-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-40 p-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-wider">
              DA6
            </h1>
            <p className="text-lg md:text-xl font-mono text-white/70 tracking-[0.3em] uppercase mt-2">
              Visual Storyteller
            </p>
          </motion.div>
          
          <motion.button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {musicEnabled ? (
              <Music className="w-6 h-6 text-white" />
            ) : (
              <VolumeX className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-center">
            
            {/* Left Side - Current Module Info */}
            <div className="lg:col-span-1 text-white space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModule}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-serif mb-3 leading-tight">
                        {currentModuleData.title}
                      </h2>
                      <p className="text-xl font-mono text-white/80 tracking-wider">
                        {currentModuleData.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-lg font-mono text-white/70 leading-relaxed max-w-md">
                      {currentModuleData.description}
                    </p>
                    
                    <Link href={currentModuleData.href}>
                      <motion.button
                        className="group flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="font-mono text-white tracking-wider">ENTER</span>
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Module Navigation */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  className={`relative cursor-pointer group transition-all duration-500 ${
                    index === currentModule ? 'scale-105' : 'scale-95 opacity-60'
                  }`}
                  onClick={() => handleModuleChange(index)}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: index === currentModule ? 1.08 : 1 }}
                >
                  <div className="relative overflow-hidden rounded-2xl h-32 md:h-40">
                    <img
                      src={module.image}
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${module.color} ${
                      index === currentModule ? 'opacity-60' : 'opacity-80'
                    } group-hover:opacity-50 transition-opacity duration-300`} />
                    
                    <div className="absolute inset-0 flex items-center justify-between p-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm font-mono text-white/80 tracking-wider">
                          {module.subtitle}
                        </p>
                      </div>
                      
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          index === currentModule ? 'bg-white' : 'bg-white/40'
                        }`}
                        animate={{
                          scale: index === currentModule ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: index === currentModule ? Infinity : 0,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          {modules.map((_, index) => (
            <button
              key={index}
              onClick={() => handleModuleChange(index)}
              className="relative"
            >
              <div className={`w-12 h-1 rounded-full transition-all duration-500 ${
                index === currentModule ? 'bg-white' : 'bg-white/30'
              }`} />
              {index === currentModule && autoPlay && (
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bottom Info */}
      <motion.div
        className="absolute bottom-8 right-8 z-40 text-right"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-sm font-mono text-white/60 tracking-widest uppercase">
          Post-Internet Aesthetic
        </p>
        <p className="text-sm font-mono text-white/60 tracking-widest uppercase">
          × Visual Narrative
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;