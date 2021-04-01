let canvas = document.getElementById("snake"); //Para pegar o id do html
let context = canvas.getContext("2d"); //ele redenriza o desenho que vai acontecer dentro do canvas. Plano 2D.
let box = 32;//32px cada quadradinho.
let snake = [];
snake[0] = {
    x: 8 * box, //8 para ela ser exatamente no meio.
    y: 8 * box
}

let direction = "right";
let food = {//onde a comidinha vai aparecer, de forma randômica, sem ultrapassar a margem.
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    //O Math.floor sempre tira a parte flotoante, 0,1, por exemplo. E 16 para não ultrapassar a parte do canvas.
}

function criarBG() { //função de vai desenhar e definir o canvas
    context.fillStyle = "lightgreen";//trabalha com o estilo do nosso contexto.
    context.fillRect(0, 0, 16 * box, 16 * box);//vai desenhar onde vai acontecer o jogo. Com X e Y.
    //Vai ter a altura de 16 quadradinhos com o tamanho do box definido na variável.
}

function criarCobrinha() {
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event){ 
    //ela só muda se a direção anterior não for contrária
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    //Se por acaso a cabeça dela ultrapassar a margem da direita, ela já inicia em 0 lá na esquerda.
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    //Se por acaso a cabeça dela ultrapassar a margem da esquerda, ela já inicia em 15 lá na direita.
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    //Se por acaso a cabeça dela ultrapassar a margem da abaixo, ela já inicia em 15 lá em acima.
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    //Se por acaso a cabeça dela ultrapassar a margem da acima, ela já inicia em 15 lá na abaixo.
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //Para fazer a interrupção caso a cobrinha se choque
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){//quando os dois valores são verdadeiros.
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Se a pode ser convertido em true, então será retornado a, 
    //caso contrário, vai retornar b. Essa regra também se aplica a valores booleanos.
    // || é o ou lógico, pelo menos uma for verdadeira. 
    if(snakeX != food.x || snakeY != food.y){
    snake.pop();//retirar o último elemento.
    } else {food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);//sempre vai acrescentar uma à frente do elemento.
}

let jogo = setInterval(iniciarJogo, 100);//iniciarJogo a cada 100 milissegundos vai estar sendo renovado, isso para não travar.

