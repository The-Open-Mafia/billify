<script setup lang="ts">
import {
  FormDescription,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

defineProps<{
  label?: string;
  placeholder?: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
}>();

const model = defineModel();
</script>
<template>
  <FormField v-slot="{ componentField }" :name="name" v-model="model">
    <FormItem>
      <FormLabel v-if="label">{{ label }}</FormLabel>

      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="option.value" v-for="option in options">
              {{ option.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <!-- <FormDescription>
        You can manage email addresses in your
        <a href="/examples/forms">email settings</a>.
      </FormDescription> -->
      <FormMessage />
    </FormItem>
  </FormField>
</template>
