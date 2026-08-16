// Dashboard JavaScript
// Author: Asladin Abdukedir (asladdiin92)
// Email: asladdiinabduqaadir@gmail.com

// ========================================
// MOCK DATA (Replace with real API calls later)
// ========================================
const mockData = {
    totalAssessments: 127,
    totalStudents: 127,
    avgCompletion: 94,
    departmentDistribution: {
        CS: 28,
        SWE: 45,
        IT: 22,
        IS: 20,
        STAT: 12
    },
    recentActivity: [
        { text: "New student completed assessment", time: "2 minutes ago", icon: "✅" },
        { text: "Generated weekly report", time: "1 hour ago", icon: "📊" },
        { text: "Updated question #15", time: "3 hours ago", icon: "✏️" },
        { text: "25 students took assessment today", time: "5 hours ago", icon: "👥" },
        { text: "Department head reviewed results", time: "1 day ago", icon: "👨‍🏫" }
    ],
    studentRecords: [
        { id: "STD001", date: "2026-08-16", topMatch: "SWE", score: 85, status: "completed" },
        { id: "STD002", date: "2026-08-16", topMatch: "CS", score: 92, status: "completed" },
        { id: "STD003", date: "2026-08-15", topMatch: "IT", score: 78, status: "completed" },
        { id: "STD004", date: "2026-08-15", topMatch: "IS", score: 81, status: "completed" },
        { id: "STD005", date: "2026-08-15", topMatch: "SWE", score: 88, status: "completed" }
    ]
};

// ========================================
// NAVIGATION
// ========================================
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const sectionId = item.dataset.section + '-section';
        document.getElementById(sectionId).classList.add('active');
    });
});

// ========================================
// OVERVIEW SECTION
// ========================================
function initOverview() {
    // Update stats cards
    document.getElementById('totalAssessments').textContent = mockData.totalAssessments;
    document.getElementById('totalStudents').textContent = mockData.totalStudents;
    document.getElementById('avgCompletion').textContent = mockData.avgCompletion + '%';
    
    // Find top department
    const topDept = Object.entries(mockData.departmentDistribution)
        .sort((a, b) => b[1] - a[1])[0];
    document.getElementById('topDepartment').textContent = departments[topDept[0]].name;
    
    // Render department chart
    renderDepartmentChart();
    
    // Render recent activity
    renderRecentActivity();
}

function renderDepartmentChart() {
    const chartContainer = document.getElementById('departmentChart');
    chartContainer.innerHTML = '';
    
    const total = Object.values(mockData.departmentDistribution).reduce((a, b) => a + b, 0);
    
    Object.entries(mockData.departmentDistribution).forEach(([deptCode, count]) => {
        const dept = departments[deptCode];
        const percentage = Math.round((count / total) * 100);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'chart-bar-container';
        
        barContainer.innerHTML = `
            <div class="chart-label">
                <span class="chart-label-text">${dept.fullName}</span>
                <span class="chart-label-value">${count} students (${percentage}%)</span>
            </div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: 0%; background: ${dept.color}">
                    ${percentage}%
                </div>
            </div>
        `;
        
        chartContainer.appendChild(barContainer);
        
        // Animate bar
        setTimeout(() => {
            barContainer.querySelector('.chart-bar-fill').style.width = percentage + '%';
        }, 100);
    });
}

function renderRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = '';
    
    mockData.recentActivity.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityList.appendChild(item);
    });
}

// ========================================
// DEPARTMENTS SECTION
// ========================================
function initDepartments() {
    const container = document.getElementById('departmentStats');
    container.innerHTML = '';
    
    Object.entries(mockData.departmentDistribution).forEach(([deptCode, count]) => {
        const dept = departments[deptCode];
        const total = mockData.totalAssessments;
        const percentage = Math.round((count / total) * 100);
        const avgScore = Math.floor(Math.random() * 20) + 70; // Mock average score
        
        const card = document.createElement('div');
        card.className = 'dept-stat-card';
        card.style.borderTopColor = dept.color;
        
        card.innerHTML = `
            <div class="dept-stat-header">
                <div class="dept-stat-name" style="color: ${dept.color}">${dept.fullName}</div>
                <div class="dept-stat-count" style="background: ${dept.color}20; color: ${dept.color}">
                    ${count}
                </div>
            </div>
            <div class="dept-stat-details">
                <div class="dept-stat-item">
                    <span>Percentage of Total:</span>
                    <strong>${percentage}%</strong>
                </div>
                <div class="dept-stat-item">
                    <span>Average Match Score:</span>
                    <strong>${avgScore}%</strong>
                </div>
                <div class="dept-stat-item">
                    <span>Trend:</span>
                    <strong style="color: #10b981;">↑ ${Math.floor(Math.random() * 15) + 5}%</strong>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ========================================
// STUDENTS SECTION
// ========================================
function initStudents() {
    renderStudentsTable();
    
    // Search functionality
    document.getElementById('searchStudent').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#studentsTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
    
    // Export functionality
    document.getElementById('exportBtn').addEventListener('click', () => {
        alert('Exporting student data to CSV...\n\nThis feature will generate a downloadable CSV file with all student assessment data.');
    });
}

function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    mockData.studentRecords.forEach(student => {
        const row = document.createElement('tr');
        const dept = departments[student.topMatch];
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.date}</td>
            <td><span style="color: ${dept.color}; font-weight: 600;">${dept.name}</span></td>
            <td><strong>${student.score}%</strong></td>
            <td><span class="status-badge status-${student.status}">${student.status}</span></td>
            <td>
                <button class="btn-icon" onclick="viewStudent('${student.id}')" title="View Details">👁️</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function viewStudent(studentId) {
    alert(`Viewing details for ${studentId}\n\nThis will show:\n- Full assessment responses\n- Score breakdown\n- Recommendation history\n- Timestamp data`);
}

// ========================================
// QUESTIONS SECTION
// ========================================
function initQuestions() {
    const container = document.getElementById('questionStats');
    container.innerHTML = '';
    
    // Show first 5 questions as sample
    questions.slice(0, 5).forEach((question, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        
        const avgTime = Math.floor(Math.random() * 20) + 15; // Mock average time
        const skipRate = Math.floor(Math.random() * 5); // Mock skip rate
        
        item.innerHTML = `
            <div class="question-text">Q${index + 1}: ${question.text}</div>
            <div class="question-meta">
                <span>📊 ${question.options.length} options</span>
                <span>⏱️ Avg time: ${avgTime}s</span>
                <span>⏭️ Skip rate: ${skipRate}%</span>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    // Add "view all" button
    const viewAllBtn = document.createElement('button');
    viewAllBtn.className = 'btn btn-primary';
    viewAllBtn.style.cssText = 'width: 100%; margin-top: 20px;';
    viewAllBtn.textContent = `View All ${questions.length} Questions`;
    viewAllBtn.onclick = () => alert('This will show detailed analytics for all questions');
    container.appendChild(viewAllBtn);
}

// ========================================
// INITIALIZE DASHBOARD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initOverview();
    initDepartments();
    initStudents();
    initQuestions();
    
    console.log('Dashboard loaded successfully!');
    console.log(`Total assessments: ${mockData.totalAssessments}`);
});

// ========================================
// EXPORT FUNCTION (Global)
// ========================================
window.viewStudent = viewStudent;
