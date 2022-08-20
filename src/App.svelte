<script lang="ts">
import { accountModalHidden } from "./store";
import { blockExplorerURL } from "./constants";

import Header from "./Header.svelte";
import AccountModal from "./AccountModal.svelte";
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

:global(:root) {
  --secondary-hl-color: rgba(206, 151, 134, 0.32);
	--bg-color: #A8BC9D;
	--main-text-color: #371903;
	background-color: var(--bg-color);
	color: var(--main-text-color);
}
</style>

<main>
	<Header bind:accountModalHidden={$accountModalHidden}/>
	<h1>Metate</h1>
	{$accountModalHidden}
	{#key !$accountModalHidden} 
		<AccountModal {blockExplorerURL} bind:hidden={$accountModalHidden}/>
	{/key}
</main>
