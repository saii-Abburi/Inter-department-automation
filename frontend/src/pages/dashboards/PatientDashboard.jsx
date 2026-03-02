import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    History,
    CreditCard,
    Activity,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    ArrowUpRight,
    X,
    Wallet,
    FileText,
    Download,
    Plus,
    Loader2
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { requestApi, workflowApi } from '@/services/api'

export default function PatientDashboard() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState([
        { id: 1, label: 'Treatment Visits', value: '0', icon: <History className="w-5 h-5 text-blue-400" />, trend: 'Active cases' },
        { id: 2, label: 'Current Medicine Cost', value: '$0.00', icon: <CreditCard className="w-5 h-5 text-emerald-400" />, trend: 'Pending bill', isPayable: false },
        { id: 3, label: 'Lab Charges', value: '$0.00', icon: <Activity className="w-5 h-5 text-cyan-400" />, trend: 'Finalized', isPayable: false },
        { id: 4, label: 'Insurance Claim', value: '0', icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />, trend: 'In Progress' }
    ])

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
    const [activePayment, setActivePayment] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [workflowType, setWorkflowType] = useState('Unified Clinical Episode')
    const [activeTab, setActiveTab] = useState('HISTORY') // HISTORY, RECORDS, BILLING

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setIsLoading(true)
        try {
            const res = await requestApi.getRequestsForUser(user.id)
            const updatedUser = res.data.user;
            setRequests(res.data.requests)
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))

            // Update stats based on real data from backend
            setStats(prev => prev.map(s => {
                if (s.id === 1) return { ...s, value: (updatedUser.treatmentvisits || res.data.requests.length).toString() }
                if (s.id === 2) return { ...s, value: `$${(updatedUser.MedicineCost || 0).toFixed(2)}`, isPayable: (updatedUser.MedicineCost || 0) > 0 }
                if (s.id === 3) return { ...s, value: `$${(updatedUser.LabCharges || 0).toFixed(2)}`, isPayable: (updatedUser.LabCharges || 0) > 0 }
                if (s.id === 4) return { ...s, value: (updatedUser.insuranceClaim || 0).toString() }
                return s
            }))
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const activeRequest = requests.find(r => r.status === 'In Progress') || requests[0];

    const handleCreateRequest = async (e) => {
        e.preventDefault()
        setIsProcessing(true)
        try {
            await requestApi.createRequest({ workflowType })
            await fetchDashboardData()
            setIsRequestModalOpen(false)
        } catch (err) {
            console.error('Failed to create request:', err)
            if (err.response?.status === 404) {
                try {
                    // Seed the requested workflow if missing
                    let stages = [];
                    if (workflowType === 'Unified Clinical Episode') {
                        stages = [
                            { department: 'Doctor', order: 0 },         // Doctor Approval
                            { department: 'Lab', order: 1 },            // Lab: Test Request
                            { department: 'Lab', order: 2 },            // Lab: Sample Collection
                            { department: 'Billing', order: 3 },        // Lab Payment
                            { department: 'Lab', order: 4 },            // Lab: Result Finalization
                            { department: 'Pharmacy', order: 5 },       // Pharma Clearance
                            { department: 'Billing', order: 6 },        // Main Billing Process
                            { department: 'Insurance', order: 7 },      // Insurance Approval
                            { department: 'Admin', order: 8 },          // Final Admit Checkout
                            { department: 'Admin', order: 9 }           // Discharge Completed
                        ];
                    } else if (workflowType === 'Direct Diagnostic') {
                        stages = [
                            { department: 'Lab', order: 0 },            // Test Request
                            { department: 'Lab', order: 1 },            // Sample Collection
                            { department: 'Billing', order: 2 },        // Payment Done
                            { department: 'Lab', order: 3 }             // Test Completed
                        ];
                    } else {
                        // Sparse Consultation
                        stages = [
                            { department: 'Doctor', order: 0 },
                            { department: 'Pharmacy', order: 1 },
                            { department: 'Billing', order: 2 }
                        ];
                    }

                    await workflowApi.createWorkflow({ name: workflowType, stages });
                    await requestApi.createRequest({ workflowType })
                    await fetchDashboardData()
                    setIsRequestModalOpen(false)
                } catch (e2) {
                    alert(`Workflow template '${workflowType}' could not be initialized.`)
                }
            } else {
                alert(err.response?.data || "Request creation failed")
            }
        } finally {
            setIsProcessing(false)
        }
    }

    const initiatePayment = (stat) => {
        setActivePayment(stat)
        setIsPaymentModalOpen(true)
        setIsSuccess(false)
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate Neural Payment Protocol
        await new Promise(resolve => setTimeout(resolve, 2500))

        setStats(prev => prev.map(s =>
            s.id === activePayment.id
                ? { ...s, value: '$0.00', trend: 'Cleared', isPayable: false }
                : s
        ))

        setIsSuccess(true)
        setIsProcessing(false)

        // Auto-close after 2s of success
        setTimeout(() => {
            setIsPaymentModalOpen(false)
        }, 2000)
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Payment Modal */}
            <AnimatePresence>
                {isPaymentModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                            onClick={() => setIsPaymentModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[3rem] p-10 shadow-3xl overflow-hidden"
                        >
                            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-[#61DAFB]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                    {isSuccess ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <Wallet className="w-10 h-10 text-[#61DAFB]" />}
                                </div>

                                <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic font-serif">
                                    {isSuccess ? 'SETTLEMENT COMPLETE' : 'TRANSFERENCE PROTOCOL'}
                                </h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mb-10">
                                    {isSuccess ? 'Financial Sync Successful' : `Settling ${activePayment?.label}`}
                                </p>

                                {!isSuccess ? (
                                    <form onSubmit={handlePayment} className="space-y-6">
                                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-center">
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Amount Due</p>
                                            <p className="text-4xl font-black text-white tracking-widest">{activePayment?.value}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic leading-relaxed px-4">
                                                By initiating this transfer, you authorize HospitalFlow to synchronize with your connected medical insurance provider.
                                            </p>
                                            <Button
                                                type="submit"
                                                isLoading={isProcessing}
                                                className="w-full h-16 bg-[#61DAFB] hover:bg-white text-zinc-950 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(97,218,251,0.2)]"
                                            >
                                                Execute Financial Sync
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="py-10">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center justify-center gap-3 text-emerald-500 font-black text-sm uppercase tracking-widest"
                                        >
                                            <ShieldCheck className="w-5 h-5" /> All Systems Nominal
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Create Request Modal */}
            <AnimatePresence>
                {isRequestModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                            onClick={() => setIsRequestModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[3rem] p-10 shadow-3xl overflow-hidden"
                        >
                            <button onClick={() => setIsRequestModalOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-[#61DAFB]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                    <Activity className="w-10 h-10 text-[#61DAFB]" />
                                </div>

                                <h2 className="text-3xl font-black text-white mb-2 tracking-tighter italic font-serif uppercase">
                                    Initiate Care Protocol
                                </h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mb-10">
                                    New Treatment Request
                                </p>

                                <form onSubmit={handleCreateRequest} className="space-y-6 text-left">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Select Workflow Template</label>
                                        <div className="relative">
                                            <select
                                                value={workflowType}
                                                onChange={e => setWorkflowType(e.target.value)}
                                                className="w-full h-14 bg-zinc-800 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#61DAFB]/50 text-white font-bold transition-all appearance-none relative z-10"
                                            >
                                                <option value="Unified Clinical Episode" className="bg-zinc-900 text-white">Unified Clinical Episode (Full Diagnostic &amp; Admission Flow)</option>
                                                <option value="Direct Diagnostic" className="bg-zinc-900 text-white">Direct Diagnostic (Lab Sync Only &rarr; Request &rarr; Sample &rarr; Pay &rarr; Result)</option>
                                                <option value="Routine Consultation" className="bg-zinc-900 text-white">Routine Consultation (Doc &rarr; Pharm &rarr; Bill)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                                                <ChevronRight className="w-5 h-5 text-zinc-500 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest italic leading-relaxed">
                                            This request will be sent to the Medical Staff for initial diagnosis. You can track the approval stages in real-time.
                                        </p>
                                    </div>
                                    <Button
                                        type="submit"
                                        isLoading={isProcessing}
                                        className="w-full h-16 bg-[#61DAFB] hover:bg-white text-zinc-950 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(97,218,251,0.2)]"
                                    >
                                        Activate Protocol
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic uppercase font-serif">Hello, {user.name}</h1>
                    <p className="text-zinc-500 font-medium tracking-tight">Accessing medical history & financial protocols.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download HIPAA Report
                    </button>
                    <button
                        onClick={() => setIsRequestModalOpen(true)}
                        className="px-6 py-3 rounded-2xl bg-[#61DAFB] hover:bg-[#61DAFB]/90 transition-colors text-zinc-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-[#61DAFB]/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Treatment Request
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-[2.5rem] bg-zinc-950 border transition-all duration-500 group relative overflow-hidden ${stat.isPayable ? 'border-[#61DAFB]/20 hover:border-[#61DAFB]/50' : 'border-white/5 hover:border-white/10'}`}
                    >
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-colors ${stat.isPayable ? 'text-[#61DAFB]' : 'text-zinc-400'}`}>
                                {stat.icon}
                            </div>
                            {stat.isPayable && (
                                <button
                                    onClick={() => initiatePayment(stat)}
                                    className="px-3 py-1.5 rounded-xl bg-[#61DAFB]/10 text-[#61DAFB] text-[10px] font-black uppercase tracking-widest hover:bg-[#61DAFB] hover:text-zinc-950 transition-all"
                                >
                                    Pay Bill
                                </button>
                            )}
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className="text-3xl font-black text-white tracking-tighter mb-2">{stat.value}</p>
                            <p className={`text-[10px] font-bold tracking-widest flex items-center gap-1 uppercase italic ${stat.trend === 'Cleared' ? 'text-emerald-500' : 'text-[#61DAFB]'}`}>
                                {stat.trend === 'Cleared' ? <CheckCircle2 className="w-3 h-3" /> : ''} {stat.trend}
                            </p>
                        </div>
                        {/* Design detail */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#61DAFB]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Medical Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 relative overflow-hidden min-h-[400px]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 relative z-10 gap-6">
                            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-3 italic font-serif uppercase">
                                <Activity className="w-5 h-5 text-[#61DAFB]" />
                                {activeTab === 'HISTORY' ? 'NEURAL TREATMENT HISTORY' : activeTab === 'RECORDS' ? 'CLINICAL ARCHIVES' : 'FINANCIAL PROTOCOLS'}
                            </h2>
                            <div className="flex bg-zinc-950 p-1 rounded-2xl border border-white/5">
                                {['HISTORY', 'RECORDS', 'BILLING'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === tab ? 'bg-[#61DAFB] text-zinc-950 shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="w-8 h-8 text-[#61DAFB] animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-4 relative z-10 text-left">
                                {activeTab === 'HISTORY' && (
                                    requests.length > 0 ? requests.map((item, i) => (
                                        <div
                                            key={item._id}
                                            className="p-6 rounded-3xl bg-zinc-950 border border-white/5 flex flex-col gap-4 group hover:border-[#61DAFB]/20 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-xs text-[#61DAFB]">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm mb-1">{item.workflowType}</p>
                                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">REQ-ID: {item._id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${item.status === 'Completed' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-[#61DAFB]/10 border-[#61DAFB]/20 text-[#61DAFB]'}`}>
                                                        {item.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stages Progress */}
                                            <div className="flex items-center gap-2 px-2">
                                                {item.stages?.map((stage, idx) => (
                                                    <div key={idx} className="flex-1 flex flex-col gap-2">
                                                        <div className={`h-1 rounded-full ${stage.approved ? 'bg-[#61DAFB]' : idx === item.currentStageIndex ? 'bg-[#61DAFB]/30 animate-pulse' : 'bg-zinc-800'}`} />
                                                        <p className={`text-[8px] font-black uppercase text-center ${stage.approved ? 'text-[#61DAFB]' : 'text-zinc-600'}`}>{stage.department}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-center">
                                            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-4">No active treatment protocols detected</p>
                                            <Button onClick={() => setIsRequestModalOpen(true)} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white">Initiate First Request</Button>
                                        </div>
                                    )
                                )}

                                {activeTab === 'RECORDS' && (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {requests.filter(r => r.status === 'Completed').length > 0 ? (
                                            requests.filter(r => r.status === 'Completed').map(r => (
                                                <div key={r._id} className="p-6 rounded-3xl bg-zinc-950 border border-white/5 hover:border-[#61DAFB]/20 transition-all cursor-pointer group">
                                                    <FileText className="w-8 h-8 text-zinc-500 group-hover:text-[#61DAFB] mb-4 transition-colors" />
                                                    <h4 className="text-white font-bold text-sm mb-1">{r.workflowType} Summary</h4>
                                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{new Date(r.updatedAt).toLocaleDateString()} • HIPAA SECURE</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-2 text-center py-20 opacity-40">
                                                <History className="w-12 h-12 mx-auto mb-4" />
                                                <p className="text-xs font-black uppercase tracking-[0.3em]">No cleared medical archives</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'BILLING' && (
                                    <div className="space-y-4">
                                        {requests.some(r => r.currentStageIndex >= (r.stages?.findIndex(s => s.department === 'Billing') || 999)) ? (
                                            requests.filter(r => r.currentStageIndex >= (r.stages?.findIndex(s => s.department === 'Billing') || 999)).map(r => (
                                                <div key={r._id} className="flex items-center justify-between p-6 rounded-3xl bg-zinc-950 border border-white/5">
                                                    <div>
                                                        <h4 className="text-white font-bold text-sm mb-1">{r.workflowType} Statement</h4>
                                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol Sync: {r.status}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white font-black tracking-widest mb-2">$540.00</p>
                                                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-[#61DAFB] hover:text-zinc-950 transition-all">View Details</button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-20 opacity-40">
                                                <CreditCard className="w-12 h-12 mx-auto mb-4" />
                                                <p className="text-xs font-black uppercase tracking-[0.3em]">No pending financial statements</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Quick Actions/Context */}
                <div className="space-y-8">
                    <div className="p-10 rounded-[4rem] bg-gradient-to-br from-[#61DAFB]/10 to-transparent border border-[#61DAFB]/10 group">
                        <div className="w-16 h-16 bg-[#61DAFB]/20 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl shadow-[#61DAFB]/10 group-hover:scale-110 transition-transform duration-500">
                            {activeRequest?.status === 'Completed' ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Loader2 className={`w-8 h-8 text-[#61DAFB] ${isLoading ? 'animate-spin' : ''}`} />}
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tighter italic font-serif">
                            {activeRequest ? (activeRequest.status === 'Completed' ? 'Protocol Secured' : 'Active Care Stream') : 'System Initialized'}
                        </h3>
                        <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-8">
                            {activeRequest
                                ? `Currently processing ${activeRequest.workflowType}. Stage: ${activeRequest.stages[activeRequest.currentStageIndex]?.department || 'Finalizing'}.`
                                : "No active clinical protocols detected. Initiate a care request to begin real-time institutional coordination."}
                        </p>
                        <button
                            onClick={fetchDashboardData}
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl bg-white text-zinc-950 font-black text-xs uppercase tracking-widest hover:bg-[#61DAFB] transition-all shadow-2xl flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            {isLoading ? 'Synchronizing...' : (activeRequest ? 'Refresh Treatment Status' : 'Initiate New Sync')}
                        </button>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-zinc-950 border border-white/5">
                        <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 tracking-tight italic font-serif uppercase">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" /> Insurance Trust
                        </h3>
                        <div className="space-y-4">
                            {user.insuranceClaim > 0 ? (
                                [...Array(Math.min(user.insuranceClaim, 3))].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-[#61DAFB]/5 flex items-center justify-center">
                                            <AlertCircle className="w-5 h-5 text-[#61DAFB] opacity-30" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Claim ID #{user.id.slice(-4)}{i}</p>
                                                <p className="text-[9px] font-black text-[#61DAFB] uppercase tracking-[0.2em]">Processing</p>
                                            </div>
                                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-indigo-500" />
                                            </div>
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-2 italic">Institutional Verification</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 opacity-40">
                                    <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">No active claims detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
