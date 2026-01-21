/* -------------------------------------------------------------------------- */
/* SYSTEM CORE                                                                */
/* -------------------------------------------------------------------------- */

const OS = {
    state: {
        zIndex: 100,
        windows: [], 
        icons: {}, 
        username: "User",
        wallpaper: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=80')",
        notepadContent: "" // Здесь хранится текст блокнота
    },

    init() {
        this.loadState();
        this.Desktop.init();
        this.Taskbar.init();
        this.WindowManager.init();
        this.SystemTray.init();
        this.StartMenu.initSearch();

        // Применяем сохраненные настройки
        document.getElementById("desktop").style.backgroundImage = this.state.wallpaper;
        document.getElementById("user-name-display").innerText = this.state.username;
    },

    saveState() {
        localStorage.setItem("win11_state", JSON.stringify(this.state));
    },

    loadState() {
        const data = JSON.parse(localStorage.getItem("win11_state"));
        if (data) {
            // Мягкое слияние состояний, чтобы не потерять новые поля
            this.state = { ...this.state, ...data };
        }
    },
};

/* -------------------------------------------------------------------------- */
/* APP REGISTRY                                                               */
/* -------------------------------------------------------------------------- */

const Apps = {
    browser: {
        title: "Browser",
        icon: "public",
        color: "text-blue-400",
        content: (id) => `
            <div class="flex flex-col h-full bg-white">
                <div class="h-10 bg-gray-100 flex items-center px-4 border-b">
                    <div class="text-xs text-gray-500 bg-white border rounded-full px-4 py-1 w-full">https://www.bing.com (Protected Mode)</div>
                </div>
                <iframe src="https://www.bing.com/search?q=windows" class="flex-1 border-none"></iframe>
            </div>`,
    },

    // НОВОЕЕ
    // ......
    // .....
    diary: {
        title: "e-Maktab Space",
        icon: "menu_book", // Иконка книжки/дневника
        color: "text-yellow-400",
        content: (id) => `
            <div class="flex flex-col h-full bg-[#121212]">
                <div class="h-10 bg-[#1e1e1e] flex items-center px-4 border-b border-white/5">
                    <div class="text-[11px] text-gray-400 flex items-center gap-2">
                        <span class="material-icons text-xs">lock</span> 
                        https://emaktab-space.vercel.app
                    </div>
                </div>
                <iframe src="https://emaktab-space.vercel.app/" 
                        class="flex-1 border-none"
                        id="diary-frame-${id}"
                        allow="clipboard-write"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                </iframe>
            </div>`,
    },
    gravity: {
        title: "Gravity Particles",
        icon: "blur_on", // Иконка, напоминающая скопление частиц
        color: "text-indigo-300",
        content: (id) => `
            <div class="flex flex-col h-full bg-black">
                <iframe src="https://gravity-particles.vercel.app/" 
                        class="w-full h-full border-none"
                        id="gravity-frame-${id}"
                        sandbox="allow-scripts allow-same-origin">
                </iframe>
            </div>`,
    },
    // notepad: {
    //     title: "Notepad",
    //     icon: "description",
    //     color: "text-yellow-500",
    //     content: (id) => `
    //         <textarea id="txt-${id}" class="w-full h-full bg-[#1e1e1e] text-gray-200 p-4 outline-none font-mono resize-none border-none" 
    //         placeholder="Начните писать...">${OS.state.notepadContent}</textarea>`,
    //     init: (id) => {
    //         const area = document.getElementById(`txt-${id}`);
    //         area.oninput = (e) => {
    //             OS.state.notepadContent = e.target.value;
    //             OS.saveState(); // Автосохранение при каждом вводе
    //         };
    //     }
    // },
    miracle: {
        title: "Miracle App",
        icon: "auto_fix_high",
        color: "text-blue-300",
        content: (id) => `<iframe src="https://miracle-busya.vercel.app/" class="w-full h-full border-none"></iframe>`,
    },
    typer: {
        title: "Typer Master",
        icon: "keyboard",
        color: "text-green-400",
        content: (id) => `<iframe src="https://busyaaa1.github.io/typer/" class="w-full h-full border-none"></iframe>`,
    },
    zenpop: {
        title: "Zen Pop",
        icon: "spa",
        color: "text-purple-400",
        content: (id) => `<iframe src="https://zen-pop.vercel.app/" class="w-full h-full border-none"></iframe>`,
    },
    glowdrive: {
        title: "Glow Drive 3D",
        icon: "sports_esports",
        color: "text-indigo-400",
        content: (id) => `<iframe src="https://glow-drive.vercel.app/" class="w-full h-full border-none"></iframe>`,
    },
    pinkmas: {
        title: "Pinkmas Game",
        icon: "videogame_asset",
        color: "text-pink-400",
        content: (id) => `<iframe src="https://pinkmas.vercel.app/" class="w-full h-full border-none"></iframe>`,
    },
    memory: {
        title: "Sverxrazum",
        icon: "psychology",
        color: "text-yellow-300",
        content: (id) => `<iframe src="https://busyaaa1.github.io/sverxrazum_v_tapke_maliki/" class="w-full h-full border-none"></iframe>`,
    },
    stopwatch: {
        title: "Stopwatch",
        icon: "timer",
        color: "text-red-400",
        content: (id) => `<iframe src="https://busyaaa1.github.io/stopwatch/" class="w-full h-full border-none"></iframe>`,
    },
    todo: {
        title: "To-Do List",
        icon: "checklist",
        color: "text-cyan-400",
        content: (id) => `<iframe src="https://busyaaa1.github.io/to-do_list/" class="w-full h-full border-none"></iframe>`,
    },
    notepad: {
        title: "Secretarium",
        icon: "description", // Иконка щита/безопасности
        color: "text-emerald-400",
        content: (id) => `
            <div class="flex flex-col h-full bg-[#0d1117]">
                <div class="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                
                <div class="flex-1 w-full h-full overflow-hidden">
                    <iframe src="https://busyaaa1.github.io/secretarium/" 
                            class="w-full h-full border-none"
                            id="secret-frame-${id}"
                            allow="clipboard-write"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                    </iframe>
                </div>

                <div class="p-2 flex justify-between bg-[#161b22] border-t border-white/5 px-4">
                    <span class="text-[9px] text-emerald-500 font-mono tracking-widest uppercase animate-pulse">Encrypted Session</span>
                    <span class="text-[9px] text-gray-500 font-mono">v3.0.1</span>
                </div>
            </div>`,
    },
    calculator: {
        title: "Calculator",
        icon: "calculate",
        color: "text-orange-400",
        content: (id) => `
            <div class="flex flex-col h-full bg-[#1c1c1c]">
                <iframe src="https://busyaaa1.github.io/calc-js/" 
                        class="w-full h-full border-none"
                        id="calc-frame-${id}"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                </iframe>
            </div>`,
    },
    paint: {
        title: "Paint",
        icon: "palette",
        color: "text-pink-500",
        content: (id) => `
            <div class="flex flex-col h-full bg-[#333]">
                <div class="h-10 bg-[#444] flex items-center px-2 gap-2">
                    <input type="color" id="color-${id}" value="#60cdff" class="bg-transparent border-none w-6 h-6">
                    <button id="clear-${id}" class="text-xs bg-white/10 px-3 py-1 rounded text-white">Очистить</button>
                </div>
                <div class="flex-1 bg-white relative overflow-hidden" id="canvas-wrap-${id}">
                    <canvas id="cvs-${id}" class="absolute inset-0 cursor-crosshair"></canvas>
                </div>
            </div>`,
        init: (id) => {
            const canvas = document.getElementById(`cvs-${id}`);
            const ctx = canvas.getContext('2d');
            const wrap = document.getElementById(`canvas-wrap-${id}`);
            canvas.width = wrap.clientWidth;
            canvas.height = wrap.clientHeight;
            
            let drawing = false;
            canvas.onmousedown = () => { drawing = true; ctx.beginPath(); };
            window.addEventListener('mouseup', () => drawing = false);
            canvas.onmousemove = (e) => {
                if (!drawing) return;
                const rect = canvas.getBoundingClientRect();
                ctx.lineWidth = 3;
                ctx.lineCap = "round";
                ctx.strokeStyle = document.getElementById(`color-${id}`).value;
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                ctx.stroke();
            };
            document.getElementById(`clear-${id}`).onclick = () => ctx.clearRect(0,0, canvas.width, canvas.height);
        }
    },
    // ВИЖУАЛ СТУДИО КОД
    vscode: {
        title: "Visual Studio Code",
        icon: "code", 
        color: "text-blue-500",
        content: (id) => `
            <div class="flex flex-col h-full bg-[#1e1e1e]">
                <div class="flex-1 w-full h-full overflow-hidden">
                    <iframe src="https://edit-code.vercel.app/" 
                            class="w-full h-full border-none"
                            id="vscode-frame-${id}"
                            allow="clipboard-read; clipboard-write; focus-without-user-activation"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                    </iframe>
                </div>
            </div>`,
    },
    // ИИИИИИИИИИИИИИИИИИИИИИИИИИИ
    // ИИИИИИИИИИИИИИИИИИИИИИИИИИИИИ
    copilot: {
        title: "Busya AI",
        icon: "auto_awesome", // Иконка звезд/магии для Windows 13
        color: "text-purple-300",
        content: (id) => `
            <div class="flex flex-col h-full bg-black/20 backdrop-blur-xl">
                <div class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                <div class="flex-1 w-full h-full overflow-hidden">
                    <iframe src="https://busya-ai.vercel.app/" 
                            class="w-full h-full border-none"
                            id="busya-frame-${id}"
                            allow="clipboard-write"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                    </iframe>
                </div>

                <div class="p-2 flex justify-between bg-black/40 border-t border-white/10 px-4">
                    <span class="text-[9px] text-purple-400 font-bold tracking-tighter uppercase">Busya Core v1.0</span>
                    <div class="flex gap-1">
                        <div class="w-1 h-1 rounded-full bg-purple-500 animate-ping"></div>
                        <span class="text-[9px] text-gray-400">System Integrated</span>
                    </div>
                </div>
            </div>`,
    },
    settings: {
        title: "Settings",
        icon: "settings",
        color: "text-gray-400",
        content: (id) => `
            <div class="p-8 text-white h-full bg-[#202020] overflow-y-auto">
                <h2 class="text-2xl font-bold mb-8">Настройки</h2>
                
                <div class="space-y-8">
                    <section class="bg-white/5 p-4 rounded-lg border border-white/5">
                        <h3 class="text-sm font-semibold mb-4 text-blue-400 uppercase tracking-wider">Персонализация фона</h3>
                        <div class="grid gap-4">
                            <div>
                                <p class="text-xs text-gray-400 mb-2">Ссылка на изображение (URL):</p>
                                <input type="text" id="wall-url" class="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500">
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-xs text-gray-400">Или загрузить файл:</p>
                                <input type="file" id="wall-file" accept="image/*" class="text-xs text-gray-400">
                            </div>
                        </div>
                    </section>

                    <section class="bg-white/5 p-4 rounded-lg border border-white/5">
                        <h3 class="text-sm font-semibold mb-4 text-blue-400 uppercase tracking-wider">Учетная запись</h3>
                        <p class="text-xs text-gray-400 mb-2">Имя пользователя:</p>
                        <input type="text" id="set-username" value="${OS.state.username}" class="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500">
                    </section>

                    <button onclick="OS.System.reset()" class="w-full py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded text-red-500 text-sm transition-all">
                        Сбросить систему
                    </button>
                </div>
            </div>`,
        init: (id) => {
            const urlInput = document.getElementById('wall-url');
            const fileInput = document.getElementById('wall-file');
            const userInput = document.getElementById('set-username');

            // Смена по ссылке
            urlInput.onchange = (e) => {
                const url = `url('${e.target.value}')`;
                OS.state.wallpaper = url;
                document.getElementById('desktop').style.backgroundImage = url;
                OS.saveState();
            };

            // Смена через файл
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const url = `url('${event.target.result}')`;
                    OS.state.wallpaper = url;
                    document.getElementById('desktop').style.backgroundImage = url;
                    OS.saveState();
                };
                reader.readAsDataURL(file);
            };

            // Смена имени
            userInput.oninput = (e) => {
                OS.state.username = e.target.value;
                document.getElementById('user-name-display').innerText = e.target.value;
                OS.saveState();
            };
        }
    }
};

