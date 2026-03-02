import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building2,
    FlaskConical,
    Pill,
    CreditCard,
    ShieldCheck,
    Terminal,
    ArrowRight,
    ChevronRight,
    Activity,
    Clock,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    Search,
    Loader2
} from 'lucide-react'
import { requestApi } from '@/services/api'

export default function StaffDashboard() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [requests, setRequests] = useState([])
    const [pendingRequestIds, setPendingRequestIds] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProcessingId, setIsProcessingId] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [departments, setDepartments] = useState([
        { name: 'Billing', status: 'Operational', icon: <CreditCard className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-500', load: '0 Bills Pending' },
        { name: 'Lab', status: 'Processing', icon: <FlaskConical className="w-5 h-5" />, color: 'bg-[#61DAFB]/10 text-[#61DAFB]', load: '0 Reports Syncing' },
        { name: 'Pharmacy', status: 'Optimal', icon: <Pill className="w-5 h-5" />, color: 'bg-red-500/10 text-red-500', load: 'Inventories Synced' },
        { name: 'Registry', status: 'Operational', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-indigo-500/10 text-indigo-500', load: 'Records Verified' }
    ])

    const [stats, setStats] = useState([
        { label: 'Total Revenue Protocol', value: '$0.00', icon: <TrendingUp className="w-5 h-5" />, trend: 'Synchronized', color: 'text-emerald-400' },
        { label: 'Global Active Tasks', value: '0', icon: <CheckCircle2 className="w-5 h-5" />, trend: 'System Nominal', color: 'text-[#61DAFB]' },
        { label: 'Avg Process Time', value: '3.4m', icon: <Clock className="w-5 h-5" />, trend: 'Optimized', color: 'text-cyan-400' },
        { label: 'System Security', value: '99.9%', icon: <ShieldCheck className="w-5 h-5" />, trend: 'AES-256 Active', color: 'text-indigo-400' }
    ])

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setIsLoading(true)
        try {
            const res = await requestApi.getRequestsForUser(user.id)
            const allRequests = res.data.requests || []
            const pendingIds = res.data.pendingRequestIds || []

            setRequests(allRequests)
            setPendingRequestIds(pendingIds)

            // Map requests to tasks for this specific staff role
            const roleTasks = allRequests
                .filter(req => pendingIds.includes(req._id))
                .map(req => ({
                    id: req._id,
                    department: req.stages[req.currentStageIndex]?.department || 'N/A',
                    description: `${req.workflowType} for ${req.patientName}`,
                    priority: req.workflowType?.includes('Unified') || req.workflowType?.includes('Comprehensive') ? 'Critical' : 'High',
                    time: new Date(req.updatedAt).toLocaleTimeString(),
                    isProcessing: false
                }))

            setTasks(roleTasks)

            // Update stats
            const totalRevenue = allRequests.reduce((acc, req) => acc + (req.MedicineCost || 0) + (req.LabCharges || 0), 0);
            setStats(prev => prev.map(s => {
                if (s.label === 'Global Active Tasks') return { ...s, value: roleTasks.length.toString() }
                if (s.label === 'Total Revenue Protocol') return { ...s, value: `$${totalRevenue.toFixed(2)}` }
                return s
            }))

            // Update department loads
            setDepartments(prev => prev.map(d => {
                const deptLoad = allRequests.filter(r => r.stages[r.currentStageIndex]?.department === d.name).length
                return { ...d, load: `${deptLoad} ${d.name === 'Pharmacy' ? 'Pending' : 'Syncing'}` }
            }))

        } catch (err) {
            console.error('Failed to fetch staff dashboard data:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const processTask = async (requestId) => {
        setIsProcessingId(requestId)
        try {
            await requestApi.approveStage({ requestId, department: user.role })
            await fetchDashboardData()
        } catch (err) {
            console.error('Failed to process task:', err)
            alert(err.response?.data || "Task processing failed")
        } finally {
            setIsProcessingId(null)
        }
    }

    const refreshSystems = async () => {
        setIsRefreshing(true)
        await fetchDashboardData()
        setIsRefreshing(false)
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Dynamic Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase font-serif drop-shadow-[0_0_30px_rgba(97,218,251,0.2)]">Department Operations</h1>
                    <p className="text-zinc-500 font-medium tracking-tight flex items-center gap-3">
                        <span className="w-3 h-3 bg-[#61DAFB] rounded-full animate-pulse blur-[2px]" /> Central Institutional Management Dashboard // V1.4
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={refreshSystems}
                        disabled={isRefreshing}
                        className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Syncing...' : 'Neural Sync'}
                    </button>
                    <button className="px-6 py-4 rounded-2xl bg-[#0E2A47] hover:bg-zinc-800 transition-colors text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-[#61DAFB]" /> Access Shell
                    </button>
                </div>
            </div>

            {/* Hero Department Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[3.5rem] bg-zinc-950 border border-white/5 hover:border-[#61DAFB]/20 transition-all duration-700 group relative overflow-hidden"
                    >
                        <div className={`w-14 h-14 rounded-[1.5rem] ${dept.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                            {dept.icon}
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 tracking-tighter uppercase italic font-serif ">{dept.name}</h3>
                        <p className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest mb-6">{dept.status}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <span className="text-[10px] font-black text-[#61DAFB] uppercase tracking-[0.2em]">{dept.load}</span>
                            <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Operational KPI Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Central Management Queue */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-12 rounded-[4rem] bg-white/5 border border-white/5 shadow-3xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <h2 className="text-lg font-black text-white tracking-[0.2em] uppercase flex items-center gap-4 italic font-serif">
                                <Activity className="w-6 h-6 text-[#61DAFB] animate-pulse" /> Unified Task Protocol
                            </h2>
                            <div className="flex items-center gap-4 bg-zinc-950/50 p-2 rounded-2xl border border-white/5">
                                <Search className="w-4 h-4 text-zinc-600 ml-2" />
                                <input placeholder="Filter Tasks..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase text-white pb-0.5" />
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <AnimatePresence mode="popLayout">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <Loader2 className="w-10 h-10 text-[#61DAFB] animate-spin" />
                                    </div>
                                ) : tasks.map((task, i) => {
                                    const fullRequest = requests.find(r => r._id === task.id);
                                    return (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                            layout
                                            className="p-8 rounded-[2.5rem] bg-zinc-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:border-[#61DAFB]/20 transition-all duration-500"
                                        >
                                            <div className="flex items-center gap-8 mb-6 md:mb-0">
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex flex-col items-center justify-center shadow-inner group-hover:bg-[#61DAFB]/5 group-hover:border-[#61DAFB]/10 border border-transparent transition-all">
                                                    <p className="text-[10px] font-black text-zinc-600 group-hover:text-[#61DAFB] uppercase tracking-[0.2em]">{task.department}</p>
                                                    <p className="text-[8px] font-black text-zinc-500 truncate w-12 text-center">{task.id.slice(-6).toUpperCase()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-white tracking-tight mb-2 italic text-left">{task.description}</p>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-4">
                                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${task.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-[#61DAFB]/10 text-[#61DAFB] border-[#61DAFB]/20'}`}>
                                                                {task.priority} Priority
                                                            </span>
                                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                                                <Clock className="w-3 h-3" /> {task.time}
                                                            </span>
                                                        </div>
                                                        {/* Linear Progress for the staff dashboard */}
                                                        <div className="flex gap-1 h-1 w-48 bg-zinc-900 rounded-full overflow-hidden">
                                                            {fullRequest?.stages.map((s, idx) => (
                                                                <div key={idx} className={`h-full flex-1 ${s.approved ? 'bg-emerald-500/50' : idx === fullRequest.currentStageIndex ? 'bg-[#61DAFB]' : 'bg-transparent'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => processTask(task.id)}
                                                disabled={isProcessingId === task.id}
                                                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white text-zinc-400 hover:text-zinc-950 transition-all duration-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                                            >
                                                {isProcessingId === task.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ChevronRight className="w-3 h-3" />}
                                                {isProcessingId === task.id ? 'Processing...' : 'Authorize Action'}
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {!isLoading && tasks.length === 0 && (
                                <div className="py-20 flex flex-col items-center justify-center bg-zinc-950/50 rounded-[3rem] border border-white/5 border-dashed">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4 opacity-50" />
                                    <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Queue Optimized - Zero Pending Protocols</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Global Financial Metrics */}
                <div className="space-y-8 text-left">
                    <div className="p-12 rounded-[4rem] bg-zinc-950 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] italic mb-12 flex items-center gap-4 text-left">
                            <TrendingUp className="w-5 h-5 text-emerald-500" /> Operational Metrics
                        </h3>

                        <div className="space-y-10 flex-1 relative z-10">
                            {stats.map((stat, i) => (
                                <div key={i} className="group-hover:translate-x-2 transition-transform duration-500 text-left">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                                        <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black text-white tracking-tighter mb-2 italic font-serif">
                                        {stat.value}
                                    </p>
                                    <p className={`text-[10px] font-bold ${stat.color} opacity-60 uppercase tracking-widest italic flex items-center gap-2`}>
                                        <span className="w-1 h-1 bg-current rounded-full" /> {stat.trend}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={refreshSystems}
                            className="mt-20 w-full py-6 rounded-[2rem] bg-[#61DAFB] hover:bg-white transition-all duration-700 text-zinc-950 font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(97,218,251,0.1)] relative z-10 group-hover:-translate-y-2"
                        >
                            {isRefreshing ? 'Synchronizing...' : 'Neural Sync Active'}
                        </button>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                            <h4 className="text-xs font-black text-white uppercase tracking-widest">Emergency Alerts</h4>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">System monitoring active. All sub-protocols operating within nominal parameters.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
