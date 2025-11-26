// --- 1. Login Page ---
document.getElementById('login-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const errorDiv = document.getElementById('login-error');

  try {
    // Mock login - replace with real API call
    if (email === 'user@example.com' && password === 'password123') {
      localStorage.setItem('authToken', 'mock-token');
      alert('Login successful!');
      errorDiv.textContent = '';
      // Redirect or show dashboard
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    errorDiv.textContent = err.message;
  }
});

// --- 2. Resume Evaluation (Mock) ---
document.getElementById('eval-resume-btn')?.addEventListener('click', async () => {
  const fileInput = document.getElementById('resume-upload');
  const resultDiv = document.getElementById('resume-result');
  if (!fileInput || fileInput.files.length === 0) {
    alert('Please upload a resume file.');
    return;
  }
  // Mock evaluation delay
  resultDiv.textContent = 'Evaluating resume...';
  await new Promise(r => setTimeout(r, 1500));
  // Mock score and feedback
  const score = (Math.random() * 100).toFixed(1);
  const feedback = score > 75 ? 'Strong resume content.' : 'Needs improvement in skills section.';
  resultDiv.textContent = `Score: ${score}\nFeedback: ${feedback}`;
});

// --- 3. Live Interview Recording ---
let mediaRecorder;
let recordedChunks = [];
const videoElem = document.getElementById('live-video');
const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const statusDiv = document.getElementById('recording-status');

async function startCamera() {
  if (!videoElem || !startBtn || !stopBtn || !statusDiv) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElem.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedChunks = [];
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'interview_recording.webm';
      a.textContent = 'Download Recording';
      statusDiv.innerHTML = '';
      statusDiv.appendChild(a);
    };
  } catch (err) {
    alert('Error accessing camera/microphone: ' + err.message);
  }
}

startBtn?.addEventListener('click', () => {
  if (!mediaRecorder) {
    alert('Camera not started yet.');
    return;
  }
  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusDiv.textContent = 'Recording...';
});

stopBtn?.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusDiv.textContent = 'Processing recording...';
});

startCamera();

// --- 4. Live Charts with Chart.js ---
if (window.Chart && document.getElementById('liveChart')) {
  const ctx = document.getElementById('liveChart').getContext('2d');
  const data = {
    labels: [],
    datasets: [{
      label: 'Interview Sentiment Score',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.1
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: { scales: { y: { min: 0, max: 100 } } }
  };
  const chart = new Chart(ctx, config);

  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    const score = Math.floor(Math.random() * 100);
    if (data.labels.length > 20) {
      data.labels.shift();
      data.datasets[0].data.shift();
    }
    data.labels.push(now);
    data.datasets[0].data.push(score);
    chart.update();
  }, 1000);
}

// --- 5. Phone Call Details Display ---
const callLogs = [
  { caller: '+1234567890', receiver: '+0987654321', datetime: '2024-06-01 10:30', duration: '5m 32s', status: 'Completed' },
  { caller: '+1234567890', receiver: '+0987654322', datetime: '2024-06-02 14:15', duration: '3m 10s', status: 'Missed' },
  { caller: '+1234567891', receiver: '+0987654323', datetime: '2024-06-03 09:00', duration: '7m 5s', status: 'Completed' }
];
const tbody = document.getElementById('call-logs-body');
if (tbody) {
  callLogs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${log.caller}</td><td>${log.receiver}</td><td>${log.datetime}</td><td>${log.duration}</td><td>${log.status}</td>`;
    tbody.appendChild(tr);
  });
}