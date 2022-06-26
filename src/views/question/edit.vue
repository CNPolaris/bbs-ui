<template>
  <div class="main wrap">
    <div class="editModule">
      <el-form v-model="form">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" placeholder="请输入问答标题" />
        </el-form-item>
        <el-form-item>
          <tinymce v-model="form.content" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            提问
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        id: null,
        title: null,
        content: null,
        sectionIds: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editModule {
  margin-top: 50px;
}
</style>
