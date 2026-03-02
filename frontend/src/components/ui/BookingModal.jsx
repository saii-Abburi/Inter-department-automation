import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    Calendar as CalendarIcon,
    Clock,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Building2,
    User,
    Mail,
    Send
} from 'lucide-react'
import Button from './Button'

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
]

const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
};

export default function BookingModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hospital: '',
        department: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Calendar logic
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)

    const handleDayClick = (day) => {
        if (!day) return
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        // Don't allow past dates
        if (date < new Date().setHours(0, 0, 0, 0)) return
        setSelectedDate(date)
        setSelectedTime(null) // Reset time when date changes
    }

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))

    const isTimeSlotPast = (time) => {
        if (!selectedDate) return false;
        const now = new Date();
        const isToday = selectedDate.toDateString() === now.toDateString();
        if (!isToday) return false;

        const { hours, minutes } = parseTime(time);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);

        return slotTime < now;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call to "Excel/Google Sheets"
        console.log('--- BOOKING SUBMISSION ---')
        console.log('Date:', selectedDate?.toDateString())
        console.log('Time:', selectedTime)
        console.log('User Data:', formData)
        console.log('Status: Transmitting to Enterprise Excel DB...')

        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSuccess(true)
    }

    // Reset modal when closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1)
                setSelectedDate(null)
                setSelectedTime(null)
                setIsSuccess(false)
                setFormData({ name: '', email: '', hospital: '', department: '' })
            }, 300)
        }
    }, [isOpen])

    if (!isOpen && !isSuccess) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
                    >
                        {/* Left Side: Info & Visual */}
                        <div className="w-full md:w-5/12 bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-[#61DAFB]/10 rounded-2xl flex items-center justify-center mb-8">
                                    <CalendarIcon className="w-6 h-6 text-[#61DAFB]" />
                                </div>
                                <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight mb-4 tracking-tighter">
                                    Schedule Your <br />
                                    <span className="bg-gradient-to-r from-[#61DAFB] to-[#0D9488] bg-clip-text text-transparent italic">Enterprise Demo</span>
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm leading-relaxed mb-6">
                                    Connect with a clinical workflow architect and see how HospitalFlow can transform your operations in 30 minutes.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                        <Clock className="w-5 h-5 text-[#61DAFB]" />
                                        <div>
                                            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Duration</p>
                                            <p className="text-sm font-bold text-zinc-900 dark:text-white">30 Min Consultation</p>
                                        </div>
                                    </div>
                                    {selectedDate && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-[#61DAFB]/5 border border-[#61DAFB]/20 shadow-sm"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[#61DAFB]" />
                                            <div>
                                                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Selected Date</p>
                                                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                                                    {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    {selectedTime && ` at ${selectedTime}`}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="hidden md:block pt-8 border-t border-zinc-100 dark:border-zinc-800">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                                    Trusted by 500+ Institutions
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Interactive Content */}
                        <div className="w-full md:w-7/12 p-3  md:p-12 flex flex-col relative bg-white dark:bg-zinc-900 overflow-y-auto">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors z-20"
                            >
                                <X className="w-6 h-6 text-zinc-400" />
                            </button>

                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col items-center justify-center text-center h-full py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">Booking Successful!</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-sm mb-4">
                                            Your demo has been scheduled. The clinical data has been synchronized with our Enterprise CRM & Excel dashboard.
                                        </p>
                                        <Button
                                            onClick={onClose}
                                            className="bg-[#0E2A47] hover:bg-zinc-800 text-white rounded-2xl px-12 h-14"
                                        >
                                            Back to Platform
                                        </Button>
                                    </motion.div>
                                ) : step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="h-full flex flex-col"
                                    >
                                        <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3 tracking-tight">
                                            1. Select Your Preferred Date
                                        </h3>

                                        {/* Calendar UI */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-bold text-sm text-zinc-900 dark:text-white">
                                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                                </span>
                                                <div className="flex gap-1">
                                                    <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                                        <ChevronLeft className="w-4 h-4 text-zinc-500" />
                                                    </button>
                                                    <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                                        <ChevronRight className="w-4 h-4 text-zinc-500" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 mb-2">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                                    <div key={day} className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-widest">{day}</div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1">
                                                {days.map((day, idx) => {
                                                    const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth() && selectedDate?.getFullYear() === currentMonth.getFullYear()
                                                    const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear()
                                                    const isPast = day && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < new Date().setHours(0, 0, 0, 0)

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleDayClick(day)}
                                                            disabled={!day || isPast}
                                                            className={`
                                                                aspect-square rounded-xl flex items-center justify-center font-bold text-xs transition-all relative
                                                                ${!day ? 'opacity-0 cursor-default' : 'cursor-pointer hover:bg-[#61DAFB]/10'}
                                                                ${isSelected ? 'bg-[#61DAFB] text-white hover:bg-[#61DAFB] shadow-lg shadow-[#61DAFB]/20' : 'text-zinc-600 dark:text-zinc-400'}
                                                                ${isToday && !isSelected ? 'text-[#61DAFB] border border-[#61DAFB]/20' : ''}
                                                                ${isPast ? 'opacity-20 cursor-not-allowed' : ''}
                                                            `}
                                                        >
                                                            {day}
                                                            {isToday && <div className="absolute bottom-1 w-1 h-1 bg-[#61DAFB] rounded-full" />}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {selectedDate ? (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-auto">
                                                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Available Time Slots</h4>
                                                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 mb-6">
                                                    {timeSlots.map(time => {
                                                        const isPast = isTimeSlotPast(time);
                                                        return (
                                                            <button
                                                                key={time}
                                                                disabled={isPast}
                                                                onClick={() => setSelectedTime(time)}
                                                                className={`
                                                                    py-2.5 rounded-xl font-bold text-[10px] transition-all border
                                                                    ${selectedTime === time
                                                                        ? 'bg-[#0E2A47] text-white border-[#0E2A47] shadow-lg'
                                                                        : isPast
                                                                            ? 'bg-zinc-100 dark:bg-white/5 text-zinc-300 dark:text-zinc-700 border-transparent cursor-not-allowed'
                                                                            : 'bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-transparent hover:border-[#61DAFB]/30'}
                                                                `}
                                                            >
                                                                {time}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <Button
                                                    disabled={!selectedTime}
                                                    onClick={() => setStep(2)}
                                                    className="w-full bg-[#0E2A47] hover:bg-zinc-800 text-white rounded-2xl h-14 group shadow-xl flex items-center justify-center"
                                                >
                                                    Continue to Details
                                                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <div className="mt-auto py-12 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2rem]">
                                                <p className="text-zinc-400 text-sm font-medium">Please select a date to view availability</p>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSubmit}
                                        className="h-full flex flex-col"
                                    >
                                        <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                                            2. Clinical Professional Details
                                        </h3>

                                        <div className="space-y-4 mb-8">
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Full Name / Dr. Name"
                                                    className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Medical Email Address"
                                                    className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Hospital / Institution Name"
                                                    className="w-full h-14 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white"
                                                    value={formData.hospital}
                                                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                                <select
                                                    className="w-full h-14 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-white/10 rounded-2xl pl-12 pr-10 outline-none focus:border-[#61DAFB]/50 transition-colors font-medium text-zinc-900 dark:text-white appearance-none relative z-10"
                                                    value={formData.department}
                                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                >
                                                    <option value="" className="bg-white dark:bg-zinc-900 text-zinc-400">Select Department</option>
                                                    <option value="Emergency" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Emergency / ED</option>
                                                    <option value="Surgery" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Surgery / OR</option>
                                                    <option value="ICU" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">ICU / Critical Care</option>
                                                    <option value="Admin" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Administration</option>
                                                    <option value="other" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Other</option>
                                                </select>
                                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 rotate-90 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-4">
                                            <Button
                                                type="submit"
                                                isLoading={isSubmitting}
                                                className="w-full bg-[#0E2A47] hover:bg-zinc-800 text-white rounded-2xl h-14 group shadow-xl flex items-center justify-center"
                                            >
                                                Complete Enterprise Booking
                                                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="w-full text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-zinc-600 dark:hover:text-white transition-colors py-2"
                                            >
                                                ← Adjust Appointment Time
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
