interface ConfessionCardProps {
  content: string;
  createdAt: number;
}

export default function ConfessionCard({ content, createdAt }: ConfessionCardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300 p-6">
      <div className="space-y-3">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
          {content}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-white/5">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <span>Anonymous</span>
          </div>
          
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(createdAt)}
          </time>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}