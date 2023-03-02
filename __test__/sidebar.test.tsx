import { render, screen } from "@testing-library/react";
import SideBar from "@/components/sidebar";

test("Sidebar Unit Testing Href, Logo What so ever", () => {
  render(<SideBar />);
  const logo = screen.getByRole("link", { name: /leylaki/i });
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute("href", "/");
  const taki = screen.getByTestId("taki");
  expect(taki).toBeInTheDocument();
  expect(taki).toHaveAttribute("href", "/taki");
  const hediye = screen.getByRole("link", { name: /hediyelik esyalar/i });
  expect(hediye).toBeInTheDocument();
  expect(hediye).toHaveAttribute("href", "/hediyelik-esya");
});
