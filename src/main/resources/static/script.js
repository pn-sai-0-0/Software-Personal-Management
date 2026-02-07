// ======================
// Enhanced SPMS JavaScript
// With Manager Features & Employee Details
// ======================

let currentUser = null;
let currentTheme = 'light';
let selectedProject = null;
let selectedEmployees = [];

// Enhanced Mock Data with Daily Activities
const mockProjects = [
    {
        id: 1,
        name: 'E-Commerce Platform Redesign',
        code: 'PROJ-001',
        deadline: '2026-02-28',
        progress: 75,
        status: 'active',
        priority: 'high',
        urgency: 'medium',
        team: ['John Doe', 'Sarah Adams', 'Mike Johnson'],
        teamMembers: [
            { name: 'John Doe', role: 'Lead Developer', commits: 145, hours: 320 },
            { name: 'Sarah Adams', role: 'UI Designer', commits: 89, hours: 280 },
            { name: 'Mike Johnson', role: 'Backend Dev', commits: 112, hours: 290 }
        ],
        filesUploaded: [
            { name: 'design-mockup-v2.fig', uploader: 'Sarah Adams', date: '2026-02-01', size: '2.4 MB' },
            { name: 'api-documentation.pdf', uploader: 'Mike Johnson', date: '2026-02-03', size: '1.8 MB' }
        ],
        filesRequired: [
            { name: 'Final UI Components', status: 'pending' },
            { name: 'API Test Results', status: 'pending' }
        ],
        changeHistory: [
            { date: '2 hours ago', person: 'Mike Johnson', action: 'Completed backend API integration' },
            { date: '5 hours ago', person: 'Sarah Adams', action: 'Uploaded new design mockups' },
            { date: '1 day ago', person: 'John Doe', action: 'Updated project requirements' }
        ],
        comments: [
            { author: 'HR Manager', text: 'Great progress! Please ensure all deliverables are ready by month end.', date: '2026-02-04' }
        ]
    },
    {
        id: 2,
        name: 'Mobile App Development',
        code: 'PROJ-002',
        deadline: '2026-03-15',
        progress: 45,
        status: 'active',
        priority: 'medium',
        urgency: 'high',
        team: ['Alex Thompson', 'Maria Garcia'],
        teamMembers: [
            { name: 'Alex Thompson', role: 'Mobile Developer', commits: 78, hours: 210 },
            { name: 'Maria Garcia', role: 'Backend Developer', commits: 65, hours: 190 }
        ],
        filesUploaded: [
            { name: 'app-wireframes.pdf', uploader: 'Alex Thompson', date: '2026-02-02', size: '3.1 MB' }
        ],
        filesRequired: [
            { name: 'Beta Build APK', status: 'pending' },
            { name: 'Testing Report', status: 'pending' }
        ],
        changeHistory: [
            { date: '3 hours ago', person: 'Maria Garcia', action: 'Completed user authentication module' },
            { date: '1 day ago', person: 'Alex Thompson', action: 'Implemented navigation system' }
        ],
        comments: []
    },
    {
        id: 3,
        name: 'API Integration Project',
        code: 'PROJ-003',
        deadline: '2026-02-20',
        progress: 25,
        status: 'active',
        priority: 'low',
        urgency: 'high',
        team: ['James Wilson'],
        teamMembers: [
            { name: 'James Wilson', role: 'Full Stack Developer', commits: 45, hours: 120 }
        ],
        filesUploaded: [],
        filesRequired: [
            { name: 'API Documentation', status: 'pending' },
            { name: 'Integration Test Results', status: 'pending' }
        ],
        changeHistory: [
            { date: '2 days ago', person: 'James Wilson', action: 'Started API endpoint development' }
        ],
        comments: []
    },
    {
        id: 4,
        name: 'Cloud Migration',
        code: 'PROJ-004',
        deadline: '2026-04-10',
        progress: 60,
        status: 'active',
        priority: 'high',
        urgency: 'low',
        team: ['John Doe', 'Robert Brown'],
        teamMembers: [
            { name: 'John Doe', role: 'Lead Developer', commits: 95, hours: 250 },
            { name: 'Robert Brown', role: 'DevOps Engineer', commits: 88, hours: 240 }
        ],
        filesUploaded: [
            { name: 'migration-plan.docx', uploader: 'Robert Brown', date: '2026-01-25', size: '1.2 MB' }
        ],
        filesRequired: [
            { name: 'Final Migration Report', status: 'pending' }
        ],
        changeHistory: [
            { date: '1 hour ago', person: 'Robert Brown', action: 'Completed database migration' },
            { date: '1 day ago', person: 'John Doe', action: 'Updated deployment scripts' }
        ],
        comments: []
    },
    {
        id: 5,
        name: 'Security Audit System',
        code: 'PROJ-005',
        deadline: '2026-03-05',
        progress: 80,
        status: 'active',
        priority: 'medium',
        urgency: 'medium',
        team: ['Emily Chen', 'David Martinez'],
        teamMembers: [
            { name: 'Emily Chen', role: 'Security Engineer', commits: 120, hours: 310 },
            { name: 'David Martinez', role: 'Senior Developer', commits: 105, hours: 280 }
        ],
        filesUploaded: [
            { name: 'security-report-q1.pdf', uploader: 'Emily Chen', date: '2026-02-03', size: '4.5 MB' },
            { name: 'audit-checklist.xlsx', uploader: 'David Martinez', date: '2026-02-04', size: '856 KB' }
        ],
        filesRequired: [],
        changeHistory: [
            { date: '4 hours ago', person: 'Emily Chen', action: 'Completed penetration testing' },
            { date: '1 day ago', person: 'David Martinez', action: 'Fixed critical vulnerabilities' }
        ],
        comments: [
            { author: 'HR Manager', text: 'Excellent work on security improvements!', date: '2026-02-05' }
        ]
    }
];

