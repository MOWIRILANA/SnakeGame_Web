const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const scoreDisplay = document.getElementById("score");
        const gameOverScreen = document.getElementById("gameOverScreen");
        const finalScore = document.getElementById("finalScore");
        
        const box = 20;
        let snake, direction, food, score, game;
        
        function initializeGame() {
            snake = [{x: 10 * box, y: 10 * box}];
            direction = "RIGHT";
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
            score = 0;
            scoreDisplay.textContent = "Score: " + score;
            gameOverScreen.style.display = "none";
            game = setInterval(drawGame, 100);
        }
        
        document.addEventListener("keydown", event => {
            if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
            if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
            if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
            if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        });
        
        function drawGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);
            
            ctx.fillStyle = "lime";
            snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));
            
            let head = {x: snake[0].x, y: snake[0].y};
            
            if (direction === "UP") head.y -= box;
            if (direction === "DOWN") head.y += box;
            if (direction === "LEFT") head.x -= box;
            if (direction === "RIGHT") head.x += box;
            
            if (head.x === food.x && head.y === food.y) {
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
                score++;
                scoreDisplay.textContent = "Score: " + score;
            } else {
                snake.pop();
            }
            
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
                snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                clearInterval(game);
                gameOver();
                return;
            }
            
            snake.unshift(head);
        }
        
        function gameOver() {
            finalScore.textContent = "Your Score: " + score;
            gameOverScreen.style.display = "flex";
        }
        
        function restartGame() {
            initializeGame();
        }
        
        function exitGame() {
            gameOverScreen.innerHTML = "<h2>Thank you for playing!</h2>";
        }
        
        initializeGame();