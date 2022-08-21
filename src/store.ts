import { writable, derived } from "svelte/store";
import { provider, signerAddress } from 'svelte-ethers-store';

import { toShortAddress } from './utils';

export const accountModalHidden = writable(true);

export const providerType =  derived([provider], 
	([$provider]) => {
		if($provider && 'provider' in $provider) {
			// @ts-ignore:next-line
			if ('isMetaMask' in $provider.provider) {
				localStorage.setItem('providerType', 'metamask');
				return 'metamask';
			// @ts-ignore:next-line
			} else if ('wc' in $provider.provider) {
				localStorage.setItem('providerType', 'walletconnect');
				return 'walletconnect';
			}
		} 
		return 'unknown';
});

export const shortSignerAddress = derived([signerAddress], 
	([$signerAddress]) => {
		return toShortAddress($signerAddress);
	});

export const selectedTab = writable("wrap");
