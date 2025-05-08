<script lang="ts">
import { Deck, type MapViewState } from "@deck.gl/core";
import { onMount } from "svelte";
import { createViewerState } from "./helpers/viewer-state.svelte";
import { getLandTileLayer } from "./layers/land-tile";
import { getRegionTileLayer } from "./layers/region-tile";
import { canvasStyle, mainColumnStyle } from "./styles";

let deckCanvas: HTMLCanvasElement;

const INITIAL_VIEW_STATE: MapViewState = {
	longitude: 18.382992,
	latitude: 45.404543,
	zoom: 3,
	minZoom: 0,
	maxZoom: 10,
};

const { data } = $props();
const { geoFeatures } = data;
const viewerState = createViewerState(geoFeatures);

const render = () => {
	new Deck({
		canvas: deckCanvas,
		initialViewState: INITIAL_VIEW_STATE,
		controller: true,
		layers: [
			getLandTileLayer(),
			getRegionTileLayer(viewerState.filteredGeoFeatures),
		],
	});
};

onMount(() => {
	render();
});
</script>

<svelte:head></svelte:head>

<main class={mainColumnStyle}>
	<canvas bind:this={deckCanvas} class={canvasStyle}></canvas>
</main>
