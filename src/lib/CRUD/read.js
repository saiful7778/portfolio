import getServerUrl from "../getServerUrl";

export async function read(apiRoute, queryTags, options) {
  try {
    const url = getServerUrl();
    const res = await fetch(url + apiRoute, {
      next: {
        tags: queryTags,
      },
      ...options,
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