/* -------------------------------------------------------------------------- */
/* WINDOW MANAGER                                                             */
/* -------------------------------------------------------------------------- */

OS.WindowManager = {
    dragState: { dragging: false, id: null, offX: 0, offY: 0 },

    init() {
        window.addEventListener("mouseup", () => this.stopDrag());
        window.addEventListener("mousemove", (e) => this.onDrag(e));
    },

open(appId) {
        const app = Apps[appId];
        const id = "win-" + Date.now();
        const z = ++OS.state.zIndex;

        // 1. Стандартные размеры (если не полноэкранный режим)
        let width = "850px", height = "550px", left = "150px", top = "100px";

        // 2. Специфические настройки для оконных приложений
        if (appId === 'copilot') {
            width = "420px"; height = "85vh"; left = (window.innerWidth - 450) + "px"; top = "20px";
        } else if (appId === 'vscode') {
            width = "95vw"; height = "88vh"; left = "2.5vw"; top = "20px";
        }

        const win = document.createElement("div");
        win.id = id;
        win.className = "os-window active flex flex-col";
        win.style.cssText = `left:${left}; top:${top}; width:${width}; height:${height}; z-index:${z}`;
        win.onmousedown = () => this.focus(id);

        win.innerHTML = `
            <div class="window-header flex items-center justify-between px-3 h-10 bg-[#2c2c2c] select-none rounded-t-xl" 
                 onmousedown="OS.WindowManager.startDrag(event, '${id}')"
                 ondblclick="OS.WindowManager.maximize('${id}')">
                <div class="flex items-center gap-2 text-xs font-medium text-gray-300">
                    <span class="material-icons text-sm ${app.color}">${app.icon}</span> ${app.title}
                </div>
                <div class="flex items-center gap-1">
                    <button class="h-8 w-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors" 
                            onclick="OS.WindowManager.maximize('${id}')">
                        <span class="material-icons text-[16px]">crop_square</span>
                    </button>
                    <button class="h-8 w-8 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors" 
                            onclick="OS.WindowManager.close('${id}')">
                        <span class="material-icons text-sm">close</span>
                    </button>
                </div>
            </div>
            <div class="window-content flex-1 relative overflow-hidden bg-[#1e1e1e] rounded-b-xl">
                ${app.content(id)}
            </div>
        `;

        document.getElementById("windows-layer").appendChild(win);

        // --- СПИСОК ВСЕХ ПОЛНОЭКРАННЫХ ПРИЛОЖЕНИЙ ---
        const fullScreenApps = [
            'glowdrive', 'pinkmas', 'memory', 
            'stopwatch', 'calculator',
            'miracle', 'typer', 'zenpop' // Твои новые приложения!
        ];
        
        if (fullScreenApps.includes(appId)) {
            this.maximize(id);
        }

        if (app.init) app.init(id);
        OS.state.windows.push({ id, appId });
        OS.Taskbar.render();
        this.focus(id);
    },

    maximize(id) {
        const el = document.getElementById(id);
        if (el.classList.contains('maximized')) {
            el.classList.remove('maximized');
            el.style.width = el.dataset.prevWidth;
            el.style.height = el.dataset.prevHeight;
            el.style.left = el.dataset.prevLeft;
            el.style.top = el.dataset.prevTop;
            el.style.borderRadius = "12px";
        } else {
            el.dataset.prevWidth = el.style.width;
            el.dataset.prevHeight = el.style.height;
            el.dataset.prevLeft = el.style.left;
            el.dataset.prevTop = el.style.top;

            el.classList.add('maximized');
            el.style.width = "100vw";
            el.style.height = "calc(100vh - 48px)"; 
            el.style.left = "0";
            el.style.top = "0";
            el.style.borderRadius = "0";
        }
        
        // Фикс для Paint при изменении размера
        const canvas = el.querySelector('canvas');
        if (canvas) {
            const wrap = canvas.parentElement;
            const tempImg = canvas.toDataURL();
            canvas.width = wrap.clientWidth;
            canvas.height = wrap.clientHeight;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0);
            img.src = tempImg;
        }
    },

    focus(id) {
        OS.state.windows.forEach(w => {
            const el = document.getElementById(w.id);
            if (el) {
                if (w.id === id) {
                    el.style.zIndex = ++OS.state.zIndex;
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            }
        });
    },

    close(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
        OS.state.windows = OS.state.windows.filter(w => w.id !== id);
        OS.Taskbar.render();
    },

    startDrag(e, id) {
        if (e.target.closest('button')) return;
        const el = document.getElementById(id);
        if (el.classList.contains('maximized')) return; // Запрет перетаскивания в полноэкранном режиме
        
        this.dragState = { dragging: true, id: id, offX: e.clientX - el.offsetLeft, offY: e.clientY - el.offsetTop };
        el.classList.add("dragging");
        this.focus(id);
    },

    onDrag(e) {
        if (!this.dragState.dragging) return;
        const el = document.getElementById(this.dragState.id);
        el.style.left = (e.clientX - this.dragState.offX) + "px";
        el.style.top = (e.clientY - this.dragState.offY) + "px";
    },

    stopDrag() {
        if (this.dragState.id) {
            const el = document.getElementById(this.dragState.id);
            if (el) el.classList.remove("dragging");
        }
        this.dragState.dragging = false;
    }
};

