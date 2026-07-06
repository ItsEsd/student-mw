let sseConnection = null;
let currentStudentId = null;

document.addEventListener("DOMContentLoaded", () => {
  createNotificationUI();
  updateBadgeCount();
});

function startStudentStream(loggedInStudentId) {
  if (loggedInStudentId) {
    currentStudentId = loggedInStudentId;
  }

  if (sseConnection) {
    sseConnection.close();
    sseConnection = null;
    console.log("SSE Stream Stopped cleanly.");
    updateStreamButtonUI();
    return;
  }

  if (!currentStudentId) {
    console.error(
      "Cannot initialize stream: Missing student configuration identification.",
    );
    return;
  }

  var absoluteStreamUrl =
    "https://sse-stat.amrit-corp.com/" + encodeURIComponent(currentStudentId);
  sseConnection = new EventSource(absoluteStreamUrl);

  sseConnection.onmessage = function (event) {
    if (!event.data) return;

    try {
      var payload = JSON.parse(event.data);

      if (payload && payload.type === "ssestat_announce") {
        saveAndNotify(payload.from, payload.text, payload.action);
      }
    } catch (err) {
      console.log("Received data payload update:", event.data);
    }
  };

  sseConnection.onerror = function () {
    console.warn("Connection cycled by server. Auto-reconnecting shortly...");
  };

  console.log("SSE Stream successfully initiated.");
  updateStreamButtonUI();
}

function saveAndNotify(senderName, messageText, action) {
  const notificationSound = new Audio("../notify.wav");
  notificationSound.play().catch((error) => {
    console.log("Audio playback prevented by browser autoplay policy:", error);
  });

  const notifications =
    JSON.parse(localStorage.getItem("sse_notifications")) || [];

  notifications.push({
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    sender: senderName,
    text: messageText,
    seen: false,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  localStorage.setItem("sse_notifications", JSON.stringify(notifications));

  updateBadgeCount();
  if (document.getElementById("notification-modal").style.display === "block") {
    renderNotificationList();
  }
  var edid = window.btoa($("#eduidst").val());
  if (action === "classroom_comment" && edid != "") {
    rfshcmnt();
  }
}

function createNotificationUI() {
  if (document.getElementById("notification-badge-btn")) return;

  const badgeBtn = document.createElement("button");
  badgeBtn.id = "notification-badge-btn";
  badgeBtn.onclick = toggleModal;
  badgeBtn.innerHTML = `🔔<span id='notification-count'>0</span>`;

  document.getElementById("divrightst").appendChild(badgeBtn);

  handleBadgeResponsiveness();

  const modal = document.createElement("div");
  modal.id = "notification-modal";

  modal.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">Live Broadcast Center</div>
      <button onclick="toggleModal()" class="modal-close-btn">&times;</button>
    </div>
    <div class="modal-controls">
      <button id="stream-toggle-btn" onclick="startStudentStream()">Start Stream</button>
      <button onclick="clearAllNotifications()" class="clear-btn">Clear Logs</button>
    </div>
    <div id="modal-notification-list"></div>
  `;

  document.getElementById("StuDashboard").appendChild(modal);
  updateStreamButtonUI();
}

function renderNotificationList() {
  const listContainer = document.getElementById("modal-notification-list");
  const notifications =
    JSON.parse(localStorage.getItem("sse_notifications")) || [];

  if (notifications.length === 0) {
    listContainer.innerHTML = `<p style="color:#95a5a6; text-align:center; margin-top:30px; font-size:13px; font-style:italic;">No broadcast alerts recorded.</p>`;
    return;
  }

  listContainer.innerHTML = notifications
    .map(
      (n) => `
    <div style="padding:12px; margin-bottom:8px; border-radius:5px; background:${n.seen ? "#f3f3f3" : "#ffeee0"}; border-left:4px solid ${n.seen ? "#bdc3c7" : "#e67e22"}; font-size:13px; line-height:1.4; color:#333;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <strong>👨‍🏫 ${n.sender}</strong>
        <span style="color:#95a5a6; font-size:11px;">${n.timestamp}</span>
      </div>
      <div style="color:#555;">${n.text}</div>
    </div>
  `,
    )
    .reverse()
    .join("");
}

function updateBadgeCount() {
  const notifications =
    JSON.parse(localStorage.getItem("sse_notifications")) || [];
  const unseenCount = notifications.filter((n) => !n.seen).length;
  const countBadge = document.getElementById("notification-count");

  if (countBadge) {
    if (unseenCount > 0) {
      countBadge.textContent = unseenCount;
      countBadge.style.display = "block";
    } else {
      countBadge.style.display = "none";
    }
  }
}

function toggleModal() {
  const modal = document.getElementById("notification-modal");
  if (!modal) return;

  if (!modal.classList.contains("active")) {
    modal.classList.add("active");
    renderNotificationList();

    const notifications =
      JSON.parse(localStorage.getItem("sse_notifications")) || [];
    notifications.forEach((n) => (n.seen = true));
    localStorage.setItem("sse_notifications", JSON.stringify(notifications));
    updateBadgeCount();
  } else {
    modal.classList.remove("active");
  }
}

function updateStreamButtonUI() {
  const btn = document.getElementById("stream-toggle-btn");
  if (!btn) return;
  if (sseConnection) {
    btn.textContent = "🛑 Stop Stream";
    btn.style.background = "#e74c3c";
  } else {
    btn.textContent = "🟢 Start Stream";
    btn.style.background = "#2ecc71";
  }
}

function clearAllNotifications() {
  if (confirm("Are you sure you want to clear all notification logs?")) {
    localStorage.removeItem("sse_notifications");
    renderNotificationList();
    updateBadgeCount();
  }
}

function handleBadgeResponsiveness() {
  const badgeBtn = document.getElementById("notification-badge-btn");
  if (!badgeBtn) return;
  if (window.innerWidth <= 1024) {
    badgeBtn.classList.add("inmobile");
    badgeBtn.classList.remove("outmobile");
  } else {
    badgeBtn.classList.add("outmobile");
    badgeBtn.classList.remove("inmobile");
  }
}

window.addEventListener("resize", handleBadgeResponsiveness);
