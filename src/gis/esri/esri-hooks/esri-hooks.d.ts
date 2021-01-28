import { Ref } from 'vue';
import { $View } from '../webmap/webmap';

export declare function usePixelData (layer: __esri.ImageryLayer) : [
  Ref<boolean>,
  () => __esri.PixelData
]
interface IEventHandler {
  remove () : void
}

export declare function useViewOn (name: 'blur', callBack: __esri.MapViewBlurEventHandler, view?: $View) : IEventHandler
export declare function useViewOn (name: 'click', callBack: __esri.MapViewClickEventHandler, view?: $View) : IEventHandler
export declare function useViewOn (name: 'drag', callBack: __esri.MapViewDragEventHandler, view?: $View) : IEventHandler
export declare function useViewOn (name: 'mouse-wheel', callBack: __esri.MapViewMouseWheelEventHandler, view?: $View) : IEventHandler
export declare function useViewOn (name: 'pointer-enter', callBack: __esri.MapViewPointerEnterEventHandler, view?: $View) : IEventHandler
export declare function useViewOn (name: 'pointer-leave', callBack: __esri.MapViewPointerLeaveEventHandler, view?: $View) : IEventHandler