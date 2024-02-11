export async function deleteData(apiRoute, dataId) {
  try {
    const res = await fetch(`${apiRoute}?id=${dataId}`, {
      method: "DELETE",
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
