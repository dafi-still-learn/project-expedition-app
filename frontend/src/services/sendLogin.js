const VITE_API_BACKEND = import.meta.env.VITE_API_BACKEND;

export async function sendLogin(username, password) {
  const response = await fetch(`${VITE_API_BACKEND}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  console.log("hasil dari data login", response);

  if (!response.ok) {
    throw new Error("data login gagal dikirim ke backend");
  }

  return await response.json();
}
