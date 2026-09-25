const defaultProjects = [
    { id: 1, title: 'E-commerce Store', desc: 'A responsive online shopping platform featuring product catalogs, cart functionality, and secure checkout.' },
    { id: 2, title: 'Weather App', desc: 'A real-time weather forecasting application that fetches dynamic climate data using third-party REST APIs.' },
    { id: 3, title: 'Recipe Finder', desc: 'An interactive web app helping users discover and save new culinary recipes based on available ingredients.' },
    { id: 4, title: 'Task Manager', desc: 'A sleek productivity tool for organizing daily tasks, setting deadlines, and tracking progress.' }
];

window.onload = () => {
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

function renderUserProjects() {
    const grid = document.getElementById('user-projects-grid');
    const projects = getProjects();
    grid.innerHTML = '';

    if(projects.length === 0) {
        grid.innerHTML = '<p>No projects found. Admin needs to add some!</p>';
        return;
    }

    const displayProjects = [...projects, ...projects];

    displayProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${proj.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem;">${proj.desc}</p>
        `;
        grid.appendChild(card);
    });
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