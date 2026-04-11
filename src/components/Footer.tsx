import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#f1f4f6] dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-12 py-16 border-t border-[#abb3b7]/15">
      <div className="text-[12px] uppercase tracking-widest font-medium text-[#575e70] dark:text-slate-400 mb-8 md:mb-0">
        © {new Date().getFullYear()} Yararlan. Built for the Digital Curator.
      </div>
      <div className="flex gap-10">
        <Link 
          href="/privacy" 
          className="text-[12px] uppercase tracking-widest font-medium text-[#575e70]/60 dark:text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all"
        >
          Privacy
        </Link>
        <Link 
          href="/terms" 
          className="text-[12px] uppercase tracking-widest font-medium text-[#575e70]/60 dark:text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all"
        >
          Terms
        </Link>
        <Link 
          href="/submit" 
          className="text-[12px] uppercase tracking-widest font-medium text-[#575e70]/60 dark:text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all"
        >
          Submit Tool
        </Link>
        <Link 
          href="/archive" 
          className="text-[12px] uppercase tracking-widest font-medium text-[#575e70]/60 dark:text-slate-500 hover:text-primary hover:underline underline-offset-4 transition-all"
        >
          Archive
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
