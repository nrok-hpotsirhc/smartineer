/* Wissen Reloaded - Hauptlogik
 * Daten werden aus js/data/<kategorie>.js in window.APP_DATA registriert.
 * Reihenfolge der Kategorien wird durch window.APP_ORDER definiert.
 */
(function () {
    'use strict';

    const DATA = window.APP_DATA || {};
    const ORDER = (window.APP_ORDER && window.APP_ORDER.length)
        ? window.APP_ORDER
        : Object.keys(DATA);

    const STORAGE_KEY = 'wissen_reloaded_progress_v1';

    // ---------- Progress (localStorage) ----------
    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) { return {}; }
    }
    function saveProgress(p) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
    }
    let progress = loadProgress();

    function taskKey(catId, lvl, idx) { return `${catId}|${lvl}|${idx}`; }
    function isSolved(catId, lvl, idx) { return !!progress[taskKey(catId, lvl, idx)]; }
    function setSolved(catId, lvl, idx, solved) {
        const k = taskKey(catId, lvl, idx);
        if (solved) progress[k] = 1; else delete progress[k];
        saveProgress(progress);
    }

    function categoryStats(catId) {
        const cat = DATA[catId];
        let total = 0, done = 0;
        cat.levels.forEach((tasks, lvl) => {
            tasks.forEach((_, idx) => {
                total++;
                if (isSolved(catId, lvl, idx)) done++;
            });
        });
        return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
    }

    // ---------- State ----------
    let currentCategory = ORDER[0];
    let currentLevel = 0;
    let currentIndex = 0;
    let radarChartInstance = null;

    // ---------- DOM ----------
    const $ = (id) => document.getElementById(id);

    // ---------- Math rendering ----------
    function renderMath(scope) {
        if (window.renderMathInElement) {
            try {
                renderMathInElement(scope || document.body, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            } catch (e) { /* ignore */ }
        }
    }

    // ---------- Navigation ----------
    function switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(v => v.classList.add('hide'));
        const target = $(viewId);
        if (target) target.classList.remove('hide');

        document.querySelectorAll('.nav-btn').forEach(b => {
            const active = b.getAttribute('data-view') === viewId;
            b.classList.toggle('bg-blue-800', active);
            b.classList.toggle('text-white', active);
            b.classList.toggle('text-slate-300', !active);
        });

        if (viewId === 'view-cheatsheet') renderCheatsheets();
        if (viewId === 'view-dashboard') { renderDashboardCards(); updateRadarChart(); updateProgressSummary(); }
        renderMath();
    }

    document.querySelectorAll('.nav-btn').forEach(b => {
        b.addEventListener('click', () => switchView(b.getAttribute('data-view')));
    });

    // ---------- Sidebar / categories ----------
    const catList = $('category-list');

    function renderSidebar() {
        catList.innerHTML = '';
        ORDER.forEach(key => {
            const cat = DATA[key];
            if (!cat) return;
            const { done, total } = categoryStats(key);
            const btn = document.createElement('button');
            btn.className = 'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition focus:outline-none border ' +
                (key === currentCategory
                    ? 'cat-btn-active'
                    : 'text-slate-600 hover:bg-slate-50 border-transparent');
            btn.innerHTML = `
                <div class="flex justify-between items-center">
                    <span>${cat.name}</span>
                    <span class="text-xs text-slate-500">${done}/${total}</span>
                </div>`;
            btn.onclick = () => loadCategory(key);
            catList.appendChild(btn);
        });
    }

    function loadCategory(key) {
        currentCategory = key;
        currentLevel = 0;
        currentIndex = 0;
        renderSidebar();

        const cat = DATA[key];
        $('cat-title').innerHTML = cat.name;
        $('cat-desc').innerHTML = cat.desc;

        $('task-area').classList.remove('hide');
        renderLevelTabs();
        renderTaskPills();
        renderTask();
    }

    // ---------- Level tabs ----------
    const lvlBtns = document.querySelectorAll('.lvl-btn');

    function renderLevelTabs() {
        const cat = DATA[currentCategory];
        lvlBtns.forEach((btn, i) => {
            const tasks = cat.levels[i] || [];
            const cnt = btn.querySelector('[data-lvl-count]');
            if (cnt) cnt.textContent = `(${tasks.length})`;
            const active = i === currentLevel;
            btn.classList.toggle('border-blue-600', active);
            btn.classList.toggle('text-blue-600', active);
            btn.classList.toggle('border-transparent', !active);
            btn.classList.toggle('text-slate-500', !active);
        });
    }

    lvlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLevel = parseInt(btn.getAttribute('data-lvl'), 10);
            currentIndex = 0;
            renderLevelTabs();
            renderTaskPills();
            renderTask();
        });
    });

    // ---------- Task pills ----------
    const pillsRoot = $('task-pills');

    function renderTaskPills() {
        const cat = DATA[currentCategory];
        const tasks = cat.levels[currentLevel] || [];
        pillsRoot.innerHTML = '';
        tasks.forEach((_, idx) => {
            const pill = document.createElement('button');
            const solved = isSolved(currentCategory, currentLevel, idx);
            pill.className = 'task-pill' + (idx === currentIndex ? ' active' : '') + (solved ? ' solved' : '');
            pill.textContent = (idx + 1);
            pill.title = `Aufgabe ${idx + 1}` + (solved ? ' (gelöst)' : '');
            pill.onclick = () => { currentIndex = idx; renderTaskPills(); renderTask(); };
            pillsRoot.appendChild(pill);
        });
    }

    // ---------- Task display ----------
    function renderTask() {
        const cat = DATA[currentCategory];
        const tasks = cat.levels[currentLevel] || [];
        if (!tasks.length) {
            $('task-question').innerHTML = '<em>Noch keine Aufgaben in diesem Level. Erweitere <code>js/data/' + cat.id + '.js</code>.</em>';
            $('task-hint').innerHTML = '';
            $('task-solution').innerHTML = '';
            $('hint-box').classList.add('hide');
            $('solution-box').classList.add('hide');
            $('task-counter').textContent = '0 / 0';
            return;
        }
        if (currentIndex >= tasks.length) currentIndex = 0;
        const task = tasks[currentIndex];

        $('task-question').innerHTML = task.q;
        $('task-hint').innerHTML = task.h;
        $('task-solution').innerHTML = task.s;
        $('hint-box').classList.add('hide');
        $('solution-box').classList.add('hide');
        $('task-counter').textContent = `${currentIndex + 1} / ${tasks.length}`;

        // Update mark-solved button label
        const solved = isSolved(currentCategory, currentLevel, currentIndex);
        const btn = $('btn-mark-solved');
        btn.textContent = solved ? '✓ Gelöst (rückgängig)' : '☐ Als gelöst markieren';
        btn.classList.toggle('bg-emerald-600', !solved);
        btn.classList.toggle('hover:bg-emerald-700', !solved);
        btn.classList.toggle('bg-slate-500', solved);
        btn.classList.toggle('hover:bg-slate-600', solved);

        renderMath();
    }

    $('btn-show-hint').addEventListener('click', () => {
        $('hint-box').classList.remove('hide');
        renderMath();
    });
    $('btn-show-solution').addEventListener('click', () => {
        $('solution-box').classList.remove('hide');
        renderMath();
    });
    $('btn-mark-solved').addEventListener('click', () => {
        const solved = isSolved(currentCategory, currentLevel, currentIndex);
        setSolved(currentCategory, currentLevel, currentIndex, !solved);
        renderTaskPills();
        renderTask();
        renderSidebar();
    });
    $('btn-prev-task').addEventListener('click', () => {
        const tasks = DATA[currentCategory].levels[currentLevel] || [];
        if (!tasks.length) return;
        currentIndex = (currentIndex - 1 + tasks.length) % tasks.length;
        renderTaskPills(); renderTask();
    });
    $('btn-next-task').addEventListener('click', () => {
        const tasks = DATA[currentCategory].levels[currentLevel] || [];
        if (!tasks.length) return;
        currentIndex = (currentIndex + 1) % tasks.length;
        renderTaskPills(); renderTask();
    });

    // ---------- Cheatsheets ----------
    const tabFormulas = $('tab-formulas');
    const tabSolutions = $('tab-solutions');
    const divFormulas = $('cheatsheet-formulas');
    const divSolutions = $('cheatsheet-solutions');

    function setCheatActive(formulasActive) {
        if (formulasActive) {
            tabFormulas.className = 'bg-slate-800 text-white font-bold py-2.5 px-6 rounded-lg shadow';
            tabSolutions.className = 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-lg shadow';
            divFormulas.classList.remove('hide');
            divSolutions.classList.add('hide');
        } else {
            tabSolutions.className = 'bg-slate-800 text-white font-bold py-2.5 px-6 rounded-lg shadow';
            tabFormulas.className = 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-lg shadow';
            divFormulas.classList.add('hide');
            divSolutions.classList.remove('hide');
        }
    }
    tabFormulas.addEventListener('click', () => setCheatActive(true));
    tabSolutions.addEventListener('click', () => setCheatActive(false));

    function renderCheatsheets() {
        divFormulas.innerHTML = '';
        divSolutions.innerHTML = '';
        ORDER.forEach(key => {
            const cat = DATA[key];
            if (!cat) return;

            // Formelkarte
            const fCard = document.createElement('div');
            fCard.className = 'bg-white rounded-xl shadow-sm border border-slate-200 p-6';
            fCard.innerHTML = `
                <h3 class="text-lg font-bold text-slate-800 border-b pb-2 mb-4">${cat.name}</h3>
                <div class="text-slate-700 math-block">${cat.formulas}</div>`;
            divFormulas.appendChild(fCard);

            // Lösungsblock (isoliert)
            const sBlock = document.createElement('div');
            sBlock.className = 'bg-white rounded-xl shadow-sm border border-slate-200 p-6';
            let html = `<h3 class="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">${cat.name} &mdash; Isolierte Musterlösungen</h3>`;
            cat.levels.forEach((tasks, lvl) => {
                if (!tasks.length) return;
                html += `<details class="mb-4" ${lvl === 0 ? 'open' : ''}>
                    <summary class="font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">
                        Level ${lvl + 1} &mdash; ${tasks.length} Aufgaben
                    </summary>
                    <div class="mt-4 flex flex-col gap-6">`;
                tasks.forEach((t, i) => {
                    html += `
                        <div class="border-l-4 border-emerald-300 pl-4">
                            <h4 class="font-bold text-slate-600 mb-1">Aufgabe ${lvl + 1}.${i + 1}</h4>
                            <div class="bg-slate-50 p-3 rounded mb-3 text-slate-800 math-block">${t.q}</div>
                            <h5 class="font-bold text-emerald-700 mb-1">Rechenweg &amp; Kommentar</h5>
                            <div class="text-slate-700 math-block">${t.s}</div>
                        </div>`;
                });
                html += `</div></details>`;
            });
            sBlock.innerHTML = html;
            divSolutions.appendChild(sBlock);
        });
        renderMath();
    }

    // ---------- Dashboard ----------
    function renderDashboardCards() {
        const root = $('dashboard-cards');
        root.innerHTML = '';
        ORDER.forEach(key => {
            const cat = DATA[key];
            if (!cat) return;
            const s = categoryStats(key);
            const card = document.createElement('button');
            card.className = 'bg-white text-left rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition p-5';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-slate-800">${cat.name}</h3>
                    <span class="text-xs font-bold ${s.pct === 100 ? 'text-emerald-600' : 'text-blue-600'}">${s.pct}%</span>
                </div>
                <p class="text-sm text-slate-500 mb-3 line-clamp-2">${cat.desc}</p>
                <div class="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div class="${s.pct === 100 ? 'bg-emerald-500' : 'bg-blue-500'} h-2 rounded-full" style="width:${s.pct}%"></div>
                </div>
                <p class="text-xs text-slate-500">${s.done} / ${s.total} Aufgaben gelöst</p>`;
            card.onclick = () => { loadCategory(key); switchView('view-training'); };
            root.appendChild(card);
        });
    }

    function updateProgressSummary() {
        let total = 0, done = 0;
        ORDER.forEach(k => { const s = categoryStats(k); total += s.total; done += s.done; });
        const pct = total ? Math.round((done / total) * 100) : 0;
        $('progress-summary').textContent = `Gesamt: ${done} / ${total} Aufgaben gelöst (${pct}%).`;
    }

    // ---------- Radar chart ----------
    function buildRadarData() {
        const labels = [], target = [], current = [];
        ORDER.forEach(k => {
            const cat = DATA[k]; if (!cat) return;
            labels.push(cat.name);
            target.push(100);
            current.push(categoryStats(k).pct);
        });
        return { labels, target, current };
    }

    function initRadarChart() {
        const canvas = $('skillsRadarChart'); if (!canvas) return;
        const { labels, target, current } = buildRadarData();
        radarChartInstance = new Chart(canvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Ziel-Kompetenz (%)',
                        data: target,
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                    },
                    {
                        label: 'Aktueller Fortschritt (%)',
                        data: current,
                        fill: true,
                        backgroundColor: 'rgba(245, 158, 11, 0.25)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        pointBackgroundColor: 'rgba(245, 158, 11, 1)'
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { color: '#475569', font: { size: 11 } },
                        ticks: { stepSize: 20, min: 0, max: 100, display: false }
                    }
                },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    function updateRadarChart() {
        if (!radarChartInstance) return;
        const { current } = buildRadarData();
        radarChartInstance.data.datasets[1].data = current;
        radarChartInstance.update();
    }

    // ---------- Buttons ----------
    $('btn-start-training').addEventListener('click', () => switchView('view-training'));
    $('btn-reset-progress').addEventListener('click', () => {
        if (!confirm('Wirklich allen lokalen Fortschritt zurücksetzen?')) return;
        progress = {};
        saveProgress(progress);
        renderSidebar();
        renderTaskPills();
        renderTask();
        renderDashboardCards();
        updateRadarChart();
        updateProgressSummary();
    });

    // ---------- Init ----------
    function init() {
        if (!ORDER.length) {
            document.body.innerHTML = '<p style="padding:2rem;color:#b91c1c">Keine Daten geladen. Prüfe die Skript-Reihenfolge in <code>index.html</code>.</p>';
            return;
        }
        renderSidebar();
        loadCategory(ORDER[0]);
        renderDashboardCards();
        updateProgressSummary();
        initRadarChart();
        switchView('view-dashboard');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
