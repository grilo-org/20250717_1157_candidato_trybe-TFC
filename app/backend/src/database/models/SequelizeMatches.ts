import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId' });
SequelizeMatches.belongsTo(SequelizeTeam, { as: 'homeTeam', foreignKey: 'homeTeamId' });
SequelizeMatches.belongsTo(SequelizeTeam, { as: 'awayTeam', foreignKey: 'awayTeamId' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Associação de equipe da casa
// SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });

// // Associação de equipe visitante
// SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

// // Associações de equipe para jogos em casa e jogos fora
// SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
// SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default SequelizeMatches;
