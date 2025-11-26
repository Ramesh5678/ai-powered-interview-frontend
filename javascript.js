// Candidate data mock
const candidates = [
  { name: "Alice Johnson", email: "alice@example.com", position: "Frontend Developer", status: "Scheduled" },
  { name: "Bob Smith", email: "bob@example.com", position: "Backend Developer", status: "Pending" },
  { name: "Charlie Lee", email: "charlie@example.com", position: "Data Scientist", status: "Completed" }
];

// Render candidates table
function renderCandidates() {
  const tbody = document.getElementById('candidate-table-body');
  tbody.innerHTML = '';
  candidates.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${c.name}</td><td>${c.email}</td><td>${c.position}</td><td>${c.status}</td>`;
    tbody.appendChild(tr);
  });
}

// Navigation buttons and sections
const navCandidates = document.getElementById('nav-candidates');
const navSchedule = document.getElementById('nav-schedule');
const navAiEval = document.getElementById('nav-ai-eval');

const sectionCandidates = document.getElementById('section-candidates');
const sectionSchedule = document.getElementById('section-schedule');
const sectionAiEval = document.getElementById('section-ai-eval');

function setActiveSection(sectionBtn, section) {
  // Buttons
  [navCandidates, navSchedule, navAiEval].forEach(btn => btn.classList.remove('active'));
  sectionBtn.classList.add('active');
  // Sections
  [sectionCandidates, sectionSchedule, sectionAiEval].forEach(sec => sec.classList.remove('active'));
  section.classList.add('active');
}

navCandidates.addEventListener('click', () => setActiveSection(navCandidates, sectionCandidates));
navSchedule.addEventListener('click', () => setActiveSection(navSchedule, sectionSchedule));
navAiEval.addEventListener('click', () => setActiveSection(navAiEval, sectionAiEval));

// Schedule form submission
document.getElementById('schedule-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('candidate-name').value.trim();
  const position = document.getElementById('position').value.trim();
  const dateTime = document.getElementById('interview-date').value;
  if (!name || !position || !dateTime) return;

  candidates.push({ name, email: "unknown@example.com", position, status: "Scheduled" });
  renderCandidates();

  const msgDiv = document.getElementById('schedule-msg');
  msgDiv.textContent = `Interview scheduled for ${name} on ${new Date(dateTime).toLocaleString()}.`;
  msgDiv.style.color = 'green';

  e.target.reset();
});

// AI Evaluation form submission (mock)
document.getElementById('ai-eval-form').addEventListener('submit', e => {
  e.preventDefault();
  const cname = document.getElementById('candidate-ai-name').value.trim();
  const fileInput = document.getElementById('interview-video');
  if (!cname || fileInput.files.length === 0) return;

  // Simulate AI evaluation with random score and feedback
  const score = (Math.random() * 100).toFixed(1);
  let feedback = "";
  if (score > 80) feedback = "Excellent communication skills and confidence.";
  else if (score > 50) feedback = "Good, but there is room for improvement.";
  else feedback = "Needs to work on clarity and confidence.";

  const resultDiv = document.getElementById('ai-result');
  resultDiv.innerHTML = `<strong>Candidate:</strong> ${cname}<br/>
                         <strong>AI Score:</strong> ${score}%<br/>
                         <strong>Feedback:</strong> ${feedback}`;
  resultDiv.style.display = 'block';

  e.target.reset();
});

// Initial render
renderCandidates();