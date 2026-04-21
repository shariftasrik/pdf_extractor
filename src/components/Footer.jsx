export default function Footer() {
  return (
    <div className="mt-20 border-t border-[#1e1e28] pt-6 pb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">

        {/* Left */}
        <div className="text-[10px] text-[#6b6558] uppercase tracking-[0.12em]">
          PDF Extractor
        </div>

        {/* Center */}
        <div className="flex items-center gap-4 ml-2">
          <div className="w-7 h-7 bg-[#ffdc64] flex items-center justify-center font-extrabold text-[#0a0a0f] mr-1">
            T
          </div>
          <span className="font-['Syne'] text-base font-extrabold tracking-tight">
            Tasrik
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-[#6b6558] text-sm">

          <a
            href="https://github.com/shariftasrik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffdc64] transition"
          >
            GitHub
          </a>

          <a
            href="https://twitter.com/tasrik_12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffdc64] transition"
          >
            Twitter
          </a>

          <a
            href="https://www.linkedin.com/in/nimur-rahman-sharif-946108349/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffdc64] transition"
          >
            LinkedIn
          </a>

        </div>

      </div>
    </div>
  );
}