/* -------------------------------------------------------------------------- */
/* DESKTOP & START MENU                                                       */
/* -------------------------------------------------------------------------- */

OS.Desktop = {
    init() {
        this.renderIcons();
        this.renderStartApps();
    },

    renderIcons() {
        const container = document.getElementById("desktop-icons");
        container.innerHTML = '';
        const GAP_X = 120, GAP_Y = 130; // Широкие отступы для больших иконок
        let col = 0, row = 0;

        Object.keys(Apps).forEach((key) => {
            const app = Apps[key];
            const div = document.createElement("div");
            div.className = "desktop-icon group absolute";
            
            const saved = OS.state.icons[key];
            div.style.left = (saved?.x ?? (40 + col * GAP_X)) + "px";
            div.style.top = (saved?.y ?? (40 + row * GAP_Y)) + "px";

            div.innerHTML = `
                <span class="material-icons ${app.color}">${app.icon}</span>
                <span class="text-white text-center drop-shadow-lg">${app.title}</span>
            `;

            div.ondblclick = () => OS.WindowManager.open(key);
            this.makeIconDraggable(div, key);
            container.appendChild(div);

            row++;
            if (row > 4) { row = 0; col++; }
        });
    },

    renderStartApps(filter = "") {
        const grid = document.getElementById("start-apps-grid");
        grid.innerHTML = '';
        Object.keys(Apps).forEach(key => {
            const app = Apps[key];
            if (!app.title.toLowerCase().includes(filter.toLowerCase())) return;

            const item = document.createElement("div");
            item.className = "flex flex-col items-center gap-1 p-3 hover:bg-white/10 rounded cursor-pointer transition-all";
            item.innerHTML = `
                <span class="material-icons text-3xl ${app.color}">${app.icon}</span>
                <span class="text-[11px] text-white">${app.title}</span>`;
            item.onclick = () => { OS.WindowManager.open(key); OS.Taskbar.toggleStart(); };
            grid.appendChild(item);
        });
    },

    makeIconDraggable(el, appId) {
        let isMoving = false, ox, oy;
        el.onmousedown = (e) => {
            isMoving = true;
            ox = e.clientX - el.offsetLeft; oy = e.clientY - el.offsetTop;
            el.style.zIndex = 1000;
        };
        window.addEventListener("mousemove", (e) => {
            if (!isMoving) return;
            el.style.left = (e.clientX - ox) + "px";
            el.style.top = (e.clientY - oy) + "px";
        });
        window.addEventListener("mouseup", () => {
            if (!isMoving) return;
            isMoving = false;
            OS.state.icons[appId] = { x: el.offsetLeft, y: el.offsetTop };
            OS.saveState();
        });
    }
};

