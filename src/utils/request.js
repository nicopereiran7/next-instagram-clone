export const addLike = async (idPost, token) => {
  try {
    const data = { idPost };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();

    if (res.status === 200 || result.like) {
      setReload(true);
    }
  } catch (e) {
    console.log(e);
  }
};