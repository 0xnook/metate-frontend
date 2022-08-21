<script lang="ts">
import { contracts, signerAddress } from 'svelte-ethers-store';
import { utils } from "ethers";

import { superXOCaddress } from './constants';

import Button3D from './Button3D.svelte';

$: selectedAction = 'wrap';

let input = 0;

async function handleApproval() {
	await $contracts.XOC.approve(superXOCaddress, utils.parseEther(input.toString()));
}

async function handleWrap() {
	if(selectedAction === 'wrap') {
		await $contracts.superXOC.upgrade(utils.parseEther(input.toString()));
	} else if (selectedAction === 'unwrap') {
		await $contracts.superXOC.downgrade(utils.parseEther(input.toString()));
	}
}
</script>

<style>
.box {
	border: 1px solid var(--main-text-color);
	border-radius: 10px;
	margin: 3rem auto 3rem auto;
	max-width: 40%;
}
.buttons {
	display: flex;
}

.action-button {
	margin: 1rem;
	color: var(--light-text-color);	
	cursor: pointer;
}

.selected {
	color: var(--main-text-color);
}

.swap-input {
	margin: auto;
	margin: 1rem auto 1rem auto;
	width: 15rem;
}

.treedee :global(.pushable) {
		width: 40%;
		color: var(--bg-color);
}
</style>

<section >
	<div class="box">
		<div class="buttons">
			<div class="action-button" class:selected={selectedAction==="wrap"} on:click={()=>{selectedAction="wrap"}}>Envolver</div>
			<div class="action-button" class:selected={selectedAction==="unwrap"} on:click={()=>{selectedAction="unwrap"}}>Desenvolver</div>
		</div>
		<div>
			<div class="swap-input">
				<input bind:value={input} name="top-input" type="number"/>
				<label for="top-input">{selectedAction === "wrap" ? "XOC" : "XOCx"}</label>
			</div>
			<div class="swap-input">
				<input bind:value={input} name="bottom-input" type="number"/>
				<label for="bottom-input">{selectedAction === "wrap" ? "XOCx" : "XOC"}</label>
			</div>

		</div>
	</div>
	{#if $contracts.hasOwnProperty("XOC")}
		{#await $contracts.XOC.allowance($signerAddress, superXOCaddress)}
			...
		{:then allowance}
			{#if input && selectedAction === "wrap" && allowance < utils.parseUnits(input.toString())}
				<div class="treedee">
					<Button3D actionHandler={handleApproval}>Aprovar</Button3D>
				</div>
			{:else}
				<div class="treedee">
					<Button3D actionHandler={handleWrap}>{selectedAction === "wrap" ? "Envolver" : "Desenvolver"}</Button3D>
				</div>
			{/if}
		{/await}
	{/if}
</section>
