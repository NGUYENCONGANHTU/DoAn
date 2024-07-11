import { ProductService } from "@/service/product.service";
import { CategoryService } from "@/service/category.service";
import { TrademarkService } from "@/service/trademark.service";
import { ProductAttributeService } from "@/service/product_attributes.service";
import { ProductImageService } from "@/service/product_images.service";
import { AttributeService } from "@/service/attribute.service";

// declare class ProductService
const productService = new ProductService();
const categoryService = new CategoryService();
const trademarkService = new TrademarkService();
const productAttributeService = new ProductAttributeService();
const productImageService = new ProductImageService();
const attributeService = new AttributeService();

const productDetailRootStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loadingApp: false,
    // save cake data
    category: [],
    trademark: [],
    productAttribute: [],
    productImage: [],
    attribute: [],
  },

  mutations: {
    isLoading(state, loading) {
      state.loadingApp = loading;
    },

    setCakeDataCategory(state, data) {
      state.category = data;
    },

    setCakeDataTrademark(state, data) {
      state.trademark = data;
    },

    setCakeDataProductImage(state, data) {
      state.productImage = data;
    },

    setCakeDataProductAttribute(state, data) {
      state.productAttribute = data;
    },

    setCakeDataAttribute(state, data) {
      state.attribute = data;
    },

    addCakeProductImage(state, newData) {
      state.productImage = [...state.productImage, newData];
    },

    addCakeProductAttribute(state, newData) {
      state.productAttribute = [...state.productAttribute, newData];
    },

    addCakeAttribute(state, newData) {
      state.attribute = [...state.attribute, newData];
    },

    updateCakeAttribute(state, update) {
      const index = state.attribute.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.attribute[index] = update;
      }
    },

    updateCakeProductImage(state, update) {
      const index = state.productImage.findIndex(
        (item) => item.id === update.id
      );
      if (index !== -1) {
        state.productImage[index] = update;
      }
    },

    updateCakeProductAttribute(state, update) {
      const index = state.productAttribute.findIndex(
        (item) => item.id === update.id
      );
      if (index !== -1) {
        state.productAttribute[index] = update;
      }
    },

    deleteCakeProductImage(state, id) {
      state.productImage = state.productImage.filter((item) => item.id !== id);
    },

    deleteCakeProductAttribute(state, id) {
      state.productAttribute = state.productAttribute.filter(
        (item) => item.id !== id
      );
    },
  },

  actions: {
    async getAllCategory({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await categoryService.getCategories(
          `/api/admins/category?${queryString}`
        );
        if (response) {
          commit("setCakeDataCategory", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 500);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async getAllTrademark({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await trademarkService.getTrademarks(
          `/api/admins/trademark?${queryString}`
        );
        if (response) {
          commit("setCakeDataTrademark", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 500);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async getAllProductImage({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await productImageService.getProductImages(
          `/api/admins/product_images?${queryString}`
        );
        if (response) {
          commit("setCakeDataProductImage", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 500);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async getAllProductAttribute({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await productAttributeService.getProductAttributes(
          `/api/admins/attributes?${queryString}`
        );
        if (response) {
          commit("setCakeDataProductAttribute", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 500);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async getAllAttribute({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await productAttributeService.getProductAttributes(
          `/api/admins/product_attributes?${queryString}`
        );
        if (response) {
          commit("setCakeDataAttribute", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 500);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async createProductImage({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await productImageService.createProductImage(
          "/api/admins/product_image/store/",
          params
        );
        if (response) {
          commit("addCakeProductImage", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async createProductAttribute({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await productAttributeService.createProductAttribute(
          "/api/admins/product_attribute/store/",
          params
        );
        if (response) {
          commit("addCakeProductAttribute", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async createAttribute({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await attributeService.createAttribute(
          "/api/admins/attribute/store/",
          params
        );
        if (response) {
          commit("addCakeAttribute", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateAttribute({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await attributeService.updateAttribute(
          `/api/admins/attribute/update/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeProductAttribute", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateProductImage({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await productImageService.updateProductImage(
          `/api/admins/product_image/update/`,
          params
        );
        if (response) {
          commit("updateCakeProductImage", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateProductAttribute({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const response = await productAttributeService.updateProductAttribute(
          `/api/admins/product_attribute/update/`,
          params
        );
        if (response) {
          commit("updateCakeProductAttribute", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async deleteProductImage({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await productImageService.deleteProductImage(
          `/api/admins/product_image/destroy/${id}`
        );
        if (response) {
          commit("deleteCakeProductImage", id);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async deleteProductAttribute({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await productAttributeService.deleteProductAttribute(
          `/api/admins/attribute/destroy/${id}`
        );
        if (response) {
          commit("deleteCakeProductAttribute", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },
  },

  getters: {
    //TODO: Computed properties
    loadData: (state) => state.loadingApp,
    dataProductAttribute: (state) => state.productAttribute,
    dataProductImage: (state) => state.productImage,
    dataCategory: (state) => state.category,
    dataTrademark: (state) => state.trademark,
    dataAttribute: (state) => state.attribute,
    getProductAttributeById: (state) => (id) => {
      return state.productAttribute.find((ba) => ba.id === id);
    },
    getAttributeById: (state) => (id) => {
      return state.attribute.find((ba) => ba.id === id);
    },
    getProductImageById: (state) => (id) => {
      return state.productImage.find((bi) => bi.id === id);
    },
  },
};
export default productDetailRootStore;