/* -------------------------------------------------------------------------- */
/* UI LOGIC                                                                   */
/* -------------------------------------------------------------------------- */

OS.StartMenu = {
    initSearch() {
        const searchInput = document.querySelector('#start-menu input');
        searchInput.oninput = (e) => OS.Desktop.renderStartApps(e.target.value);
    }
};

OS.Taskbar = {
    init() {
        document.getElementById("start-btn").onclick = () => this.toggleStart();
    },
    render() {
        const center = document.getElementById("taskbar-center");
        while (center.children.length > 1) center.removeChild(center.lastChild);
        OS.state.windows.forEach(win => {
            const app = Apps[win.appId];
            const btn = document.createElement("button");
            btn.className = "h-10 w-10 rounded hover:bg-white/10 flex items-center justify-center relative";
            btn.innerHTML = `<span class="material-icons ${app.color}">${app.icon}</span>
                             <div class="absolute bottom-0 w-2 h-0.5 bg-blue-400 rounded-full"></div>`;
            btn.onclick = () => OS.WindowManager.focus(win.id);
            center.appendChild(btn);
        });
    },
    toggleStart() {
        document.getElementById("start-menu").classList.toggle("start-open");
    }
};

OS.SystemTray = {
    init() {
        const update = () => {
            const now = new Date();
            document.getElementById("clock-time").innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("clock-date").innerText = now.toLocaleDateString();
        };
        update();
        setInterval(update, 1000);
    }
};

