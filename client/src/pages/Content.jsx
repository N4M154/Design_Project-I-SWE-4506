// import { useEffect, useState } from "react";
// import SideButtons from "../components/SideButtons";

// const Content = () => {
//   const [articles, setArticles] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loadingArticles, setLoadingArticles] = useState(false);
//   const [loadingVideos, setLoadingVideos] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const fetchArticles = async () => {
//     setLoadingArticles(true);
//     try {
//       // Combine multiple topics with OR
//       const topics = [
//         "computer science",
//         "engineering",
//         "technology",
//         "coding",
//         "C programming language",
//         "CPP programming language",
//         "Java programming language",
//         "Python programming language",
//       ];
//       const query = topics.join(" OR ");

//       const response = await fetch(
//         `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//           query
//         )}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
//       );
//       const data = await response.json();
//       if (data.articles && data.articles.length > 0) {
//         const randomArticles = data.articles
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 6);
//         setArticles(randomArticles);
//       } else {
//         setArticles([]);
//       }
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//       setArticles([]);
//     } finally {
//       setLoadingArticles(false);
//     }
//   };

//   const fetchVideos = async () => {
//     setLoadingVideos(true);
//     try {
//       // List of topics to search for
//       const topics = [
//         "computer science",
//         "engineering",
//         "technology",
//         "coding",
//         "C programming language",
//         "CPP programming language",
//         "Java programming language",
//         "Python programming language",
//       ];

//       // Fetch videos for each topic and combine the results
//       const videoPromises = topics.map((topic) =>
//         fetch(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
//             topic
//           )}&type=video&maxResults=6&key=${
//             import.meta.env.VITE_GOOGLE_UTUBE_API_KEY
//           }`
//         ).then((response) => response.json())
//       );

//       // Wait for all requests to resolve
//       const videoResponses = await Promise.all(videoPromises);

//       // Combine all videos into a single array
//       const allVideos = videoResponses.flatMap((response) =>
//         response.items ? response.items : []
//       );

//       // Optional: Shuffle and limit the combined videos
//       const shuffledVideos = allVideos
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 6);

//       setVideos(shuffledVideos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//       setVideos([]);
//     } finally {
//       setLoadingVideos(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//     fetchVideos();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-[#18181b]">
//       <SideButtons />
//       <div
//         id="main-content"
//         className="flex-1 transition-all duration-300"
//         style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//       >
//         <div className="p-6 font-sans">
//           {/* Articles Section */}
//           <section className="mb-12">
//             <div className="bg-gradient-to-r from-yellow-500/80 dark:from-black dark:to-yellow-200/40 to-yellow-300/50 rounded-xl p-8 mb-8 shadow-sm dark:shadow-black">
//               <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-200 text-center mb-3">
//                 Discover the Power of Reading
//               </h1>
//               <p className="text-gray-600 dark:text-white text-center text-lg">
//                 Reading can help relax your mind, reduce stress, and improve
//                 mental well-being.
//               </p>
//             </div>

