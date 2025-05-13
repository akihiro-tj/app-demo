<script lang="ts">
import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { Deck, type MapViewState } from "@deck.gl/core";
import { Funnel, X } from "@lucide/svelte";
import { onMount } from "svelte";
import type { ChangeEventHandler } from "svelte/elements";
import { createViewerState } from "./helpers/viewer-state.svelte";
import { getIslandTileLayer } from "./layers/island-tile";
import { getLandTileLayer } from "./layers/land-tile";
import { getMountainTileLayer } from "./layers/mountain-tile";
import {
	canvasStyle,
	filterContainerStyle,
	filterGroupContainerStyle,
	filterGroupHeadingContainerStyle,
	filterGroupHeadingStyle,
	filterInputStyle,
	filterLabelStyle,
	filterPanelOpenButtonStyle,
	infoPanelHeadingContainerStyle,
	infoPanelHeadingStyle,
	mainColumnStyle,
	sidePanelCloseButtonContainerStyle,
	sidePanelCloseButtonStyle,
	sidePanelStyle,
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
	const mountainTileLayer = getMountainTileLayer(viewerState.selectGeoFeature);
	const islandTileLayer = getIslandTileLayer(viewerState.selectGeoFeature);
	deck = new Deck({
		canvas: deckCanvas,
		initialViewState: INITIAL_VIEW_STATE,
		controller: true,
		layers: [landTileLayer, mountainTileLayer, islandTileLayer],
		getCursor: (state) => {
			if (state.isHovering) {
				return "pointer";
			}
			if (state.isDragging) {
				return "grabbing";
			}
			return "grab";
		},
	});
};

onMount(() => {
	render();
});

const updateLayers = (category: GeoFeatureCategory) => {
	const isVisible = viewerState.filter[category];
	let layers = deck.props.layers.filter(
		// TODO: Resolve type error
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(layer: any) => layer.id !== `${category}-tile-layer`,
	);
	if (isVisible) {
		switch (category) {
			case GeoFeatureCategory.MOUNTAIN:
				layers = [
					...layers,
					getMountainTileLayer(viewerState.selectGeoFeature),
				];
				break;
			case GeoFeatureCategory.ISLAND:
				layers = [...layers, getIslandTileLayer(viewerState.selectGeoFeature)];
				break;
		}
	}
	deck.setProps({ layers });
};

const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
	const target = e.currentTarget;
	const category = target.getAttribute("data-id") as GeoFeatureCategory;
	viewerState.updateFilter(category, target.checked);
	updateLayers(category);
};
</script>

<svelte:head></svelte:head>

<main class={mainColumnStyle}>
	<canvas bind:this={deckCanvas} class={canvasStyle}></canvas>

  <div class={sidePanelStyle({ visible: viewerState.isFilterPanelVisible })}>
    <div class={sidePanelCloseButtonContainerStyle}>
      <button class={sidePanelCloseButtonStyle} onclick={viewerState.hideFilterPanel}>
        <X size="100%" />
      </button>
    </div>
    {#each viewerState.filterGroups as filterGroup}
      <div class={filterGroupContainerStyle}>
        <div class={filterGroupHeadingContainerStyle}>
          <h3 class={filterGroupHeadingStyle}>{filterGroup.label}</h3>
        </div>
        <div class={filterContainerStyle}>
          {#each Object.entries(filterGroup.filter) as [category, isVisible]}
            <label class={filterLabelStyle}>
              <input
                class={filterInputStyle}
                data-id={category}
                type="checkbox"
                checked={isVisible}
                onchange={handleFilterChange}
            />
              {GEO_FEATURE_CATEGORY_NAMES[category as GeoFeatureCategory]}
            </label>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class={sidePanelStyle({ visible: viewerState.selectedGeoFeature !== null })}>
    <div class={sidePanelCloseButtonContainerStyle}>
      <button class={sidePanelCloseButtonStyle} onclick={viewerState.unselectGeoFeature}>
        <X size="100%" />
      </button>
    </div>
    <div class={infoPanelHeadingContainerStyle}>
      <h3 class={infoPanelHeadingStyle}>{viewerState.selectedGeoFeature?.name}</h3>
    </div>
  </div>

  {#if !viewerState.isFilterPanelVisible}
    <button
      class={filterPanelOpenButtonStyle}
      onclick={viewerState.showFilterPanel}
    >
      <Funnel size={24} />
    </button>
  {/if}
</main>
