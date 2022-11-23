export default function (board) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        arr.push([i, j]);
      }
    }
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
