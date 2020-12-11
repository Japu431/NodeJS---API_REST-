module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {

    res.send("Hello GET");
  });
    app.post("/atendimentos", (req, res) => { 
        console.log(req.body)
        res.send('Você está enviando um dado pelo POST')
        
    });
};
