import { getByRole, getByText, render, screen } from "@testing-library/react";
import Products from "@/components/products";

const products = {
  kod: "Kod",
  etiket: "Name",
  picture: "/resim.jpg",
};

test("Test single product module", () => {
  render(
    <Products
      etiket={products.etiket}
      picture={products.picture}
      kod={products.kod}
    />
  );
  const kod = screen.getByText("Kod");
  expect(kod).toBeInTheDocument();
  const etiket = screen.getByText("Name");
  expect(etiket).toBeInTheDocument();
  const image = screen.getByTestId("img-test");
  expect(image).toHaveAttribute(
    "src",
    "/_next/image?url=%2Fresim.jpg&w=640&q=75"
  );
});
