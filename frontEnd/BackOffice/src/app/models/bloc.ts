import { FoyerComponent } from "../foyer/foyer.component";
import { foyer } from "./foyer";

export interface bloc {
    idbloc?: number;
    capaciteBloc: number;
    nomBloc: string;
    foyer: foyer | null; 
  }