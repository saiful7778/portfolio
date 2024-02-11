export default async function create(apiRoute, data) {
  try {
    const res = await fetch(apiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!resData.success) {
      throw new Error(resData?.message);
    }
    return resData;
  } catch (err) {
    throw new Error(err);
  }
}
