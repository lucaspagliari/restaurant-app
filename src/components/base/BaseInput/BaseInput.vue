<template>
  <div :class="['base-input', { 'base-input-invalid': isInvalid }]">
    <label
      v-if="label"
      :for="name"
      class="fieldName"
    >
      {{ label }}
    </label>
    <input
      class="field"
      :value="modelValue"
      :name="name"
      :type="type"
      @input="handleInput"
    />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const name = computed(
      () => props.label + (Math.random() * 1000).toString(16),
    )

    const handleInput = (event: any) => {
      emit('update:modelValue', event.target.value)
    }

    return { name, handleInput }
  },
}
</script>
<style lang="scss" scoped>
.base-input {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: medium;

  .field {
    width: 100%;
    padding: 0.25rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background-color: var(--color-background);

    // Remove arrows inside input
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield; /* Firefox */
    }
  }

  &-invalid {
    color: var(--color-pink);
    .field {
      border-color: var(--color-pink);
    }
  }
}
</style>
