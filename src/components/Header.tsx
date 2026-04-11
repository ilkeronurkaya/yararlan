import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full top-0 sticky bg-[#f8f9fa]/80 dark:bg-slate-900/80 backdrop-blur-xl z-50">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-[1440px] mx-auto font-['Inter'] antialiased tracking-tight">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#2b3437] dark:text-slate-100 cursor-pointer transition-opacity active:opacity-70">
          Yararlan
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-[#2b3437] dark:text-white font-medium hover:text-[#2b3437] dark:hover:text-white transition-colors duration-300">
            Directory
          </Link>
          <Link href="/?filter=featured" className="text-[#575e70]/70 dark:text-slate-400 hover:text-[#2b3437] dark:hover:text-white transition-colors duration-300">
            Featured
          </Link>
          <Link href="/curations" className="text-[#575e70]/70 dark:text-slate-400 hover:text-[#2b3437] dark:hover:text-white transition-colors duration-300">
            Curations
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-[#575e70] dark:text-slate-300 text-sm font-medium hover:text-[#2b3437] transition-colors duration-300">
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
