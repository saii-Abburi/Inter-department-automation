import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lock, Shield, Database, CheckCircle, ShieldCheck, Fingerprint, LockKeyhole, Server } from 'lucide-react'

const securityFeatures = [
  {
    icon: LockKeyhole,
    title: 'Military-Grade Encryption',
    description: 'All patient data is encrypted in transit and at rest using advanced AES-256 protocols.',
    details: ['TLS 1.3 Encryption', 'AES-256 Data Residency', 'HSM Key Management', 'Automatic Rotation'],
    color: '#61DAFB'
  },
  {
    icon: Fingerprint,
    title: 'Biometric & Multi-Factor',
    description: 'Enforce rigid identity verification across all administrative and clinical access points.',
    details: ['MFA Enforcement', 'Time-Based Access', 'Deep Audit Logging', 'Session Isolation'],
    color: '#0D9488'
  },
  {
    icon: Server,
    title: 'Fortified Cloud Infrastructure',
    description: 'Enterprise-grade isolation with geo-redundant clusters and instant disaster recovery.',
    details: ['99.99% Uptime SLA', 'Geo-Redundant Backups', 'DDoS Mitigation', 'Penetration Testing'],
    color: '#0E2A47'
  },
  {
    icon: ShieldCheck,
    title: 'HIPAA & Governance',
    description: 'Built from the ground up to exceed global healthcare data compliance standards.',
    details: ['Full BAA Coverage', 'PHI Data Shielding', 'Breach Mitigation', 'Compliance Audits'],
    color: '#0D9488'
  },
]

const complianceBadges = [
  { name: 'HIPAA', icon: <Shield className="w-5 h-5" /> },
  { name: 'HITRUST', icon: <CheckCircle className="w-5 h-5" /> },
  { name: 'SOC 2 TYPE II', icon: <Lock className="w-5 h-5" /> },
  { name: 'ISO 27001', icon: <Database className="w-5 h-5" /> },
  { name: 'GDPR READY', icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'FDA TITLE 21', icon: <LockKeyhole className="w-5 h-5" /> },
]

export default function SecurityComplianceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="security" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 mb-6 glass-effect">
            <p className="text-sm font-semibold text-[#0D9488] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Enterprise-Grade Fortress
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            Security That Saves {' '}
            <span className="bg-gradient-to-r from-[#0E2A47] to-[#0D9488] bg-clip-text text-transparent italic">
              Confidence
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your patient data is our highest priority. We employ a multi-layered security architecture that exceeds global medical standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-8 rounded-[2.5rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect group hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-transform duration-500 group-hover:rotate-12"
                    style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-[#0E2A47] dark:text-white">{feature.title}</h3>
                    <p className="text-[#1F4E6F]/80 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" />
                          <span className="text-xs font-bold text-[#1F4E6F] dark:text-gray-300 uppercase tracking-tighter">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="p-8 md:p-12 rounded-[3.5rem] border border-[#0E2A47]/5 dark:border-white/5 bg-zinc-900/5 dark:bg-zinc-900/40 glass-effect overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Shield className="w-32 h-32 text-[#61DAFB]" />
          </div>

          <h3 className="text-xl font-bold text-[#0E2A47] dark:text-white text-center mb-12 uppercase tracking-widest">
            Global Compliance Ecosystem
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {complianceBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect hover:bg-[#61DAFB] group transition-all duration-300"
              >
                <div className="text-[#61DAFB] group-hover:text-white mb-3 transition-colors">{badge.icon}</div>
                <p className="text-[10px] font-black text-center text-[#0E2A47] dark:text-white group-hover:text-white uppercase tracking-wider">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security statement callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 p-10 rounded-[2.5rem] bg-[#0D9488]/10 border border-[#0D9488]/20 glass-effect text-center md:text-left overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#0D9488]" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-[#0E2A47] flex items-center justify-center shadow-xl shrink-0">
              <Shield className="w-10 h-10 text-[#0D9488]" />
            </div>
            <div>
              <h3 className="font-bold text-2xl mb-4 text-[#0E2A47] dark:text-white">Zero-Trust Clinical Infrastructure</h3>
              <p className="text-[#1F4E6F] dark:text-gray-300 leading-relaxed font-medium">
                HospitalFlow operates under a strict Zero-Trust model. Every packet, every connection,
                and every user interaction is continuously verified. Our specialized HIPAA-ready
                encryption layer ensures that patient PHI remains impenetrable to unauthorized entities,
                both inside and outside the hospital network.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
