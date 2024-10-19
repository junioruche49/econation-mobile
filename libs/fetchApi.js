const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function refreshToken(refreshToken) {
  const formData = new FormData();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", refreshToken);
  try {
    const res = await fetch(`${BASE_URL}/api/token`, {
      method: "POST",
      body: formData,
    });
    if (res.status === 401) {
    }
    const data = await res.json();

    return data.token;
  } catch (error) {
    return error;
  }
}
