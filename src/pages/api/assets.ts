// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/total-assets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: parseInt(`${process.env.NEXT_PUBLIC_ACCOUNT}`),
      }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.error("Error response:", await response.text());
    return res.status(response.status).json({ result: "Error" });
  }

  const result = await response.json();
  console.log(result);
  res.status(200).json({ result: "OK" });
}
