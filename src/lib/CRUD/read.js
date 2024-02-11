import getServerUrl from "../getServerUrl";

export async function read(apiRoute) {
  try {
    const url = getServerUrl();
    const res = await fetch(url + apiRoute);
    const resData = await res.json();
    if (!resData.success) {
      throw new Error(resData?.message);
    }
    return resData.data;
  } catch (err) {
    throw new Error(err);
  }
}
