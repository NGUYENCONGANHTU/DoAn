<template>
  <div>
    <Form class="row g-3" @submit="submitForm">
      <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Tên Khách Hàng <span class="mx-1 text-danger">*</span></label
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

      <div class="col-6">
        <label for="inputAddress" class="form-label fw-bold mt-3"
          >Trạng thái</label
        >
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
      <div class="col-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Số điện thoại <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.phone"
          class="form-control input-admin-form"
          name="phone"
          placeholder="0982199879"
          rules="required"
        />
      </div>
      <div class="col-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Email <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="email"
          v-model="model.email"
          class="form-control input-admin-form"
          name="email"
          placeholder="nguyena@gmail.com"
          rules="required"
        />
      </div>
      <div class="col-12">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Note <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.content"
          class="form-control input-admin-form"
          name="content"
          placeholder="....."
          rules="required"
        />
      </div>
      <div class="col-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Ngày tạo <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="date"
          v-model="model.created_at"
          class="form-control input-admin-form"
          name="created_at"
          placeholder="0982199879"
          rules="required"
        />
      </div>
      <div class="col-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Ngày cập nhật <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="date"
          v-model="model.updated_at"
          class="form-control input-admin-form"
          name="updated_at"
          rules="required"
        />
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
} from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { Constants } from "@/constants/constants";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ckeditor: CKEditor.component,
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
    const { handleSubmit, values } = useForm();
    const router = useRouter();
    // default value
    const model = reactive({
      id: "",
      name: "",
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

    const submitForm = () => {
      handleSubmit(async () => {
        try {
          if (model.id) {
            await store.dispatch("contact/updateContact", model);
            router.push("/contact").then(() => {
              toast.success(
                `status: ${Constants.OK200}: edit contact successfully`
              );
            });
          } else {
            await store.dispatch("contact/createContact", model);
            router.push("/contact").then(() => {
              toast.success(
                `status: ${Constants.OK200}: create contact successfully`
              );
            });
          }
          props.onClose(false);
        } catch (error) {
          toast.error(`status: ${Constants.Error}: api call contact failed!!!`);
        }
      })();
    };

    // TODO: lang listens for changes in data
    watchEffect(() => {
      if (props.data) {
        (model.id = props.data.id),
          (model.name = props.data.name),
          (model.phone = props.data.phone),
          (model.email = props.data.email),
          (model.content = props.data.content),
          (model.created_at = props.data.created_at),
          (model.updated_at = props.data.updated_at),
          (model.status = props.status);
      }
    });

    return {
      submitForm,
      model,
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
</style>
