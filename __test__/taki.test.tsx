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
  const taki = screen.getByRole("link", { name: /takılar/i });
  expect(taki).toHaveClass("sidebar__takilar");
  expect(taki).toHaveAttribute("href", "./taki");
  const hediye = screen.getByRole("link", { name: /Hediyelik Esyalar/i });
  expect(hediye).toHaveClass("sidebar__hediyelik-esyalar");
  expect(hediye).toHaveAttribute("href", "./hediyelik-esya");
  const Logo = screen.getByRole("link", { name: /leylaki/i });
  expect(Logo).toHaveClass("sidebar__logo--mask");
  expect(Logo).toHaveAttribute("href", "./");
});