const mockEmployees = [
    {
        id: 'EMP-001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        projectCount: 5,
        role: 'Employee',
        status: 'Active',
        lastLogin: '2 hours ago',
        workload: 85,
        hoursPerWeek: 42,
        projectsCompleted: 12,
        projectsOnTime: 10,
        projectsDelayed: 2,
        totalHours: 1250,
        performance: 92,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 8.5, commits: 12, tasks: 5, stress: 'high' },
            { day: 'Tue', date: 'Feb 4', hours: 8, commits: 10, tasks: 4, stress: 'medium' },
            { day: 'Wed', date: 'Feb 5', hours: 9, commits: 15, tasks: 6, stress: 'high' },
            { day: 'Thu', date: 'Feb 6', hours: 7.5, commits: 8, tasks: 3, stress: 'low' },
            { day: 'Fri', date: 'Feb 7', hours: 8, commits: 11, tasks: 5, stress: 'medium' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '2 hours ago', action: 'Pushed 12 commits to E-Commerce Platform', type: 'commit' },
            { time: '4 hours ago', action: 'Completed code review for API Integration', type: 'review' },
            { time: '6 hours ago', action: 'Updated documentation for Cloud Migration', type: 'docs' },
            { time: '1 day ago', action: 'Attended team standup meeting', type: 'meeting' }
        ]
    },
    {
        id: 'EMP-002',
        name: 'Sarah Adams',
        email: 'sarah.adams@company.com',
        department: 'Design',
        skills: ['Figma', 'CSS', 'UI/UX'],
        projectCount: 3,
        role: 'Manager',
        status: 'Active',
        lastLogin: '5 hours ago',
        workload: 60,
        hoursPerWeek: 32,
        projectsCompleted: 15,
        projectsOnTime: 14,
        projectsDelayed: 1,
        totalHours: 980,
        performance: 95,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 7, commits: 5, tasks: 3, stress: 'low' },
            { day: 'Tue', date: 'Feb 4', hours: 7.5, commits: 6, tasks: 4, stress: 'medium' },
            { day: 'Wed', date: 'Feb 5', hours: 8, commits: 7, tasks: 4, stress: 'medium' },
            { day: 'Thu', date: 'Feb 6', hours: 6.5, commits: 4, tasks: 2, stress: 'low' },
            { day: 'Fri', date: 'Feb 7', hours: 7, commits: 5, tasks: 3, stress: 'low' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '5 hours ago', action: 'Uploaded new design mockups', type: 'upload' },
            { time: '1 day ago', action: 'Design review completed', type: 'review' },
            { time: '2 days ago', action: 'Client feedback incorporated', type: 'update' }
        ]
    },
    {
        id: 'EMP-003',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        department: 'Engineering',
        skills: ['Python', 'Django', 'PostgreSQL'],
        projectCount: 4,
        role: 'Employee',
        status: 'Active',
        lastLogin: '1 day ago',
        workload: 75,
        hoursPerWeek: 38,
        projectsCompleted: 10,
        projectsOnTime: 9,
        projectsDelayed: 1,
        totalHours: 1120,
        performance: 88,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 8, commits: 9, tasks: 4, stress: 'medium' },
            { day: 'Tue', date: 'Feb 4', hours: 8.5, commits: 11, tasks: 5, stress: 'high' },
            { day: 'Wed', date: 'Feb 5', hours: 7.5, commits: 8, tasks: 3, stress: 'medium' },
            { day: 'Thu', date: 'Feb 6', hours: 8, commits: 10, tasks: 4, stress: 'medium' },
            { day: 'Fri', date: 'Feb 7', hours: 7, commits: 7, tasks: 3, stress: 'low' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '1 day ago', action: 'Backend API integration completed', type: 'completion' },
            { time: '2 days ago', action: 'Database schema updated', type: 'update' },
            { time: '3 days ago', action: 'Bug fixes deployed to staging', type: 'deployment' }
        ]
    },
    {
        id: 'EMP-004',
        name: 'Emily Chen',
        email: 'emily.chen@company.com',
        department: 'Engineering',
        skills: ['AWS', 'Docker', 'Kubernetes'],
        projectCount: 2,
        role: 'HR',
        status: 'Active',
        lastLogin: '3 hours ago',
        workload: 40,
        hoursPerWeek: 28,
        projectsCompleted: 18,
        projectsOnTime: 17,
        projectsDelayed: 1,
        totalHours: 1450,
        performance: 96,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 6, commits: 4, tasks: 2, stress: 'low' },
            { day: 'Tue', date: 'Feb 4', hours: 6.5, commits: 5, tasks: 3, stress: 'low' },
            { day: 'Wed', date: 'Feb 5', hours: 7, commits: 6, tasks: 3, stress: 'medium' },
            { day: 'Thu', date: 'Feb 6', hours: 5.5, commits: 3, tasks: 2, stress: 'low' },
            { day: 'Fri', date: 'Feb 7', hours: 6, commits: 4, tasks: 2, stress: 'low' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '3 hours ago', action: 'Security testing completed', type: 'testing' },
            { time: '1 day ago', action: 'Infrastructure setup finalized', type: 'setup' }
        ]
    },
    {
        id: 'EMP-005',
        name: 'Alex Thompson',
        email: 'alex.thompson@company.com',
        department: 'Engineering',
        skills: ['React', 'Vue', 'CSS'],
        projectCount: 2,
        role: 'Employee',
        status: 'Active',
        lastLogin: '4 hours ago',
        workload: 45,
        hoursPerWeek: 30,
        projectsCompleted: 8,
        projectsOnTime: 7,
        projectsDelayed: 1,
        totalHours: 650,
        performance: 85,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 6.5, commits: 6, tasks: 3, stress: 'medium' },
            { day: 'Tue', date: 'Feb 4', hours: 7, commits: 7, tasks: 4, stress: 'medium' },
            { day: 'Wed', date: 'Feb 5', hours: 6, commits: 5, tasks: 3, stress: 'low' },
            { day: 'Thu', date: 'Feb 6', hours: 7, commits: 8, tasks: 4, stress: 'medium' },
            { day: 'Fri', date: 'Feb 7', hours: 6.5, commits: 6, tasks: 3, stress: 'low' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '4 hours ago', action: 'Mobile app wireframes completed', type: 'design' },
            { time: '1 day ago', action: 'Component library updated', type: 'update' }
        ]
    },
    {
        id: 'EMP-006',
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        department: 'Engineering',
        skills: ['Python', 'Django', 'PostgreSQL'],
        projectCount: 3,
        role: 'Employee',
        status: 'Active',
        lastLogin: '6 hours ago',
        workload: 55,
        hoursPerWeek: 34,
        projectsCompleted: 11,
        projectsOnTime: 10,
        projectsDelayed: 1,
        totalHours: 890,
        performance: 90,
        dailyActivities: [
            { day: 'Mon', date: 'Feb 3', hours: 7, commits: 8, tasks: 4, stress: 'medium' },
            { day: 'Tue', date: 'Feb 4', hours: 7.5, commits: 9, tasks: 4, stress: 'medium' },
            { day: 'Wed', date: 'Feb 5', hours: 7, commits: 7, tasks: 3, stress: 'low' },
            { day: 'Thu', date: 'Feb 6', hours: 6.5, commits: 6, tasks: 3, stress: 'low' },
            { day: 'Fri', date: 'Feb 7', hours: 7, commits: 8, tasks: 4, stress: 'medium' },
            { day: 'Sat', date: 'Feb 8', hours: 0, commits: 0, tasks: 0, stress: 'none' },
            { day: 'Sun', date: 'Feb 9', hours: 0, commits: 0, tasks: 0, stress: 'none' }
        ],
        recentActivities: [
            { time: '6 hours ago', action: 'User authentication module completed', type: 'completion' },
            { time: '1 day ago', action: 'API endpoints tested', type: 'testing' }
        ]
    }
];

