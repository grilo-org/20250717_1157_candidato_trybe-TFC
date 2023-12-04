import { ICRUDModel } from './CRUD';

export default interface InterfaceTeam {
  id: number,
  teamName: string,
}

export type InterfaceTeamModel = ICRUDModel<InterfaceTeam>;
