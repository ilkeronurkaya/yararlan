import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#f1f4f6] dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-12 py-16 border-t border-[#abb3b7]/15">
      <div className="text-[12px] uppercase tracking-widest font-medium text-[#575e70] dark:text-slate-400 mb-8 md:mb-0">
        © {new Date().getFullYear()} Yararlan. Built for the Digital Curator.
      </div>
      <div className="flex gap-10">
        {/* Legacy links stripped securely for Phase 2 stability */}
        {/* We can reactivate these safely once the specific page endpoints are physically completed visually in Next.js structure. */}
      </div>
    </footer>
  );
};

export default Footer;
