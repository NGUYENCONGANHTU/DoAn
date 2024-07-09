<template>
    <div>
        <Form class="row g-3" enctype="multipart/form-data" @submit="submitForm">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label fw-bold mt-3 has-required-sign">Name <span
                        class="mx-1 text-danger">*</span></label>
                <Field type="text" v-model="model.name" class="form-control input-admin-form" name="name"
                    placeholder="Nhập Name.." rules="required" />
                <ErrorMessage class="text-danger" name="name" />
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label fw-bold mt-3 has-required-sign">Links <span
                        class="mx-1 text-danger">*</span></label>
                <Field type="text" v-model="model.link" class="form-control input-admin-form" name="link"
                    placeholder="Nhập link.." rules="required" />
                <ErrorMessage class="text-danger" name="link" />
            </div>
            <div class="col-12 col-md-6 position-relative mt-3">
                <upload-file :Ref="`inputValueRef`" @upload-from="handleUploadFile" />
                <div v-show="model.id > 0" :class="`${model.id ? 'item-edit-images' : ''}`">
                    <img :src="URL + '/' + model.images" :class="`${ model.id  ? 'item-images' : ''}`"  />
                </div>
            </div>
            <div class="col-6 ">
                <label for="inputAddress" class="form-label fw-bold mt-3">Status</label>
                <div class="d-flex">
                    <div class="form-check">
                        <input class="form-check-input label-text mt-2" type="radio" name="radio" id="radio1" value="1"
                            v-model="model.status" />
                        <label class="form-check-label label-text" for="flexRadioDefault2">
                            hoạt Động
                        </label>
                    </div>
                    <div class="form-check mx-3">
                        <input class="form-check-input label-text mt-2" type="radio" name="radio" id="radio2" value="0"
                            v-model="model.status" checked />
                        <label class="form-check-label label-text" for="flexRadioDefault2">
                            Không hoạt Động
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3">
                <div class="editor">
                    <label for="inputAddress" class="form-label fw-bold mt-3">Description</label>
                    <ckeditor :editor="editor" v-model="model.description" :config="editorConfig" />
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-5 mb-3 w-100">
                <button type="submit" class="btn btn-primary btn-base btn-form-active">
                    {{ model.id ? "Edit" : "Add" }}
                </button>
                <button type="button" @click="onClearForm" class="btn btn-danger btn-base btn-form-active mx-2">
                    Clear
                </button>
            </div>
        </Form>
    </div>
</template>
<script>
import { defineComponent, ref, reactive, watchEffect, toRefs, onMounted } from "vue"
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import { Constants } from "@/constants/constants";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
// import Modal from "@/components/Modal.vue";
import uploadFile from "@/components/uploadFile.vue";
import { convertFormData } from "./constants";
import { useStore } from 'vuex';
import { URL_API } from "@/constants/env";

export default defineComponent({
    components: {
        uploadFile,
        ckeditor: CKEditor.component,
    },
    props: {
       data: {
            type: Object,
            default: {}
        },
        onClose : {
            type: Function
        }
    },
    setup(props) {
        // declare store
        const store = useStore();
        const URL = ref(URL_API)
        const { handleSubmit, values } = useForm();
        const router = useRouter();
        // default value
        const model = reactive({
            id: "",
            name: "",
            images: "",
            link: "",
            status: 0,
            description: "",
            isUpload: ""
        })

        // config
        const config = reactive({
            editor: ClassicEditor,
            inputValueRef: ref < HTMLButtonElement | null > (null),
            editorConfig: { toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote",], },
        })

        const handleUploadFile = (event) => {
            try {
                const valueInput = event.target ;
                const map = valueInput.files
                if(map){
                    model.images = map
                }
            } catch (error) {
                console.log(error);
            }
        }

        const submitForm = () => {
            handleSubmit(async () => {
                try {
                    const fomData = convertFormData(model);
                    if(model.id){
                        await store.dispatch('banner/updateBanner',fomData)
                         router.push('/banner').then(() => {
                            toast.success(`status: ${Constants.OK200}: edit banner successfully`)
                        })
                    }else{
                        await store.dispatch('banner/createBanner', fomData)
                        router.push('/banner').then(() => {
                            toast.success(`status: ${Constants.OK200}: create banner successfully`)
                        })
                    }
                    props.onClose(false)
                } catch (error) {
                    toast.error(`status: ${Constants.Error}: api call banner failed!!!`)
                }
            })();
        };

        // TODO: lang listens for changes in data
        watchEffect(() => {
            if(props.data){
                model.id = props.data.id,
                model.name = props.data.name,
                model.images = props.data.images,
                model.description = props.data.description,
                model.link = props.data.link
            }
        });

        return {
            submitForm,
            model,
            handleUploadFile,
            URL,
            ...toRefs(config)
        }
    }
});
</script>
<style scoped>
    .item-edit-images{
       border: 1px solid #4b4b4b;
       width: 40%;
       height: 100px;
    }
    .item-images{
        width: 100%;
        height:  100%;
        object-fit: contain;
    }
</style>