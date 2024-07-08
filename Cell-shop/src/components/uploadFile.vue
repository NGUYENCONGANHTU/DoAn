
<script setup lang='ts'>

   import { defineEmits, ref, defineProps } from "vue"
    const props = defineProps({ 
        Ref : { type:String, required: true}
    })

    const file = ref([] as string[])
    const inputValueRef = ref<HTMLButtonElement | null>(null)
    const isDragging = ref(false)

    const emit = defineEmits(["upload-from"]);

    // click folder upload 
    const handelClickFolder = () => {
        inputValueRef.value?.click()
    }

    // on upload
    const handelOnUploadFile = (event: Event) => {
       try {
            emit('upload-from',event)
            const target  = event.target as HTMLInputElement
            const value = target.files
            if(value){
                for (let i = 0; i < value.length; i++) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                    const result = e.target?.result as string;
                        file.value.push(result);
                    };
                    reader.readAsDataURL(value[i]);
                }
            }
       } catch (error) {
        console.log(error)
       }
    }

    // delete IMG
    const handelDeleteIMG = (id) => {
        try {
            file.value.splice(id,1);
        } catch (error) {
            console.log(error)
        }
    }


</script>

<template>
  <div>
    <div class="cart">
        <label for="inputAddress" class="form-label fw-bold mt-3"
            >Upload - File<span class="mx-1 text-danger">*</span></label
        >
        <div class="drag-area">
        <span v-if="!isDragging">
            Drag & drop image here or
            <span class="select" role="button" @click="handelClickFolder"> choose </span>
        </span>
        <div v-else class="select">Drop images here</div>
        <input
            type="file"
            name="file"
            class="file"
            :ref="props.Ref"
            @change="handelOnUploadFile"
        />
        </div>
        <div class="container-upload">
        <div class="image" v-for="(images, index) in file" :key="index">
            <span class="delete" @click="handelDeleteIMG(index)">&times;</span>
            <img :src="images" class="images"/>
        </div>
        </div>
    </div>
  </div>
</template>


<style scoped>
    .cart{
        width: 100%;
        padding: 10px;
        box-shadow:  0 0 5px #ffdfdf;
        border-radius: 5px;
        overflow: hidden;
    }
    .cart .top {
        text-align: center;
    }
    .cart p{
        font-weight: bold;
        color:#fe0000;
    }
    .cart .drag-area{
        height: 150px;
        border-radius: 5px;
        border:2px dashed #2b1ee7;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
        margin-top:10px;
    }
    .cart .drag-area .visible{
        font-size: 18px;
    }
    .cart .select{
        color:#5256ad;
        margin-left: 5px;
        cursor: pointer;
        transition: 0.4s;
    }
    .cart .select:hover{
        opacity: 0.6;
    }
    .cart .container-upload{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        max-height: 200px;
        position: relative;
        margin-bottom:8px;
        margin-top:10px;
    }
    .cart .container-upload .image{
        width:75px;
        margin-right: 50px;
        height: 75px;
        position: relative;
        margin-bottom: 8px;
    }
    .cart .container-upload .image image{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .cart .container-upload .image span{
        position: absolute;
        top: -8px;
        right: -33px;
        font-size: 28px;
        cursor: pointer;
    }
    .cart input,
    .cart .drag-area .on-drop,
    .cart .drag-area.dragover .visible{
    display: none;
    }
    .delete{
        z-index: 9999;
        color: #fe0000;
    }
    .images{
        height: 108px;
        margin-left: 10px;
    }
    .input-admin-form {
        border-radius: 0;
        font-size: 12px;
    }
</style>