"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Photo {
  id: string;
  src: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  date: string;
}

const mockPhotos: Photo[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '城市的夜晚總是充滿未知的故事，每個路人都是一個獨特的存在 #人類觀察 #都市異象',
    likes: 142,
    comments: 23,
    tags: ['人類觀察', '都市異象', '夜晚'],
    date: '2024-01-15'
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '地鐵站的匆忙人群，每個人都有自己的目的地和故事 #通勤觀察',
    likes: 89,
    comments: 12,
    tags: ['通勤觀察', '人類收集'],
    date: '2024-01-12'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '咖啡廳裡的獨處時光，現代人的孤獨美學 #孤獨美學 #都市生活',
    likes: 234,
    comments: 45,
    tags: ['孤獨美學', '都市生活'],
    date: '2024-01-10'
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '街角的音樂人，用旋律連接陌生的靈魂 #街頭藝術 #音樂',
    likes: 167,
    comments: 34,
    tags: ['街頭藝術', '音樂', '人類收集'],
    date: '2024-01-08'
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '雨夜的反光，城市變成了另一個維度 #雨夜 #城市倒影',
    likes: 198,
    comments: 28,
    tags: ['雨夜', '城市倒影', '都市異象'],
    date: '2024-01-05'
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: '老人與鴿子的日常對話，時間在這裡緩慢流淌 #日常詩意',
    likes: 156,
    comments: 19,
    tags: ['日常詩意', '人類觀察'],
    date: '2024-01-03'
  }
];

const HumanCollectionPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(new Set(mockPhotos.flatMap(photo => photo.tags)));
  
  const filteredPhotos = filter === 'all' 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.tags.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const photoVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        className="relative z-40 p-6 bg-black/20 backdrop-blur-md border-b border-purple-500/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
            <span className="font-mono text-purple-300 group-hover:text-white transition-colors">HOME</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Human Collection Project
            </h1>
            <p className="text-sm font-mono text-purple-300/70 mt-1 tracking-wider">人類收集計畫</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/kingdom-of-night" className="font-mono text-purple-300/70 hover:text-white transition-colors text-sm">
              NIGHT
            </Link>
            <Link href="/blog" className="font-mono text-purple-300/70 hover:text-white transition-colors text-sm">
              BLOG
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Filter Tags */}
      <motion.div 
        className="sticky top-0 z-30 p-4 bg-black/30 backdrop-blur-md border-b border-purple-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                  : 'bg-black/20 text-purple-400/70 border border-purple-500/20 hover:bg-purple-500/10'
              }`}
            >
              ALL
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  filter === tag
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                    : 'bg-black/20 text-purple-400/70 border border-purple-500/20 hover:bg-purple-500/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <motion.div 
        ref={scrollRef}
        className="p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={photoVariants}
                className="break-inside-avoid relative group cursor-pointer"
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-purple-500/20">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className={`w-full h-auto object-cover transition-all duration-700 ${
                      hoveredPhoto === photo.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredPhoto === photo.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Caption Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredPhoto === photo.id ? 1 : 0,
                      y: hoveredPhoto === photo.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-sm font-mono leading-relaxed">
                      {photo.caption}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-purple-300/80 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {photo.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {photo.comments}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />

              {/* Caption and Actions */}
              <div className="mt-6 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <p className="text-white text-lg font-mono leading-relaxed mb-4">
                  {selectedPhoto.caption}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPhoto.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-mono rounded-full border border-purple-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-purple-300/80">
                    <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="font-mono">{selectedPhoto.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-mono">{selectedPhoto.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                      <Share className="w-5 h-5" />
                      <span className="font-mono">Share</span>
                    </button>
                  </div>
                  
                  <span className="text-purple-400/60 text-sm font-mono">
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HumanCollectionPage;