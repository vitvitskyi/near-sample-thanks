<template>
  <div class="shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="text-left pb-6">
        <p class="text-lg leading-6 font-medium text-gray-700">Record your message on the blockchain</p>
        <p class="mt-2 text-base text-gray-500">No better way to say "Thanks!" than to make it permanent.</p>
        <p class="mt-2 text-base text-gray-500">You can do that right here.</p>
      </div>

      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <v-select v-model="selected"  :options="recipients" placeholder="Recipient name"/>
        </div>

        <div class="col-span-6">
          <label htmlFor="message" class="sr-only">
            Your message
          </label>

          <textarea
            v-model="message"
            rows="4"
            id="message"
            :autoComplete="message"
            placeholder="Your message"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="col-span-6">
          <SwitchGroup as="div" class="flex items-center">
            <Switch
                v-model="anonymous"
              :class="[
              anonymous ? 'bg-indigo-600' : 'bg-gray-200',
               'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer',
              'transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']"
            >
            <span
              aria-hidden="true"
              :class="[ anonymous ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
            />
            </Switch>
            <SwitchLabel as="span" class="ml-3">
              <span class="text-sm font-medium text-gray-900">Send anonymously</span>
            </SwitchLabel>
          </SwitchGroup>
        </div>
        <div class="col-span-6 sm:col-span-6 lg:col-span-3">
          <label htmlFor="tip" class="sr-only">
            Tip
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">Ⓝ</span>
            </div>

            <input
              type="text"
              id="tip"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
              v-model="attachedDeposit"
              aria-describedby="message-tip"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm" id="message-tip">
                    NEAR
                  </span>
            </div>
          </div>
        </div>
        <div class="col-span-6 sm:col-span-6 lg:col-span-3">
          <button
              @click="handleSubmit"
              class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Say Thanks
          </button>
        </div>

        <div v-if="owner" class="col-span-6 sm:col-span-6 lg:col-span-3">
          <button
              @click="handleTransfer"
              class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Transfer to owner
          </button>
        </div>

      </div>
    </div>
  </div>
  <p v-if="loading" class="text-indigo-500">LOADING...</p>
</template>

<script>
import { ref } from 'vue'
import { useContract } from '../../composables/useContract'
import {
  Switch, SwitchGroup, SwitchLabel
} from '@headlessui/vue'
import { wallet } from '../../services/near';

export  default {
  components: {
    Switch, SwitchGroup, SwitchLabel
  },
  props:{
    user: {
      type: String,
    }, recipients: {
      type: Array,
      default: () => {},
    }, owner: {
      type: String,
      default: 'Ygine'
    }, sendMessage: {
      type: Function,
      default: () => {}
    }, transferFunds: {
      type: Function,
      default: () => {}
    }
  },
  data(){
    return {
      message: '',
      attachedDeposit: '',
      selected: this.recipients[0],
    }
  },
  methods: {
    handleSubmit(){
      if (this.user) {
        console.log('this.user', this.user)
        this.setLoading(true);
        this.sendMessage({
          message: this.message,
          anonymous: this.anonymous,
          attachedDeposit: this.attachedDeposit,
        });
        this.setLoading(false);
      } else {
        wallet.requestSignIn(this.contractId);
      }
    },
    async handleTransfer() {
      await this.transferFunds();
    },
  },
  setup() {
    const {
      data: { contractId },
    } = useContract();

    const anonymous = ref('')
    const loading = ref(false)
    const setLoading = (data) => loading.value = data

    return { anonymous, contractId, setLoading, loading }
  },
}

</script>