// ----- LOGIN & REGISTER -----
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (loginBtn) {
      loginBtn.addEventListener("click", async () => {
          const username = document.getElementById("loginUsername").value;
          const password = document.getElementById("loginPassword").value;
          alert(`Logged in as ${username} (demo only)`);
          window.location.href = "game.html";
      });
  }

  if (registerBtn) {
      registerBtn.addEventListener("click", async () => {
          const username = document.getElementById("registerUsername").value;
          const password = document.getElementById("registerPassword").value;
          alert(`Registered as ${username} (demo only)`);
      });
  }

  // ----- GAME -----
  if (document.getElementById("wordInput")) {
      let score = 0;
      let lives = 3;
      const scoreEl = document.getElementById("score");
      const livesEl = document.getElementById("lives");
      const fallingWords = document.getElementById("falling-words");
      const wordInput = document.getElementById("wordInput");

      document.getElementById("gameMode").textContent = "Easy";
      document.getElementById("gameLevel").textContent = "1";

      function createWord() {
          const word = document.createElement("div");
          word.classList.add("word");
          word.textContent = ["cat", "dog", "car", "bus", "tree"][Math.floor(Math.random() * 5)];
          word.style.left = Math.random() * (fallingWords.offsetWidth - 50) + "px";
          fallingWords.appendChild(word);

          let topPos = 0;
          const fallInterval = setInterval(() => {
              topPos += 2;
              word.style.top = topPos + "px";
              if (topPos > fallingWords.offsetHeight) {
                  clearInterval(fallInterval);
                  word.remove();
                  loseLife();
              }
          }, 50);
      }

      function loseLife() {
          lives--;
          livesEl.textContent = lives;
          if (lives <= 0) {
              alert("Game Over! Final Score: " + score);
              window.location.href = "leaderboard.html";
          }
      }

      setInterval(createWord, 2000);

      wordInput.addEventListener("input", () => {
          const words = document.querySelectorAll(".word");
          words.forEach(w => {
              if (w.textContent === wordInput.value.trim()) {
                  score++;
                  scoreEl.textContent = score;
                  w.remove();
                  wordInput.value = "";
              }
          });
      });
  }

  // ----- LEADERBOARD -----
  if(document.getElementById("leaderboardTable"))
  {
      const tbody = document.querySelector("#leaderboardTable tbody");
      const demoData = [
          { username: "Player1", score: 15 },
          { username: "Player2", score: 12 },
          { username: "Player3", score: 8 }
      ];
      demoData.forEach((player, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `<td>${index + 1}</td><td>${player.username}</td><td>${player.score}</td>`;
          tbody.appendChild(row);
      });
  }
});
