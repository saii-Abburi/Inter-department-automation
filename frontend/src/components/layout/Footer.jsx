import React from 'react'
import { Linkedin, Twitter, Github, HeartPulse, Send, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Red-Code Mode', href: '#' },
        { name: 'Neural Dashboard', href: '#' },
        { name: 'Integration Hub', href: '#' },
        { name: 'Enterprise API', href: '#' },
      ],
    },
    {
      title: 'Corporate',
      links: [
        { name: 'Mission Control', href: '#' },
        { name: 'Intelligence Blog', href: '#' },
        { name: 'Partner Network', href: '#' },
        { name: 'Press Kit', href: '#' },
      ],
    },
    {
      title: 'Governance',
      links: [
        { name: 'HIPAA Shield', href: '#' },
        { name: 'Trust Center', href: '#' },
        { name: 'Privacy Protocol', href: '#' },
        { name: 'Security Audit', href: '#' },
      ],
    },
  ]

  return (
    <footer className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 border-t border-[#0E2A47]/5 dark:border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#0E2A47] to-[#61DAFB] rounded-[1rem] flex items-center justify-center shadow-xl">
                <HeartPulse className="text-white w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-black text-[#0E2A47] dark:text-white tracking-tighter">HospitalFlow</span>
                <p className="text-[10px] font-black text-[#61DAFB] uppercase tracking-[0.3em] leading-none">Auto-Orchestrator</p>
              </div>
            </div>

            <p className="text-[#1F4E6F] dark:text-gray-400 font-medium mb-10 leading-relaxed max-w-xs">
              The world's most advanced autonomous coordination layer for large-scale medical operations.
            </p>

            <div className="relative group">
              <p className="text-sm font-black text-[#0E2A47] dark:text-white mb-4 uppercase tracking-widest">Global Newsletter</p>
              <div className="flex p-1.5 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#0E2A47]/10 dark:border-white/10 glass-effect group-focus-within:border-[#61DAFB]/50 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Clinical research email"
                  className="bg-transparent border-none outline-none flex-grow px-4 text-sm font-medium text-[#0E2A47] dark:text-white placeholder:text-[#1F4E6F]/40"
                />
                <button className="w-10 h-10 rounded-2xl bg-[#0E2A47] dark:bg-[#61DAFB] flex items-center justify-center text-white dark:text-[#0E2A47] hover:scale-110 transition-transform shadow-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-1 hidden lg:block" />
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-black text-[#0E2A47] dark:text-white mb-8 uppercase tracking-[0.25em]">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm font-bold text-[#1F4E6F]/60 dark:text-gray-400 hover:text-[#61DAFB] dark:hover:text-[#61DAFB] transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-[#0E2A47]/5 dark:border-white/5 mb-12">
          <ContactDetail icon={<Mail size={18} />} text="ops@hospitalflow.ai" subtext="Direct Line" />
          <ContactDetail icon={<Phone size={18} />} text="+1 (888) AUTO-MED" subtext="24/7 Priority Support" />
          <ContactDetail icon={<MapPin size={18} />} text="Palo Alto, CA" subtext="Global Headquarters" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs font-black text-[#1F4E6F]/40 dark:text-gray-500 uppercase tracking-widest leading-none">
              © {currentYear} HospitalFlow Inc.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] font-bold text-[10px] uppercase tracking-tighter">
              <ShieldCheck className="w-3 h-3" />
              SOC 2 Type II Certified
            </div>
          </div>

          <div className="flex items-center gap-6">
            {[Linkedin, Twitter, Github].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/40 dark:bg-zinc-900/40 border border-[#0E2A47]/10 dark:border-white/10 glass-effect text-[#0E2A47] dark:text-white hover:bg-[#61DAFB] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function ContactDetail({ icon, text, subtext }) {
  return (
    <div className="flex items-center gap-4 justify-center md:justify-start group">
      <div className="w-10 h-10 rounded-xl bg-[#61DAFB]/10 text-[#61DAFB] flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-[#0E2A47] dark:text-white tracking-tight">{text}</p>
        <p className="text-[10px] font-black text-[#1F4E6F]/40 dark:text-gray-500 uppercase tracking-widest">{subtext}</p>
      </div>
    </div>
  )
}
