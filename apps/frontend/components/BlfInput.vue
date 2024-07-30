<script setup lang="ts">
import type { HTMLAttributes,InputTypeHTMLAttribute } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

withDefaults(
  defineProps<{
    label?: string;
    class?: HTMLAttributes["class"];
    name: string;
    required?: boolean;
    type?: InputTypeHTMLAttribute;
    placeholder?: string;
    description?: '';
  }>(),
  { type: 'text' },
);
</script>
<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel v-if="label">{{ label }}</FormLabel>
      <FormControl>
        <Input
          :type="type"
          :placeholder="placeholder"
          :required="required"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription v-if="description"> {{ description }} </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
