import { defaultEvmStores } from 'svelte-ethers-store';
import { sfHostAddress, superXOCaddress, XOCaddress } from './constants';

import { hostABI } from '../abi/superfluid/host';
import { superTokenABI } from '../abi/superfluid/superToken';
import { XOCABI } from '../abi/XOC';

export function attachContracts() {
  defaultEvmStores.attachContract('sfHost', sfHostAddress, hostABI);
  defaultEvmStores.attachContract('superXOC', superXOCaddress, superTokenABI);
  defaultEvmStores.attachContract('XOC', XOCaddress, XOCABI);
}

