const defaultProjects = [
    { id: 1, title: 'E-commerce Store', desc: 'A responsive online shopping platform featuring product catalogs, cart functionality, and secure checkout.' },
    { id: 2, title: 'Weather App', desc: 'A real-time weather forecasting application that fetches dynamic climate data using third-party REST APIs.' },
    { id: 3, title: 'Recipe Finder', desc: 'An interactive web app helping users discover and save new culinary recipes based on available ingredients.' },
    { id: 4, title: 'Task Manager', desc: 'A sleek productivity tool for organizing daily tasks, setting deadlines, and tracking progress.' }
];

window.onload = () => {
    mountLoginGlitchText();
    if (!localStorage.getItem('portfolioProjects')) {
        localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
    }
    checkSession();
};

function showModule(moduleId) {
    document.getElementById('auth-module').classList.add('hidden');
    document.getElementById('user-module').classList.add('hidden');
    document.getElementById('admin-module').classList.add('hidden');
    
    document.getElementById(moduleId).classList.remove('hidden');
}

function checkSession() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
        if (activeUser.role === 'admin') {
            showModule('admin-module');
            renderAdminProjects();
            renderAdminMessages();
        } else {
            showModule('user-module');
            renderUserProjects();
        }
    } else {
        showModule('auth-module');
    }
}

function toggleAuthView() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}

function handleSignup() {
    const userVal = document.getElementById('signup-username').value.trim();
    const passVal = document.getElementById('signup-password').value.trim();
    const roleVal = document.getElementById('signup-role').value;

    if (!userVal || !passVal) return alert("Please fill all fields.");

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.username === userVal)) {
        return alert("Username already taken!");
    }

    users.push({ username: userVal, password: passVal, role: roleVal });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Account created successfully! Please login.");
    toggleAuthView();
}

function handleLogin() {
    const userVal = document.getElementById('login-username').value.trim();
    const passVal = document.getElementById('login-password').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === userVal && u.password === passVal);

    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        checkSession();
    } else {
        alert("Invalid username or password!");
    }
}

function logout() {
    localStorage.removeItem('activeUser');
    checkSession();
}

function getProjects() {
    return JSON.parse(localStorage.getItem('portfolioProjects')) || [];
}

