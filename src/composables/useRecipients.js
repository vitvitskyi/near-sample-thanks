import { ref, onMounted } from 'vue';
import { getRecipients, getMessages, transfer, sendMessage, getOwner } from '../services/near';
import {useApiError} from "./useApiError";

const recipients = ref('');
const messages = ref('');
const owner = ref('');

export const useRecipients = () => {
  const { setApiError } = useApiError()
  const setRecipients = (data => recipients.value = data)
  const setMessages = (data => messages.value = data)
  const setOwner = (data => owner.value = data)

  const getData = async () => {
    try {
      setRecipients(await getRecipients());
      setMessages(await getMessages());
      setOwner(await getOwner());
    } catch (e) {
      setApiError(e.message);
    }
  };

  onMounted(() => {
    getData();
  });

  const handleSendMessage = async (values) => {
    console.log('values', values)
    try {
      return await sendMessage(values);
    } catch (e) {
      setApiError(e.message);
    }
  };

  const handleTransfer = async () => {
    try {
      return await transfer();
    } catch (e) {
      setApiError(e.message);
    }
  };

  return {
    recipients,
    messages,
    owner,
    getData,
    sendMessage: handleSendMessage,
    transferFunds: handleTransfer,
  };
};
