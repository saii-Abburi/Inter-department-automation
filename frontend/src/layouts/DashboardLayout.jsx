import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { Bell, Search, Activity, Terminal } from 'lucide-react'

export default function DashboardLayout({ children, role }) {
    return (
        <div className="flex bg-zinc-950 min-h-screen text-white font-sans selection:bg-[#61DAFB] selection:text-black">
            {/* Sidebar */}
            <Sidebar role={role} />

            {/* Main Content Areas */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Global Neural Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 glass-dashboard sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-3xl">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl w-80">
                            <Search className="w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search clinical data, patients, or logs..."
                                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Protocol Status</p>
                            <p className="text-sm font-bold text-green-400 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> All Systems Nominal
                            </p>
                        </div>

                        <div className="w-px h-8 bg-white/5" />

                        <div className="flex gap-3">
                            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors relative">
                                <Bell className="w-5 h-5 text-zinc-400" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-[#61DAFB] rounded-full" />
                            </button>
                            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <Terminal className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <div className="flex-1 p-10 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={role}
                        className="max-w-7xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/5 rounded-full blur-[160px] pointer-events-none" />
            </main>
        </div>
    )
}
