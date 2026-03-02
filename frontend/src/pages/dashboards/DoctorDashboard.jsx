import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Stethoscope,
    Calendar,
    ArrowUpRight,
    Clock,
    ChevronRight,
    Activity,
    CheckCircle2,
    FlaskConical,
    X,
    Plus,
    UserPlus,
    ShieldAlert,
    Save,
    Trash2,
    Loader2
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { requestApi } from '@/services/api'

export default function DoctorDashboard() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [requests, setRequests] = useState([])
    const [pendingRequestIds, setPendingRequestIds] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [processingId, setProcessingId] = useState(null)
    const [stats, setStats] = useState([
        { label: 'Active Roster', value: '0', icon: <Users className="w-5 h-5 text-blue-400" />, trend: 'Synchronized' },
        { label: 'Pending Action', value: '0', icon: <Stethoscope className="w-5 h-5 text-emerald-400" />, trend: 'Priority list' },
        { label: 'Completed Cases', value: '0', icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, trend: 'Total Processed' },
        { label: 'Total Admissions', value: '0', icon: <Plus className="w-5 h-5 text-indigo-400" />, trend: 'Historical' }
    ])

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

            // Update stats
            const pendingCount = pendingIds.length
            const completedCount = allRequests.filter(r => r.status === 'Completed').length

            setStats(prev => prev.map(s => {
                if (s.label === 'Active Roster') return { ...s, value: allRequests.length.toString() }
                if (s.label === 'Pending Action') return { ...s, value: pendingCount.toString() }
                if (s.label === 'Completed Cases') return { ...s, value: completedCount.toString() }
                if (s.label === 'Total Admissions') return { ...s, value: allRequests.length.toString() }
                return s
            }))
        } catch (err) {
            console.error('Failed to fetch doctor dashboard data:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const pendingRequests = requests.filter(r => pendingRequestIds.includes(r._id))
    const historyRequests = requests.filter(r => !pendingRequestIds.includes(r._id))

    const handleApprove = async (requestId) => {
        setProcessingId(requestId)
        try {
            await requestApi.approveStage({ requestId, department: 'Doctor' })
            await fetchDashboardData()
        } catch (err) {
            console.error('Failed to approve stage:', err)
            alert(err.response?.data || "Approval failed")
        } finally {
            setProcessingId(null)
        }
    }

    const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false)
    const [newPatient, setNewPatient] = useState({ name: '', condition: '', status: 'Stable' })

    const handleAdmitPatient = async (e) => {
        e.preventDefault()
        // For now, this is just a simulator as per original design
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsAdmitModalOpen(false)
    }

    return (
        <div className="space-y-10 relative">
            <AnimatePresence>
                {isAdmitModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                            onClick={() => setIsAdmitModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 shadow-3xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                <UserPlus className="w-32 h-32" />
                            </div>

                            <button onClick={() => setIsAdmitModalOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic font-serif">ADMIT PATIENT</h2>
                            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-10">Neural Protocol Activation</p>

                            <form onSubmit={handleAdmitPatient} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Full Patient Prototype Name</label>
                                    <input
                                        required
                                        value={newPatient.name}
                                        onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                                        type="text"
                                        placeholder="Enter Medical Identity..."
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#61DAFB]/50 text-white font-bold transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Clinical Condition Hash</label>
                                    <input
                                        required
                                        value={newPatient.condition}
                                        onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })}
                                        type="text"
                                        placeholder="Diagnosis Key..."
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#61DAFB]/50 text-white font-bold transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Initial Authority Status</label>
                                    <div className="relative">
                                        <select
                                            value={newPatient.status}
                                            onChange={e => setNewPatient({ ...newPatient, status: e.target.value })}
                                            className="w-full h-14 bg-zinc-800 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#61DAFB]/50 text-white font-bold appearance-none transition-all relative z-10"
                                        >
                                            <option value="Stable" className="bg-zinc-900 text-white font-bold">Stable</option>
                                            <option value="Critical" className="bg-zinc-900 text-white font-bold">Critical</option>
                                            <option value="Recovering" className="bg-zinc-900 text-white font-bold">Recovering</option>
                                            <option value="Discharge Ready" className="bg-zinc-900 text-white font-bold">Discharge Ready</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                                            <ChevronRight className="w-5 h-5 text-zinc-500 rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="w-full h-16 bg-[#0D9488] hover:bg-[#14b8a6] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 mt-4"
                                >
                                    <ShieldAlert className="w-4 h-4" />
                                    Finalize Admission Protocol
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic uppercase font-serif underline decoration-[#61DAFB]/30 underline-offset-8">Dr. {user.name}</h1>
                    <p className="text-zinc-500 font-medium tracking-tight">Clinical Staff Authority Level: {user.qualification || 'Senior Consultant'} // Operational Sync Active.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchDashboardData} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold flex items-center gap-2">
                        Refresh Sync
                    </button>
                    <button
                        onClick={() => setIsAdmitModalOpen(true)}
                        className="px-6 py-3 rounded-2xl bg-[#0D9488] hover:bg-[#0D9488]/90 transition-colors text-white text-sm font-black flex items-center gap-2 shadow-lg shadow-[#0D9488]/20"
                    >
                        <Plus className="w-4 h-4" />
                        Admit New Patient
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[3rem] bg-zinc-950 border border-white/5 hover:border-[#61DAFB]/20 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#61DAFB]/10 transition-colors duration-500 text-zinc-400 group-hover:text-[#61DAFB]">
                                {stat.icon}
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-[#61DAFB] transition-colors" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tighter mb-3">{stat.value}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] italic">
                                <CheckCircle2 className="w-3 h-3" /> {stat.trend}
                            </div>
                        </div>
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,#61DAFB,transparent_60%)] group-hover:opacity-20 transition-opacity duration-700" />
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Patient Roster Display */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Pending Actions Section */}
                    {pendingRequests.length > 0 && (
                        <div className="p-10 rounded-[3rem] bg-[#61DAFB]/5 border border-[#61DAFB]/20 relative overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-4 italic font-serif uppercase">
                                    <Clock className="w-6 h-6 text-[#61DAFB] animate-pulse" /> Pending Clinical Actions
                                </h2>
                                <span className="px-3 py-1 rounded-full bg-[#61DAFB] text-zinc-950 text-[10px] font-black uppercase tracking-widest">{pendingRequests.length} Immediate</span>
                            </div>
                            <div className="space-y-4 relative z-10">
                                {pendingRequests.map(req => (
                                    <div key={req._id} className="p-6 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-between group hover:border-[#61DAFB]/30 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-[#61DAFB]/10 flex items-center justify-center text-[#61DAFB] font-black italic">
                                                {req.patientName?.charAt(0) || req.patientName?.[0] || 'P'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm mb-1">{req.patientName}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">ID: {req._id.slice(-6).toUpperCase()}</span>
                                                    <span className="text-[10px] font-black text-[#61DAFB] uppercase tracking-widest leading-none">Workflow: {req.workflowType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => handleApprove(req._id)}
                                            isLoading={processingId === req._id}
                                            className="h-12 px-6 bg-[#61DAFB] hover:bg-white text-zinc-950 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#61DAFB]/10"
                                        >
                                            Verify & Approve
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#61DAFB]/10 to-transparent blur-3xl opacity-50 -z-0" />
                        </div>
                    )}

                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 relative overflow-hidden shadow-2xl min-h-[500px]">
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-4 italic font-serif uppercase">
                                <span className="w-10 h-1 bg-zinc-700 rounded-full inline-block" /> Clinical History
                            </h2>
                            <div className="flex gap-4">
                                <button className="px-4 py-2 rounded-xl bg-white/5 font-black text-[10px] uppercase tracking-widest text-zinc-400">Records: {historyRequests.length}</button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="w-10 h-10 text-[#61DAFB] animate-spin" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black">
                                            <th className="pb-6 pl-4">Patient Prototype</th>
                                            <th className="pb-6">Protocol Type</th>
                                            <th className="pb-6 text-center">Current Progress</th>
                                            <th className="pb-6">Authority Status</th>
                                            <th className="pb-6 pr-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <AnimatePresence>
                                            {historyRequests.map((p, i) => (
                                                <motion.tr
                                                    key={p._id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                                                >
                                                    <td className="py-6 pl-4">
                                                        <div className="flex items-center gap-4 text-left">
                                                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center font-black text-[10px] text-zinc-400 group-hover:text-white group-hover:border-[#61DAFB]/30 transition-all">
                                                                {p.patientName?.[0] || 'P'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-white text-sm tracking-tight">{p.patientName}</p>
                                                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">ARCHIVE-{p._id.slice(-4).toUpperCase()}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 font-medium text-sm text-zinc-400 italic font-serif opacity-60 group-hover:opacity-100 transition-opacity">{p.workflowType}</td>
                                                    <td className="py-6">
                                                        <div className="flex items-center gap-2 max-w-[120px] mx-auto">
                                                            {p.stages?.map((s, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`h-1.5 flex-1 rounded-full ${s.approved ? 'bg-emerald-500' : idx === p.currentStageIndex ? 'bg-[#61DAFB] animate-pulse' : 'bg-zinc-800'}`}
                                                                    title={s.department}
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="py-6">
                                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all inline-block ${p.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-zinc-800 text-zinc-500 border-white/5'}`}>
                                                            {p.status}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 pr-4 text-right">
                                                        <button className="p-2 rounded-xl bg-white/5 hover:bg-[#61DAFB]/20 hover:text-[#61DAFB] transition-all">
                                                            <Activity className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                                {historyRequests.length === 0 && (
                                    <div className="py-20 text-center opacity-30">
                                        <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
                                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs italic">No Archive Records Detected</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Side Queue */}
                <div className="space-y-8">
                    <div className="p-10 rounded-[3.5rem] bg-[#0E2A47] border border-white/5 shadow-3xl text-center relative overflow-hidden group">
                        <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-2xl relative z-10">
                            <FlaskConical className="w-10 h-10 text-[#61DAFB]" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tighter relative z-10 italic uppercase font-serif">Diagnostic Lab</h3>
                        <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-8 relative z-10">
                            Institutional verification for Lab results is critical for patient recovery and discharge protocol.
                        </p>
                        <button className="w-full py-4 rounded-2xl bg-[#61DAFB] hover:bg-white text-zinc-950 font-black text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_10px_40px_rgba(97,218,251,0.2)]">
                            Authorize Synchronization
                        </button>
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-45">
                            <Clock className="w-48 h-48 text-white" />
                        </div>
                    </div>

                    <div className="p-8 rounded-[3rem] bg-zinc-950 border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest italic flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#61DAFB] rounded-full animate-pulse" /> Neural Feed
                            </h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Live Updates</p>
                        </div>
                        <div className="space-y-6">
                            {requests.slice(0, 3).map((req, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="text-[9px] font-black text-[#61DAFB] uppercase tracking-widest w-16">
                                        {new Date(req.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="flex-1 text-xs font-bold text-zinc-400 group-hover:text-white transition-colors tracking-tight">
                                        {req.status} status for {req.patientName}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
