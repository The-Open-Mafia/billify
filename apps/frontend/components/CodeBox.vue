<script setup lang="ts">
const width = defineModel<number>('width', { default: 0 });
const height = defineModel<number>('height', { default: 0 });
const x = defineModel<number>('x', { default: 0 });
const y = defineModel<number>('y', { default: 0 });

const isResizing = ref(false);
const isSelected = ref(false);
const element = ref<HTMLElement | null>(null);
const currentResizer = ref<HTMLElement | null>(null);

const ticketViewRect = computed(() =>
  element.value!.parentElement!.getBoundingClientRect(),
);

function resize(evt: MouseEvent) {
  const target = currentResizer.value as HTMLElement;
  isResizing.value = true;
  if (target!.classList.contains('bottom-right')) {
    width.value = Math.min(
      width.value + evt.movementX,
      ticketViewRect.value.width,
    );
    height.value = Math.min(
      height.value + evt.movementY,
      ticketViewRect.value.height,
    );
  } else if (target.classList.contains('bottom-left')) {
    width.value = element.value!.getBoundingClientRect().right - evt.pageX;
    height.value += evt.movementY;
  }
}

function stopResize() {
  removeEventListener('mousemove', resize);
  isResizing.value = false;
}
function handleMouseDown(event: MouseEvent) {
  event.preventDefault();
  const target = event.target as HTMLElement;
  if (!target || !isSelected) return;
  currentResizer.value = target;
  addEventListener('mousemove', resize);
  addEventListener('mouseup', stopResize);
}

function dragElement(event: MouseEvent) {
  if (isResizing.value || !isSelected) return;

  x.value = Math.min(
    Math.max(x.value + event.movementX, 0),
    ticketViewRect.value.width - width.value,
  );
  y.value = Math.min(
    Math.max(y.value + event.movementY, 0),
    ticketViewRect.value.height - height.value,
  );
}
function closeDragElement() {
  console.log('mouseup');

  // stop moving when mouse button is released:
  removeEventListener('mousemove', dragElement);
}

function handleDragMouseDown(event: MouseEvent) {
  event.preventDefault();
  addEventListener('mousemove', dragElement);
  addEventListener('mouseup', closeDragElement);
}
function handleClick() {
  isSelected.value = true;
}

onMounted(() => {
  window.addEventListener('click', () => {
    isSelected.value = false;
  });
});
</script>

<template>
  <div
    class="absolute min-w-20 min-h-20 resizable border-2 border-transparent"
    :class="{
      '!border-blue-300': isSelected,
    }"
    @click.stop="handleClick"
    @dblclick="handleClick"
    @mousedown="handleDragMouseDown"
    ref="element"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${y}px`,
      left: `${x}px`,
    }"
  >
    <img
      src="~/assets/images/QR_Code.png"
      class="object-fill h-full w-full"
      alt="QR_Code"
    />
    <div class="resizers" v-show="isSelected">
      <!-- <div @mousedown="handleMouseDown" class="resizer top-left"></div> -->
      <!-- <div @mousedown="handleMouseDown" class="resizer top-right"></div> -->
      <!-- <div @mousedown="handleMouseDown" class="resizer bottom-left"></div> -->
      <div @mousedown="handleMouseDown" class="resizer bottom-right"></div>
    </div>
  </div>
</template>
<style>
.resizable .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  border: 3px solid #4286f4;
  position: absolute;
}
.resizable .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.resizable .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.resizable .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.resizable .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
