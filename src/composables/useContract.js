import { toRefs, reactive } from "vue";
import { useRecipients } from './useRecipients'

const data = reactive({
  contractId: localStorage.getItem('CONTRACT_ID') || process.env.VUE_APP_CONTRACT_ID,
  registryContractId: localStorage.getItem('REGISTRY_CONTRACT_ID') || process.env.VUE_APP_REGISTRY_CONTRACT_ID,
});

export const useContract = () => {
  const { getData: getRecipientsData } = useRecipients();
  data.contractId && localStorage.setItem('CONTRACT_ID', process.env.VUE_APP_CONTRACT_ID);
  data.registryContractId && localStorage.setItem('REGISTRY_CONTRACT_ID', process.env.VUE_APP_REGISTRY_CONTRACT_ID);

  const setData = (data) => ({
    contractId: data.contractId,
    registryContractId: data.registryContractId,
  });

  const setContractId = (contractId, registryContractId) => {
    localStorage.setItem('CONTRACT_ID', contractId);
    localStorage.setItem('REGISTRY_CONTRACT_ID', registryContractId);
    setData({ registryContractId, contractId });
    getRecipientsData();
  };

  return {
    data: {...toRefs(data)},
    setContractId
  }
};