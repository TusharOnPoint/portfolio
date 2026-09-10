// scripts.js — UI interactions and dynamic content
document.addEventListener('DOMContentLoaded', () => {

    // Short helper functions
    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
    const escapeHtml = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);

    // Typewriter effect
    const typeEl = $('#typewriter');
    const texts = [
        'Software Engineering Student',
        'Algorithm Enthusiast',
        'Full-Stack Developer',
        'Problem Solver',
        'Peer Mentor'
    ];
    if (typeEl) {
        let ti = 0, ci = 0, deleting = false;
        (function tick() {
            const cur = texts[ti];
            if (deleting) ci = Math.max(0, ci - 1);
            else ci = Math.min(cur.length, ci + 1);
            typeEl.textContent = cur.substring(0, ci);
            let timeout = deleting ? 40 : 110;
            if (!deleting && ci === cur.length) { timeout = 1500; deleting = true; }
            else if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % texts.length; timeout = 400; }
            setTimeout(tick, timeout);
        })();
    }

    // Data: courses, skills, projects
    const COURSES = [
        { name: 'Software Engineering', status: 'Grade: A+', desc: 'Software development lifecycle, design patterns, testing, CI workflows.' },
        { name: 'Competitive Programming', status: 'Grade: B', desc: 'Problem solving, algorithms, data structures, contest strategies.' },
        { name: 'Object-Oriented Programming (OOP)', status: 'Grade: A+', desc: 'Classes, inheritance, polymorphism, design principles.' },
        { name: 'Structured Programming Language', status: 'Grade: A+', desc: 'Control structures, functions, modular design, debugging.' },
        { name: 'Discrete Mathematics', status: 'Grade: A+', desc: 'Logic, set theory, combinatorics, graph theory.' },
        { name: 'Software Requirement Engineering', status: 'Grade: A+', desc: 'Requirement gathering, analysis, specification, validation.' },
        { name: 'Algorithm Design and Analysis', status: 'Pending', desc: 'Design paradigms, complexity, approximation algorithms.' },
        { name: 'Operating System', status: 'Pending', desc: 'Concurrency, scheduling, memory and process management.' },
        { name: 'Database Management System', status: 'Ongoing', desc: 'Indexing, transactions, query optimization.' },
        { name: 'Web Technologies', status: 'Ongoing', desc: 'HTML, CSS, JavaScript, frontend and backend basics.' },
        { name: 'Artificial Intelligence (AI)', status: 'Ongoing', desc: 'Search algorithms, knowledge representation, problem solving.' },
        { name: 'Design Patterns', status: 'Ongoing', desc: 'Common software design patterns and best practices.' }
    ];

    const SKILLS = {
        Languages: [
            { name: 'C', pct: 80 },
            { name: 'C++', pct: 85 },
            { name: 'Java', pct: 80 },
            { name: 'JavaScript', pct: 78 },
            { name: 'Python', pct: 60 },
            { name: 'HTML & CSS', pct: 75 }
        ],
        Frameworks: [
            { name: 'Flutter', pct: 82 },
            { name: 'React', pct: 30 },
            { name: 'Spring Boot', pct: 55 }
        ],
        Tools: [
            { name: 'Git', pct: 75 },
            { name: 'GitHub', pct: 78 },
            { name: 'Maven', pct: 35 }
        ]
    };

    const PROJECTS = [
        {
            id: 'p-campusconnect',
            title: 'CampusConnect — Student Connectivity App',
            short: 'Android app for SUST students to improve peer connectivity and information sharing.',
            long: 'Developed an education and productivity-focused Android application enabling SUST students to connect with peers, share academic updates, and access important campus information. Features include announcements, event listings, and a clean, responsive UI.',
            tech: ['Flutter', 'Firebase', 'Dart'],
            link: 'https://github.com/TusharOnPoint/SWE250Project-Campus-Connect.git'
        },
        {
            id: 'p-echoes',
            title: 'Echoes of Adventure — 2D Java Platformer Game',
            short: 'Platformer game built using LibGDX and Tiled maps.',
            long: 'Created a side-scrolling platformer game with engaging level design, smooth character movement, and interactive obstacles using LibGDX and Tiled map editor. Implemented collision detection, collectibles, and progressive difficulty.',
            tech: ['Java', 'LibGDX', 'Tiled'],
            link: 'https://github.com/TusharOnPoint/Echoes-of-Adventure-A-java-game.git'
        },
        {
            id: 'p-snake',
            title: 'Classic Snake Game (SDL)',
            short: 'A C++ snake game using SDL for graphics rendering.',
            long: 'Built a lightweight classic Snake game from scratch using SDL. Features smooth grid-based movement, dynamic score tracking, and increasing difficulty over time.',
            tech: ['C++', 'SDL'],
            link: 'https://github.com/TusharOnPoint/Project150.git'
        }
    ];

    // Render courses
    function renderCourses() {
        const c = $('#courses-list');
        if (!c) return;
        c.innerHTML = '';
        COURSES.forEach(item => {
            const d = document.createElement('div');
            d.className = 'course-item fade-in';
            d.innerHTML = `
                <div class="course-header">
                    <div class="course-name">${escapeHtml(item.name)}</div>
                    <div class="course-status">${escapeHtml(item.status)}</div>
                </div>
                <p style="color:#d0d0d0; margin-top:.4rem;">${escapeHtml(item.desc)}</p>
            `;
            c.appendChild(d);
        });
    }

    // Render skills
    function renderSkills() {
        const grid = $('#skills-grid');
        if (!grid) return;
        grid.innerHTML = '';
        Object.entries(SKILLS).forEach(([cat, list]) => {
            const card = document.createElement('div');
            card.className = 'skill-category fade-in';
            const inner = document.createElement('div');
            inner.innerHTML = `<h3>${escapeHtml(cat)}</h3>`;
            list.forEach(s => {
                const item = document.createElement('div');
                item.className = 'skill-item';
                item.innerHTML = `
                    <div class="skill-name"><span>${escapeHtml(s.name)}</span><span class="skill-percentage">${escapeHtml(String(s.pct))}%</span></div>
                    <div class="progress-bar"><div class="progress-fill" data-progress="${s.pct}"></div></div>
                `;
                inner.appendChild(item);
            });
            card.appendChild(inner);
            grid.appendChild(card);
        });
    }

    // Render projects
    function renderProjects() {
        const grid = $('#projects-grid');
        if (!grid) return;
        grid.innerHTML = '';
        PROJECTS.forEach(p => {
            const article = document.createElement('article');
            article.className = 'project-card fade-in';
            article.innerHTML = `
                <div class="project-image" aria-hidden="true">📚</div>
                <div class="project-content">
                    <h3 class="project-title">${escapeHtml(p.title)}</h3>
                    <p class="project-description">${escapeHtml(p.short)}</p>
                    <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}</div>
                    <div style="display:flex; gap:.6rem; margin-top:.6rem;">
                        <button class="btn project-open" data-id="${escapeHtml(p.id)}">Preview</button>
                        <a class="project-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">GitHub Repo</a>
                    </div>
                </div>
            `;
            grid.appendChild(article);
        });
    }

    // Initial rendering
    renderCourses();
    renderSkills();
    renderProjects();

    // Progress bar animation when visible
    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const fill = en.target;
                const v = fill.getAttribute('data-progress') || '0';
                setTimeout(() => fill.style.width = v + '%', 120);
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.35 });

    function observeAllProgress() {
        $$('.progress-fill').forEach(el => progressObserver.observe(el));
    }
    observeAllProgress();

    // Navigation active state
    const navbar = $('#navbar');
    const navLinks = $$('.nav-link');
    const sections = $$('.section');

    function updateActiveNav() {
        const pos = window.scrollY + window.innerHeight * 0.25;
        sections.forEach((sec, idx) => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (pos >= top && pos < bottom) {
                navLinks.forEach(n => n.classList.remove('active'));
                if (navLinks[idx]) navLinks[idx].classList.add('active');
            }
        });
    }

    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar && navbar.classList.add('scrolled');
        else navbar && navbar.classList.remove('scrolled');
        updateActiveNav();
    });

    // Smooth scrolling
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const t = document.querySelector(href);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nav = $('#nav-links');
        if (nav && nav.classList.contains('show')) {
            nav.classList.remove('show');
            $('#mobile-toggle').setAttribute('aria-expanded', 'false');
        }
    }));

    // Mobile nav toggle
    $('#mobile-toggle') && $('#mobile-toggle').addEventListener('click', () => {
        const nav = $('#nav-links');
        if (!nav) return;
        const open = nav.classList.toggle('show');
        $('#mobile-toggle').setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Ripple effect
    document.addEventListener('pointerdown', ev => {
        const tgt = ev.target.closest('.btn, .project-open, .project-link, .project-card');
        if (!tgt) return;
        const rect = tgt.getBoundingClientRect();
        const r = document.createElement('span');
        r.className = 'ripple';
        const size = Math.max(rect.width, rect.height) * 1.4;
        r.style.width = r.style.height = size + 'px';
        r.style.left = (ev.clientX - rect.left - size / 2) + 'px';
        r.style.top = (ev.clientY - rect.top - size / 2) + 'px';
        tgt.appendChild(r);
        setTimeout(() => r.remove(), 650);
    });

    // Project modal
    const modal = $('#project-modal');
    const modalTitle = $('#modal-title');
    const modalBody = $('#modal-body');
    const modalTech = $('#modal-tech');
    const modalLink = $('#modal-link');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    document.addEventListener('click', e => {
        const btn = e.target.closest('.project-open');
        if (!btn) return;
        const id = btn.dataset.id;
        const p = PROJECTS.find(x => x.id === id);
        if (!p || !modal) return;
        modalTitle.textContent = p.title;
        modalBody.textContent = p.long;
        modalTech.innerHTML = p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join(' ');
        modalLink.href = p.link || '#';
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close').focus();
    });

    modalClose && modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
    modal && modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });

    // Contact form handling
    const contactForm = $('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(contactForm).entries());
            alert(`Thanks ${data.name || 'there'}! Message received (demo).`);
            contactForm.reset();
        });
        $('#clear-form') && $('#clear-form').addEventListener('click', () => contactForm.reset());
    }

    // Footer year
    const y = new Date().getFullYear();
    const yEl = $('#current-year');
    if (yEl) yEl.textContent = y;

    // Re-observe progress after dynamic render
    new MutationObserver(() => observeAllProgress()).observe($('#skills-grid') || document.body, { childList: true, subtree: true });

    // Codeforces and LeetCode placeholders
    const cfHandle = 'Tushar.Das';
    const lcHandle = 'Tushar_Das_';
    $('#cf-handle').textContent = cfHandle;
    $('#cf-link').href = `https://codeforces.com/profile/${cfHandle}`;
    $('#cf-rating').textContent = '800+';
    $('#lc-handle').textContent = lcHandle;
    $('#lc-link').href = `https://leetcode.com/${lcHandle}`;
    $('#lc-solved').textContent = '—';
});