function LoginGlitchText() {
    const headingRef = React.useRef(null);

    React.useEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        function glitchNearCursor(event) {
            heading.querySelectorAll('.glitch-letter').forEach(letter => {
                const box = letter.getBoundingClientRect();
                const centerX = box.left + box.width / 2;
                const centerY = box.top + box.height / 2;
                const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
                letter.classList.toggle('is-glitching', distance < 115);
            });
        }

        function clearGlitch() {
            heading.querySelectorAll('.glitch-letter').forEach(letter => letter.classList.remove('is-glitching'));
        }

        window.addEventListener('pointermove', glitchNearCursor);
        window.addEventListener('pointerleave', clearGlitch);
        return () => {
            window.removeEventListener('pointermove', glitchNearCursor);
            window.removeEventListener('pointerleave', clearGlitch);
        };
    }, []);

    const words = 'team 12 personal portfolio'.split(' ');
    return React.createElement('h1', { className: 'login-glitch-heading', ref: headingRef },
        words.map((word, wordIndex) => React.createElement(React.Fragment, { key: wordIndex },
            React.createElement('span', { className: 'glitch-word' },
                Array.from(word).map((character, letterIndex) =>
                    React.createElement('span', {
                        className: 'glitch-letter',
                        'data-char': character,
                        key: letterIndex
                    }, character)
                )
            ),
            wordIndex < words.length - 1 ? ' ' : null
        ))
    );
}
function mountLoginGlitchText() {
    const container = document.getElementById('login-glitch-title');
    if (!container || !window.React || !window.ReactDOM) return;
    if (!window.loginGlitchRoot) window.loginGlitchRoot = ReactDOM.createRoot(container);
    window.loginGlitchRoot.render(React.createElement(LoginGlitchText));
}
function ProjectGallery() {
    const [projects, setProjects] = React.useState(() => getProjects());
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        const syncProjects = () => setProjects(getProjects());
        window.addEventListener('portfolioProjectsUpdated', syncProjects);
        return () => window.removeEventListener('portfolioProjectsUpdated', syncProjects);
    }, []);

    const filteredProjects = projects.filter(project =>
        `${project.title} ${project.desc}`.toLowerCase().includes(query.toLowerCase())
    );

    return React.createElement('section', { className: 'react-project-gallery' },
        React.createElement('div', { className: 'gallery-toolbar' },
            React.createElement('div', null,
                React.createElement('span', { className: 'gallery-eyebrow' }, 'SELECTED WORK'),
                React.createElement('p', { className: 'gallery-count' }, `${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'}`)
            ),
            React.createElement('label', { className: 'gallery-search-wrap' },
                React.createElement('span', { className: 'search-icon', 'aria-hidden': 'true' }, '⌕'),
                React.createElement('input', {
                    className: 'gallery-search',
                    type: 'search',
                    placeholder: 'Search projects...',
                    value: query,
                    onChange: event => setQuery(event.target.value),
                    'aria-label': 'Search projects'
                })
            )
        ),
        filteredProjects.length
            ? React.createElement('div', { className: 'project-grid' }, filteredProjects.map((project, index) =>
                React.createElement('article', { className: 'project-card', key: project.id },
                    React.createElement('div', { className: `project-card-art art-${index % 4}` },
                        React.createElement('span', { className: 'project-number' }, String(index + 1).padStart(2, '0')),
                        React.createElement('span', { className: 'project-art-mark', 'aria-hidden': 'true' }, ['✳', '◈', '⌘', '✦'][index % 4])
                    ),
                    React.createElement('div', { className: 'project-card-body' },
                        React.createElement('span', { className: 'project-category' }, 'TEAM PROJECT'),
                        React.createElement('h3', { className: 'project-title' }, project.title),
                        React.createElement('p', { className: 'project-description' }, project.desc),
                        React.createElement('span', { className: 'project-card-link' }, 'Explore project ', React.createElement('span', { 'aria-hidden': 'true' }, '↗'))
                    )
                )
            ))
            : React.createElement('div', { className: 'gallery-empty' }, query ? 'No projects match your search.' : 'No projects yet. Add one from the admin dashboard.')
    );
}
function renderUserProjects() {
    const grid = document.getElementById('user-projects-grid');
    if (!grid) return;
    if (!window.projectGalleryRoot) {
        window.projectGalleryRoot = ReactDOM.createRoot(grid);
    }
    window.projectGalleryRoot.render(React.createElement(ProjectGallery));
}

function renderAdminProjects() {
    const list = document.getElementById('admin-projects-list');
    const projects = getProjects();
    list.innerHTML = '';

    projects.forEach(proj => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div>
                <strong>${proj.title}</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">${proj.desc}</p>
            </div>
            <button class="btn btn-danger" onclick="deleteProject(${proj.id})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function addProject() {
    const titleInput = document.getElementById('new-proj-title');
    const descInput = document.getElementById('new-proj-desc');
    
    if (!titleInput.value || !descInput.value) return alert("Fill out title and description!");

    const projects = getProjects();
    const newProject = {
        id: Date.now(),
        title: titleInput.value,
        desc: descInput.value
    };

    projects.push(newProject);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));

    titleInput.value = '';
    descInput.value = '';
    renderAdminProjects();
}

function deleteProject(id) {
    if(!confirm("Are you sure you want to delete this project?")) return;

    let projects = getProjects();
    projects = projects.filter(proj => proj.id !== id);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    
    renderAdminProjects();
}

function submitContact() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if(!name || !email || !message) return alert("Please fill out all contact fields.");

    let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
    messages.push({ id: Date.now(), name, email, message });
    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
    alert("Message sent successfully!");
}

function renderAdminMessages() {
    const list = document.getElementById('admin-messages-list');
    const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
    list.innerHTML = '';

    if (messages.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted);">No messages received yet.</p>';
        return;
    }

    messages.forEach(msg => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div>
                <strong>${msg.name}</strong> 
                <span style="font-size: 0.85rem; color: var(--text-muted);">
                    (<a href="mailto:${msg.email}" style="color: var(--primary); text-decoration: none;">${msg.email}</a>)
                </span>
                <p style="font-size: 0.95rem; color: var(--text-main); margin-top: 0.25rem;">"${msg.message}"</p>
            </div>
            <button class="btn btn-danger" onclick="deleteMessage(${msg.id})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function deleteMessage(id) {
    if(!confirm("Are you sure you want to delete this message?")) return;

    let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
    messages = messages.filter(msg => msg.id !== id);
    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    
    renderAdminMessages();
}
