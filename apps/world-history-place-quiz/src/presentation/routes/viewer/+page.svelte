<script lang="ts">
import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { Deck, Layer, type MapViewState } from "@deck.gl/core";
import { Funnel, X } from "@lucide/svelte";
import { onMount } from "svelte";
import type { ChangeEventHandler } from "svelte/elements";
import { createViewerState } from "./helpers/viewer-state.svelte";
import { getLandTileLayer } from "./layers/land-tile";
import { getRegionTileLayer } from "./layers/region-tile";
import {
	canvasStyle,
	filterContainerStyle,
	filterCloseButtonContainerStyle,
	filterCloseButtonStyle,
	filterOpenButtonStyle,
	mainColumnStyle,
} from "./styles";

const INITIAL_VIEW_STATE: MapViewState = {
	longitude: 18.382992,
	latitude: 45.404543,
	zoom: 3,
	minZoom: 0,
	maxZoom: 10,
};

const GEO_FEATURE_CATEGORY_NAMES: Record<GeoFeatureCategory, string> = {
	[GeoFeatureCategory.MOUNTAIN]: "山脈",
	[GeoFeatureCategory.ISLAND]: "島",
};

let deckCanvas: HTMLCanvasElement;
let deck: Deck;

const { data } = $props();
const { geoFeatures } = data;
const viewerState = createViewerState(geoFeatures);

const render = () => {
	const landTileLayer = getLandTileLayer();
	const mountainTileLayer = getRegionTileLayer(
		GeoFeatureCategory.MOUNTAIN,
		viewerState.geoFeaturesByCategory[GeoFeatureCategory.MOUNTAIN],
	);
	const islandTileLayer = getRegionTileLayer(
		GeoFeatureCategory.ISLAND,
		viewerState.geoFeaturesByCategory[GeoFeatureCategory.ISLAND],
	);
	deck = new Deck({
		canvas: deckCanvas,
		initialViewState: INITIAL_VIEW_STATE,
		controller: true,
		layers: [landTileLayer, mountainTileLayer, islandTileLayer],
	});
};

onMount(() => {
	render();
});

const updateLayers = (category: GeoFeatureCategory, isVisible: boolean) => {
	// TODO: Resolve type error
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let layers = deck.props.layers.filter((layer: any) => layer.id !== category);
	if (isVisible) {
		let newLayer: Layer;
		switch (category) {
			case GeoFeatureCategory.MOUNTAIN:
			case GeoFeatureCategory.ISLAND:
				newLayer = getRegionTileLayer(
					category,
					viewerState.geoFeaturesByCategory[category],
				);
				break;
		}
		layers = [...layers, newLayer];
	}
	deck.setProps({ layers });
};

const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
	const target = e.currentTarget;
	const category = target.getAttribute("data-id") as GeoFeatureCategory;
	const isVisible = target.checked;
	viewerState.updateFilter(category, isVisible);
	updateLayers(category, isVisible);
};
</script>

<svelte:head></svelte:head>

<main class={mainColumnStyle}>
	<canvas bind:this={deckCanvas} class={canvasStyle}></canvas>
  <div class={filterContainerStyle({ visible: viewerState.isFilterContainerVisible })}>
    <div class={filterCloseButtonContainerStyle}>
      <button class={filterCloseButtonStyle} onclick={viewerState.hideFilterContainer}>
        <X size="100%" />
      </button>
    </div>
    {#each viewerState.filterGroups as filterGroup}
      <div>
        <h3>{filterGroup.label}</h3>
        {#each Object.entries(filterGroup.filter) as [category, isVisible]}
          <label>
            <input
              data-id={category}
              type="checkbox"
              checked={isVisible}
              onchange={handleFilterChange}
          />
          {GEO_FEATURE_CATEGORY_NAMES[category as GeoFeatureCategory]}
        </label>
        {/each}
      </div>
    {/each}
  </div>
  {#if !viewerState.isFilterContainerVisible}
    <button
      class={filterOpenButtonStyle}
      onclick={viewerState.showFilterContainer}
    >
      <Funnel size="100%" />
    </button>
  {/if}
</main>
