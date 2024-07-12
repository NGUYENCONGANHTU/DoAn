<template>
  <div>
    <Form class="row g-3" enctype="multipart/form-data" @submit="submitForm">
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Họ và tên<span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.full_name"
          class="form-control input-admin-form"
          name="full_name"
          placeholder="Nhập Name.."
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Họ tên <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.first_name"
          class="form-control input-admin-form"
          name="first_name"
          placeholder="Họ tên ...."
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Tên <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.last_name"
          class="form-control input-admin-form"
          name="last_name"
          placeholder="Tên đệm...."
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>

      <div class="col-3">
        <label for="inputAddress" class="form-label fw-bold mt-3"
          >Status<span class="mx-1 text-danger">*</span></label
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
              Hoạt động
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
      <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Địa chỉ <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.address"
          class="form-control input-admin-form"
          name="address"
          placeholder="Nhập địa chỉ"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>

      <div class="col-md-6">
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
          placeholder="Nhập email"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Số điện thoại <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.phone_number"
          class="form-control input-admin-form"
          name="phone_number"
          placeholder="Nhập số điên thoại"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Quốc gia <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="text"
          v-model="model.country"
          class="form-control input-admin-form"
          name="country"
          placeholder="Nhập vào quốc gia"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Tuổi <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="number"
          v-model="model.age"
          class="form-control input-admin-form"
          name="age"
          placeholder="Nhập vào tuổi"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-3">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Điạ chỉ IP <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="number"
          v-model="model.ip"
          class="form-control input-admin-form"
          name="ip"
          placeholder="Nhập vào mã IP quốc gia"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Ngày đằng ký <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="date"
          v-model="model.created_at"
          class="form-control input-admin-form"
          name="created_at"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="col-md-6">
        <label
          for="inputEmail4"
          class="form-label fw-bold mt-3 has-required-sign"
          >Ngày cập nhật <span class="mx-1 text-danger">*</span></label
        >
        <Field
          type="date"
          v-model="model.update_at"
          class="form-control input-admin-form"
          name="update_at"
          placeholder="Nhập địa chỉ"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="name" />
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
import uploadFile from "@/components/uploadFile.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    uploadFile,
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

    const submitForm = () => {
      handleSubmit(async () => {
        try {
          if (model.id) {
            await store.dispatch("user/updateUser", model);
            router.push("/order").then(() => {
              toast.success(
                `status: ${Constants.OK200}: edit user successfully`
              );
            });
          } else {
            await store.dispatch("user/createUser", model);
            router.push("/user").then(() => {
              toast.success(
                `status: ${Constants.OK200}: create user successfully`
              );
            });
          }
          props.onClose(false);
        } catch (error) {
          toast.error(`status: ${Constants.Error}: api call user failed!!!`);
        }
      })();
    };

    // TODO: lang listens for changes in data
    watchEffect(() => {
      if (props.data) {
        (model.id = props.data.id),
          (model.name = props.data.name),
          (model.email = props.data.email),
          (model.full_name = props.data.full_name),
          (model.country = props.data.country),
          (model.address = props.data.address),
          (model.phone_number = props.data.phone_number),
          (model.age = props.data.age),
          (model.first_name = props.data.first_name),
          (model.ip = props.data.ip),
          (model.status = props.data.status),
          (model.created_at = props.data.created_at),
          (model.update_at = props.data.update_at),
          (model.last_name = props.data.last_name);
      }
    });

    return {
      submitForm,
      handleUploadFile,
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