//             {loadingArticles ? (
//               <div className="flex justify-center items-center h-40">
//                 <div className="animate-pulse text-lg text-gray-600 dark:text-white">
//                   Loading articles...
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {articles.map((article, index) => (
//                   <div
//                     key={index}
//                     className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-yellow-200/50 transition-shadow duration-300"
//                   >
//                     {article.urlToImage && (
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={article.urlToImage}
//                           alt={article.title}
//                           className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     )}
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-black dark:text-[#f5f5f5] mb-4 line-clamp-2">
//                         {article.title}
//                       </h3>
//                       <a
//                         href={article.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center text-yellow-800 dark:text-yellow-100 hover:text-yellow-500 hover:underline dark:hover:text-yellow-300 font-medium"
//                       >
//                         Read more
//                         <svg
//                           className="w-4 h-4 ml-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="text-center mt-8">
//               <button
//                 onClick={fetchArticles}
//                 className="bg-yellow-100 dark:bg-transparent text-black dark:text-yellow-200 px-8 py-3 rounded-full font-semibold dark:border dark:border-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-100 dark:hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
//               >
//                 Load More Articles
//               </button>
//             </div>
//           </section>

//           {/* Videos Section */}
//           <section>
//             <div className="bg-gradient-to-r from-blue-100 dark:from-black dark:to-blue-950 to-indigo-50 rounded-xl p-8 mb-8 shadow-sm dark:shadow-black">
//               <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-3">
//                 Explore the World of Videos
//               </h1>
//               <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
//                 Videos can provide inspiration, practical tips, and insights to
//                 boost your mental well-being.
//               </p>
//             </div>

//             {loadingVideos ? (
//               <div className="flex justify-center items-center h-40">
//                 <div className="animate-pulse text-lg text-gray-600 dark:text-white">
//                   Loading videos...
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {videos.map((video, index) => (
//                   <div
//                     key={index}
//                     className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg dark:shadow-black hover:shadow-xl dark:hover:shadow-blue-950 transition-shadow duration-300"
//                   >
//                     <div className="relative h-48 overflow-hidden group">
//                       <img
//                         src={video.snippet.thumbnails.high.url}
//                         alt={video.snippet.title}
//                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-800 dark:text-blue-100 mb-4 line-clamp-2">
//                         {video.snippet.title}
//                       </h3>
//                       <a
//                         href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:text-indigo-700 font-medium"
//                       >
//                         Watch now
//                         <svg
//                           className="w-4 h-4 ml-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="text-center mt-8">
//               <button
//                 onClick={fetchVideos}
//                 className="bg-indigo-50 dark:bg-blue-950 dark:border dark:border-blue-700 text-indigo-600 px-8 py-3 rounded-full font-semibold dark:hover:bg-indigo-100 hover:bg-indigo-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
//               >
//                 Load More Videos
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Content;






import { BookOpen, Calendar, Clock, ExternalLink, RefreshCw, Youtube } from 'lucide-react';
import { useEffect, useState } from "react";
import SideButtons from "../components/SideButtons";

const Content = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('articles');

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const topics = [
        "computer science",
        "engineering",
        "technology",
        "coding",
        "C programming language",
        "CPP programming language",
        "Java programming language",
        "Python programming language",
      ];
      const query = topics.join(" OR ");

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        const randomArticles = data.articles
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setArticles(randomArticles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  };

  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const topics = [
        "computer science",
        "engineering",
        "technology",
        "coding",
        "C programming language",
        "CPP programming language",
        "Java programming language",
        "Python programming language",
      ];

      const videoPromises = topics.map((topic) =>
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            topic
          )}&type=video&maxResults=6&key=${
            import.meta.env.VITE_GOOGLE_UTUBE_API_KEY
          }`
        ).then((response) => response.json())
      );

      const videoResponses = await Promise.all(videoPromises);
      const allVideos = videoResponses.flatMap((response) =>
        response.items ? response.items : []
      );
      const shuffledVideos = allVideos
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      setVideos(shuffledVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDF7]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="p-8 font-sans max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
          <h1 className="text-4xl font-bold text-yellow-600 mb-4 text-center">
  Unlock Knowledge, One Click at a Time!
</h1>
<p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
  Stay ahead with expertly curated articles and videos, designed to supercharge your programming skills.
</p>


          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-sm p-1 inline-flex">
              <button
                onClick={() => setActiveTab('articles')}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'articles'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Articles
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'videos'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Youtube className="w-4 h-4 mr-2" />
                Videos
              </button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Articles Section */}
            <section className={activeTab === 'articles' ? 'block' : 'hidden'}>
              {loadingArticles ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article, index) => (
                    <article
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                    >
                      {article.urlToImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {calculateReadTime(article.content)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-yellow-800 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.description}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-yellow-700 hover:text-yellow-800 font-medium group"
                        >
                          Read article
                          <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <button
                  onClick={fetchArticles}
                  className="bg-white text-yellow-700 px-8 py-3 rounded-full font-medium border-2 border-yellow-100 hover:bg-yellow-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 inline-flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Load More Articles
                </button>
              </div>
            </section>

            {/* Videos Section */}
            <section className={activeTab === 'videos' ? 'block' : 'hidden'}>
              {loadingVideos ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                    >
                      <div className="relative h-48 overflow-hidden group">
                        <img
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 p-3 rounded-full">
                            <Youtube className="w-6 h-6 text-red-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(video.snippet.publishedAt)}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-yellow-800 transition-colors">
                          {video.snippet.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {video.snippet.description}
                        </p>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-yellow-700 hover:text-yellow-800 font-medium group"
                        >
                          Watch video
                          <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <button
                  onClick={fetchVideos}
                  className="bg-white text-yellow-700 px-8 py-3 rounded-full font-medium border-2 border-yellow-100 hover:bg-yellow-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 inline-flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Load More Videos
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;