// FILE: src/pages/AboutPage.jsx
import React from "react";
import { Github, Linkedin, Mail, Code, Smartphone, Server } from "lucide-react";

const profileImageUrl =
    "https://placehold.co/200x200/A3E635/ffffff?text=Ali+Asadzadeh";

export default function AboutPage() {
    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-20">
                {/* هدر پروفایل */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <img
                        src={profileImageUrl}
                        alt="تصویر پروفایل"
                        className="w-44 h-44 rounded-full object-cover border-4 border-green-300 shadow-lg hover:scale-105 transition-transform"
                    />
                    <div className="text-center md:text-right">
                        <p className="text-lg text-green-600 font-medium">
                            توسعه‌دهنده وب و موبایل
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-1">
                            Ali Asadzadeh
                        </h1>
                        <p className="text-gray-600 mt-4 max-w-xl leading-relaxed">
                            توسعه‌دهنده‌ای از ماکو که عاشق ساخت راه‌حل‌های خلاقانه و مقیاس‌پذیر
                            برای مشکلات واقعی است. با اشتیاق به فناوری و طراحی تجربه کاربری
                            بهتر.
                        </p>
                    </div>
                </div>

                {/* معرفی و داستان */}
                <section className="max-w-4xl mx-auto mt-16 space-y-6 text-gray-700 leading-loose text-justify">
                    <p>
                        از زمانی که با دنیای برنامه‌نویسی آشنا شدم، هدفم این بوده که
                        تکنولوژی را به ابزاری برای رشد و پیشرفت تبدیل کنم. تجربه کار با
                        پروژه‌های متنوع باعث شد به ترکیبی از مهارت‌های فنی و نگاه
                        کاربرمحور برسم.
                    </p>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-r-4 border-green-500 pr-4">
                            چرا این پروژه را ساختم؟
                        </h2>
                        <p>
                            این پروژه صرفاً یک تمرین برنامه‌نویسی نبود؛ هدفم ایجاد پلی بین
                            تولیدکنندگان محلی و بازارهای گسترده‌تر بود. فناوری می‌تواند صدای
                            کسب‌وکارهای کوچک را به گوش دنیا برساند و من می‌خواستم نمونه‌ای عملی
                            از این ایده ارائه کنم.
                        </p>
                    </div>
                </section>

                {/* مهارت‌ها */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
                        مهارت‌ها و جعبه ابزار من
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <SkillCard
                            icon={<Code className="w-10 h-10 text-green-600" />}
                            title="Front-End"
                            items={["React", "Next.js", "Tailwind CSS"]}
                        />
                        <SkillCard
                            icon={<Server className="w-10 h-10 text-green-600" />}
                            title="Back-End"
                            items={["Node.js", "Express.js", "REST API"]}
                        />
                        <SkillCard
                            icon={<Smartphone className="w-10 h-10 text-green-600" />}
                            title="Mobile"
                            items={["React Native", "Cross-platform"]}
                        />
                    </div>
                </section>

                {/* تماس */}
                <section className="text-center mt-20">
                    <h2 className="text-2xl font-bold text-gray-800">بیایید صحبت کنیم!</h2>
                    <p className="text-gray-600 mt-2 mb-6">
                        برای همکاری یا تبادل ایده در دسترس هستم.
                    </p>
                    <div className="flex justify-center items-center gap-6">
                        <SocialLink
                            href="mailto:aliasadzade13811004@gmail.com"
                            icon={<Mail size={28} />}
                        />
                        <SocialLink
                            href="https://github.com/kking81400"
                            icon={<Github size={28} />}
                        />

                    </div>
                </section>
            </div>
        </div>
    );
}

// کارت مهارت
function SkillCard({ icon, title, items }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
                {icon}
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            </div>
            <ul className="space-y-1 text-gray-600 list-disc list-inside">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

// لینک شبکه اجتماعی
function SocialLink({ href, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition-colors"
        >
            {icon}
        </a>
    );
}
