import { render, screen } from "@testing-library/react";
import Hediye from "@/pages/hediyelik-esya/index";
const { ObjectId } = require("mongodb");
const products = [
  {
    kod: "Kod",
    name: "Name",
    id: new ObjectId(),
    fileName: "anahtarlik-jpg",
  },
];
test("product test", () => {
  render(<Hediye products={products} />);
  const heading = screen.getByRole("heading", { name: /kolyeler/i });
  expect(heading).toHaveClass("products__page__h2");
  expect(heading).toBeInTheDocument();
});
