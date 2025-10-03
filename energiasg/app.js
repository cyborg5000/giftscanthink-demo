// Storage Helper Functions
const storage = {
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getSleepLogs: () => {
        return storage.get('sleepLogs') || [];
    },
    addSleepLog: (log) => {
        const logs = storage.getSleepLogs();
        logs.push(log);
        storage.set('sleepLogs', logs);
    },
    getUserProtocol: () => {
        return storage.get('userProtocol') || null;
    },
    setUserProtocol: (protocol) => {
        storage.set('userProtocol', protocol);
    }
};

// Page Navigation
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}-page`).classList.add('active');

    if (pageName === 'dashboard') {
        loadDashboard();
    }
}

// Quiz Functions
function showQuiz() {
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
}

function updateQualityValue(value) {
    document.getElementById('quality-value').textContent = value;
}

function handleQuiz(event) {
    event.preventDefault();

    const hours = parseFloat(document.getElementById('hours').value);
    const quality = parseInt(document.getElementById('quality').value);
    const mood = document.getElementById('mood').value;

    const issues = Array.from(document.querySelectorAll('input[name="issues"]:checked'))
        .map(cb => cb.value);

    // Calculate sleep score (0-100)
    const sleepScore = calculateSleepScore(hours, quality, mood);

    // Generate supplement protocol
    const protocol = generateProtocol(issues, sleepScore);

    // Save to storage
    storage.setUserProtocol(protocol);

    // Log initial sleep entry
    const today = new Date().toISOString().split('T')[0];
    storage.addSleepLog({
        date: today,
        hours: hours,
        quality: quality,
        mood: mood,
        tookSupplements: false
    });

    // Show results
    displayResults(sleepScore, protocol);
}

function calculateSleepScore(hours, quality, mood) {
    let score = 0;

    // Hours score (40 points max)
    if (hours >= 7 && hours <= 9) {
        score += 40;
    } else if (hours >= 6 && hours < 7) {
        score += 30;
    } else if (hours >= 5 && hours < 6) {
        score += 20;
    } else {
        score += 10;
    }

    // Quality score (40 points max)
    score += quality * 4;

    // Mood score (20 points max)
    const moodScores = {
        'energized': 20,
        'good': 15,
        'okay': 10,
        'tired': 5,
        'exhausted': 0
    };
    score += moodScores[mood] || 0;

    return Math.round(score);
}

function generateProtocol(issues, sleepScore) {
    const supplements = [];

    // Magnesium for most sleep issues
    if (issues.includes('cant_fall_asleep') || issues.includes('stress')) {
        supplements.push({
            name: 'Magnesium Glycinate',
            dosage: '400mg',
            timing: '1 hour before bed',
            benefit: 'Helps relax muscles and calm mind for easier sleep onset',
            link: 'https://energia.sg/products/magnesium'
        });
    }

    // Melatonin for sleep onset issues
    if (issues.includes('cant_fall_asleep')) {
        supplements.push({
            name: 'Melatonin',
            dosage: '3-5mg',
            timing: '30 minutes before bed',
            benefit: 'Regulates sleep-wake cycle naturally',
            link: 'https://energia.sg/products/melatonin'
        });
    }

    // L-Theanine for stress/anxiety
    if (issues.includes('stress') || issues.includes('wake_up_often')) {
        supplements.push({
            name: 'L-Theanine',
            dosage: '200mg',
            timing: 'Before bed or during the day',
            benefit: 'Promotes relaxation without drowsiness',
            link: 'https://energia.sg/products/l-theanine'
        });
    }

    // Ashwagandha for stress and quality
    if (issues.includes('not_refreshed') || issues.includes('stress')) {
        supplements.push({
            name: 'Ashwagandha',
            dosage: '300mg',
            timing: 'Evening with dinner',
            benefit: 'Reduces cortisol and improves deep sleep quality',
            link: 'https://energia.sg/products/ashwagandha'
        });
    }

    // Default recommendation if no specific issues
    if (supplements.length === 0) {
        supplements.push({
            name: 'Sleep Support Bundle',
            dosage: 'As directed',
            timing: 'Evening routine',
            benefit: 'Complete sleep optimization formula',
            link: 'https://energia.sg/products/sleep-bundle'
        });
    }

    return {
        supplements: supplements,
        issues: issues,
        score: sleepScore
    };
}

function displayResults(score, protocol) {
    // Hide quiz, show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');

    // Display score
    document.getElementById('sleep-score').textContent = score;

    // Score message
    let message = '';
    if (score >= 80) {
        message = '🎉 Excellent! Your sleep quality is great!';
    } else if (score >= 60) {
        message = '👍 Good sleep, but there\'s room for improvement';
    } else if (score >= 40) {
        message = '⚠️ Your sleep needs attention';
    } else {
        message = '🚨 Critical: Your sleep quality is poor';
    }
    document.getElementById('score-message').textContent = message;

    // Display recommendations
    const recommendationsHTML = protocol.supplements.map(supp => `
        <div class="supplement-item">
            <h4>${supp.name}</h4>
            <p><strong>Dosage:</strong> ${supp.dosage}</p>
            <p><strong>When:</strong> ${supp.timing}</p>
            <p><strong>Benefit:</strong> ${supp.benefit}</p>
            <button class="buy-button" onclick="window.open('${supp.link}', '_blank')">
                Buy Now on Energia.sg
            </button>
        </div>
    `).join('');

    document.getElementById('supplement-recommendations').innerHTML = recommendationsHTML;

    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

// Dashboard Functions
function handleDailyLog(event) {
    event.preventDefault();

    const hours = parseFloat(document.getElementById('log-hours').value);
    const quality = parseInt(document.getElementById('log-quality').value);
    const mood = document.getElementById('log-mood').value;
    const tookSupplements = document.getElementById('took-supplements').checked;

    const today = new Date().toISOString().split('T')[0];

    storage.addSleepLog({
        date: today,
        hours: hours,
        quality: quality,
        mood: mood,
        tookSupplements: tookSupplements
    });

    // Reset form
    document.getElementById('daily-log').reset();

    // Reload dashboard
    loadDashboard();

    alert('✅ Sleep log saved successfully!');
}

function loadDashboard() {
    loadCurrentProtocol();
    loadSleepChart();
    loadInsights();
}

function loadCurrentProtocol() {
    const protocol = storage.getUserProtocol();
    const protocolDiv = document.getElementById('current-protocol');

    if (!protocol) {
        protocolDiv.innerHTML = '<p>Complete the sleep assessment to get your personalized protocol.</p>';
        return;
    }

    const protocolHTML = protocol.supplements.map(supp => `
        <div class="supplement-item">
            <h4>${supp.name}</h4>
            <p><strong>Take:</strong> ${supp.dosage} ${supp.timing}</p>
            <button class="buy-button" onclick="window.open('${supp.link}', '_blank')">
                Reorder on Energia.sg
            </button>
        </div>
    `).join('');

    protocolDiv.innerHTML = protocolHTML;
}

function loadSleepChart() {
    const logs = storage.getSleepLogs();
    const last7Days = logs.slice(-7);

    const canvas = document.getElementById('sleep-chart');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (last7Days.length === 0) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('No sleep data yet. Log your first entry above!', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Simple bar chart
    const barWidth = canvas.width / last7Days.length;
    const maxQuality = 10;

    last7Days.forEach((log, index) => {
        const barHeight = (log.quality / maxQuality) * (canvas.height - 50);
        const x = index * barWidth;
        const y = canvas.height - barHeight - 30;

        // Bar color based on quality
        let color = '#4CAF50'; // green
        if (log.quality < 5) color = '#f44336'; // red
        else if (log.quality < 7) color = '#ff9800'; // orange

        ctx.fillStyle = color;
        ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

        // Date label
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        const dateLabel = new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillText(dateLabel, x + barWidth / 2, canvas.height - 10);

        // Quality score
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(log.quality, x + barWidth / 2, y - 5);
    });
}

function loadInsights() {
    const logs = storage.getSleepLogs();
    const insightsDiv = document.getElementById('insights');

    if (logs.length < 2) {
        insightsDiv.innerHTML = '<p>Keep logging your sleep to see personalized insights!</p>';
        return;
    }

    const insights = [];

    // Calculate average quality
    const avgQuality = logs.reduce((sum, log) => sum + log.quality, 0) / logs.length;
    const lastWeekAvg = logs.slice(-7).reduce((sum, log) => sum + log.quality, 0) / Math.min(logs.length, 7);

    if (lastWeekAvg > avgQuality) {
        const improvement = Math.round(((lastWeekAvg - avgQuality) / avgQuality) * 100);
        insights.push(`<div class="insight-item"><strong>📈 Trending Up!</strong> Your sleep quality improved ${improvement}% this week!</div>`);
    }

    // Check supplement correlation
    const withSupps = logs.filter(log => log.tookSupplements);
    if (withSupps.length >= 3) {
        const suppAvg = withSupps.reduce((sum, log) => sum + log.quality, 0) / withSupps.length;
        const noSuppAvg = logs.filter(log => !log.tookSupplements).reduce((sum, log) => sum + log.quality, 0) / (logs.length - withSupps.length) || avgQuality;

        if (suppAvg > noSuppAvg) {
            insights.push(`<div class="insight-item"><strong>💊 Supplements Working!</strong> Your sleep quality is ${Math.round(suppAvg - noSuppAvg)} points higher when taking supplements.</div>`);
        }
    }

    // Consistency check
    if (logs.length >= 7) {
        insights.push(`<div class="insight-item"><strong>🎯 Great Consistency!</strong> You've logged ${logs.length} days of sleep data. Keep it up!</div>`);
    }

    insightsDiv.innerHTML = insights.length > 0 ? insights.join('') : '<p>Keep tracking to unlock more insights!</p>';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show home page by default
    showPage('home');
});
