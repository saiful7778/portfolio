export async function update(apiRoute, data) {
  try {
    const res = await fetch(apiRoute, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!resData.success) {
      throw new Error(resData?.message);
    }
    return resData.data;
  } catch (err) {
    throw new Error(err);
  }
}
