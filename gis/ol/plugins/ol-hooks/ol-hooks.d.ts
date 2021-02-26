import { Ref } from "vue";
import { WebMapPlugin } from "../../web-map/web-map";

export declare interface IBasemapHooks {
  useSelector (key?: string) : [Ref<string>, (key: string) => void]
  useList () : string[]
  useVisible (visible?: boolean) : [Ref<string>, (v: boolean) => void]
}

export declare interface IMarkToolHooks {
  useEnabled () : Ref<boolean>
  useClear () : void
  useMarkType () : [Ref<boolean>, string[]]
}

export declare class OlHooks extends WebMapPlugin {
  useBasemap () : IBasemapHooks
  useMapTools (toolKeys: string[]) : [Ref<string>, string[]]
  useMarkTool () : IMarkToolHooks
}