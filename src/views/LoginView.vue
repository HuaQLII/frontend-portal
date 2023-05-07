<template>
    <div class="login-box">
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
                status-icon
        >
            <h3 style="text-align: center;margin: 20px auto">{{ systemName }}</h3>
            <el-form-item label="username:" prop="username">
                <el-input v-model="ruleForm.username"/>
            </el-form-item>
            <el-form-item label="password:" prop="password">
                <el-input type="password" v-model="ruleForm.password"/>
            </el-form-item>
            <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">
                    Login
                </el-button>
                <el-button class="loginBtn" @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, h} from 'vue'
import {LoginFormData} from "@/types/login";
import {ElNotification, FormInstance} from 'element-plus';
import {Login} from '@/request/api';
import {useRouter} from "vue-router";

export default defineComponent({
    setup() {
        //路由实例
        const router = useRouter()
        //系统名称
        const systemName = 'Back Office Management System'
        //表单数据
        const data = reactive(new LoginFormData());
        //校验规则
        const rules = {
            username: [
                {required: true, message: 'Please input username', trigger: 'blur'},
                {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'}
            ],
            password: [
                {required: true, message: 'Please input password', trigger: 'blur'},
                {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'}
            ]
        }
        //表单实例
        const ruleFormRef = ref<FormInstance>()
        //提交表单
        const submitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    console.log(valid)
                    Login(data.ruleForm).then(res => {
                        if (res.data.username === data.ruleForm.username){
                            // localStorage.setItem('token', res.data)
                            router.push('/home')
                        }else {
                            ElNotification({
                                title: 'Title',
                                message: h('i', { style: 'color: teal' }, 'username or password error!'),
                            })
                        }
                    })
                    console.log('submit!')
                } else {
                    console.log('error submit!', fields)
                }
            })
        }
        //重置表单
        const resetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }
        return {...toRefs(data), systemName, rules, resetForm, submitForm, ruleFormRef}
    }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/login-box.png") no-repeat center center fixed;
  //filter: brightness(50%);
  padding: 1px;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    padding: 30px;
    border-radius: 40px;
    background: rgba(233, 238, 250, 0.3);
  }

  //.loginBtn{
  //    width: 40%;
  //    margin-top: 20px;
  //}

}
</style>