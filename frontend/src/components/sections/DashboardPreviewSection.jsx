import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertCircle, TrendingUp, Users, Activity, Bell, Search, LayoutDashboard } from 'lucide-react'

export default function DashboardPreviewSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#0E2A47]/5 border border-[#0E2A47]/10 mb-6 glass-effect">
            <p className="text-sm font-medium text-[#0D9488]">
              Operational Intelligence
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            Real-Time Hospital{' '}
            <span className="bg-gradient-to-r from-[#61DAFB] to-[#0D9488] bg-clip-text text-transparent">
              Command Center
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Complete visibility into hospital operations with AI-powered insights, predictive alerts, and automated task orchestration.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-3 md:p-6 rounded-[3.5rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect shadow-3xl relative z-10"
        >
          {/* Dashboard Header Bar */}
          <div className="bg-zinc-900 px-8 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#61DAFB] flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-[#0E2A47]" />
                </div>
                <span className="font-bold text-white tracking-tight">HospitalFlow AI</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden md:block" />
              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patients, staff..."
                    className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white/60 focus:outline-none focus:border-[#61DAFB]/50 w-64"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/30">
                <div className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest">Live Monitoring</span>
              </div>
              <Bell className="w-5 h-5 text-white/40" />
            </div>
          </div>

          {/* Dashboard Main Area */}
          <div className="p-8 space-y-8">
            {/* Top metrics - Polished Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard label="Total Patients" value="347" icon={<Users />} trend="+12" color="#61DAFB" />
              <MetricCard label="Avg Wait Time" value="18 min" icon={<TrendingUp />} trend="-4" color="#0D9488" />
              <MetricCard label="Active Tasks" value="2,847" icon={<Activity />} trend="+8" color="#61DAFB" />
              <MetricCard label="System SLA" value="99.99%" icon={<AlertCircle />} trend="Stable" color="#0D9488" />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Patient Flow Tracking */}
              <div className="lg:col-span-2 p-6 rounded-3xl border border-[#0E2A47]/5 bg-white dark:bg-[#0E2A47]/40">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-bold text-[#0E2A47] dark:text-white">Active Patient Pathflow</h4>
                  <div className="text-xs font-bold text-[#0D9488] uppercase tracking-widest bg-[#0D9488]/5 px-3 py-1 rounded-full border border-[#0D9488]/10">
                    AI Optimized
                  </div>
                </div>
                <div className="space-y-4">
                  <TimelineItem title="ER Admission" status="Completed" time="14:32" color="#0D9488" />
                  <TimelineItem title="Specialist Review" status="In Progress" time="14:45" color="#61DAFB" />
                  <TimelineItem title="Diagnostic Imaging" status="Scheduled" time="15:15" color="#1F4E6F" />
                  <TimelineItem title="Inpatient Transfer" status="Pending" time="16:30" color="#1F4E6F" opacity={0.5} />
                </div>
              </div>

              {/* AI Insights Sidebar */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl border border-[#0E2A47]/5 bg-white dark:bg-[#0E2A47]/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#61DAFB]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#61DAFB]/10 transition-all" />
                  <h4 className="text-lg font-bold text-[#0E2A47] dark:text-white mb-6 relative">AI Insights</h4>
                  <div className="space-y-4 relative">
                    <InsightCard
                      type="optimization"
                      title="Waiting Time Peak"
                      description="Predicting 20% increase in 1 hour. Suggest redeploying 2 nurses."
                      color="#61DAFB"
                    />
                    <InsightCard
                      type="alert"
                      title="Lab BottleNeck"
                      description="Hematology queue exceeding SLA. Redirecting priority cases."
                      color="#0D9488"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Department Load Bars */}
            <div className="p-6 rounded-3xl border border-[#0E2A47]/5 bg-white dark:bg-[#0E2A47]/40">
              <h4 className="text-lg font-bold text-[#0E2A47] dark:text-white mb-8">Departmental Load Index</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <DepartmentStatus name="Emergency" load="85%" color="#EF4444" />
                <DepartmentStatus name="Radiology" load="62%" color="#F59E0B" />
                <DepartmentStatus name="Surgery" load="45%" color="#0D9488" />
                <DepartmentStatus name="OPD" load="30%" color="#61DAFB" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MetricCard({ label, value, icon, trend, color }) {
  return (
    <div className="p-6 rounded-3xl border border-[#0E2A47]/5 bg-white/40 dark:bg-white/5 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('-') ? 'bg-red-500/10 text-red-500' : trend === 'Stable' ? 'bg-[#1F4E6F]/10 text-[#1F4E6F]' : 'bg-[#0D9488]/10 text-[#0D9488]'}`}>
          {trend}{trend !== 'Stable' ? '%' : ''}
        </span>
      </div>
      <p className="text-[11px] font-black text-[#1F4E6F]/40 dark:text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-[#0E2A47] dark:text-white">{value}</p>
    </div>
  )
}

function TimelineItem({ title, status, time, color, opacity = 1 }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0E2A47]/5 dark:bg-white/5 border border-transparent hover:border-[#0E2A47]/5 transition-all" style={{ opacity }}>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" style={{ backgroundColor: color }} />
        <div>
          <p className="text-sm font-bold text-[#0E2A47] dark:text-white">{title}</p>
          <p className="text-[10px] text-[#1F4E6F]/60 dark:text-white/40 font-bold uppercase tracking-tight">{time}</p>
        </div>
      </div>
      <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: `${color}15`, color }}>
        {status}
      </div>
    </div>
  )
}

function InsightCard({ title, description, color }) {
  return (
    <div className="p-4 rounded-2xl border border-transparent hover:border-white/10 transition-all" style={{ backgroundColor: `${color}10` }}>
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-4 h-4" style={{ color }} />
        <p className="text-xs font-bold" style={{ color }}>{title}</p>
      </div>
      <p className="text-[11px] leading-relaxed text-[#1F4E6F] dark:text-white/70 font-medium">{description}</p>
    </div>
  )
}

function DepartmentStatus({ name, load, color }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-black text-[#0E2A47] dark:text-white uppercase tracking-widest">{name}</p>
        <p className="text-sm font-black" style={{ color }}>{load}</p>
      </div>
      <div className="w-full h-1.5 bg-[#0E2A47]/5 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: load }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

