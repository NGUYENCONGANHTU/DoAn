<template>
  <div>
    <Form class="row g-3" enctype="multipart/form-data" @submit="submitForm">
      <div class="col-md-12">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >ProductId </label
        >
        <Field
          type="text"
          disabled
          v-model="model.product_id"
          class="form-control input-admin-form"
          name="name"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div v-show="!checkId" class="col-12 col-md-12">
        <label class="my-2" for="inline-form-input-username">Color:</label>
        <div class="d-flex">
          <div v-for="(item, index) in listProductAttribute" :key="index">
            <div v-if="item.status == 1" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="model.id_sub_product_attributes"
                :value="item.id"
                :id="item.id"
              />
              <label class="form-check-label mx-2" for="flexCheckDefault1">
                <div :style="{ background: item.value }" class="color"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!checkId" class="col-12 col-md-12">
        <label class="my-2" for="inline-form-input-username">Ram:</label>
        <div class="d-flex">
          <div v-for="(item, index) in listProductAttribute" :key="index">
            <div v-if="item.status == 2" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="model.id_sub_product_attributes"
                :value="item.id"
                :id="item.id"
              />
              <label class="form-check-label mx-2" for="flexCheckDefault1">
                {{ item.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
       <div class="form-group col-12" v-show="checkId">
        <label for="exampleSelectRounded0">Attribute</label>
        <select
          v-model="model.attribute_id"
          class="custom-select rounded-0"
          id="exampleSelectRounded0"
        >
          <option
            v-for="(item, index) in dataProductAttribute"
            :key="index"
            :value="item.id"
            :style="{ background: item.value }"
          >
            <span >{{ item.name }} - {{ item.value }}</span>
          </option>
        </select>
      </div>

      <div
        class="d-flex justify-content-center align-items-center mt-5 mb-3 w-100"
      >
        <button type="submit" class="btn btn-primary btn-base btn-form-active">
          {{ model.id ? "Edit" : "Add" }}
        </button>
        <button
          type="button"
          @click="onClearForm"
          class="btn btn-danger btn-base btn-form-active mx-2"
        >
          Clear
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
  toRefs,
  onMounted,
  computed,
} from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { Constants } from "@/constants/constants";
import { convertFormData } from "./constants";
// import Modal from "@/components/Modal.vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: {},
    },
    onClose: {
      type: Function,
    },
  },
  setup(props) {
    // declare store
    const store = useStore();
    const listProductAttribute = ref([]);
    const checkId = ref(0);
    const dataProductAttribute = computed(
      () => store.getters["productDetail/dataAttribute"]
    );
    const dataAttribute = computed(
      () => store.getters["productDetail/dataProductAttribute"]
    );

    const { handleSubmit, values } = useForm();
    const router = useRouter();
    const route = useRoute();
    // default value
    const model = reactive({
      id: 0,
      product_id: Number(route.params.id),
      id_sub_product_attributes: [],
      attribute_id: "",
    });

    const submitForm = () => {
      handleSubmit(async () => {
        try {
          const fomData = convertFormData(model);
          if (model.id) {
            await store.dispatch("productDetail/updateAttribute", model);
            router.push(`/product/update/${Number(route.params.id)}`).then(() => {
              toast.success(
                `status: ${Constants.OK200}: edit Attribute successfully`
              );
            });
          } else {
            await store.dispatch("productDetail/createAttribute", fomData);
            router.push(`/product/update/${Number(route.params.id)}`).then(() => {
              toast.success(
                `status: ${Constants.OK200}: create Attribute successfully`
              );
            });
          }
          props.onClose(false);
          return;
        } catch (error) {
          toast.error(`status: ${Constants.Error}: api call product failed!!!`);
        }
      })();
    };

    // TODO: lang listens for changes in data
    watchEffect(() => {
      if (props.data) {
        (model.id = props.data.id),
          (model.product_id = props.data.product_id),
          (model.attribute_id = props.data.attribute_id);
        checkId.value = props.data.id;
      }
    });

    const matchingAttributes = (attributes, productAttribute) => {
      return attributes.value?.filter((attribute) => {
        return !productAttribute.value?.some(
          (checkId) => checkId.attribute_id === attribute.id
        );
      });
    };

    onMounted(async () => {
      if (!checkId.value) {
        await store.dispatch("productDetail/getAllProductAttribute", {
          params: Number(route.params.id),
        });
        // check radio
        const updateNewData = matchingAttributes(
          dataProductAttribute,
          dataAttribute
        );
        if (updateNewData) {
          listProductAttribute.value = [...updateNewData];
        }
        model.product_id = Number(route.params.id)
      }

       await store.dispatch("productDetail/getAllAttribute", {
          params: Number(route.params.id),
        });

    });

    return {
      submitForm,
      model,
      dataProductAttribute,
      listProductAttribute,
      dataAttribute,
      checkId
    };
  },
});
</script>
<style scoped>
.item-edit-images {
  border: 1px solid #4b4b4b;
  width: 40%;
  height: 100px;
}
.item-images {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.color {
  width: 20px;
  height: 20px;
}
</style>