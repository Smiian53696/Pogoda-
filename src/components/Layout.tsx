import { NavLink, Outlet } from 'react-router-dom';
import { Search, Heart, CloudSun } from 'lucide-react';
import UnitSelector from './UnitSelector';

export default function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
      isActive
        ? 'bg-white/15 text-white border border-white/20 shadow-lg'
        : 'text-slate-300/80 hover:text-white hover:bg-white/10'
    }`;

  return ( //Główny kontener Layoutu
    <div className="min-h-screen text-slate-100 font-sans">
      {/* background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-[120px] floaty" />
        <div className="absolute top-40 -left-32 h-[460px] w-[460px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute -bottom-48 right-[-120px] h-[560px] w-[560px] rounded-full bg-fuchsia-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <nav className="sticky top-0 z-50">
        <div className="border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* brand */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl glass flex items-center justify-center">
                <CloudSun size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-tight">Weather</div>
                <div className="text-xs text-slate-300/70">dashboard</div>
              </div>
            </div>

            {/* links */}
            <div className="hidden sm:flex items-center gap-2 glass rounded-full p-1 ring-1 ring-white/10">
              <NavLink to="/" className={linkClass}>
                <Search size={16} /> Search
              </NavLink>
              <NavLink to="/favorites" className={linkClass}>
                <Heart size={16} /> Favorites
              </NavLink>
            </div>

            {/* unit */}
            <UnitSelector />
          </div>

          {/* mobile tabs */}
          <div className="sm:hidden px-4 pb-3">
            <div className="glass rounded-2xl p-2 flex gap-2 ring-1 ring-white/10">
              <NavLink to="/" className={linkClass}>
                <Search size={16} /> Search
              </NavLink>
              <NavLink to="/favorites" className={linkClass}>
                <Heart size={16} /> Favorites
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>

      <footer className="container mx-auto px-4 pb-10 pt-2 text-xs text-slate-300/60">
        Tip: try “Kyiv”, “Warsaw”, “London”.
      </footer>
    </div>
  );
}
