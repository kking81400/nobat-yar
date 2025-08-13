import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DOCTORS } from '../data/mock';
import { loadAppointments, saveAppointments } from '../utils/storage';
import { generateSlotsForDate, formatTime } from '../utils/calendar';
import { addDays } from 'date-fns';

export default function DoctorPage(){
    const { id } = useParams();
    const doctor = DOCTORS.find(d=>d.id===id);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState(loadAppointments());
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [booking, setBooking] = useState({ name:'', phone:'', email:'', note:''});

    useEffect(()=>{
        saveAppointments(appointments);
    },[appointments]);

    if (!doctor) return (
        <div className="container mx-auto px-4 py-6">
            پزشک پیدا نشد. <Link to="/">بازگشت</Link>
        </div>
    );

    // تولید ۱۴ روز آینده
    const days = Array.from({length:14}).map((_,i)=> addDays(new Date(), i));

    // اسلات‌های روز انتخاب‌شده
    const slotsForSelected = generateSlotsForDate(doctor, days[selectedDateIndex], appointments);

    // تابع فرمت تاریخ شمسی
    const formatDateShamsi = (date) => {
        return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    };

    // تابع فرمت روز هفته شمسی
    const formatWeekdayShamsi = (date) => {
        return new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(date);
    };

    function handleBook(slot){
        if (!booking.name || !booking.phone) {
            alert('نام و تلفن را وارد کنید.');
            return;
        }
        const exists = appointments.some(a=>
            a.doctorId===doctor.id && new Date(a.date).getTime()===slot.start.getTime()
        );
        if (exists) {
            alert('این زمان قبلاً رزرو شده است.');
            return;
        }
        const ap = {
            id: 'a_' + Math.random().toString(36).slice(2,9),
            doctorId: doctor.id,
            doctorName: doctor.name,
            date: slot.start.toISOString(),
            duration: doctor.schedule.slotMinutes,
            patientName: booking.name,
            phone: booking.phone,
            email: booking.email || '',
            note: booking.note || ''
        };
        const next = [...appointments, ap];
        saveAppointments(next); // ← این رو اضافه کن
        setAppointments(next);
        alert('نوبت با موفقیت رزرو شد.');
        navigate('/appointments');
    }


    return (
        <main className="container mx-auto px-4 py-6">
            <div className="card flex flex-col md:flex-row gap-4">
                <img src={doctor.avatar} className="w-28 h-28 rounded-full object-cover" alt={doctor.name} />
                <div className="flex-1">
                    <h2 className="text-xl font-bold">{doctor.name}</h2>
                    <div className="text-muted">{doctor.specialty} • {doctor.city}</div>
                    <p className="mt-2 text-sm text-muted">{doctor.bio}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm">⭐ {doctor.rating}</div>
                    <div className="text-sm">مدت نوبت: {doctor.schedule.slotMinutes} دقیقه</div>
                </div>
            </div>

            <section className="mt-6">
                <h3 className="font-semibold mb-2">انتخاب روز و ساعت (۱۴ روز آینده)</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((d,i)=> (
                        <button
                            key={i}
                            onClick={()=>setSelectedDateIndex(i)}
                            className={`min-w-[110px] p-3 rounded-lg ${i===selectedDateIndex? 'border-2 border-primary-300 bg-primary-50' : 'bg-white'} text-right`}
                        >
                            <div className="text-sm">{formatDateShamsi(d)}</div>
                            <div className="text-xs text-muted">{formatWeekdayShamsi(d)}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 grid gap-2 md:grid-cols-3">
                    {slotsForSelected.length===0 && (
                        <div className="text-muted">در این روز پزشک حضوری ندارد یا ساعتی موجود نیست.</div>
                    )}
                    {slotsForSelected.map((s,idx)=> (
                        <div key={idx} className={`p-3 rounded-lg border ${s.taken ? 'opacity-60 line-through' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{formatTime(s.start)}</div>
                                    <div className="text-xs text-muted">تا {formatTime(s.end)}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={()=>{ if(!s.taken) handleBook(s) }}
                                        disabled={s.taken}
                                        className={`px-3 py-1 rounded-lg ${s.taken ? 'bg-gray-200 text-muted' : 'bg-primary-500 text-white'}`}
                                    >
                                        {s.taken? 'رزرو شده' : 'رزرو کن'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">اطلاعات بیمار</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                        <input placeholder="نام کامل" value={booking.name} onChange={e=>setBooking({...booking,name:e.target.value})} className="p-2 rounded-lg border" />
                        <input placeholder="تلفن" value={booking.phone} onChange={e=>setBooking({...booking,phone:e.target.value})} className="p-2 rounded-lg border" />
                        <input placeholder="ایمیل (اختیاری)" value={booking.email} onChange={e=>setBooking({...booking,email:e.target.value})} className="p-2 rounded-lg border" />
                        <input placeholder="یادداشت (اختیاری)" value={booking.note} onChange={e=>setBooking({...booking,note:e.target.value})} className="p-2 rounded-lg border" />
                    </div>
                    <div className="text-sm text-muted mt-2">برای رزرو، ابتدا یک بازهٔ زمانی انتخاب و سپس نام و تلفن را وارد کنید.</div>
                </div>
            </section>
        </main>
    );
}
