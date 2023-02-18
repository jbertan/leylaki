import Home from "@/pages/index";
import Carousel from "@/components/carousel";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("main page header test", () => {
  render(<Home />);
  const taki = screen.getByRole("link", { name: /takilar/i });
  expect(taki).toHaveClass("sidebar__takilar");
  expect(taki).toHaveAttribute("href", "./taki");
  const hediye = screen.getByRole("link", { name: /Hediyelik Esyalar/i });
  expect(hediye).toHaveClass("sidebar__hediyelik-esyalar");
  expect(hediye).toHaveAttribute("href", "./hediyelik-esya");
  const Logo = screen.getByRole("link", { name: /leylaki/i });
  expect(Logo).toHaveClass("sidebar__logo--mask");
  expect(Logo).toHaveAttribute("href", "./");
});

test("main page Carousel test", () => {
  render(<Carousel />);
  const buttonKolleksiyon = screen.getByRole("button", {
    name: /Kolleksiyon /i,
  });
  const logSpy = jest.spyOn(global.console, "log");
  expect(buttonKolleksiyon).toHaveClass("button-explorer");
  fireEvent.click(buttonKolleksiyon);
  expect(logSpy).toHaveBeenCalledWith("selam");
});