const mockUsers = [...mockEmployees, {
    id: 'ADM-001',
    name: 'David Martinez',
    email: 'david.martinez@company.com',
    department: 'IT',
    role: 'Admin',
    status: 'Active',
    lastLogin: '1 hour ago'
}];

// Notifications
const mockNotifications = [
    { id: 1, title: 'New project assigned', message: 'You have been assigned to Mobile App Development', time: '2 hours ago', type: 'info', read: false },
    { id: 2, title: 'Deadline approaching', message: 'E-Commerce Platform due in 3 days', time: '5 hours ago', type: 'warning', read: false },
    { id: 3, title: 'Code review requested', message: 'Mike Johnson requested review for API Integration', time: '1 day ago', type: 'review', read: true }
];

// ======================
// Theme Toggle
// ======================

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
    localStorage.setItem('spms-theme', currentTheme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('spms-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        });
    }
}

// ======================
// Sidebar Toggle
// ======================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

// ======================
// Notifications
// ======================

function openNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.add('active');
    loadNotifications();
}

function closeNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.remove('active');
}

function loadNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = mockNotifications.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : ''}">
            <strong>${notif.title}</strong>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0.25rem 0;">${notif.message}</p>
            <span style="color: var(--text-tertiary); font-size: 0.75rem;">${notif.time}</span>
        </div>
    `).join('');
}

// ======================
// Modal Functions
// ======================

function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ======================
// Toast Notifications
// ======================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ======================
// Login Handler
// ======================

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;

    currentUser = { username, role };

    // Hide landing page and login modal
    document.getElementById('landingPage').classList.add('hidden');
    closeLoginModal();

    // Show appropriate dashboard
    switch (role) {
        case 'employee':
            document.getElementById('employeeDashboard').classList.remove('hidden');
            loadEmployeeData();
            break;
        case 'manager':
            document.getElementById('managerDashboard').classList.remove('hidden');
            loadManagerData();
            break;
        case 'hr':
            document.getElementById('hrDashboard').classList.remove('hidden');
            loadHRData();
            break;
        case 'admin':
            document.getElementById('adminDashboard').classList.remove('hidden');
            loadAdminData();
            break;
    }

    showToast(`Welcome back, ${username}! 👋`);
}

// ======================
// Logout
// ======================

function logout() {
    currentUser = null;
    document.getElementById('landingPage').classList.remove('hidden');
    document.getElementById('employeeDashboard').classList.add('hidden');
    document.getElementById('managerDashboard').classList.add('hidden');
    document.getElementById('hrDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    
    // Reset form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = '';
    
    showToast('Logged out successfully 👋');
}

// ======================
// View Navigation
// ======================

function showView(dashboard, viewName) {
    // Hide all views
    const views = document.querySelectorAll(`#${dashboard}Dashboard .view-content`);
    views.forEach(view => view.classList.add('hidden'));
    
    // Show selected view
    document.getElementById(`${dashboard}-${viewName}`).classList.remove('hidden');
    
    // Update active menu item
    const menuItems = document.querySelectorAll(`#${dashboard}Dashboard .sidebar-menu li`);
    menuItems.forEach(item => item.classList.remove('active'));
    event.target.closest('li').classList.add('active');
    
    // Update breadcrumb
    const viewElement = document.getElementById(`${dashboard}View`);
    if (viewElement) {
        viewElement.textContent = viewName.charAt(0).toUpperCase() + viewName.slice(1);
    }
}

// ======================
// Employee Dashboard
// ======================

function loadEmployeeData() {
    loadEmployeeProjects();
    loadEmployeeDeadlines();
    loadEmployeeActivity();
    loadPerformanceCharts();
}

function loadEmployeeProjects() {
    const grid = document.getElementById('employeeProjectsGrid');
    grid.innerHTML = mockProjects.map(project => `
        <div class="project-card" onclick="openProjectDetail(${project.id})">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-deadline">Due: ${formatDate(project.deadline)}</div>
                </div>
                <span class="status-badge status-${getStatusColor(project.progress)}">${project.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%;"></div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;">
                <span class="status-badge status-${getPriorityColor(project.priority)}">${project.priority.toUpperCase()}</span>
                <span class="status-badge status-${getUrgencyColor(project.urgency)}">${project.urgency.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

function loadEmployeeDeadlines() {
    const container = document.getElementById('upcomingDeadlines');
    const upcoming = mockProjects.slice(0, 3);
    container.innerHTML = upcoming.map(project => `
        <div class="deadline-item">
            <div>
                <div class="deadline-project">${project.name}</div>
                <div class="deadline-date">Due: ${formatDate(project.deadline)}</div>
            </div>
            <span class="status-badge status-${getStatusColor(project.progress)}">${project.progress}%</span>
        </div>
    `).join('');
}

function loadEmployeeActivity() {
    const container = document.getElementById('recentActivity');
    const activities = [
        { date: '2 hours ago', text: 'Completed task: API Integration', icon: '✅' },
        { date: '5 hours ago', text: 'Uploaded design mockups', icon: '📤' },
        { date: '1 day ago', text: 'Updated project requirements', icon: '📝' }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${activity.icon} ${activity.date}</div>
                ${activity.text}
            </div>
        </div>
    `).join('');
}

function sortProjects() {
    const sortBy = document.getElementById('projectSort').value;
    loadEmployeeProjects();
    showToast(`Projects sorted by ${sortBy} 📊`);
}

