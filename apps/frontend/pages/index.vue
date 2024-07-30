<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import BlfSelect from '~/components/BlfSelect.vue';
import { FormatOptions } from '~/types';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import BlfInput from '~/components/BlfInput.vue';
import BlfFile from '~/components/BlfFile.vue';
import PreviewCanvas from '~/components/PreviewCanvas.vue';
import { mitt } from '~/hooks';

useHead({
  title: 'Playground - Billify',
});
const { emit } = mitt;
const formSchema = toTypedSchema(
  z.object({
    inputFormatOptions: z.string({
      required_error: 'Please select an option.',
    }),
  }),
);
const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const inputFormatOptions = [
  {
    label: 'HTML',
    value: FormatOptions.HTML,
  },
  {
    label: 'Image',
    value: FormatOptions.IMAGE,
  },
];

const form = reactive({
  inputFormatOption: FormatOptions.IMAGE,
  file: new File([], 'preview'),
});
const backgroundColor = ref('#f1f5f9');
const qrCodeBoxSettings = reactive({
  width: 80,
  height: 80,
  x: 300,
  y: 100,
  isVisible: false,
});
const canvasWrapper = ref<HTMLElement | null>(null);
const imagePreviewUrl = ref<string>('');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

function onFilePicked() {
  const reader = new FileReader();
  reader.onload = (f) => {
    imagePreviewUrl.value = reader.result as string;
    emit('imageChanged', imagePreviewUrl.value);
  };
  reader.readAsDataURL(form.file);
}

function handleClickQrCode(event: MouseEvent) {
  qrCodeBoxSettings.isVisible = !qrCodeBoxSettings.isVisible;
  // qrCodeBoxSettings.x = ;
}
function handleChangeBackgroundColor() {
  emit('backgroundColorChanged', backgroundColor.value);
}

async function handleSave() {
  const { data } = await useFetch<Blob>('http://localhost:4000/generator', {
    method: 'post',
    responseType: 'arrayBuffer',
  });

  const url = window.URL.createObjectURL(new Blob([data.value!]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'title.png');
  document.body.appendChild(link);
  link.click();
}
</script>
<template>
  <div class="h-2/3 aspect-video flex shadow rounded-2xl overflow-hidden">
    <ContextMenu>
      <div as="div" class="w-2/3 flex m-10 items-center justify-center">
        <ContextMenuTrigger as="div" class="h-full w-full">
          <div class="ticket_view" ref="canvasWrapper">
            <PreviewCanvas
              v-if="canvasWrapper"
              :width="canvasWrapper.getBoundingClientRect().width"
              :heigth="canvasWrapper.getBoundingClientRect().height"
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem @click="handleClickQrCode"
            >{{ qrCodeBoxSettings.isVisible ? 'Delete' : 'Add' }} QR
            Code</ContextMenuItem
          >
        </ContextMenuContent>
      </div>
    </ContextMenu>
    <div class="w-1/3 border-l p-4 flex flex-col justify-between">
      <form class="flex flex-col gap-4 flex-1" @submit="onSubmit">
        <BlfSelect
          :options="inputFormatOptions"
          name="inputFormatOptions"
          label="Select a format"
          v-model="form.inputFormatOption"
        />
        <BlfFile
          @filePicked="onFilePicked"
          label="Select a file"
          v-model="form.file"
          accept="image/*"
          name="file"
        />
        <BlfInput
          @change="handleChangeBackgroundColor"
          @input="handleChangeBackgroundColor"
          label="Pick a background color"
          v-model="backgroundColor"
          type="color"
          name="backgroundColor"
        />
      </form>
      <div class="flex justify-end">
        <Button class="bg-blue-700 hover:bg-blue-900" @click="handleSave"
          >Save</Button
        >
      </div>
    </div>
  </div>
</template>
<style>
.ticket_view {
  /* aspect-ratio: 44/17; */
  /* width: 528px; */
  /* min-height: 204px; */
  width: 100%;
  height: 100%;
  /* margin: 0 auto; */
  /* max-width: 90%; */
}
.shadow {
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.09);
}
</style>
