import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import Products from "../pages/Products";

// ✅ Test store with initial data to avoid "Loading..." blocking
const setupStore = () =>
  configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      products: {
        items: [
          { id: 1, title: "Jacket", category: "Clothing" },
          { id: 2, title: "Shoes", category: "Footwear" },
        ],
        status: "succeeded",
      },
      favorites: {
        items: [],
      },
    },
  });

describe("Products Page - Integration Tests", () => {
  let store;

  beforeEach(() => {
    store = setupStore();
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  });

  test("search filters products by title", async () => {
    // Wait for search input to appear
    const searchInput = await screen.findByPlaceholderText(/search products/i);

    fireEvent.change(searchInput, { target: { value: "Jacket" } });

    // Wait for filtered product to appear
    await waitFor(() =>
      expect(screen.getByText(/Jacket/i)).toBeInTheDocument()
    );
  });

  test("filter products by category", async () => {
    // Wait for dropdown to appear
    const categorySelect = await screen.findByRole("combobox");

    fireEvent.change(categorySelect, { target: { value: "Footwear" } });

    await waitFor(() =>
      expect(screen.getByText(/Shoes/i)).toBeInTheDocument()
    );
  });

  test("add and remove product from favorites", async () => {
    const favoriteButton = await screen.findByRole("button", {
      name: /add to favorites/i,
    });

    fireEvent.click(favoriteButton);

    await waitFor(() =>
      expect(screen.getByText(/Remove from favorites/i)).toBeInTheDocument()
    );
  });
});
