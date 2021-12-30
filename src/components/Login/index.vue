<template>
  <div class="px-5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
    <div class="flex items-center">

    <div v-if="isOpenChangeContact" class="relative flex items-center">
      <div class="absolute z-10 -left-2 w-16 h-16 rounded-full bg-gray-200 animate-pulse duration-75"></div>

      <button  class="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
              d="M22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25ZM22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25Z"
              fill="white"
          />
        </svg>
      </button>

      <ChangeContract :setIsOpenChangeContact="setIsOpenChangeContact" />
    </div>

    <div v-else class="relative flex items-center">
      <div class="absolute z-10 -left-2 w-16 h-16 rounded-full bg-indigo-300 animate-pulse duration-75" />
      <button
          @click="setIsOpenChangeContact"
        class="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-gray-400"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path
            d="M22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25ZM22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25Z"
            fill="white"
        />
      </svg>
      </button>
      <p class="ml-4 text-sm font-bold">Try frontend with your deployed contract ID</p>
    </div>

  </div>

  <div v-if="user" class="flex items-center justify-between">
    <div class="flex items-center justify-center cursor-pointer h-12 p-4 rounded-md bg-indigo-500 text-white mx-2">
            <span>
              <UserIcon size="25" class="w-6 h-6 text-black-500" />
            </span>
      <h4 class="mr-2">{{user}}</h4>
    </div>
    <div
        @click="signOut"
        class="flex items-center justify-center h-12 px-5 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white mx-2 cursor-pointer"
    >
      <LogoutIcon size="25" class="w-6 h-6 text-black-500" />
    </div>
  </div>
  <button
      v-else
      @click="signIn"
      class="self-end rounded-3xl  py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Login
  </button>
  </div>
</template>


<script>
  import { UserIcon, LogoutIcon } from '@heroicons/vue/solid'
  import ChangeContract from './ChangeContract'
  import { useContract } from '../../composables/useContract'
  import { wallet } from '../../services/near';

  export default {
    data(){
      return {
        isOpenChangeContact: false,
      }
    },
    mounted() {
      const userData = wallet.getAccountId();
      this.setUser(userData);
    },
    props: {
      user: {
        type: String,
        default: '',
      },
      setUser: {
        type: Function,
        default: () => {},
      },
    },
    components: {
      UserIcon,
      LogoutIcon,
      ChangeContract,
    },
    methods:{
      setIsOpenChangeContact(){
        this.isOpenChangeContact = !this.isOpenChangeContact
      },
      signIn(){
        wallet.requestSignIn(this.contractId);
      },
      signOut(){
        wallet.signOut();
        localStorage.removeItem(`near-api-js:keystore:${this.user}:testnet`);
        this.setUser(null);
      },
    },
    setup(){
      const {
        data: { contractId },
      } = useContract();

      return { contractId }
    },
  }
</script>