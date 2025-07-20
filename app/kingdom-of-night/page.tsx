"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

interface NightEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  description: string;
  image: string;
  music?: string;
  mood: 'electronic' | 'ambient' | 'experimental';
}

const nightEvents: NightEvent[] = [
  {
    id: '1',
    title: 'Underground Frequencies',
    venue: 'The Bunker',
    date: '2024.01.15',
    description: '深入地下音樂場景，感受電子音樂的純粹力量。在黑暗中尋找光明，在節拍中找到自己。',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
    mood: 'electronic'
  },
  {
    id: '2',
    title: 'Ambient Nights',
    venue: 'Warehouse 404',
    date: '2024.01.08',
    description: '氛圍音樂之夜，讓聲音在空間中流淌。每個音符都是一次心靈的觸碰，每個節拍都是時間的印記。',
    image: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&w=1200',
    mood: 'ambient'
  },
  {
    id: '3',
    title: 'Experimental Soundscapes',
    venue: 'Black Box',
    date: '2024.01.01',
    description: '實驗聲響的探索之旅。在未知的聲音領域中冒險，體驗音樂的無限可能性。',
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1200',
    mood: 'experimental'
  },
  {
    id: '4',
    title: 'Neon Dreams',
    venue: 'Cyber Club',
    date: '2023.12.25',
    description: '霓虹燈下的電子夢境。科技與人性的交匯點，未來與現在的對話。',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    mood: 'electronic'
  },
  {
    id: '5',
    title: 'Midnight Rituals',
    venue: 'Sacred Space',
    date: '2023.12.18',
    description: '午夜的儀式感，音樂作為連接靈魂的媒介。在神聖的空間中體驗集體的狂歡與孤獨。',
    image: 'https://images.pexels.com/photos/1449824/pexels-photo-1449824.jpeg?auto=compress&cs=tinysrgb&w=1200',
    mood: 'ambient'
  }
];

const KingdomOfNightPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentIndex < nightEvents.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex]);

  const currentEvent = nightEvents[currentIndex];

  const moodColors = {
    electronic: 'from-purple-900 via-pink-900 to-blue-900',
    ambient: 'from-indigo-900 via-purple-900 to-slate-900',
    experimental: 'from-slate-900 via-gray-900 to-purple-900'
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black"
    >
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            <span className="font-mono text-white/70 group-hover:text-white transition-colors">HOME</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-serif text-white">
              Kingdom of Night
            </h1>
            <p className="text-sm font-mono text-white/60 mt-1">夜之王國</p>
          </div>
          
          {/* Music Controls */}
          <div className="flex items-center gap-4">
            <Link href="/human-collection" className="font-mono text-white/60 hover:text-white transition-colors text-sm">
              HUMAN
            </Link>
            <Link href="/blog" className="font-mono text-white/60 hover:text-white transition-colors text-sm">
              BLOG
            </Link>
            <button
              onClick={() => setMusicPlaying(!musicPlaying)}
              className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {musicPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Progress Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
        {nightEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : index < currentIndex 
                  ? 'bg-white/50' 
                  : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`relative w-full h-full bg-gradient-to-br ${moodColors[currentEvent.mood]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0"
            style={{ y: backgroundY }}
          >
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-[120%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-br ${moodColors[currentEvent.mood]} opacity-60`} />
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`${currentIndex}-${i}`}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
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

          {/* Content */}
          <motion.div
            className="relative z-10 h-full flex items-center justify-center p-6"
            style={{ opacity }}
          >
            <div className="max-w-4xl mx-auto text-center text-white">
              {/* Event Info */}
              <motion.div
                className="mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex items-center justify-center gap-6 mb-4 text-sm font-mono text-white/60">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {currentEvent.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {currentEvent.venue}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-5xl md:text-7xl font-serif mb-8 tracking-wide"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {currentEvent.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl font-mono leading-relaxed max-w-2xl mx-auto text-white/80"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {currentEvent.description}
              </motion.p>

              {/* Mood Indicator */}
              <motion.div
                className="mt-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <div className={`w-3 h-3 rounded-full ${
                    currentEvent.mood === 'electronic' ? 'bg-pink-400' :
                    currentEvent.mood === 'ambient' ? 'bg-blue-400' :
                    'bg-purple-400'
                  }`} />
                  <span className="font-mono text-sm uppercase tracking-wider">
                    {currentEvent.mood}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Hint */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm font-mono mb-2">SCROLL TO NAVIGATE</p>
            <motion.div
              className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto relative"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-white/40 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default KingdomOfNightPage;