<script setup lang="ts">
import * as fabric from 'fabric';
import { mitt } from '~/hooks';
const props = defineProps<{
  width: number;
  heigth: number;
}>();

const { on } = mitt;

const canvas = ref<HTMLCanvasElement | null>(null);
const codeBoxImage = ref<HTMLImageElement | null>(null);

const mainRectDimensions = reactive({
  width: props.width - 36,
  height: (props.width * 17) / 44,
});
let canva: fabric.Canvas = new fabric.Canvas('canvas', {
  width: props.width,
  height: props.heigth,
  backgroundColor: 'rgb(241 245 249)',
  selection: false,
});

const mainRect = new fabric.Rect({
  originX: 'center',
  splitByGrapheme: true,
  selectable: false,
  fill: 'rgb(100 116 139)',
  width: mainRectDimensions.width,
    height: mainRectDimensions.height,
});

on('backgroundColorChanged', (backgroundColor) => {
  console.log(backgroundColor);
  canva.backgroundColor = backgroundColor;
  canva.renderAll();
});
on('imageChanged', async (url) => {
  const img = await fabric.FabricImage.fromURL(url);
  console.log(mainRectDimensions);
  //   img.width = mainRectDimensions.width;
  //   img.height = mainRectDimensions.height;
  img.scaleToHeight(300);
  img.scaleToWidth(300);
  canva.add(img);
  canva.centerObjectV(img);
  canva.centerObjectH(img);

  canva.renderAll();
});
onMounted(() => {
  if (!canvas.value) return;
  if (!codeBoxImage.value) return;

  canva = new fabric.Canvas('canvas', {
    width: props.width,
    height: props.heigth,
    backgroundColor: 'rgb(241 245 249)',
    selection: false,
  });

  const codeBox = new fabric.Image(codeBoxImage.value, {
    scaleX: 0.1,
      scaleY: 0.1,
    
  });

  canva.add(mainRect);
  canva.add(codeBox);
  canva.centerObjectH(mainRect);
  canva.centerObjectV(mainRect);
});
</script>
<template>
  <canvas id="canvas" ref="canvas" class="w-full"></canvas>
  <img
    ref="codeBoxImage"
    width="80"
    height="80"
    src="~/assets/images/QR_Code.png"
    class="hidden"
    alt="QR_Code"
  />
</template>
