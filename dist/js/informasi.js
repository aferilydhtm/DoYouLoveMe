// Fungsi untuk mendapatkan IP Address perangkat pengguna
async function getIPAddress() {
  const response = await fetch("https://api64.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

// Fungsi untuk mendapatkan koordinat geografis pengguna
async function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
}

// Fungsi untuk menavigasi ke halaman yang sesuai berdasarkan pilihan pengguna
function handleChoice(choice) {
  if (choice === "yes") {
    window.location.href = "yes.html";
  } else if (choice === "no") {
    getIPAddress()
      .then((ip) => {
        getGeolocation()
          .then((coords) => {
            const { latitude, longitude } = coords;
            window.location.href = `no.html?ip=${ip}&latitude=${latitude}&longitude=${longitude}`;
          })
          .catch((error) => {
            console.error("Failed to get geolocation:", error);
            // Navigasi ke halaman no.html bahkan jika gagal mendapatkan geolocation
            window.location.href = `no.html?ip=${ip}`;
          });
      })
      .catch((error) => {
        console.error("Failed to get IP address:", error);
        // Navigasi ke halaman no.html bahkan jika gagal mendapatkan IP address
        window.location.href = "no.html";
      });
  }
}
