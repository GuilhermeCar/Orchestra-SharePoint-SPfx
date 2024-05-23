import * as React from 'react';
import './Orchestra.module.scss';
import type { IOrchestraProps } from './IOrchestraProps';
import { SPFI, spfi } from '@pnp/sp/fi';
import { getSP } from '../pnpJsConfig';
import { Caching } from "@pnp/queryable";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";

export default class Orchestra extends React.Component<IOrchestraProps, { instruments:[] }> {

  private _sp:SPFI;
  
  constructor(props:IOrchestraProps) {
    super(props);
    this._sp = getSP();
    this.state = { instruments: [] };
  }

  public componentDidMount(): void {
    this.getInstruments();  
  }

  private async getInstruments():Promise<void> {
    const spChace = spfi(this._sp).using(Caching({ store: "session" }));
    const responseInstruments:any = await spChace.web.lists
      .getByTitle("Instruments")
      .items
      .select("Id","Title")<Array<{ Id:number, Title:string }>>;
    
    const instruments = responseInstruments.map((instrument:{ Id:number, Title:string }) => {
      return {
        id: instrument.Id,
        title: instrument.Title
      }
    });

    this.setState({ instruments: instruments });
  }
  
  public render(): React.ReactElement<IOrchestraProps> {

    return (
      <section>
        {
          this.state.instruments.map((instrument:any) => {
            return <div key={instrument.id}>{instrument.title}</div>
          })
        }
      </section>
    );
  }
}
