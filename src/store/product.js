//product slice
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cartItems: [],
    size: "ALL",
    sort: "latest",
    loading: false,
    hasError: false,
  },
  reducers: {
    getProducts: (store, action) => {
      store.loading = true;
    },
    getProductsSuccess: (store, action) => {
      store.products = action.payload;
      store.loading = false;
    },
    getProductsFailure: (store, action) => {
      store.hasError = true;
    },
    addFilter: (store, action) => {
      store.size = action.payload.size;
    },
    addSortBy: (store, action) => {
      store.sort = action.payload.sort;
    },
    addToCart: (store, action) => {
      const _id = action.payload._id;
      const index = store.cartItems.findIndex((item) => item._id === _id);
      console.log(index);
      if (index > -1) store.cartItems[index].count++;
      else {
        const item = action.payload;
        item.count = 1;
        store.cartItems.push(item);
      }
    },
    removeFromCart: (store, action) => {
      const _id = action.payload._id;
      const index = store.cartItems.findIndex((item) => {
        if (item._id === _id) return true;
        else return false;
      });
      store.cartItems.splice(index, 1);
    },
  },
});

export const {
  getProducts,
  getProductsFailure,
  getProductsSuccess,
  addFilter,
  addToCart,
  removeFromCart,
  addSortBy,
} = slice.actions;

export default slice.reducer;

export function fetchProducts() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await axios.get("http://localhost:5000/api/product/");
      const data = await response.data;

      dispatch(getProductsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsFailure());
    }
  };
}

//selector
export const allProductSelector = (store) => {
  return store.products;
};

export const filteredProductSelector = (store) => {
  if (store.sort === "latest") {
    const items = store.products.filter((product) => {
      if (store.size === "ALL") return true;
      const index = product.availableSizes.findIndex(
        (availableSize) => availableSize == store.size
      );
      if (index > -1) return true;
      else return false;
    });
    items.sort((a, b) => {
      return a._id < b._id ? 1 : -1;
    });
    return items;
  } else if (store.sort === "highest") {
    const items = store.products.filter((product) => {
      if (store.size === "ALL") return true;
      const index = product.availableSizes.findIndex(
        (availableSize) => availableSize == store.size
      );
      if (index > -1) return true;
      else return false;
    });
    items.sort((a, b) => {
      return a.price < b.price ? 1 : -1;
    });
    console.log(items);
    return items;
  } else if (store.sort === "lowest") {
    const items = store.products.filter((product) => {
      if (store.size === "ALL") return true;
      const index = product.availableSizes.findIndex(
        (availableSize) => availableSize == store.size
      );
      if (index > -1) return true;
      else return false;
    });
    items.sort((a, b) => {
      return a.price > b.price ? 1 : -1;
    });
    console.log(items);
    return items;
  }
};

export const sizeSelector = (store) => {
  return store.size;
};

export const sortSelector = (store) => {
  return store.sort;
};

export const cartItemSelector = (store) => {
  return store.cartItems;
};
