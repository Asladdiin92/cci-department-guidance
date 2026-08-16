// CCI Department Choice Guidance System - Main Application
// Author: Asladin Abdukedir (asladdiin92)
// Email: asladdiinabduqaadir@gmail.com
// Date: August 2026

// ========================================
// APPLICATION STATE
// ========================================
const appState = {
    currentQuestionIndex: 0,
    answers: [],
    scores: { CS: 0, SWE: 0, IT: 0, IS: 0, STAT: 0 }
};

// ========================================
// DOM ELEMENTS
// ========================================
const welcomeScreen = document.getElementById('welcomeScreen');
const assessmentScreen = document.getElementById('assessmentScreen');
const resultsScreen = document.getElementById('resultsScreen');
const comparisonScreen = document.getElementById('comparisonScreen');

const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const compareBtn = document.getElementById('compareBtn');
const backToResultsBtn = document.getElementById('backToResultsBtn');
const restartFromCompareBtn = document.getElementById('restartFromCompareBtn');

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const recommendationsContainer = document.getElementById('recommendationsContainer');
const allScoresContainer = document.getElementById('allScoresContainer');
const comparisonTableContainer = document.getElementById('comparisonTableContainer');

// ========================================
// SCREEN MANAGEMENT
// ========================================
function showScreen(screenToShow) {
    [welcomeScreen, assessmentScreen, resultsScreen, comparisonScreen].forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
    window.scrollTo(0, 0);
}

// ========================================
// ASSESSMENT FUNCTIONS
// ========================================
function startAssessment() {
    appState.currentQuestionIndex = 0;
    appState.answers = [];
    appState.scores = { CS: 0, SWE: 0, IT: 0, IS: 0, STAT: 0 };
    showScreen(assessmentScreen);
    displayQuestion();
}

