const express = require('express');
const app = express();
const port=3010;
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let emplist=[];


app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.get('/add',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','add.html'))
})

app.get('/view',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','view.html'))
    
})

app.get('/update',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','update.html'))
})


app.get('/search',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','search.html'))
})


app.post('/add',(req,res)=>
{
    var{id,name,role}=req.body;
    id=parseInt(id)
    const newemp={id,name,role};
    emplist.push(newemp);
    console.log(emplist);
    console.log('added')
    res.redirect('/view')

})

app.get('/view/data',(req,res)=>{
    res.json(emplist)
})

app.get('/update/:id',(req,res)=>
{
 const eid=req.params.id;
 const details=emplist.find(emp=>emp.id==parseInt(eid));
//  console.log(eid);
 if(!details){
    return res.status(404).json({error:'task not found'});
 }

    console.log("updation id:")
    console.log(eid);
    res.sendFile(path.join(__dirname,'public','update.html'))
    
})

app.post('/update/data/:id',(req,res)=>
{
    let {id,name,role}=req.body;
    id=parseInt(id)
    const update={id,name,role}
    const reqid=req.params.id;
    let details = emplist.findIndex(emp => emp.id === parseInt(reqid));
    // 
    
    if (details !== -1) {
        emplist[details] = { ...emplist[details], ...update };
    }
    res.redirect('/view')

})


app.get('/search/:id',(req,res)=>
{
    const id=req.params.id;
    const details=emplist.find(emp=>emp.id==parseInt(id));
    // console.log(id);
    if(!details){
        return res.status(404).json({error:'task not found'});
    }
    // console.log(details)
    res.sendFile(path.join(__dirname,'public','search.html'))

})






app.get('/search/data/:id', (req, res) => {
    const id = req.params.id;
    //console.log(`Received ID: ${id}`);
    //console.log(emplist);
    
    const details = emplist.find(emp => emp.id === parseInt(id)); // Ensure the types match
    console.log("search details:")
    console.log(details);

    res.json(details);
});


app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log('Before deletion:', emplist);
    
    emplist = emplist.filter(emp => emp.id !==parseInt( id));

    console.log('After deletion:', emplist);
    res.redirect('/view');
});




app.listen(port,()=>
{
    console.log("service running on port "+port);
})