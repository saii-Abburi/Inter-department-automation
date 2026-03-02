import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    ShieldCheck,
    Stethoscope,
    Building2,
    Lock,
    Mail,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Activity
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

import { authApi } from '@/services/api'

export default function AuthPage() {
    const navigate = useNavigate()
    const [role, setRole] = useState(null) // 'Patient', 'Doctor', 'Staff'
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        role: '', // for staff role selection
        qualification: '', // for doctor
        disease: '', // for patient
    })

    const roles = [
        {
            id: 'Patient',
            title: 'Patient Portal',
            desc: 'Access your medical history, reports, and billing.',
            icon: <User className="w-6 h-6" />,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'Doctor',
            title: 'Medical Staff',
            desc: 'Manage your patient roster and clinical records.',
            icon: <Stethoscope className="w-6 h-6" />,
            color: 'from-emerald-500 to-teal-500'
        },
        {
            id: 'Staff',
            title: 'Department Ops',
            desc: 'Administrative access for Lab, Pharmacy, and Billing.',
            icon: <Building2 className="w-6 h-6" />,
            color: 'from-purple-500 to-indigo-500'
        }
    ]

    const handleBack = () => {
        if (role) {
            setRole(null)
            setError('')
        }
        else navigate('/')
    }

    const handleSubmit = async (e) => {
        console.log(formData);

        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            let res;
            const payload = { ...formData };

            // Map generic 'name' to role-specific fields for the backend if login
            if (role === 'Patient') payload.patientName = formData.name;
            if (role === 'Doctor') payload.doctorName = formData.name;

            if (isLogin) {
                res = await authApi.login(role, payload);
            } else {
                res = await authApi.register(role, payload);
            }

            const { token, user, staff } = res.data;
            const userInfo = user || staff;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            localStorage.setItem('userRole', role);
            localStorage.setItem('isLoggedIn', 'true');

            // Forward to the specific dashboard based on role
            if (role === 'Patient') {
                navigate('/dashboard/patient')
            } else if (role === 'Doctor') {
                navigate('/dashboard/doctor')
            } else if (role === 'Staff') {
                navigate('/dashboard/staff')
            } else {
                navigate('/')
            }
        } catch (err) {
            console.error('Auth Error:', err);
            const backendError = err.response?.data;
            const message = typeof backendError === 'string'
                ? backendError
                : backendError?.message || (isLogin
                    ? 'Authentication failed. Please check your credentials.'
                    : 'Registration failed. Please try again with different details.');
            setError(message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-[#61DAFB]/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-5xl lg:min-h-[600px] bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-3xl overflow-hidden flex flex-col lg:flex-row relative z-10 transition-all duration-500">

                {/* Left Visual Illustration Section */}
                <div className="lg:w-1/2 bg-zinc-50 dark:bg-black/40 p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Activity className="w-64 h-64 text-[#61DAFB]" />
                    </div>

                    <div>
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-[#61DAFB] transition-colors mb-12 shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                        </button>

                        <div className="mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#61DAFB] to-[#0D9488] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#61DAFB]/20">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-4xl font-black text-zinc-900 dark:text-white leading-tight tracking-tighter mb-4">
                                Secure Access to <br />
                                <span className="text-[#61DAFB] italic">HospitalFlow</span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-sm">
                                Enter the clinical nervous system. Manage workflows, coordinate care, and access enterprise data.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            'HIPAA Compliant Protocol',
                            '256-bit AES Encryption',
                            'Multi-Factor Auth Ready'
                        ].map((txt, i) => (
                            <div key={i} className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500">
                                <CheckCircle2 className="w-5 h-5 text-[#0D9488]" />
                                <span className="text-sm font-bold tracking-tight">{txt}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Input Section */}
                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white dark:bg-zinc-900">
                    <AnimatePresence mode="wait">
                        {!role ? (
                            <motion.div
                                key="role-select"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Identify Your Role</h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Select your portal to continue authentication.</p>
                                </div>

                                <div className="grid gap-4">
                                    {roles.map((r) => (
                                        <button
                                            key={r.id}
                                            onClick={() => setRole(r.id)}
                                            className="group relative flex items-center gap-6 p-6 rounded-3xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 hover:border-[#61DAFB]/40 transition-all text-left overflow-hidden shadow-sm"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-lg shadow-zinc-900/10`}>
                                                {r.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-zinc-900 dark:text-white">{r.title}</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium leading-snug">{r.desc}</p>
                                            </div>
                                            <ChevronRight className="absolute right-6 w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-[#61DAFB] group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="auth-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full flex flex-col"
                            >
                                <div className="mb-10 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                            {isLogin ? 'Welcome Back' : 'Create Account'}
                                        </h2>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                                            {role} Portal Authentication
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-[#61DAFB] text-xs font-black uppercase tracking-widest hover:underline"
                                    >
                                        {isLogin ? 'Register Instead' : 'Login Instead'}
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Dynamically adjust fields based on role and mode */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                        <input
                                            required
                                            type="text"
                                            placeholder={role === 'Patient' ? 'Full Medical Name' : role === 'Doctor' ? 'Doctor Name' : 'Staff Name'}
                                            className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    {!isLogin && (
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Institutional Email"
                                                className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {role === 'Staff' && (
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                            <select
                                                required
                                                className="w-full h-14 bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white appearance-none relative z-10"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            >
                                                <option value="" className="bg-white dark:bg-zinc-900 text-zinc-400">Select Departmental Role</option>
                                                <option value="Billing" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Billing Department</option>
                                                <option value="Lab" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Laboratory Division</option>
                                                <option value="Pharmacy" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Institutional Pharmacy</option>
                                                <option value="Insurance" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Insurance Liaison</option>
                                                <option value="Admin" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">System Administrator</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronRight className="w-4 h-4 text-zinc-400 rotate-90" />
                                            </div>
                                        </div>
                                    )}

                                    {role === 'Doctor' && !isLogin && (
                                        <div className="relative">
                                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Professional Qualification"
                                                className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                value={formData.qualification}
                                                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {role === 'Patient' && !isLogin && (
                                        <div className="relative">
                                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Primary Medical Condition (optional)"
                                                className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                value={formData.disease}
                                                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                        <input
                                            required
                                            type="password"
                                            placeholder="Secure Password"
                                            className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            isLoading={isLoading}
                                            className="w-full h-16 bg-[#0E2A47] hover:bg-zinc-800 text-white rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center transition-all"
                                        >
                                            {isLogin ? 'Enter Neural Portal' : 'Register with Protocol'}
                                            <ChevronRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </form>

                                <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-white/5 flex flex-col items-center">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">
                                        Forging the future of medical coordination <br />
                                        <span className="text-[#61DAFB]">HospitalFlow v1.4 // Production Shield</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
