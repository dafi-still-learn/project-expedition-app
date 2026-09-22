const VITE_API_BACKEND = import.meta.env.VITE_API_BACKEND;

export async function sendEmail(email) {
  const reponse = await fetch(`${VITE_API_BACKEND}/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  if (!reponse.ok) {
    throw new Error("data lupa password gagal dikirim ke backend");
  }

  return await reponse.json();
}
