const APPOINTMENTS_KEY = 'nobatyar_appointments_v1';
export const loadAppointments = () => {
    try {
        const raw = localStorage.getItem(APPOINTMENTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('loadAppointments error', e);
        return [];
    }
};

export const saveAppointments = (appointments) => {
    try {
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    } catch (e) {
        console.error('saveAppointments error', e);
    }
};
