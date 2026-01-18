import { programData, timelineSteps } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const renderProgramComparison = () => {
        const container = document.getElementById('program-comparison-container');
        if (!container) return;


        let tableHtml = `
            <div class="hidden md:block overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200">
                            <th class="p-6 text-slate-400 font-semibold uppercase text-xs tracking-wider">${programData.headers[0]}</th>
                            <th class="p-6 text-blue-900 font-bold text-lg">${programData.headers[1]}</th>
                            <th class="p-6 text-blue-900 font-bold text-lg">${programData.headers[2]}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${programData.rows.map(row => `
                            <tr class="hover:bg-blue-50/30 transition-colors">
                                <td class="p-6 font-semibold text-slate-700 bg-slate-50/30">${row.feature}</td>
                                <td class="p-6 text-slate-600">${row.magang}</td>
                                <td class="p-6 text-blue-900 font-medium">${row.ssw}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;


        let cardsHtml = `
            <div class="md:hidden flex flex-col gap-8">
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-blue-100 text-blue-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Rekomendasi Pemula</div>
                    <h3 class="text-xl font-bold text-blue-900 mb-6 border-b pb-4">${programData.headers[1]}</h3>
                    <div class="space-y-4">
                        ${programData.rows.map(row => `
                            <div>
                                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">${row.feature}</p>
                                <p class="text-slate-700 font-medium">${row.magang}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="bg-white p-6 rounded-3xl border-2 border-red-500 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Profesional</div>
                    <h3 class="text-xl font-bold text-blue-900 mb-6 border-b pb-4">${programData.headers[2]}</h3>
                    <div class="space-y-4">
                        ${programData.rows.map(row => `
                            <div>
                                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">${row.feature}</p>
                                <p class="text-blue-900 font-bold">${row.ssw}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = tableHtml + cardsHtml;
    };

    const renderTimeline = () => {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        timelineSteps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'timeline-step group relative flex flex-col items-center lg:items-start';
            stepEl.innerHTML = `
                <div class="flex flex-col items-center lg:items-start w-full">
                    <div class="relative mb-6">
                        <div class="w-20 h-20 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center shadow-lg group-hover:border-red-500 group-hover:scale-110 transition-all duration-300 z-10 relative">
                            <i data-lucide="${step.icon}" class="w-10 h-10 text-blue-900 group-hover:text-red-600 transition-colors"></i>
                        </div>
                        <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-extrabold shadow-lg z-20 border-2 border-white">
                            ${index + 1}
                        </div>
                    </div>
                    <div class="text-center lg:text-left">
                        <h4 class="font-extrabold text-blue-950 text-lg mb-2 group-hover:text-red-600 transition-colors">${step.title}</h4>
                        <p class="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto lg:mx-0">${step.desc}</p>
                    </div>
                </div>
                <!-- Vertical Line for Mobile -->
                <div class="lg:hidden absolute left-1/2 -bottom-12 w-0.5 h-12 bg-slate-100 -translate-x-1/2 last:hidden"></div>
            `;
            container.appendChild(stepEl);
        });
        lucide.createIcons();
    };

    renderProgramComparison();
    renderTimeline();


    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));


    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-content', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: { trigger: elem, start: 'top 85%' },
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
        });
    });


    gsap.to('#timeline-progress', {
        scrollTrigger: {
            trigger: '#alur',
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1
        },
        width: '100%',
        ease: 'none'
    });

    gsap.from('.timeline-step', {
        scrollTrigger: { trigger: '#alur', start: 'top 70%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)'
    });
});
