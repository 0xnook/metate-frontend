<script lang="ts">
import { utils } from 'ethers';
import { contracts, signerAddress } from 'svelte-ethers-store';

import { superXOCaddress, sfCFAv1Address } from './constants';

import { cfaABI } from '../abi/superfluid/cfa';

import Button3D from './Button3D.svelte';

let recipient = "0xf022683f3884293dc542c29c774f23b02de6eef3";
let flowRate = 0;
let frequency = "second";
let netflow = utils.parseEther("0");

function getNetFlow() {
	netflow = $contracts.sfCFAv1Address.getNetFlow(superXOCaddress, $signerAddress);
}

$: if($contracts.sfCFAv1Address && signerAddress) {
	getNetFlow(); 
}

function toSecondFlowrate(flowRate: number, frequency: string): BigNumber {
	let result = 0;
	if (!flowRate) {
		return utils.parseEther("0");
	} else if (frequency === "second") {
		result = flowRate;
	} else if (frequency === "minute") {
		result = flowRate/60;
	} else if (frequency === "hour") {
		result = flowRate/3600;
	} else if (frequency === "day") {
		result = flowRate/86400;
	} else if (frequency === "week") {
		result = flowRate/604800;
	} else if (frequency === "month") {
		result = flowRate/86400*30;
	}	else if (frequency === "year") {
		result = flowRate/86400/365;
	} else return utils.parseEther("0");

	return utils.parseEther(result.toFixed(18).toString());
}

async function handleCreateFlow() {
	let iface = new utils.Interface(cfaABI);
	const callData = iface.encodeFunctionData("createFlow", [superXOCaddress, recipient, toSecondFlowrate(flowRate, frequency), "0x"]);
	await $contracts.sfHost.callAgreement(sfCFAv1Address, callData, "0x");
}
</script>

<style>
.box {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	border: 1px solid var(--main-text-color);
	border-radius: 10px;
	margin: 3rem auto 3rem auto;
	max-width: 40%;
}
input {
	width: 15rem;
	margin: auto auto 2rem auto;
}

.treedee :global(.pushable) {
		width: 40%;
		color: var(--bg-color);
}
</style>

<section>
	<div class="box">
		<div>
			Direccion del recipiente
		</div>

		<input bind:value={recipient} type="text"/>

		<div>
			Velocidad de flujo
		</div>

		<div>
			<input bind:value={flowRate} type="number"/>
			/
			<select bind:value={frequency}>
				<option value="second">Segundo</option>
  			<option value="minute">Minuto</option>
  			<option value="hour">Hora</option>
  			<option value="day">Dia</option>
  			<option value="week">Semana</option>
  			<option value="month">Mes</option>
  			<option value="year">Año</option>
			</select>
		</div>

	<div>
		Flujo neto {utils.formatEther(netflow)}
	</div>
	</div>



	<div class="treedee">
		<Button3D actionHandler={()=>handleCreateFlow()}>Crear flujo</Button3D>
	</div>
</section>

