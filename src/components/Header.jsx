import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white border-b py-3 shadow-sm">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-semibold">ن</div>
                    <div>
                        <div className="text-lg font-bold">نوبت‌یار</div>
                        <div className="text-xs text-muted">سامانهٔ آنلاین نوبت‌دهی پزشکان</div>
                    </div>
                </Link>
                <nav className="flex gap-4 items-center">
                    <NavLink to="/" end className={({isActive})=> isActive? 'text-primary-500 font-semibold' : 'text-muted'}>پزشکان</NavLink>
                    <NavLink to="/appointments" className={({isActive})=> isActive? 'text-primary-500 font-semibold' : 'text-muted'}>نوبت‌های من</NavLink>
                    <Link to="/about" className="text-muted">درباره</Link>
                </nav>
            </div>
        </header>
    );
}
