import {onMounted, ref } from 'vue';
import { getRecipients, getMessages, transfer, sendMessage, getOwner } from '../services/near';

const recipients = ref('');
const messages = ref('');
const owner = ref('');

export const useRecipients = ( setApiError = () => {} ) => {
  const setRecipients = (data => recipients.value = data)
  const setMessages = (data => messages.value = data)
  const setOwner = (data => owner.value = data)

  const getData = async () => {
    try {
      setRecipients(await getRecipients());
      setMessages(await getMessages());
      setOwner(await getOwner());
    } catch (e) {
      setApiError(e);
    }
  };

  onMounted(() => {
    getData();
  });

  const handleSendMessage = async (values) => {
    try {
      return await sendMessage(values);
    } catch (e) {
      setApiError(e);
    }
  };

  const handleTransfer = async () => {
    try {
      return await transfer();
    } catch (e) {
      setApiError(e);
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
