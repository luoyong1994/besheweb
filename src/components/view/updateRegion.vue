<template>
    <div class="header">
        <el-form :label-position="position" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign" class="demo-ruleForm">
            <el-form-item label="区域名称" prop="userName">
                <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="区域公告" prop="userName">
                <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
            </el-form-item>
            <el-form-item label="区域图片" prop="userName">
                <div class="uploadImg">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formLabelAlign')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
/* eslint-disable */
import { addAdmin } from '@/api/api'
export default {
    name: '',
    props: [''],
    data() {
        return {
            imageUrl: '',
            position: 'left',
            formLabelAlign: {
                userName: '',
                userPassword: '',
                userPhone: '',
                userType: '',
                desc: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                userPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                userPhone: [
                    {
                        required: true,
                        message: '请输入电话号码',
                        trigger: 'blur'
                    }
                ],
                userType: [
                    {
                        required: true,
                        message: '请选择人员类型',
                        trigger: 'change'
                    }
                ]
            }
        }
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                console.log(this.formLabelAlign)
                if (valid) {
                    addAdmin(this.formLabelAlign).then(res => {
                        if (res.state == 0) {
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            })
                            var userType = this.formLabelAlign.userType
                            if (userType == 0) {
                                this.$router.push({ name: 'readerPage' })
                            } else {
                                this.$router.push({ name: 'adminPage' })
                            }
                        }
                    })
                } else {
                    return false
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }
    },

    watch: {}
}
</script>
<style scoped>
.header {
    width: 600px;
}
.uploadImg{
    height: 200px;
    width: 200px;
    border: 1px dashed #3333;
}

.avatar-uploader .avatar-uploader-icon{
    margin: 0px auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 100px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>