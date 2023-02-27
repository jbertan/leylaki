import Home from "@/pages/index";
import Carousel from "@/components/carousel";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("main page Carousel test", () => {
  render(<Carousel />);
  const buttonKolleksiyon = screen.getByRole("button", {
    name: /Kolleksiyon /i,
  });
  const logSpy = jest.spyOn(global.console, "log");
  expect(buttonKolleksiyon).toHaveClass("button-explorer");
  fireEvent.click(buttonKolleksiyon);
  expect(logSpy).toHaveBeenCalledWith("kolleksiyontest");
});
