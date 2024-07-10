<template>
  <div>
    <Form class="row g-3" enctype="multipart/form-data" @submit="submitForm">
      <div class="col-md-12">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Name <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.name"
          class="form-control input-admin-form"
          name="name"
          placeholder="Nhập Name.."
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Price <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.price"
          class="form-control input-admin-form"
          name="price"
          placeholder="Nhập price"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="price" />
      </div>
       <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Sale Price <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.sale_price"
          class="form-control input-admin-form"
          name="sale_price"
          placeholder="Nhập sale price"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="sale_price" />
      </div>
      <div class="col-12 col-md-6 position-relative mt-3">
        <upload-file :Ref="`inputValueRef`" @upload-from="handleUploadFile" />
        <div
          v-show="model.id > 0"
          :class="`${model.id ? 'item-edit-images' : ''}`"
        >
          <img
            :src="URL + '/' + model.images"
            :class="`${model.id ? 'item-images' : ''}`"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 position-relative mt-3">
        <upload-file-multiple
          :Ref="`forInputValueRef`"
          @upload-from="handelUploadMultiple"
        />
        <div
          v-show="model.id > 0"
          :class="`${model.id ? 'item-edit-images' : ''}`"
        >
          <img
            :src="URL + '/' + model.images"
            :class="`${model.id ? 'item-images' : ''}`"
          />
        </div>
      </div>
       <div class="form-group col-12 col-md-6">
        <label for="exampleSelectRounded0">Category</label>
        <select
          v-model="model.category_id"
          class="custom-select rounded-0"
          id="exampleSelectRounded0"
        >
          <option
            v-for="(item, index) in dataCategory"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-group col-12 col-md-6">
        <label for="exampleSelectRounded0">Trademark</label>
        <select
          v-model="model.trademark_id"
          class="custom-select rounded-0"
          id="exampleSelectRounded0"
        >
          <option
            v-for="(item, index) in dataTrademark"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="col-6">
        <label for="inputAddress" class="form-label fw-bold mt-3">Status</label>
        <div class="d-flex">
          <div class="form-check">
            <input
              class="form-check-input label-text mt-2"
              type="radio"
              name="radio"
              id="radio1"
              value="1"
              v-model="model.status"
            />
            <label class="form-check-label label-text" for="flexRadioDefault2">
              hoạt Động
            </label>
          </div>
          <div class="form-check mx-3">
            <input
              class="form-check-input label-text mt-2"
              type="radio"
              name="radio"
              id="radio2"
              value="0"
              v-model="model.status"
              checked
            />
            <label class="form-check-label label-text" for="flexRadioDefault2">
              Không hoạt Động
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12">
        <label class="my-2" for="inline-form-input-username"
          >Color:</label
        >
        <div class="d-flex">
          <div
            v-for="(item, index) in dataProductAttribute"
            :key="index"
          >
            <div v-if="item.status == 1" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="model.id_sub_product_attributes"
                :value="item.id"
                :id="item.id"
              />
              <label
                class="form-check-label mx-2"
                for="flexCheckDefault1"
              >
                <div
                    :style="{ background: item.value }"
                    class="color"
                  ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12">
        <label class="my-2" for="inline-form-input-username"
          >Ram:</label
        >
        <div class="d-flex">
          <div
            v-for="(item, index) in dataProductAttribute"
            :key="index"
          >
            <div v-if="item.status == 2" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="model.id_sub_product_attributes"
                :value="item.id"
                :id="item.id"
              />
              <label
                class="form-check-label mx-2"
                for="flexCheckDefault1"
              >
                {{ item.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="editor">
          <label for="inputAddress" class="form-label fw-bold mt-3"
            >Description</label
          >
          <ckeditor
            :editor="editor"
            v-model="model.description"
            :config="editorConfig"
          />
        </div>
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
import { toast } from "vue3-toastify";
import { Constants } from "@/constants/constants";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
// import Modal from "@/components/Modal.vue";
import uploadFile from "@/components/uploadFile.vue";
import uploadFileMultiple from "@/components/uploadFileMultiple.vue";
import { convertFormData } from "./constants";
import { useStore } from "vuex";
import { URL_API } from "@/constants/env";

export default defineComponent({
  components: {
    uploadFile,
    ckeditor: CKEditor.component,
    uploadFileMultiple,
  },
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
    const URL = ref(URL_API);
    const dataCategory = computed(
      () => store.getters["productDetail/dataCategory"]
    );
    const dataTrademark = computed(
      () => store.getters["productDetail/dataTrademark"]
    );
    const dataProductAttribute = computed(
      () => store.getters["productDetail/dataAttribute"]
    );
    const { handleSubmit, values } = useForm();
    const router = useRouter();
    // default value
    const model = reactive({
      id: "",
      name: "",
      images: "",
      sub_img_details: [],
      id_sub_product_attributes: [],
      price: 0,
      sale_price: 0,
      type: 0,
      trademark_id: 1,
      category_id: 1,
      status: 0,
      description: "",
      isUpload: "",
    });

    // config
    const config = reactive({
      editor: ClassicEditor,
      inputValueRef: (ref < HTMLButtonElement) | (null > null),
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
        ],
      },
    });

    const handleUploadFile = (event) => {
      try {
        const valueInput = event.target;
        const map = valueInput.files;
        if (map) {
          model.images = map;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handelUploadMultiple = (event) => {
      const valueInputTypeFile = event.target;
      const mapDataValueFile = valueInputTypeFile.files;
      if (mapDataValueFile) {
        model.sub_img_details = mapDataValueFile;
      }
    };

    const submitForm = () => {
      handleSubmit(async () => {
        try {
          const fomData = convertFormData(model);
          if (model.id) {
            await store.dispatch("productRoot/updateProduct", fomData);
            router.push("/product").then(() => {
              toast.success(
                `status: ${Constants.OK200}: edit product successfully`
              );
            });
          } else {
            console.log(fomData);
            await store.dispatch("productRoot/createProduct", fomData);
            router.push("/product").then(() => {
              toast.success(
                `status: ${Constants.OK200}: create product successfully`
              );
            });
          }
          props.onClose(false);
        } catch (error) {
          toast.error(`status: ${Constants.Error}: api call product failed!!!`);
        }
      })();
    };

    // TODO: lang listens for changes in data
    // watchEffect(() => {
    //     if(props.data){
    //         model.id = props.data.id,
    //         model.name = props.data.name,
    //         model.images = props.data.images,
    //         model.description = props.data.description,
    //         model.link = props.data.link
    //     }
    // });

    onMounted(async () => {
      await store.dispatch("productDetail/getAllCategory", { params: "" });
      await store.dispatch("productDetail/getAllTrademark", { params: "" });
      await store.dispatch("productDetail/getAllAttribute", { params: "" });
    });

    return {
      submitForm,
      model,
      handleUploadFile,
      URL,
      dataCategory,
      dataTrademark,
      dataProductAttribute,
      handelUploadMultiple,
      ...toRefs(config),
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
.color{
  width: 20px;
  height: 20px;
}
</style>