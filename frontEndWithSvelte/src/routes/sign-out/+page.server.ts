import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const sessionId = event.cookies.get("sessionId");

  // sign out on the server
  const res = await fetch(`${API_URL}/users/sign-out`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });

  // check the status
  if (res.ok) {
    // remove the cookie
    event.cookies.set("sessionId", "", {
      path: "/",
    });

    // redirect to the sign-in page
    throw redirect(301, "/sign-in");
  } else {
    return new Response(await res.text());
  }
};
