<template>
    <div id="nav" class="py-4 p-0">
      <Login
          :user="user"
          :setUser="setUser"
      />
    </div>

    <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
            class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
        >
          <defs>
            <pattern
                id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>
        <Header />
        <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <Info />
          <MessageForm
            v-if="recipients"
            :user="user"
            :recipients="recipients?.map((recipient) => ({
                  label: recipient,
                  value: recipient,
                }))"
            :owner="owner"
            :sendMessage="sendMessage"
            :transferFunds="transferFunds"
          />
        </div>
        <svg
            class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
        >
          <defs>
            <pattern
                id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>
        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <LearnSection />
            <MessageHistory :messages="user && messages ? messages: mockDonatesHistoryData" />
          </div>
        </div>
      </div>
    </div>

</template>
<script>
import Login from '../components/Login'
import Header from '../components/Header'
import Info from '../components/Info'
import LearnSection from '../components/LearnSection'
import { mockDonatesHistory } from '../data/mockData';
import MessageHistory from '../components/MessageHistory';
import MessageForm from '../components/MessageForm';
import {useRecipients} from "../composables/useRecipients";
import {ref} from "vue";

export default {
  components: {
    Login,
    Header,
    Info,
    LearnSection,
    MessageHistory,
    MessageForm,
  },
  data(){
    return{
      mockDonatesHistoryData: mockDonatesHistory,
    }
  },
  setup(){
    const user = ref('');
    const setUser = data => user.value = data;

    const { recipients, messages, owner, sendMessage, transferFunds } = useRecipients();

    return { recipients, messages, owner, sendMessage, transferFunds, user, setUser }
  },
}
</script>
