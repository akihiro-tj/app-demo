<script lang="ts">
import Header from "@/components/header/header.svelte";
import { Deck } from "@deck.gl/core";
import { Funnel, X } from "@lucide/svelte";
import { onMount } from "svelte";
import type { ChangeEventHandler } from "svelte/elements";
import {
	CursorState,
	GEO_FEATURE_CATEGORY_NAMES,
	GeoFeatureCategory,
	INITIAL_VIEW_STATE,
	SITE_NAME,
	SITE_ORIGIN,
} from "./constants";
import { useViewerState } from "./hooks/use-viewer-state.svelte";
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
} from "./page.styles";

let deckCanvas: HTMLCanvasElement;
let deck: Deck | undefined;

const viewerState = useViewerState();

const render = () => {
	deck = new Deck({
		canvas: deckCanvas,
		initialViewState: INITIAL_VIEW_STATE,
		controller: true,
		layers: viewerState.layers,
		getCursor: (state): CursorState => {
			if (state.isDragging) {
				return CursorState.GRABBING;
			}
			if (state.isHovering) {
				return CursorState.POINTER;
			}
			return CursorState.GRAB;
		},
	});
};

onMount(() => {
	render();
});

$effect(() => {
	if (deck) {
		deck.setProps({ layers: viewerState.layers });
	}
});

const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
	const target = e.currentTarget;
	const category = target.getAttribute("data-id") as GeoFeatureCategory;
	viewerState.updateFilter(category, target.checked);
};
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta property="og:title" content={SITE_NAME} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={SITE_ORIGIN} />
  <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
  <meta property="og:description" content="" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<Header />
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

  <div class={sidePanelStyle({ visible: viewerState.selectedGeoFeatureId !== null })}>
    <div class={sidePanelCloseButtonContainerStyle}>
      <button class={sidePanelCloseButtonStyle} onclick={viewerState.unselectGeoFeature}>
        <X size="100%" />
      </button>
    </div>
    <div class={infoPanelHeadingContainerStyle}>
      <h3 class={infoPanelHeadingStyle}>{viewerState.selectedGeoFeatureId}</h3>
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
