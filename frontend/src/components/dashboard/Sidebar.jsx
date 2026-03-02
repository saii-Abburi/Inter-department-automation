import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    Activity,
    Stethoscope,
    Building2,
    CreditCard,
    FlaskConical,
    Pill,
    ShieldCheck
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ role }) {
    const location = useLocation()

    const menuItems = {
        Patient: [
            { id: 'overview', label: 'My Health', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/patient' },
            { id: 'medical-history', label: 'Medical History', icon: <FileText className="w-5 h-5" />, path: '/dashboard/patient/history' },
            { id: 'billing', label: 'Bills & Insurance', icon: <CreditCard className="w-5 h-5" />, path: '/dashboard/patient/billing' },
        ],
        Doctor: [
            { id: 'overview', label: 'Doctor Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/doctor' },
            { id: 'patients', label: 'Patient Roster', icon: <Users className="w-5 h-5" />, path: '/dashboard/doctor/patients' },
            { id: 'records', label: 'Clinical Records', icon: <FileText className="w-5 h-5" />, path: '/dashboard/doctor/records' },
        ],
        Staff: [
            { id: 'overview', label: 'Operations', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/staff' },
            { id: 'lab', label: 'Lab Reports', icon: <FlaskConical className="w-5 h-5" />, path: '/dashboard/staff/lab' },
            { id: 'pharmacy', label: 'Pharmacy Sync', icon: <Pill className="w-5 h-5" />, path: '/dashboard/staff/pharmacy' },
            { id: 'billing', label: 'Financials', icon: <CreditCard className="w-5 h-5" />, path: '/dashboard/staff/billing' },
            { id: 'insurance', label: 'Insurance Ops', icon: <ShieldCheck className="w-5 h-5" />, path: '/dashboard/staff/insurance' },
        ]
    }

    const currentMenu = menuItems[role] || []

    return (
        <div className="w-72 h-screen bg-zinc-950 border-r border-white/5 flex flex-col p-6 sticky top-0 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#61DAFB] to-[#0D9488] rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-white tracking-tighter text-xl italic uppercase font-serif">H-FLOW</span>
            </div>

            <div className="flex-1 flex flex-col gap-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 px-2">Main Menu</p>
                {currentMenu.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link key={item.id} to={item.path}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300
                  ${isActive
                                        ? 'bg-[#61DAFB]/10 text-[#61DAFB] shadow-[0_0_20px_rgba(97,218,251,0.1)]'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                `}
                            >
                                {item.icon}
                                <span className="text-sm tracking-tight">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1.5 h-1.5 bg-[#61DAFB] rounded-full shadow-[0_0_10px_#61DAFB]"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-1">
                <button className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm tracking-tight">Access Settings</span>
                </button>
                <Link to="/auth">
                    <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-red-500/80 hover:text-red-400 hover:bg-red-500/10 transition-all text-left">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm tracking-tight">Logout Protocol</span>
                    </button>
                </Link>
            </div>

            {/* User Status */}
            <div className="mt-8 p-4 rounded-3xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-black text-white">
                        {role[0]}
                    </div>
                    <div>
                        <p className="text-xs font-black text-white">{role} User</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> Live Now
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
