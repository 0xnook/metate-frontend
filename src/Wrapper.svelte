<script lang="ts">
import { contracts, signerAddress } from 'svelte-ethers-store';
import { utils } from "ethers";

import { superXOCaddress } from './constants';

import Button3D from './Button3D.svelte';

$: selectedAction = 'wrap';

let input = 0;
let XOCBalance = utils.parseEther("0");
let XOCxBalance = utils.parseEther("0");

async function getDisplayData() {
	XOCBalance = await $contracts.XOC.balanceOf($signerAddress);
	XOCxBalance = await $contracts.superXOC.balanceOf($signerAddress);
}

$: if($contracts.XOC && $contracts.superXOC) {
	getDisplayData();
}

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
	width: 20rem;
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
				<span>
					<label for="top-input">{selectedAction === "wrap" ? "XOC" : "XOCx"}</label>
					{selectedAction==="wrap" ? utils.formatEther(XOCBalance.sub(XOCBalance.mod(1e14))) : utils.formatEther(XOCxBalance.sub(XOCxBalance.mod(1e14)))}
				</span>
			</div>
			<div class="swap-input">
				<input bind:value={input} name="bottom-input" type="number"/>
				<span>
					<label for="bottom-input">{selectedAction === "wrap" ? "XOCx" : "XOC"}</label>
					{selectedAction==="wrap" ? utils.formatEther(XOCxBalance.sub(XOCxBalance.mod(1e14))) : utils.formatEther(XOCBalance.sub(XOCBalance.mod(1e14)))}
				</span>
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
	{:else}
		<div class="treedee">
			<Button3D actionHandler={()=>{}}>Cartera desconectada</Button3D>
		</div> {/if}
</section>
