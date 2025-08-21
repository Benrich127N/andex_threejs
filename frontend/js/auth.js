document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  if (!form) {
    console.error("❌ signupForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop page reload

    // Build FormData (not JSON)
    const formData = new FormData();
    formData.append("first_name", document.getElementById("firstName").value.trim());
    formData.append("last_name", document.getElementById("lastName").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("phone", document.getElementById("phone").value.trim());
    formData.append("password", document.getElementById("password").value);

    try {
      const response = await fetch("http://localhost/andex/backend/index.php/auth/register", {
        method: "POST",
        body: formData, // send as multipart/form-data
      });

      const result = await response.json().catch(() => null);

      console.log("📦 Backend result:", result);

      if (!result) {
        alert("❌ Registration failed: Invalid JSON response from server");
        return;
      }

      if (result.status_code === 200) {
        alert("✅ Registration successful!");
      } else {
        alert("❌ Registration failed: " + JSON.stringify(result.status));
      }
    } catch (error) {
      console.error("🚨 Network error:", error);
      alert("❌ Registration failed: Network or server error");
    }
  });
});
