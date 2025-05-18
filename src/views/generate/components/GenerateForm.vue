<template>
  <div v-if="!imageUrl && !isLoading" class="w-full flex justify-center items-center" :class="{ 'h-full': preferedOption === 'manual' }">
    <div v-if="preferedOption === 'option'" class="mb-[50px] h-full overflow-y-auto">
      <el-form
      ref="ruleFormRef"
      :model="form"
      label-position="top"
      class="w-[450px]"
      :rules="rules"
    >
      <el-form-item
        v-for="field in formConfig"
        :key="field.model"
        :label="field.label"
        :prop="field.model"
      >
        <el-input v-model="form[field.model]" clearable :placeholder="field.placeholder"/>
      </el-form-item>
      <el-form-item label="Select an image size">
        <el-select v-model="form.imageSize" placeholder="Select an option" class="w-[450px]">
          <el-option
            v-for="(option, index) in sizeOptions"
            :key="index"
            :label="option.label"
            :value="option.value"
            :prop="form.imageSize"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <AppButton @buttonClick="submitForm(ruleFormRef)">Generate</AppButton>
    </div>

    <el-form
      v-if="preferedOption === 'manual'"
      ref="ruleFormRef"
      :model="form"
      label-position="top"
      class="w-[450px]"
      :rules="rules"
    >
      <el-form-item label="Enter your custom prompt">
        <el-input v-model="userPrompt" clearable type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" />
      </el-form-item>
      <el-form-item label="Select an image size">
        <el-select v-model="form.imageSize" placeholder="Select an option" class="w-[450px]">
          <el-option
            v-for="(option, index) in sizeOptions"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <AppButton @buttonClick="submitForm(ruleFormRef)">Generate</AppButton>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useGenerate } from '../store/modules/generate.store'
import { form, formConfig } from '../utils/form.config'
import { submitForm } from '../utils/helpers'
import { useRequiredRule, useElFormRules } from '../../../composables/form-config'
import type { FormInstance } from 'element-plus'

const { isLoading, imageUrl, preferedOption, userPrompt } = useGenerate()

const ruleFormRef = ref<FormInstance>()

const sizeOptions = [
  {label: 'Twitter post 1200x675', value: '1200x675'},
  {label: 'Twitter header 1500x500', value: '1500x500'},
  {label: 'Facebook post 1200x630', value: '1200x630'},
  {label: 'Facebook cover 820x312', value: '820x312'},
  {label: 'Instagram post 1080x1080', value: '1080x1080'},
  {label: 'Instagram story 1080x1920', value: '1080x1920'},
  {label: 'Dribble shot 400x300', value: '400x300'},
  {label: 'Dribble shot HD 800x600', value: '800x600'},
  {label: 'LinkedIn cover 1584x396', value: '1584x396'},
]

const rules = computed(() =>
  useElFormRules(
    formConfig.reduce((acc: any, field) => {
      acc[field.model] = [useRequiredRule()]
      return acc
    }, {
      imageSize: [useRequiredRule()]
    }) as Record<string, TElementPlus['FormItemRule'][]>
  )
)

</script>
