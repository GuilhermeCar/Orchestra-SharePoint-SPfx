import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { SPFI, SPFx, spfi } from "@pnp/sp";

var _sp:SPFI;

export const getSP = (context?:WebPartContext): SPFI => {
    if(_sp === null && context != null){
        _sp = spfi()
        .using(SPFx(context))
        .using(PnPLogging(LogLevel.Warning))
    }
    return _sp;
}