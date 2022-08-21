<script lang="ts">
import { signerAddress, connected } from 'svelte-ethers-store';
import { shortSignerAddress } from './store';
export let accountModalHidden: boolean;
/* $: shortSignerAddress = toShortAddress($signerAddress); */
</script>

<style>
.logo {
  font-family: 'Quicksand', sans-serif;
  font-size: 2.5rem;
	font-weight: 600;
}

.header {
	display: flex; 
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

button {
	background-color: var(--secondary-hl-color);
	color: var(--main-text-color);
	border: 1px solid var(--main-text-color);
	border-radius: 10px;
	margin: 0.5rem;
  padding: 0.6em 1.2em;
	font-size: 1.2rem;
  font-family: inherit;
	height: 2rem;
}

.right-content {
	display: flex;
	flex-direction: row;
	align-content: center;
	gap: 1rem;
}

.button {
	border: 1px solid var(--main-text-color);
	border-radius: 10px;
  padding: 0.6em 1.2em;
	height: 2rem;
	font-size: 1.2rem;
}

.network-button {
	display: flex;
	justify-content: space-evenly;
	cursor: default; 
	gap: 0.3rem;
	margin: auto;
	width: 6rem;
	/* background-color: var(--secondary-hl-color); */
}

.network-logo {
	height: 1.5rem;
	margin-top: 0.2rem;
}

.connect-button {
	background-color: var(--secondary-hl-color);
	cursor: pointer;
}
</style>

<header class="header">
	<div class="logo">Metate</div>
	<div class="right-content">
		<div class="right-content">
			<div class="button network-button">
				Polygon
				<img class="network-logo" src="polygon.svg" alt="polygon logo">
			</div>
			<div class="button connect-button" on:click={()=>accountModalHidden=false}>{$connected ? $shortSignerAddress : "Conectar"}</div>
		</div>
	</div>
</header>

