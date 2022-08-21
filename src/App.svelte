<script lang="ts">
import { accountModalHidden, selectedTab } from "./store";
import { blockExplorerURL } from "./constants";
import { attachContracts } from "./contractLoader";

import Header from "./Header.svelte";
import AccountModal from "./AccountModal.svelte";
import PillNavigation from "./PillNavigation.svelte";
import Wrapper from "./Wrapper.svelte";
import Flows from "./Flows.svelte";

attachContracts();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

:global(:root) {
  --secondary-hl-color: rgba(206, 151, 134, 0.32);
	--bg-color: #A8BC9D;
	--main-text-color: #371903;
	--light-text-color: rgba(50, 50, 50, 0.66);
	background-color: var(--bg-color);
	color: var(--main-text-color);
}
</style>

<main>
	<Header bind:accountModalHidden={$accountModalHidden}/>
	{#key !$accountModalHidden} 
		<AccountModal {blockExplorerURL} bind:hidden={$accountModalHidden}/>
	{/key}
	<PillNavigation/>
	{#if $selectedTab==="wrap"}
		<Wrapper />
	{:else if $selectedTab==="flows"}
		<Flows/>
	{/if}
</main>
