import { Ref } from 'vue';

export declare function usePixelData (layer: __esri.ImageryLayer) : [
  Ref<boolean>,
  () => __esri.PixelData
]