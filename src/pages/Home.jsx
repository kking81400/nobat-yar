import React, { useMemo, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { DOCTORS } from '../data/mock';

export default function Home() {
    const [q, setQ] = useState('');
    const [city, setCity] = useState('');
    const [specialty, setSpecialty] = useState('');

    const cities = useMemo(() => Array.from(new Set(DOCTORS.map(d => d.city))), []);
    const specialties = useMemo(() => Array.from(new Set(DOCTORS.map(d => d.specialty))), []);

    const filtered = DOCTORS.filter(d => {
        if (city && d.city !== city) return false;
        if (specialty && d.specialty !== specialty) return false;
        if (q && !(`${d.name} ${d.specialty} ${d.city} ${d.bio}`.toLowerCase().includes(q.toLowerCase()))) return false;
        return true;
    });

    return (
        <main className="container mx-auto px-4 py-6">
            {/* معرفی */}
            <section className="mb-6">
                <h1 className="text-2xl font-bold">پزشکان</h1>
                <p className="text-muted mt-1">پزشک مورد نظر خود را پیدا کنید و نوبت رزرو کنید.</p>
            </section>

            {/* فیلترها */}
            <section className="grid gap-4 mb-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="جستجو: نام، تخصص یا شهر"
                        className="flex-1 p-2 rounded-lg border"
                    />
                    <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="p-2 rounded-lg border sm:w-44 w-full"
                    >
                        <option value="">همهٔ شهرها</option>
                        {cities.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <select
                        value={specialty}
                        onChange={e => setSpecialty(e.target.value)}
                        className="p-2 rounded-lg border sm:w-44 w-full"
                    >
                        <option value="">همهٔ تخصص‌ها</option>
                        {specialties.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </section>

            {/* لیست پزشکان */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(d => (
                    <DoctorCard key={d.id} doctor={d} />
                ))}
                {filtered.length === 0 && (
                    <div className="text-center text-muted">نتیجه‌ای یافت نشد.</div>
                )}
            </section>
        </main>
    );
}
