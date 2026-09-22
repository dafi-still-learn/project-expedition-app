const VITE_API_BACKEND = import.meta.env.VITE_API_BACKEND;
console.log("API BACKEND", VITE_API_BACKEND);
console.log(import.meta.env);
export async function sendRegister(email, username, password) {
  const response = await fetch(`${VITE_API_BACKEND}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("gagal mengirim data register ke backend");
  }

  return await response.json();
}
