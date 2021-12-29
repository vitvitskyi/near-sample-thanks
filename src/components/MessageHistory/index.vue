<template>
  <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
    <RadioGroup>
      <RadioGroupLabel class="sr-only">Message History</RadioGroupLabel>
      <RadioGroupOption>
        <Message v-for="item in messages" :key="item.id" :item="item" />
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>

<script>
  import {
    RadioGroup,
    RadioGroupOption,
    RadioGroupLabel,
  } from '@headlessui/vue'
  import Message from './Message'

  export default {
    components: {
      RadioGroup,
      RadioGroupOption,
      RadioGroupLabel ,
      Message
    },
    props: {
      messages: {
        type: Array
      }
    }
  }

</script>