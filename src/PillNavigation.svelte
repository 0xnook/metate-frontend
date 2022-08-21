<script lang="ts">
import { selectedTab } from './store';
import { swapURL } from './constants';

function handleSectionClick(selected: string) {
	selectedTab.set(selected);
}

let selectedTabValue: string;
let innerWidth = window.innerWidth;

selectedTab.subscribe(value => {
	selectedTabValue = value;
});
</script>

<svelte:window bind:innerWidth/>

<style>
	nav {
		display: flex;
		width: 35%;
		margin: 2rem auto auto auto;
		justify-content: center;
		text-align: center;
	}

	.nav-button {
		width: 100%;
		height: 100%;
		color: black;
		background-color: var(--light-color);
		border-color: var(--main-text-color);
		margin: 0.5rem 0 0 0;
		padding: 0.8rem;
		border-style: solid;
		font-family: "Quicksand", sans-serif;
		font-weight: bold;
		cursor: pointer;
	}

	.left-nav-button {
		border-right: none;
		border-radius: 10px 0px 0px 10px;
	}
	
	.right-nav-button {
		border-left: none;
		border-radius: 0px 10px 10px 0px;
	}

	.selected {
		background-color: var(--main-text-color);
		color: var(--bg-color);
	}
</style>

<nav> 
	<div class="nav-button left-nav-button" class:selected={selectedTabValue==='wrap'} on:click={()=>handleSectionClick('wrap')}> Envolturas </div>
	<div class="nav-button" class:selected={selectedTabValue==='flows'} on:click={()=>handleSectionClick('flows')}> Flujos </div>
	<div class="nav-button right-nav-button" on:click={()=>window.open(swapURL, '_blank')}> Comprar XOC </div>
</nav>
