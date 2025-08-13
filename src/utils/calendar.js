import { addMinutes, parse, isSameDay } from 'date-fns';

/**
 * تاریخ رو به شمسی برمی‌گردونه
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDateShamsi(date) {
    return new Date(date).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * ساعت رو به فرمت ۲۴ ساعته نشون میده (شمسی)
 * @param {Date|string} date
 * @returns {string}
 */
export function formatTime(date) {
    return new Date(date).toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * یک تاریخ رو با رشته ساعت ترکیب می‌کنه
 * @param {Date} date
 * @param {string} timeStr - مثل "14:30"
 */
export function parseTimeToDate(date, timeStr) {
    const [hh, mm] = timeStr.split(':').map(Number);
    const d = new Date(date);
    d.setHours(hh, mm, 0, 0);
    return d;
}

/**
 * روز هفته به فرمت ISO (۱ تا ۷)
 */
export function getISODay(date) {
    const d = new Date(date);
    const day = d.getDay();
    return day === 0 ? 7 : day;
}

/**
 * ساخت لیست بازه‌های زمانی برای یک روز
 */
export function generateSlotsForDate(doctor, date, existingAppointments = []) {
    const dayIndex = getISODay(date); // 1..7
    if (!doctor.schedule.days.includes(dayIndex)) return [];

    const start = parseTimeToDate(date, doctor.schedule.start);
    const end = parseTimeToDate(date, doctor.schedule.end);
    const slots = [];
    let cur = new Date(start);

    while (cur.getTime() + doctor.schedule.slotMinutes * 60000 <= end.getTime()) {
        const slotEnd = addMinutes(cur, doctor.schedule.slotMinutes);
        const taken = existingAppointments.some(
            a =>
                a.doctorId === doctor.id &&
                isSameDay(new Date(a.date), date) &&
                new Date(a.date).getTime() === cur.getTime()
        );
        slots.push({ start: new Date(cur), end: slotEnd, taken });
        cur = slotEnd;
    }
    return slots;
}
