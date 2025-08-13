import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({doctor}){
    return (
        <article className="card flex items-center gap-4">
            <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
                <Link to={`/doctor/${doctor.id}`} className="text-lg font-semibold text-primary-600">{doctor.name}</Link>
                <div className="text-sm text-muted">{doctor.specialty} • {doctor.city}</div>
                <div className="mt-2 text-sm text-muted">{doctor.bio}</div>
            </div>
            <div className="text-right">
                <div className="text-sm">⭐ {doctor.rating}</div>
                <Link to={`/doctor/${doctor.id}`} className="mt-3 inline-block px-3 py-1 rounded-lg border border-primary-200 text-primary-700">مشاهده</Link>
            </div>
        </article>
    );
}