OS.System = {
    reset() {
        if (confirm("Сбросить все настройки? Система будет перезагружена.")) {
            const bsod = document.getElementById("bsod");
            const progressLabel = document.getElementById("bsod-progress");
            
            // 1. Показываем синий экран
            bsod.style.display = "block";
            
            // 2. Имитируем рост процентов
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 20) + 5; // Случайный шаг
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // 3. Через 500мс после 100% делаем реальный сброс
                    setTimeout(() => {
                        localStorage.removeItem("win11_state");
                        location.reload();
                    }, 500);
                }
                progressLabel.innerText = progress;
            }, 400); // Скорость обновления (весь процесс займет ~2-3 сек)
        }
    }
};

// Запуск
OS.init();








// // 1. Загружаем API
// let tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// document.head.appendChild(tag);

// let wallpaperPlayer;
// let isApiReady = false;

// // Эта функция вызывается самим YouTube когда всё готово
// function onYouTubeIframeAPIReady() {
//     isApiReady = true;
//     console.log("YouTube API Ready ✅");
// }

// OS.setVideoWallpaper = function(url) {
//     if (!isApiReady) {
//         console.log("Ждем загрузки API...");
//         setTimeout(() => OS.setVideoWallpaper(url), 1000);
//         return;
//     }

//     const videoId = extractVideoId(url);
//     if (!videoId) return alert("Бро, это не похоже на ссылку YouTube!");

