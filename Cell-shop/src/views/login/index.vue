<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="#"><b>Admin</b></a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <Form @submit="submitForm">
                        <div class="input-group mb-1">
                            <Field v-model="formData.email" class="form-control" placeholder="Email" name="email"
                                type="email" rules="required|email" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage class="text-danger mb-2" name="email" />

                        <div class="input-group mb-1">
                            <Field v-model="formData.password" class="form-control" placeholder="Password"
                                name="password" type="password" rules="required" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage class="text-danger mb-2" name="password" />
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember" />
                                    <label for="remember"> Remember Me </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">
                                    Sign In
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </Form>

                    <div class="social-auth-links text-center mb-3">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                        </a>
                    </div>
                    <!-- /.social-auth-links -->

                    <p class="mb-1">
                        <a href="#">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <a href="#" class="text-center">Register a new membership</a>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
import { useForm } from 'vee-validate';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router';
import { Constants } from "@/constants/constants";
import { toast } from "vue3-toastify";

export default defineComponent({
    setup() {
        // declare store
        const store = useStore();
        const router = useRouter();
        const { handleSubmit, values } = useForm();
        // request input
        const formData = reactive({
            username: '',
            password: '',
        });

        const submitForm = () => {
            handleSubmit(async () => {
                try {
                    await store.dispatch('auth/login', { params:formData })
                    router.push('/').then(() => {
                        toast.success(`status: ${Constants.OK200}: login successfully`)
                    })
                } catch (error) {
                    toast.error(`status: ${error.status}: login failed!!!`)
                }
            })();
        };

        return {
            handleSubmit,
            values,
            formData,
            submitForm
        };


    }
});
</script>