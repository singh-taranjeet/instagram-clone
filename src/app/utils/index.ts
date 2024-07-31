import moment from "moment";

export const baseUrl = "http://localhost:5555";
export const serverUrl = "http://localhost:5555/graphql";

export async function fetchGraphQl(query: string) {
  const data = await fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return data.json();
}

export const rootQueries = {
  fetchUsers: {
    name: "fetchUsers",
    queryFn: () => {
      return fetch(`${baseUrl}/users`).then((res) => res.json());
    },
  },
};

export function timeFromNow(date: Date) {
  const fromNow = moment(date).fromNow(true);

  if (fromNow === "a few seconds") {
    return "Just now";
  } else if (fromNow === "a minute") {
    return "1m";
  } else if (fromNow === "an hour") {
    return "1h";
  } else if (fromNow === "a day") {
    return "1d";
  } else if (fromNow === "a month") {
    return "1mo";
  } else if (fromNow === "a year") {
    return "1y";
  } else {
    return fromNow;
  }
}

export * from "./apollo.utils";