//     if (wallpaperPlayer && wallpaperPlayer.loadVideoById) {
//         wallpaperPlayer.loadVideoById({
//             videoId: videoId,
//             suggestedQuality: 'hd1080'
//         });
//     } else {
//         wallpaperPlayer = new YT.Player('video-wallpaper-player', {
//             height: '100%',
//             width: '100%',
//             videoId: videoId,
//             playerVars: {
//                 'autoplay': 1,
//                 'controls': 0,
//                 'disablekb': 1,
//                 'enablejsapi': 1,
//                 'iv_load_policy': 3,
//                 'modestbranding': 1,
//                 'rel': 0,
//                 'showinfo': 0,
//                 'mute': 1,
//                 'loop': 1,
//                 'playlist': videoId // Обязательно для цикла!
//             },
//             events: {
//                 'onReady': (e) => {
//                     console.log("Видео готово, запускаю...");
//                     e.target.mute(); // Еще раз на всякий случай
//                     e.target.playVideo();
//                 },
//                 'onStateChange': (e) => {
//                     // Если видео встало на паузу само (баг браузера), запускаем снова
//                     if (e.data === YT.PlayerState.PAUSED) {
//                         e.target.playVideo();
//                     }
//                     if (e.data === YT.PlayerState.ENDED) {
//                         e.target.playVideo();
//                     }
//                 }
//             }
//         });
//     }
// };

// function extractVideoId(url) {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;

// }

