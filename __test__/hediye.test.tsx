import { render, screen } from "@testing-library/react";
import Hediye from "@/pages/hediyelik-esya/index";
const { ObjectId } = require("mongodb");
const products = [
  {
    kod: "Kod",
    name: "Name",
    id: new ObjectId(),
    fileName: "patasd",
  },
];
test("Header link test", () => {
  render(<Hediye products={products} />);
  const taki = screen.getByRole("link", { name: /takılar/i });
  expect(taki).toBeInTheDocument();
  expect(taki).toHaveAttribute("href", "./taki");
  const hediye = screen.getByRole("link", { name: /hediyelik esyalar/i });
  expect(hediye).toBeInTheDocument();
  expect(hediye).toHaveAttribute("href", "./hediyelik-esya");
  const logo = screen.getByRole("link", { name: /leylaki/i });
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute("href", "./");
});
