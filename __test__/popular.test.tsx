import { fireEvent, render, screen } from "@testing-library/react";
import Popular from "@/components/popular";

test("Popular Component which includes in side Home page", () => {
  render(<Popular />);
  const regularP = screen.getByText("Nereden başlayacağıma emin değilim ?");
  expect(regularP).toBeInTheDocument();
  const buttonExplorer = screen.getByRole("button", { name: /KEŞFET/i });
  const logSpy = jest.spyOn(global.console, "log");
  fireEvent.click(buttonExplorer);
  expect(logSpy).toHaveBeenCalledWith("explorerButton");
});
