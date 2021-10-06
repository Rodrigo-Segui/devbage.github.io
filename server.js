const app = require('./app');

app.listen(`${process.env.PORT}`, function(){
	console.log(`Servidor on-line em http://${process.env.HOST}:${process.env.PORT} - para sair Ctrl+C.`);
});