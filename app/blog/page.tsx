"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share, Calendar, Tag, Search } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  tags: string[];
  readTime: string;
  likes: number;
  comments: number;
  mood: 'introspective' | 'observational' | 'experimental';
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '城市夜晚的數位詩歌',
    excerpt: '在霓虹燈的映照下，我們都是數位時代的遊魂。每個像素都承載著一個故事，每個代碼都編織著一段回憶...',
    content: '夜晚降臨城市，螢幕的藍光成為了新的月光。我坐在24小時咖啡廳裡，觀察著每個路過的人。他們的臉龐被手機螢幕照亮，眼神專注而疏離。這是一個數位化的詩意時刻，科技與人性在此刻交匯。\n\n我想起了班雅明的「機械複製時代的藝術品」，在這個後網絡時代，我們的存在本身就是一件藝術品的複製。每個自拍、每個分享、每個點讚，都是對自我的重新定義和複製。\n\n城市的夜晚不再屬於夢境，而是屬於數據流。街燈像素化了，建築變成了巨大的顯示器，人們在其中穿梭，既是觀眾也是表演者。',
    coverImage: 'https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: '2024-01-15',
    tags: ['數位詩歌', '城市觀察', '後網絡美學'],
    readTime: '5 min',
    likes: 89,
    comments: 23,
    mood: 'introspective'
  },
  {
    id: '2',
    title: '地鐵站的時間膠囊',
    excerpt: '每個地鐵站都是一個時間膠囊，保存著城市的記憶。在這裡，過去、現在和未來在同一個空間中共存...',
    content: '地鐵站是城市的靜脈，也是時間的容器。每天有數萬人在這裡聚集又散去，留下的是什麼？是腳步聲的回響，是急促呼吸的殘留，還是那些未曾說出口的故事？\n\n今天我在忠孝復興站等車，看到一個老人在看報紙，一個年輕人在滑手機，一個中年女性在聽音樂。三個不同時代的媒體載體，在同一個空間中並存。這就是現代城市的時間層次，每個人都活在自己的時間軸裡。\n\n地鐵的聲音是城市最純粹的音樂——軌道的摩擦聲、門的開關聲、廣播的回音。這些聲音組成了一首關於現代性的交響樂。',
    coverImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: '2024-01-10',
    tags: ['城市記憶', '時間', '觀察筆記'],
    readTime: '4 min',
    likes: 67,
    comments: 15,
    mood: 'observational'
  },
  {
    id: '3',
    title: '夜之實驗室',
    excerpt: '夜晚是一個巨大的實驗室，在這裡，聲音、光線和情感發生著奇妙的化學反應...',
    content: '昨晚在地下音樂場所，我體驗了一次聲音的煉金術。DJ像是一個聲音的科學家，將不同的頻率混合、碰撞、融化，創造出新的聽覺化合物。\n\n人群在黑暗中移動，身體成為了聲波的接收器。每個人都在進行著自己的實驗——有人在測試孤獨的邊界，有人在探索連結的可能性，有人在尋找遺失的自我。\n\n夜晚的城市是一個感官實驗室。霓虹燈是視覺的催化劑，音樂是聽覺的溶劑，觸碰是情感的反應物。在這個實驗中，沒有固定的公式，只有不斷的變化和驚喜。',
    coverImage: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: '2024-01-05',
    tags: ['夜生活', '實驗性', '感官體驗'],
    readTime: '6 min',
    likes: 142,
    comments: 34,
    mood: 'experimental'
  }
];

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const moodColors = {
    introspective: 'from-indigo-900/20 to-purple-900/20',
    observational: 'from-slate-900/20 to-blue-900/20',
    experimental: 'from-purple-900/20 to-pink-900/20'
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Article Header */}
        <motion.header 
          className="relative h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={selectedPost.coverImage}
            alt={selectedPost.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${moodColors[selectedPost.mood]}`} />
          
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-6 left-6 z-10 flex items-center gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            <span className="font-mono text-white/70 group-hover:text-white transition-colors">BACK</span>
          </button>

          <div className="relative z-10 text-center text-white max-w-4xl px-6">
            <motion.div
              className="mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-4 text-sm font-mono text-white/60 mb-4">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </span>
                <span>{selectedPost.readTime}</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-serif mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {selectedPost.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl font-mono text-white/80 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {selectedPost.excerpt}
            </motion.p>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.main
          className="relative z-10 bg-gradient-to-br from-slate-900 to-purple-900 px-6 py-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/90 font-mono leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 mb-8">
              {selectedPost.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 text-sm font-mono rounded-full border border-purple-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-purple-500/20">
              <div className="flex items-center gap-6 text-purple-300/80">
                <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-mono">{selectedPost.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-mono">{selectedPost.comments}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-200 transition-colors">
                  <Share className="w-5 h-5" />
                  <span className="font-mono">Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto"
    >
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 p-6 bg-black/30 backdrop-blur-md border-b border-purple-500/20"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-3 group">
              <ArrowLeft className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              <span className="font-mono text-purple-300 group-hover:text-white transition-colors">HOME</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                BLOG
              </h1>
              <p className="text-sm font-mono text-purple-300/70 mt-1">文字與影像的混合筆記</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/human-collection" className="font-mono text-purple-300/70 hover:text-white transition-colors text-sm">
                HUMAN
              </Link>
              <Link href="/kingdom-of-night" className="font-mono text-purple-300/70 hover:text-white transition-colors text-sm">
                NIGHT
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400/60" />
              <input
                type="text"
                placeholder="搜尋文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-purple-500/20 rounded-full text-purple-200 placeholder-purple-400/60 focus:outline-none focus:border-purple-400/50 font-mono text-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  selectedTag === 'all'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                    : 'bg-black/20 text-purple-400/70 border border-purple-500/20 hover:bg-purple-500/10'
                }`}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                      : 'bg-black/20 text-purple-400/70 border border-purple-500/20 hover:bg-purple-500/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Blog Posts */}
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                onClick={() => setSelectedPost(post)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${moodColors[post.mood]} group-hover:opacity-50 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="flex items-center gap-4 text-sm font-mono text-purple-400/60">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif text-purple-200 group-hover:text-white transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-purple-300/80 font-mono leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-purple-500/10 text-purple-400/80 text-xs font-mono rounded-full border border-purple-500/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-purple-400/60 text-sm">
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;