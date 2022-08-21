import { defaultEvmStores } from 'svelte-ethers-store';
import { sfHostAddress, superXOCaddress, XOCaddress, sfCFAv1Address } from './constants';

import { hostABI } from '../abi/superfluid/host';
import { superTokenABI } from '../abi/superfluid/superToken';

import { cfaABI } from '../abi/superfluid/cfa';
import { XOCABI } from '../abi/XOC';

export function attachContracts() {
  defaultEvmStores.attachContract('sfHost', sfHostAddress, hostABI);
  defaultEvmStores.attachContract('superXOC', superXOCaddress, superTokenABI);
  defaultEvmStores.attachContract('XOC', XOCaddress, XOCABI);
  defaultEvmStores.attachContract('cfa', sfCFAv1Address, cfaABI);
}

