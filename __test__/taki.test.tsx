import Taki from "@/pages/taki/index";
import Carousel from "@/components/carousel";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ObjectId } from "mongodb";
const products = [
  {
    kod: "Kod",
    name: "Name",
    id: new ObjectId(),
    fileName: "patasd",
  },
];

test("main page header test", () => {
  render(<Taki products={products} />);
  const heading = screen.getByRole("heading", { name: /takılar/i });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveClass("products__page__h2");
});
