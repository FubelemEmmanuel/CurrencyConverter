import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
const Apitoken = '8ea47d508af63be2d564e3b5';
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',async(req,res)=>
{
    res.render('index.ejs');
});


app.post('/exchange',async(req,res)=>
   

    {
        const base = req.body.from;
        const To = req.body.to;
        const amount = req.body.amount;
       
        try{
        const results = await axios.get(`https://v6.exchangerate-api.com/v6/${Apitoken}/latest/${base}`);
        const exchange_rate = results.data.conversion_rates[To];
        const exchangeAmount = exchange_rate*amount;
    
        res.render('index.ejs',{
            amount:exchangeAmount,
        });
    }
    catch(error)
    {
        console.error('Error fetching exchange rates:', error.message);
        res.status(500).send('Error fetching exchange rates');
    }
    
    })



app.listen(port, ()=>
{
    console.log(`app running on port ${port}`);
});