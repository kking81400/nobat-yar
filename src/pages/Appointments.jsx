import React, { useEffect, useState } from 'react';
import { loadAppointments, saveAppointments } from '../utils/storage';
import { formatDateShamsi, formatTime } from '../utils/calendar';

export default function Appointments(){
    const [appointments, setAppointments] = useState(loadAppointments());

    useEffect(()=>{
        saveAppointments(appointments);
    },[appointments]);

    function handleCancel(id){
        if (!confirm('آیا مطمئن هستید می‌خواهید این نوبت را لغو کنید؟')) return;
        setAppointments(prev=> prev.filter(p=>p.id!==id));
    }

    function exportCSV(){
        const header = ['شناسه','پزشک','نام بیمار','تاریخ','ساعت','مدت(دقیقه)','تلفن','ایمیل','یادداشت'];
        const rows = appointments.map(a=>[
            a.id,
            a.doctorName,
            a.patientName,
            formatDateShamsi(a.date),
            formatTime(a.date),
            a.duration,
            a.phone,
            a.email,
            (a.note||'')
        ]);
        const csv = [header, ...rows]
            .map(r=> r.map(cell=> `"${(''+cell).replace(/"/g,'""')}"`).join(','))
            .join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nobatyar_appointments.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <main className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-bold mb-4">نوبت‌های من</h2>
            <div className="mb-4 flex gap-2">
                <button onClick={exportCSV} className="px-3 py-1 rounded-lg bg-primary-500 text-white">صادرات CSV</button>
            </div>
            <div className="grid gap-3">
                {appointments.length===0 && <div className="text-muted">نوبتی ثبت نشده است.</div>}
                {appointments.map(a=> (
                    <div key={a.id} className="card flex items-center justify-between">
                        <div>
                            <div className="font-semibold">{a.doctorName} — {a.patientName}</div>
                            <div className="text-sm text-muted">
                                {formatDateShamsi(a.date)} — {formatTime(a.date)}
                            </div>
                            <div className="text-xs text-muted mt-1">
                                تلفن: {a.phone} {a.email? '• ' + a.email : ''}
                            </div>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={()=>handleCancel(a.id)}
                                className="px-3 py-1 rounded-lg border">
                                لغو
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
