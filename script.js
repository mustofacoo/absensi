// Handle login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to Dashboard
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Handle logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Submit attendance
function submitAttendance() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const user = auth.currentUser;
      const timestamp = new Date();
      const attendanceData = {
        uid: user.uid,
        timestamp: timestamp,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
      db.collection("attendance").add(attendanceData)
        .then(() => {
          alert("Absensi berhasil!");
        })
        .catch((error) => {
          alert("Error submitting attendance: " + error.message);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Display monthly report (admin only)
function fetchMonthlyReport() {
  const currentMonth = new Date().getMonth();
  db.collection("attendance")
    .where("timestamp", ">=", new Date(new Date().getFullYear(), currentMonth, 1))
    .where("timestamp", "<=", new Date(new Date().getFullYear(), currentMonth + 1, 0))
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Display data in admin view
      });
    })
    .catch((error) => {
      console.log("Error fetching monthly report: " + error.message);
    });
}