function filterProjects() {
    const status = document.getElementById('projectStatusFilter').value;
    const priority = document.getElementById('projectPriorityFilter').value;
    loadEmployeeProjects();
    showToast('Filters applied ✨');
}

function openProjectDetail(projectId) {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('projectDetailModal');
    document.getElementById('projectDetailTitle').textContent = project.name;
    
    const content = `
        <div class="project-detail">
            <div class="detail-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>📊 Progress Overview</h3>
                    <span class="status-badge status-${getStatusColor(project.progress)}">${project.progress}% Complete</span>
                </div>
                <div class="progress-bar" style="height: 12px;">
                    <div class="progress-fill" style="width: ${project.progress}%;"></div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>👥 Team Members & Contributions</h3>
                <div class="team-members-grid">
                    ${project.teamMembers.map(member => `
                        <div class="team-member">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.875rem;">
                                    ${member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <strong>${member.name}</strong>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${member.role}</div>
                                </div>
                            </div>
                            <div style="font-size: 0.875rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
                                <div>💻 Commits: <strong>${member.commits}</strong></div>
                                <div>⏰ Hours: <strong>${member.hours}</strong></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="grid-2" style="margin-top: 1.5rem;">
                <div class="detail-section">
                    <h3>📄 Uploaded Files</h3>
                    <div class="files-grid">
                        ${project.filesUploaded.length > 0 ? project.filesUploaded.map(file => `
                            <div class="file-item">
                                <div class="file-info">
                                    <div class="file-name">📄 ${file.name}</div>
                                    <div class="file-meta">By ${file.uploader} • ${file.date} • ${file.size}</div>
                                </div>
                                <button class="icon-btn">⬇</button>
                            </div>
                        `).join('') : '<p style="color: var(--text-secondary); font-size: 0.875rem;">No files uploaded yet</p>'}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>📋 Required Files</h3>
                    <div class="files-grid">
                        ${project.filesRequired.length > 0 ? project.filesRequired.map(file => `
                            <div class="file-item">
                                <div class="file-info">
                                    <div class="file-name">📋 ${file.name}</div>
                                    <div class="file-meta">Status: <span class="status-badge status-amber">${file.status}</span></div>
                                </div>
                            </div>
                        `).join('') : '<p style="color: var(--text-secondary); font-size: 0.875rem;">✅ All files uploaded!</p>'}
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>�� Change History</h3>
                <div class="timeline">
                    ${project.changeHistory.map(change => `
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <div class="timeline-date">⏱ ${change.date}</div>
                                <strong>${change.person}</strong> ${change.action}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${project.comments.length > 0 ? `
                <div class="detail-section">
                    <h3>💬 Comments & Instructions</h3>
                    <div class="comment-section">
                        ${project.comments.map(comment => `
                            <div class="comment-item">
                                <div class="comment-author">👤 ${comment.author} • ${comment.date}</div>
                                <div class="comment-text">${comment.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('projectDetailContent').innerHTML = content;
    openModal('projectDetailModal');
}

// Performance Charts
function loadPerformanceCharts() {
    const hoursData = [7.5, 8, 7.8, 8.2, 7.9, 8.5, 8.1, 7.6, 8.3, 7.8, 8, 8.2, 7.9, 8.4];
    const commitsData = [12, 15, 11, 18, 14, 20, 16, 13, 19, 15, 17, 21, 14, 18];
    
    createSimpleChart('hoursChart', hoursData, 'rgba(99, 102, 241, 0.8)', 'rgba(99, 102, 241, 0.2)');
    createSimpleChart('commitsChart', commitsData, 'rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.2)');
}

function updatePerformanceChart() {
    const year = document.getElementById('perfYear').value;
    const month = document.getElementById('perfMonth').value;
    showToast(`Updated chart for ${month !== 'all' ? 'Month ' + month : 'All months'} of ${year} 📊`);
    loadPerformanceCharts();
}

function createSimpleChart(canvasId, data, borderColor, backgroundColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = Math.max(...data);
    const barWidth = chartWidth / data.length;
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth;
        const y = canvas.height - padding - barHeight;
        
        // Draw bar
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
        
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 5, y, barWidth - 10, barHeight);
        
        // Draw value on top
        ctx.fillStyle = borderColor;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value.toFixed(1), x + barWidth / 2, y - 5);
    });
}

// ======================
// Manager Dashboard
// ======================

function loadManagerData() {
    loadManagerOverview();
    loadManagerProjects();
    loadWorkloadData();
    loadManagerAnalytics();
}

function loadManagerOverview() {
    // Load high priority projects
    const highPriorityGrid = document.getElementById('managerHighPriorityProjects');
    if (highPriorityGrid) {
        const highPriorityProjects = mockProjects.filter(p => p.priority === 'high');
        highPriorityGrid.innerHTML = highPriorityProjects.map(project => `
            <div class="project-card" onclick="openProjectDetail(${project.id})">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <strong style="font-size: 0.9375rem;">${project.name}</strong>
                    <span class="status-badge status-${getStatusColor(project.progress)}">${project.progress}%</span>
                </div>
                <div class="progress-bar" style="height: 6px;">
                    <div class="progress-fill" style="width: ${project.progress}%;"></div>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Due: ${formatDate(project.deadline)}</p>
            </div>
        `).join('');
    }
    
    // Load team timeline
    const timelineContainer = document.getElementById('managerTimeline');
    if (timelineContainer) {
        const activities = [
            { time: '1 hour ago', action: 'John Doe completed 12 tasks', team: 'Engineering' },
            { time: '3 hours ago', action: 'Sarah Adams updated design mockups', team: 'Design' },
            { time: '5 hours ago', action: 'Mobile App Development milestone reached', team: 'Engineering' },
            { time: '1 day ago', action: 'Weekly team meeting conducted', team: 'All Teams' }
        ];
        
        timelineContainer.innerHTML = activities.map(activity => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">⏱ ${activity.time} • ${activity.team}</div>
                    ${activity.action}
                </div>
            </div>
        `).join('');
    }
    
    // Load charts
    createSimpleChart('teamPerformanceChart', [85, 92, 78, 95, 88, 90], 'rgba(99, 102, 241, 0.8)', 'rgba(99, 102, 241, 0.2)');
    createPieChart('projectStatusChart', [
        { label: 'On Track', value: 5, color: '#10B981' },
        { label: 'At Risk', value: 2, color: '#F59E0B' },
        { label: 'Critical', value: 1, color: '#EF4444' }
    ]);
}

function loadManagerProjects() {
    const grid = document.getElementById('managerProjectsGrid');
    if (!grid) return;
    
    grid.innerHTML = mockProjects.map(project => `
        <div class="project-card" onclick="openProjectDetail(${project.id})">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-deadline">Code: ${project.code}</div>
                </div>
                <span class="status-badge status-${getStatusColor(project.progress)}">
                    ${project.status === 'active' ? 'Active' : 'Completed'}
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 0.875rem;">
                <span>Progress: <strong>${project.progress}%</strong></span>
                <span>Team: <strong>${project.team.length}</strong></span>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;">
                <span class="status-badge status-${getPriorityColor(project.priority)}">${project.priority.toUpperCase()}</span>
                <span class="status-badge status-${getUrgencyColor(project.urgency)}">${project.urgency.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

function filterManagerProjects() {
    loadManagerProjects();
    showToast('Project filters applied 🔍');
}

function loadWorkloadData() {
    const tbody = document.getElementById('workloadTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = mockEmployees.map(emp => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.75rem;">
                        ${emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <strong>${emp.name}</strong>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${emp.id}</div>
                    </div>
                </div>
            </td>
            <td>${emp.department}</td>
            <td><span class="status-badge status-blue">${emp.projectCount}</span></td>
            <td>
                <div class="progress-bar" style="margin: 0;">
                    <div class="progress-fill" style="width: ${emp.workload}%;"></div>
                </div>
            </td>
            <td>
                <span class="status-badge status-${emp.workload > 70 ? 'red' : emp.workload > 50 ? 'amber' : 'green'}">
                    ${emp.workload > 70 ? 'High' : emp.workload > 50 ? 'Medium' : 'Low'}
                </span>
            </td>
            <td><strong>${emp.hoursPerWeek}h</strong></td>
            <td>
                <button class="icon-btn" onclick="openEmployeeDetailModal('${emp.id}')" title="View Details">
                    👁️
                </button>
            </td>
        </tr>
    `).join('');
}

function filterWorkload() {
    loadWorkloadData();
    showToast('Workload filters applied 🔍');
}

// NEW: Open Employee Detail Modal
function openEmployeeDetailModal(empId) {
    const emp = mockEmployees.find(e => e.id === empId);
    if (!emp) return;
    
    const modal = document.getElementById('employeeDetailModal');
    document.getElementById('employeeDetailTitle').textContent = `${emp.name} - Detailed View`;
    
    const content = `
        <div class="employee-detail">
            <!-- Employee Overview -->
            <div class="detail-section">
                <div style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border);">
                    <div style="width: 80px; height: 80px; border-radius: 16px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 2rem; box-shadow: var(--shadow-lg);">
                        ${emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style="flex: 1;">
                        <h2 style="margin-bottom: 0.5rem;">${emp.name}</h2>
                        <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${emp.id} • ${emp.department}</p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${emp.skills.map(skill => `<span class="skill-tag skill-tag-primary">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${emp.performance}%</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Performance</div>
                    </div>
                </div>
            </div>
            
            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0;">
                <div class="stat-card stat-primary">
                    <div class="stat-content">
                        <div class="stat-value">${emp.projectCount}</div>
                        <div class="stat-label">Active Projects</div>
                    </div>
                </div>
                <div class="stat-card stat-success">
                    <div class="stat-content">
                        <div class="stat-value">${emp.projectsCompleted}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
                <div class="stat-card stat-warning">
                    <div class="stat-content">
                        <div class="stat-value">${emp.hoursPerWeek}h</div>
                        <div class="stat-label">Hours/Week</div>
                    </div>
                </div>
                <div class="stat-card stat-info">
                    <div class="stat-content">
                        <div class="stat-value">${emp.workload}%</div>
                        <div class="stat-label">Workload</div>
                    </div>
                </div>
            </div>
            
            <!-- Daily Activities -->
            <div class="detail-section">
                <h3>📅 Daily Activities (This Week)</h3>
                <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">Track employee's daily work hours, commits, and stress levels for workload management</p>
                <div class="daily-activity-grid">
                    ${emp.dailyActivities.map(day => {
                        let stressClass = '';
                        if (day.stress === 'high') stressClass = 'activity-high';
                        else if (day.stress === 'medium') stressClass = 'activity-medium';
                        else if (day.stress === 'low') stressClass = 'activity-low';
                        
                        return `
                            <div class="activity-day ${stressClass}" title="${day.date}: ${day.hours}h, ${day.commits} commits, ${day.tasks} tasks">
                                <div class="activity-day-name">${day.day}</div>
                                <div class="activity-day-value">${day.hours}h</div>
                                <div style="font-size: 0.625rem; color: var(--text-tertiary); margin-top: 0.125rem;">${day.commits} 💻</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--warning);">
                    <strong>⚠️ Workload Analysis:</strong>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--text-secondary);">
                        ${emp.workload > 70 
                            ? '🔴 High pressure detected. Employee working 9+ hours on some days. Consider redistributing tasks.' 
                            : emp.workload > 50 
                            ? '🟡 Moderate workload. Monitor closely to prevent burnout.' 
                            : '🟢 Healthy workload balance. Employee has capacity for additional tasks.'
                        }
                    </p>
                </div>
            </div>
            
            <!-- Recent Activities -->
            <div class="detail-section">
                <h3>📋 Recent Activities</h3>
                <div class="timeline">
                    ${emp.recentActivities.map(activity => `
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <div class="timeline-date">
                                    ${activity.type === 'commit' ? '💻' : 
                                      activity.type === 'review' ? '👀' : 
                                      activity.type === 'docs' ? '📝' : 
                                      activity.type === 'meeting' ? '🤝' :
                                      activity.type === 'upload' ? '📤' :
                                      activity.type === 'testing' ? '🧪' : '📋'}
                                    ${activity.time}
                                </div>
                                ${activity.action}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Performance Metrics -->
            <div class="grid-2">
                <div class="detail-section">
                    <h3>📊 Performance Breakdown</h3>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>On-Time Completion</span>
                                <strong>${Math.round((emp.projectsOnTime / emp.projectsCompleted) * 100)}%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(emp.projectsOnTime / emp.projectsCompleted) * 100}%;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Workload Utilization</span>
                                <strong>${emp.workload}%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${emp.workload}%;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Overall Performance</span>
                                <strong>${emp.performance}%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${emp.performance}%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>📈 Statistics</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                        <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">${emp.projectsCompleted}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Projects Done</div>
                        </div>
                        <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${emp.totalHours}h</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Total Hours</div>
                        </div>
                        <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">${emp.projectsOnTime}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">On Time</div>
                        </div>
                        <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--danger);">${emp.projectsDelayed}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Delayed</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div style="display: flex; gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);">
                <button class="btn btn-primary btn-glow" onclick="showToast('Message sent to ${emp.name} 📧')">
                    Send Message
                </button>
                <button class="btn btn-secondary" onclick="showToast('Reassigning tasks... ♻️')">
                    Reassign Tasks
                </button>
                <button class="btn btn-secondary" onclick="showToast('Generating detailed report... 📊')">
                    Generate Report
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('employeeDetailContent').innerHTML = content;
    openModal('employeeDetailModal');
}

function loadManagerAnalytics() {
    // Load additional charts for analytics view
    setTimeout(() => {
        createSimpleChart('resourceChart', [75, 85, 65, 90, 80], 'rgba(99, 102, 241, 0.8)', 'rgba(99, 102, 241, 0.2)');
        createSimpleChart('timeTrackingChart', [160, 155, 170, 165, 158], 'rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.2)');
        createSimpleChart('completionChart', [12, 15, 18, 20, 22], 'rgba(245, 158, 11, 0.8)', 'rgba(245, 158, 11, 0.2)');
    }, 100);
}

function createPieChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((item) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
        
        ctx.fillStyle = item.color;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.label} (${item.value})`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

// ======================
// HR Dashboard
// ======================

function loadHRData() {
    loadHRActivities();
    loadHRProjects();
    loadEmployeeTracking();
    loadAssignmentProjects();
    createDeptChart();
}

function loadHRActivities() {
    const container = document.getElementById('hrActivities');
    if (!container) return;
    
    const activities = [
        { date: '1 hour ago', text: 'Assigned 3 developers to Mobile App Project', icon: '🎯' },
        { date: '3 hours ago', text: 'Updated skills for 5 team members', icon: '🎓' },
        { date: '1 day ago', text: 'Onboarded 2 new employees', icon: '👋' }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${activity.icon} ${activity.date}</div>
                ${activity.text}
            </div>
        </div>
    `).join('');
}

function createDeptChart() {
    const canvas = document.getElementById('deptChart');
    if (!canvas) return;
    
    createPieChart('deptChart', [
        { label: 'Engineering', value: 68, color: '#6366F1' },
        { label: 'Design', value: 32, color: '#10B981' },
        { label: 'Product', value: 28, color: '#F59E0B' },
        { label: 'QA', value: 28, color: '#EF4444' }
    ]);
}

function loadAssignmentProjects() {
    const grid = document.getElementById('assignmentProjectsGrid');
    if (!grid) return;
    
    const unassignedProjects = [
        { id: 101, name: 'Customer Portal Redesign', code: 'PROJ-101', urgency: 'high', dueDate: '2026-03-01' },
        { id: 102, name: 'Analytics Dashboard', code: 'PROJ-102', urgency: 'medium', dueDate: '2026-03-05' },
        { id: 103, name: 'Mobile App Prototype', code: 'PROJ-103', urgency: 'high', dueDate: '2026-03-10' }
    ];
    
    grid.innerHTML = unassignedProjects.map(project => `
        <div class="project-card" onclick="selectProjectForAssignment(${project.id}, '${project.name}')">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-deadline">Code: ${project.code}</div>
                </div>
                <span class="status-badge status-${getUrgencyColor(project.urgency)}">${project.urgency.toUpperCase()}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
                📅 Due: ${formatDate(project.dueDate)}
            </p>
            <button class="btn btn-primary btn-glow" style="width: 100%; margin-top: 1rem;" onclick="event.stopPropagation(); selectProjectForAssignment(${project.id}, '${project.name}')">
                Select & Assign Team →
            </button>
        </div>
    `).join('');
}

function filterAssignmentProjects() {
    loadAssignmentProjects();
    showToast('Project filters applied 🔍');
}

function selectProjectForAssignment(projectId, projectName) {
    selectedProject = { id: projectId, name: projectName };
    selectedEmployees = [];
    
    document.getElementById('assignmentStep1').classList.add('hidden');
    document.getElementById('assignmentStep2').classList.remove('hidden');
    document.getElementById('selectedProjectName').textContent = `📁 ${projectName}`;
    
    loadAssignmentEmployees();
}

function backToProjectSelection() {
    document.getElementById('assignmentStep1').classList.remove('hidden');
    document.getElementById('assignmentStep2').classList.add('hidden');
    selectedProject = null;
    selectedEmployees = [];
}

function loadAssignmentEmployees() {
    const available = document.getElementById('availableEmployees');
    const selected = document.getElementById('selectedEmployees');
    
    const availableEmps = mockEmployees.filter(e => !selectedEmployees.includes(e.id));
    
    available.innerHTML = availableEmps.map(emp => `
        <div class="employee-item" onclick="toggleEmployeeSelection('${emp.id}')">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.75rem;">
                    ${emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="employee-name">${emp.name}</div>
            </div>
            <div class="employee-meta">${emp.id} • ${emp.department} • ${emp.projectCount} projects</div>
            <div class="employee-meta">Skills: ${emp.skills.slice(0, 3).join(', ')}</div>
            <div style="margin-top: 0.5rem;">
                <span class="status-badge status-${emp.workload > 70 ? 'red' : emp.workload > 50 ? 'amber' : 'green'}">
                    ${emp.workload > 70 ? 'High Load' : emp.workload > 50 ? 'Medium Load' : 'Available'}
                </span>
            </div>
        </div>
    `).join('');
    
    const selectedEmps = mockEmployees.filter(e => selectedEmployees.includes(e.id));
    selected.innerHTML = selectedEmps.map(emp => `
        <div class="employee-item selected" onclick="toggleEmployeeSelection('${emp.id}')">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--success), var(--success-dark)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.75rem;">
                    ✓
                </div>
                <div class="employee-name">${emp.name}</div>
            </div>
            <div class="employee-meta">${emp.id} • ${emp.department}</div>
        </div>
    `).join('');
    
    document.getElementById('selectedCount').textContent = `(${selectedEmployees.length})`;
}

function toggleEmployeeSelection(empId) {
    if (selectedEmployees.includes(empId)) {
        selectedEmployees = selectedEmployees.filter(id => id !== empId);
    } else {
        selectedEmployees.push(empId);
    }
    loadAssignmentEmployees();
}

function filterAssignmentEmployees() {
    loadAssignmentEmployees();
    showToast('Employee filters applied 🔍');
}

function confirmAssignment() {
    if (selectedEmployees.length === 0) {
        showToast('⚠️ Please select at least one employee');
        return;
    }
    
    showToast(`✅ Assigned ${selectedEmployees.length} employees to ${selectedProject.name}`);
    setTimeout(() => {
        backToProjectSelection();
    }, 1000);
}

function clearSelection() {
    selectedEmployees = [];
    loadAssignmentEmployees();
    showToast('Selection cleared 🗑️');
}

function loadEmployeeTracking() {
    const grid = document.getElementById('employeeTrackingGrid');
    if (!grid) return;
    
    grid.innerHTML = mockEmployees.map(emp => `
        <div class="employee-card" onclick="openEmployeeDetailModal('${emp.id}')">
            <div class="employee-card-header">
                <div class="employee-avatar">${emp.name.split(' ').map(n => n[0]).join('')}</div>
                <div class="employee-info">
                    <h4>${emp.name}</h4>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">${emp.id} • ${emp.department}</div>
                </div>
            </div>
            <div class="employee-stats">
                <div class="stat-item">
                    <div class="stat-item-value">${emp.totalHours}</div>
                    <div class="stat-item-label">Total Hours</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-value">${emp.projectsCompleted}</div>
                    <div class="stat-item-label">Completed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-value">${emp.projectsOnTime}</div>
                    <div class="stat-item-label">On Time</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-value">${emp.projectsDelayed}</div>
                    <div class="stat-item-label">Delayed</div>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.875rem;">Performance</span>
                    <span style="font-weight: 600; color: var(--primary);">${emp.performance}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${emp.performance}%;"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterEmployeeTracking() {
    loadEmployeeTracking();
    showToast('Employee filters applied 🔍');
}

function loadHRProjects() {
    const grid = document.getElementById('hrProjectsGrid');
    if (!grid) return;
    
    grid.innerHTML = mockProjects.map(project => `
        <div class="project-card" onclick="openHRProjectView(${project.id})">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-deadline">Code: ${project.code}</div>
                </div>
                <span class="status-badge status-${getStatusColor(project.progress)}">
                    ${project.team.length > 0 ? 'Assigned' : 'Unassigned'}
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%;"></div>
            </div>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
                👥 Team: ${project.team.length} members • 📅 Due: ${formatDate(project.deadline)}
            </p>
            <button class="btn btn-${project.team.length > 0 ? 'secondary' : 'primary'} btn-glow" style="width: 100%; margin-top: 1rem;">
                ${project.team.length > 0 ? 'View Details →' : 'Assign Team →'}
            </button>
        </div>
    `).join('');
}

function filterHRProjects() {
    loadHRProjects();
    showToast('Project filters applied 🔍');
}

function openHRProjectView(projectId) {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return;
    
    if (project.team.length === 0) {
        selectProjectForAssignment(projectId, project.name);
        showView('hr', 'assignment');
        return;
    }
    
    // Show read-only view with comment option
    const modal = document.getElementById('projectDetailModal');
    document.getElementById('projectDetailTitle').textContent = `${project.name} (HR View)`;
    
    const content = `
        <div class="project-detail">
            <div class="detail-section">
                <h3>📊 Progress: ${project.progress}%</h3>
                <div class="progress-bar" style="height: 12px;">
                    <div class="progress-fill" style="width: ${project.progress}%;"></div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>👥 Team Members (${project.team.length})</h3>
                <div class="team-members-grid">
                    ${project.teamMembers.map(member => `
                        <div class="team-member">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.875rem;">
                                    ${member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <strong>${member.name}</strong>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${member.role}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>📄 Files Uploaded (${project.filesUploaded.length})</h3>
                ${project.filesUploaded.map(file => `
                    <div class="file-item">
                        <div class="file-info">
                            <div class="file-name">📄 ${file.name}</div>
                            <div class="file-meta">${file.uploader} • ${file.date}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="detail-section">
                <button class="btn btn-primary btn-glow" onclick="openCommentModal(${projectId})">
                    💬 Add Comment / Instruction
                </button>
            </div>
            
            ${project.comments.length > 0 ? `
                <div class="detail-section">
                    <h3>💬 Your Comments</h3>
                    ${project.comments.map(comment => `
                        <div class="comment-item">
                            <div class="comment-author">👤 ${comment.author} • ${comment.date}</div>
                            <div class="comment-text">${comment.text}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('projectDetailContent').innerHTML = content;
    openModal('projectDetailModal');
}

function openCommentModal(projectId) {
    document.getElementById('commentProjectId').value = projectId;
    closeModal('projectDetailModal');
    openModal('hrCommentModal');
}

function handleAddComment(event) {
    event.preventDefault();
    const comment = document.getElementById('hrComment').value;
    const projectId = parseInt(document.getElementById('commentProjectId').value);
    
    // Add comment to project
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
        project.comments.push({
            author: 'HR Manager',
            text: comment,
            date: new Date().toISOString().split('T')[0]
        });
    }
    
    showToast('✅ Comment added successfully');
    closeModal('hrCommentModal');
    document.getElementById('hrComment').value = '';
}

// ======================
// Admin Dashboard
// ======================

function loadAdminData() {
    loadSystemActivity();
    loadUsersTable();
    loadProjectsTable();
    createRoleChart();
}

function loadSystemActivity() {
    const container = document.getElementById('systemActivity');
    if (!container) return;
    
    const activities = [
        { date: '5 minutes ago', text: 'New user account created: maria.garcia@company.com', icon: '👤' },
        { date: '1 hour ago', text: 'Project "Cloud Migration" status updated', icon: '📁' },
        { date: '3 hours ago', text: 'Role permissions modified for HR department', icon: '🔑' }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${activity.icon} ${activity.date}</div>
                ${activity.text}
            </div>
        </div>
    `).join('');
}

function createRoleChart() {
    const canvas = document.getElementById('roleChart');
    if (!canvas) return;
    
    createSimpleChart('roleChart', [128, 18, 8, 2], 'rgba(99, 102, 241, 0.8)', 'rgba(99, 102, 241, 0.2)');
}

function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = mockUsers.map(user => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.75rem;">
                        ${user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <strong>${user.name}</strong>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${getRoleBadgeColor(user.role)}">${user.role}</span></td>
            <td><span class="status-badge status-green">${user.status}</span></td>
            <td>${user.lastLogin}</td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="editUser('${user.id}')" title="Edit">✏️</button>
                    <button class="icon-btn" onclick="revokeUser('${user.id}')" title="Revoke Access">🚫</button>
                    <button class="icon-btn" onclick="deleteUser('${user.id}')" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openAddUserModal() {
    openModal('addUserModal');
}

function handleAddUser(event) {
    event.preventDefault();
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const role = document.getElementById('newUserRole').value;
    const dept = document.getElementById('newUserDept').value;
    
    mockUsers.push({
        id: `EMP-${String(mockUsers.length + 1).padStart(3, '0')}`,
        name,
        email,
        role,
        department: dept,
        status: 'Active',
        lastLogin: 'Never'
    });
    
    loadUsersTable();
    closeModal('addUserModal');
    showToast('✅ User added successfully');
    event.target.reset();
}

function editUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editUserName').value = user.name;
    document.getElementById('editUserEmail').value = user.email;
    document.getElementById('editUserRole').value = user.role;
    document.getElementById('editUserDept').value = user.department;
    
    openModal('editUserModal');
}

function handleEditUser(event) {
    event.preventDefault();
    const userId = document.getElementById('editUserId').value;
    const user = mockUsers.find(u => u.id === userId);
    
    if (user) {
        user.name = document.getElementById('editUserName').value;
        user.email = document.getElementById('editUserEmail').value;
        user.role = document.getElementById('editUserRole').value;
        user.department = document.getElementById('editUserDept').value;
    }
    
    loadUsersTable();
    closeModal('editUserModal');
    showToast('✅ User updated successfully');
}

function revokeUser(userId) {
    if (confirm('Are you sure you want to revoke access for this user?')) {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
            user.status = 'Inactive';
            loadUsersTable();
            showToast('⛔ User access revoked');
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const index = mockUsers.findIndex(u => u.id === userId);
        if (index !== -1) {
            mockUsers.splice(index, 1);
            loadUsersTable();
            showToast('🗑️ User deleted successfully');
        }
    }
}

function loadProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = mockProjects.map(project => `
        <tr>
            <td><strong>${project.name}</strong></td>
            <td>Sarah Adams</td>
            <td><span class="status-badge status-blue">${project.team.length}</span></td>
            <td><span class="status-badge status-${project.status === 'active' ? 'green' : 'amber'}">${project.status}</span></td>
            <td>${formatDate(project.deadline)}</td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn" onclick="editProject(${project.id})" title="Edit">✏️</button>
                    <button class="icon-btn" onclick="archiveProject(${project.id})" title="Archive">📦</button>
                    <button class="icon-btn" onclick="deleteProject(${project.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openAddProjectModal() {
    openModal('addProjectModal');
}

function handleAddProject(event) {
    event.preventDefault();
    const name = document.getElementById('newProjectName').value;
    const desc = document.getElementById('newProjectDesc').value;
    const manager = document.getElementById('newProjectManager').value;
    const start = document.getElementById('newProjectStart').value;
    const end = document.getElementById('newProjectEnd').value;
    
    mockProjects.push({
        id: mockProjects.length + 1,
        name,
        code: `PROJ-${String(mockProjects.length + 1).padStart(3, '0')}`,
        deadline: end,
        progress: 0,
        status: 'active',
        priority: 'medium',
        urgency: 'medium',
        team: [],
        teamMembers: [],
        filesUploaded: [],
        filesRequired: [],
        changeHistory: [],
        comments: []
    });
    
    loadProjectsTable();
    closeModal('addProjectModal');
    showToast('✅ Project added successfully');
    event.target.reset();
}

function editProject(projectId) {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('editProjectId').value = project.id;
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectDesc').value = project.name;
    document.getElementById('editProjectManager').value = 'Sarah Adams';
    
    openModal('editProjectModal');
}

function handleEditProject(event) {
    event.preventDefault();
    const projectId = parseInt(document.getElementById('editProjectId').value);
    const project = mockProjects.find(p => p.id === projectId);
    
    if (project) {
        project.name = document.getElementById('editProjectName').value;
    }
    
    loadProjectsTable();
    closeModal('editProjectModal');
    showToast('✅ Project updated successfully');
}

function archiveProject(projectId) {
    if (confirm('Archive this project?')) {
        const project = mockProjects.find(p => p.id === projectId);
        if (project) {
            project.status = 'archived';
            loadProjectsTable();
            showToast('📦 Project archived');
        }
    }
}

function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        const index = mockProjects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            mockProjects.splice(index, 1);
            loadProjectsTable();
            showToast('🗑️ Project deleted successfully');
        }
    }
}

function handleAddRole(event) {
    event.preventDefault();
    showToast('✅ New role created successfully');
    event.target.reset();
}

function handleAddProjectTemplate(event) {
    event.preventDefault();
    showToast('✅ Project template created successfully');
    event.target.reset();
}

function handleSystemConfig(event) {
    event.preventDefault();
    showToast('✅ System configuration saved successfully');
}

// ======================
// Utility Functions
// ======================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStatusColor(progress) {
    if (progress >= 75) return 'green';
    if (progress >= 50) return 'amber';
    return 'red';
}

function getPriorityColor(priority) {
    switch(priority) {
        case 'high': return 'red';
        case 'medium': return 'amber';
        case 'low': return 'green';
        default: return 'blue';
    }
}

function getUrgencyColor(urgency) {
    switch(urgency) {
        case 'high': return 'red';
        case 'medium': return 'amber';
        case 'low': return 'green';
        default: return 'blue';
    }
}

function getRoleBadgeColor(role) {
    switch(role) {
        case 'Admin': return 'red';
        case 'Manager': return 'amber';
        case 'HR': return 'blue';
        default: return 'green';
    }
}

// ======================
// Initialize
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ SPMS Application Loaded');
    loadTheme();
    
    // Close modals when clicking backdrop
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            this.parentElement.classList.remove('active');
        });
    });
    
    // Close notification panel when clicking outside
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('notificationPanel');
        const notificationBtn = e.target.closest('[onclick*="openNotifications"]');
        
        if (!panel.contains(e.target) && !notificationBtn && panel.classList.contains('active')) {
            closeNotifications();
        }
    });
});
