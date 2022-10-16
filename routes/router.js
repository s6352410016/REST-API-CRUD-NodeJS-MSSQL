const router = require('express').Router();
const pool = require('../config/db');
const sql = require('mssql');

router.get('/getemployee' , async (req , res) => {
    try{
        const data = await pool.request().query('SELECT * FROM employees');
        res.status(200).json({data: data.recordsets[0]});
    }catch(err){
        console.log(err);
        res.status(500);
    }
});

router.post('/addemployee' , async (req , res) => {
    try{
        const {empName , empAddress , empTel , empSalary} = req.body;
        const saveData = await pool.request().input('empName' , sql.VarChar , empName)
        .input('empAddress' , sql.VarChar , empAddress)
        .input('empTel' , sql.VarChar , empTel)
        .input('empSalary' , sql.VarChar , empSalary)
        .query('INSERT INTO employees (empName , empAddress , empTel , empSalary) VALUES(@empName , @empAddress , @empTel , @empSalary)');
        res.status(201).json({msg: saveData});
    }catch(err){
        console.log(err);
        res.status(500);
    }
});

router.put('/updateemployee/:id' , async (req , res) => {
    try{
        const {empName , empAddress , empTel , empSalary} = req.body;
        const {id} = req.params;
        const updateData = await pool.request().input('empName' , sql.VarChar , empName)
        .input('empAddress' , sql.VarChar , empAddress)
        .input('empTel' , sql.VarChar , empTel)
        .input('empSalary', sql.VarChar , empSalary)
        .input('id' , sql.Int , id)
        .query('UPDATE employees SET empName = @empName , empAddress = @empAddress , empTel = @empTel , empSalary = @empSalary WHERE id = @id'); 
        res.status(200).json({msg: updateData});
    }catch(err){
        console.log(err);
        res.status(500);
    }
});

router.delete('/deleteemployee/:id' , async (req , res) => {
    try{
        const {id} = req.params;
        const deleteData = await pool.request().input('id' , id).query('DELETE FROM employees WHERE id = @id');
        res.status(200).json({msg: deleteData});
    }catch(err){
        console.log(err);
        res.status(500)
    }
});

module.exports = router;