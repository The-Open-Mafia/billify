<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

defineProps<{
  label?: string;
  name: string;
  accept?: string;
}>();
const emit = defineEmits(['filePicked']);
const model = defineModel<File | null>({ default: null });

function onFilePicked(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  if (!target || !target.files) return;
  model.value = target.files[0];
  emit('filePicked');
}
</script>

<template>
  <Label v-if="label">
    <span>{{ label }}</span>
    <Input
      :accept="accept"
      class="mt-2"
      :id="name"
      type="file"
      @change="onFilePicked"
    />
  </Label>
</template>