function displayQuestion() {
    const question = questions[appState.currentQuestionIndex];
    
    // Update progress
    const progress = ((appState.currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${appState.currentQuestionIndex + 1} of ${questions.length}`;
    
    // Display question text
    questionText.textContent = question.text;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.dataset.index = index;
        
        // Check if this option was previously selected
        if (appState.answers[appState.currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    prevBtn.disabled = appState.currentQuestionIndex === 0;
    nextBtn.disabled = appState.answers[appState.currentQuestionIndex] === undefined;
}

function selectOption(optionIndex) {
    // Save answer
    appState.answers[appState.currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        if (idx === optionIndex) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Enable next button
    nextBtn.disabled = false;
}

function goToPreviousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        displayQuestion();
    }
}

function goToNextQuestion() {
    if (appState.currentQuestionIndex < questions.length - 1) {
        appState.currentQuestionIndex++;
        displayQuestion();
    } else {
        // Last question - show results
        calculateResults();
        displayResults();
    }
}

// ========================================
// SCORING AND RESULTS
// ========================================
function calculateResults() {
    // Reset scores
    appState.scores = { CS: 0, SWE: 0, IT: 0, IS: 0, STAT: 0 };
    
    // Calculate scores based on answers
    appState.answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        const selectedOption = question.options[answerIndex];
        
        // Add scores from selected option
        Object.keys(selectedOption.scores).forEach(dept => {
            appState.scores[dept] += selectedOption.scores[dept];
        });
    });
}

function displayResults() {
    // Convert scores to percentages and sort
    const maxScore = 60; // Maximum possible score per department (20 questions × 3 max points)
    
    const results = Object.keys(appState.scores).map(dept => ({
        department: dept,
        score: appState.scores[dept],
        percentage: Math.round((appState.scores[dept] / maxScore) * 100),
        info: departments[dept]
    }));
    
    // Sort by percentage (highest first)
    results.sort((a, b) => b.percentage - a.percentage);
    
    // Clear previous results
    recommendationsContainer.innerHTML = '';
    
    // Display top 3 recommendations
    results.slice(0, 3).forEach((result, index) => {
        const card = createRecommendationCard(result, index + 1);
        recommendationsContainer.appendChild(card);
    });
    
    // Show results screen
    showScreen(resultsScreen);
}

function createRecommendationCard(result, rank) {
    const card = document.createElement('div');
    card.className = `recommendation-card rank-${rank}`;
    
    const badge = document.createElement('div');
    badge.className = 'rank-badge';
    badge.textContent = rank === 1 ? '🥇 Top Match' : rank === 2 ? '🥈 Second Match' : '🥉 Third Match';
    
    const deptName = document.createElement('h3');
    deptName.className = 'dept-name';
    deptName.textContent = result.info.fullName;
    deptName.style.color = result.info.color;
    
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    const scoreLabel = document.createElement('div');
    scoreLabel.className = 'score-label';
    scoreLabel.textContent = 'Match Score';
    
    const scoreBar = document.createElement('div');
    scoreBar.className = 'score-bar';
    
    const scoreFill = document.createElement('div');
    scoreFill.className = 'score-fill';
    scoreFill.textContent = result.percentage + '%';
    scoreFill.style.width = '0%';
    scoreFill.style.background = `linear-gradient(90deg, ${result.info.color}, ${result.info.color}dd)`;
    
    // Animate score bar
    setTimeout(() => {
        scoreFill.style.width = result.percentage + '%';
    }, 100 * rank);
    
    scoreBar.appendChild(scoreFill);
    scoreContainer.appendChild(scoreLabel);
    scoreContainer.appendChild(scoreBar);
    
    const description = document.createElement('p');
    description.className = 'match-reason';
    description.textContent = result.info.description;
    
    const careersTitle = document.createElement('p');
    careersTitle.style.fontWeight = '600';
    careersTitle.style.marginTop = '15px';
    careersTitle.style.color = '#333';
    careersTitle.textContent = 'Potential Careers:';
    
    const careersList = document.createElement('ul');
    careersList.style.marginTop = '10px';
    careersList.style.paddingLeft = '20px';
    careersList.style.color = '#555';
    
    result.info.careers.slice(0, 3).forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        li.style.marginBottom = '5px';
        careersList.appendChild(li);
    });
    
    card.appendChild(badge);
    card.appendChild(deptName);
    card.appendChild(scoreContainer);
    card.appendChild(description);
    card.appendChild(careersTitle);
    card.appendChild(careersList);
    
    return card;
}

// ========================================
// COMPARISON SCREEN
// ========================================
function displayComparison() {
    const maxScore = 60;
    
    // Get all results
    const results = Object.keys(appState.scores).map(dept => ({
        department: dept,
        score: appState.scores[dept],
        percentage: Math.round((appState.scores[dept] / maxScore) * 100),
        info: departments[dept]
    }));
    
    // Sort by percentage
    results.sort((a, b) => b.percentage - a.percentage);
    
    // Display score cards
    allScoresContainer.innerHTML = '';
    results.forEach((result, index) => {
        const scoreCard = createScoreCard(result, index === 0);
        allScoresContainer.appendChild(scoreCard);
    });
    
    // Display detailed comparison table
    comparisonTableContainer.innerHTML = '';
    results.forEach(result => {
        const compRow = createComparisonRow(result);
        comparisonTableContainer.appendChild(compRow);
    });
    
    showScreen(comparisonScreen);
}

function createScoreCard(result, isTopMatch) {
    const card = document.createElement('div');
    card.className = 'score-card' + (isTopMatch ? ' top-match' : '');
    
    const deptName = document.createElement('div');
    deptName.className = 'score-card-dept';
    deptName.textContent = result.info.name;
    deptName.style.color = result.info.color;
    
    const percentage = document.createElement('div');
    percentage.className = 'score-card-percentage';
    percentage.textContent = result.percentage + '%';
    percentage.style.color = result.info.color;
    
    const label = document.createElement('div');
    label.className = 'score-card-label';
    label.textContent = 'Match Score';
    
    if (isTopMatch) {
        const badge = document.createElement('div');
        badge.style.cssText = 'background: #fbbf24; color: #78350f; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-top: 10px;';
        badge.textContent = '🥇 Best Match';
        card.appendChild(badge);
    }
    
    card.appendChild(deptName);
    card.appendChild(percentage);
    card.appendChild(label);
    
    return card;
}

function createComparisonRow(result) {
    const row = document.createElement('div');
    row.className = `dept-comparison-row ${result.department.toLowerCase()}`;
    
    // Header with name and score
    const header = document.createElement('div');
    header.className = 'dept-comparison-header';
    
    const name = document.createElement('div');
    name.className = 'dept-comparison-name';
    name.textContent = result.info.fullName;
    name.style.color = result.info.color;
    
    const score = document.createElement('div');
    score.className = 'dept-comparison-score';
    score.textContent = result.percentage + '%';
    score.style.background = result.info.color + '20';
    score.style.color = result.info.color;
    
    header.appendChild(name);
    header.appendChild(score);
    row.appendChild(header);
    
    // Description
    const desc = document.createElement('p');
    desc.style.cssText = 'color: #555; line-height: 1.6; margin-bottom: 15px;';
    desc.textContent = result.info.description;
    row.appendChild(desc);
    
    // Details grid
    const details = document.createElement('div');
    details.className = 'dept-comparison-details';
    
    // Strengths
    const strengthsItem = document.createElement('div');
    strengthsItem.className = 'dept-detail-item';
    strengthsItem.innerHTML = `
        <div class="dept-detail-icon">💪</div>
        <div class="dept-detail-content">
            <h4>Key Strengths</h4>
            <ul>
                ${result.info.strengths.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Careers
    const careersItem = document.createElement('div');
    careersItem.className = 'dept-detail-item';
    careersItem.innerHTML = `
        <div class="dept-detail-icon">💼</div>
        <div class="dept-detail-content">
            <h4>Career Paths</h4>
            <ul>
                ${result.info.careers.slice(0, 3).map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>
    `;
    
    details.appendChild(strengthsItem);
    details.appendChild(careersItem);
    row.appendChild(details);
    
    return row;
}

// ========================================
// EVENT LISTENERS
// ========================================
startBtn.addEventListener('click', startAssessment);
prevBtn.addEventListener('click', goToPreviousQuestion);
nextBtn.addEventListener('click', goToNextQuestion);
restartBtn.addEventListener('click', () => {
    showScreen(welcomeScreen);
});
compareBtn.addEventListener('click', () => {
    displayComparison();
});
backToResultsBtn.addEventListener('click', () => {
    showScreen(resultsScreen);
});
restartFromCompareBtn.addEventListener('click', () => {
    showScreen(welcomeScreen);
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    if (assessmentScreen.classList.contains('active')) {
        // Number keys 1-5 for selecting options
        if (e.key >= '1' && e.key <= '5') {
            const optionIndex = parseInt(e.key) - 1;
            const question = questions[appState.currentQuestionIndex];
            if (optionIndex < question.options.length) {
                selectOption(optionIndex);
            }
        }
        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            goToPreviousQuestion();
        }
        if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            goToNextQuestion();
        }
        // Enter key to go next
        if (e.key === 'Enter' && !nextBtn.disabled) {
            goToNextQuestion();
        }
    }
});

// ========================================
// INITIALIZE APP
// ========================================
console.log('CCI Department Choice Guidance System Loaded');
console.log(`Total Questions: ${questions.length}`);
console.log('Ready to start assessment!');
