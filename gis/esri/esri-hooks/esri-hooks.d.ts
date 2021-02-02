import { Ref } from "vue";

export declare interface IEsriHooks {
  usePixelData (layer: __esri.ImageryLayer) : [Ref<boolean>, () => __esri.PixelData]
  useViewOn (name: 'blur', callBack: __esri.MapViewBlurEventHandler, view?: $View) : IEventHandler
  useViewOn (name: 'click', callBack: __esri.MapViewClickEventHandler, view?: $View) : IEventHandler
  useViewOn (name: 'drag', callBack: __esri.MapViewDragEventHandler, view?: $View) : IEventHandler
  useViewOn (name: 'mouse-wheel', callBack: __esri.MapViewMouseWheelEventHandler, view?: $View) : IEventHandler
  useViewOn (name: 'pointer-enter', callBack: __esri.MapViewPointerEnterEventHandler, view?: $View) : IEventHandler
  useViewOn (name: 'pointer-leave', callBack: __esri.MapViewPointerLeaveEventHandler, view?: $View) : IEventHandler
}

export declare const esriHooks : IEsriHooks 