import { Ref } from "vue";
import { WebMapPlugin } from "../../web-map/web-map";

export declare interface IBasemapHooks {
  useSelector (key?: string) : [Ref<string>, (key: string) => void]
  useList () : string[]
  useVisible (visible?: boolean) : [Ref<string>, (v: boolean) => void]
}

export declare class OlHooks extends WebMapPlugin {
  useBasemap () : IBasemapHooks
}