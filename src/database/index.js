import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('app-db', 'user', 'pass',{
    dialect: 'sqlite',
    host: '.dev.sqlite',
    logging: false,
    define: {
        timestamps: false
    } 
});

export default sequelize;