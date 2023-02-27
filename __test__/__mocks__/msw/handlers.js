import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/hediyelik-esya", (req, res, ctx) => {
    return res(
      ctx.json({ kod: "asda", name: "bertan", id: "sadas", path: "img32" })
    );
  }),
];
