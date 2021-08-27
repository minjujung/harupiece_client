import gray from "../assets/images/level/gray.svg";
import yellow from "../assets/images/level/yellow.svg";
import orange from "../assets/images/level/orange.svg";
import red from "../assets/images/level/red.svg";
import pink from "../assets/images/level/pink.svg";
import dark_gray from "../assets/images/level/dark_gray.svg";
import purple from "../assets/images/level/purple.svg";
import navy from "../assets/images/level/navy.svg";
import blue from "../assets/images/level/blue.svg";
import green from "../assets/images/level/green.svg";

import piece_gray from "../assets/images/pieces/piece_separated_gray.svg";
import piece_yellow from "../assets/images/pieces/piece_separated_yellow.svg";
import piece_orange from "../assets/images/pieces/piece_separated_orange.svg";
import piece_red from "../assets/images/pieces/piece_separated_red.svg";
import piece_pink from "../assets/images/pieces/piece_separated_pink.svg";
import piece_dark_gray from "../assets/images/pieces/piece_separated_dark_gray.svg";
import piece_purple from "../assets/images/pieces/piece_separated_purple.svg";
import piece_navy from "../assets/images/pieces/piece_separated_navy.svg";
import piece_blue from "../assets/images/pieces/piece_separated_blue.svg";
import piece_green from "../assets/images/pieces/piece_separated_green.svg";

const levelData = [
  {
    name: "회색 하루",
    img: gray,
    piece: piece_gray,
    point: 100,
    level: "GRAY",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/gray.svg",
  },
  {
    name: "노랑 하루",
    img: yellow,
    piece: piece_yellow,
    point: 200,
    level: "YELLOW",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/yellow.svg",
  },
  {
    name: "주황 하루",
    img: orange,
    piece: piece_orange,
    point: 300,
    level: "ORANGE",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/orange.svg",
  },
  {
    name: "빨강 하루",
    img: red,
    piece: piece_red,
    point: 400,
    level: "RED",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/red.svg",
  },
  {
    name: "분홍 하루",
    img: pink,
    piece: piece_pink,
    point: 500,
    level: "PINK",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/pink.svg",
  },
  {
    name: "진회색 하루",
    img: dark_gray,
    piece: piece_dark_gray,
    point: 600,
    level: "DARKGRAY",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/dark_gray.svg",
  },
  {
    name: "보라 하루",
    img: purple,
    piece: piece_purple,
    point: 700,
    level: "PURPLE",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/purple.svg",
  },
  {
    name: "남색 하루",
    img: navy,
    piece: piece_navy,
    point: 800,
    level: "NAVY",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/navy.svg",
  },
  {
    name: "파랑 하루",
    img: blue,
    piece: piece_blue,
    point: 900,
    level: "BLUE",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/blue.svg",
  },
  {
    name: "초록 하루",
    img: green,
    piece: piece_green,
    point: 1000,
    level: "GREEN",
    imageUrl:
      "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/green.svg",
  },
];

export default levelData;
