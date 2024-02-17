export default async function create(apiRoute, data) {
  try {
    const res = await fetch(apiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    return err;
  }
}
