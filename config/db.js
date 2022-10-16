const sql = require('mssql');

const config = {
    user: 'sa',
    password: '5087',
    server: 'DESKTOP-ORDKDQR',
    database: 'REST_API_CRUD',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
}

const pool = sql.connect(config , (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Connecting to database...');
    }    
});

module.exports = pool;