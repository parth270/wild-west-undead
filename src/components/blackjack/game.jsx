import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Card } from "../entities/card";
import { pallate } from "../../constants/colors";

const DealerHand = ({
  winner,
  canPlay,
  dealerPlay,
  dealerSum,
  hiddenScore,
  dealerDeck,
}) => {
  return (
    <div className="w-[48%] h-[300px] flex items-center justify-center flex-col">
      {/* {!canPlay ? dealerSum : hiddenScore.pop()?.value} */}
      <p
        className="cowboy uppercase text-[30px] tracking-[3px]"
        style={{
          color: pallate[6],
        }}
      >
        Dealer: {dealerSum}
      </p>
      <div
        id="dealerHand"
        className="flex justify-center  relative scale-[0.8] flex-wrap w-[300px]"
      >
        {dealerDeck.map((card, index) => {
          if (canPlay) {
            const hidden = index == 0 && " -rotate-6 -mt-3";
            return (
              <div
                key={index}
                className={`flex justify-center items-center text-4xl text-[#6D5C5C]  bg-cover w-24 h-36 -ml-6 ${hidden}`}
                // style={{
                //   backgroundImage:
                //     index == 0 ? "url('/cardBack.png')" : "url('/card.png')",
                // }}
              >
                <img
                  src={index === 0 ? "/cardBack.png" : "/card.png"}
                  alt=""
                  className="absolute w-[100%] h-[100%]"
                  style={{
                    zIndex: 0,
                  }}
                />
                <span
                  className=""
                  style={{
                    zIndex: 1,
                  }}
                >
                  {index != 0 ? card.figure : ""}
                </span>
              </div>
            );
          } else {
            const sendToAbove =
              index > 2 ? `absolute left-${index > 3 ? 12 : 6} top-28` : "";
            const animateNewCard = index > 1 ? "animate-getCard" : "";
            return (
              <div
                key={index}
                className={`flex justify-center  items-center text-4xl text-[#6D5C5C] bg-cover w-24 h-36 -ml-6 ${animateNewCard} ${sendToAbove}`}
              
              >
                <img
                  src="/card.png"
                  className="w-[100%] h-[100%] absolute"
                  style={{
                    zIndex: 0,
                  }}
                  alt=""
                />
                <span
                  style={{
                    zIndex: 1,
                  }}
                >
                  {card.figure}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const YourHand = ({
  winner,
  canPlay,
  yourPlay,
  hiddenScore,
  yourDeck,
  yourSum,
}) => {
  return (
    <div className="w-[48%] h-[300px] flex items-center justify-center flex-col">
      <p
        className="cowboy uppercase text-[30px] tracking-[3px] "
        style={{
          color: pallate[6],
        }}
      >
        You: {yourSum}
      </p>
      <div
        id="playerHand"
        className="flex justify-center  relative scale-[0.7] flex-wrap w-[350px]"
      >
        {yourDeck.map((card, index) => {
          const sendToAbove =
            index > 2 ? `absolute sendToAbove -bottom-32` : "";
          return (
            <div
              key={index}
              className={`flex justify-center items-center text-6xl text-[#6D5C5C]  bg-cover w-32 h-48 -ml-6 animate-getCard -rotate-2 ${sendToAbove}`}
            >
              <img
                src="/card.png"
                className="absolute w-[100%] h-[100%]"
                style={{
                  zIndex: 0,
                }}
                alt=""
              />
              <span
                style={{
                  zIndex: 1,
                }}
              >
                {card.figure}
              </span>
            </div>
          );
        })}
        {/* {yourSum > 21 ? (
          <h1 className="text-red-500 text-4xl absolute top-0 z-50 animate-getAlert">
            exceeded
          </h1>
        ) : null}
        {winner != "" ? (
          <h1 className="text-primary text-4xl absolute -top-10  z-50 animate-getAlertWinner">
            {winner} {winner == "tie" ? "" : "win"}{" "}
            {winner == "you" ? ":)" : ":("}
          </h1>
        ) : null} */}
      </div>

    </div>
  );
};

function Game() {
  // if the player has not made the first move, the counter should not work
  const [gameStarted, setGameStarted] = useState(false);

  // players deck
  const [dealerDeck, setDealerDeck] = useState([]);
  const [yourDeck, setYourDeck] = useState([]);

  // players sum
  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);

  // timer for move
  const [seconds, setSeconds] = useState(0);
  console.log(seconds);
  // mostrar/ esconder o timer no html
  const [stopLoading, setStopLoading] = useState(true);
  // timeoutFunction
  var timer;

  // user can play
  const [canPlay, setCanPlay] = useState(true);

  // clonar o deck para nao mostrar a carta virada
  const cloneDeck = [...dealerDeck];
  const hiddenScore = cloneDeck;

  // define a winner
  const [winner, setWinner] = useState(">");

  // start game / deal cards
  useEffect(() => {
    if (dealerDeck.length < 2 && yourDeck.length < 2) {
      setDealerSum(buildDeck(dealerDeck));
      setYourSum(buildDeck(yourDeck));
    }
  }, [winner]);

  // verifica se o dealer ainda possui movimentos
  if (!canPlay && winner == "") {
    setTimeout(() => {
      dealerPlay();
    }, 1000);
  }

  // timer para caso o jogador demore 6 segundos para jogar
  useEffect(() => {
    if (canPlay && gameStarted) {
      timer = setInterval(() => {
        setSeconds(seconds + 0.01);
      }, 10);

      setStopLoading(true);
      if (seconds >= 6) {
        clearInterval(timer);
        setStopLoading(false);

        setCanPlay(false);
        setTimeout(() => {
          dealerPlay();
        }, 1000);
      }

      if (yourSum >= 21) {
        setStopLoading(false);
        setSeconds(10);
      }
      return () => clearInterval(timer);
    }
  }, [seconds, gameStarted]);

  // caso o jogador decida nao comprar cartas
  const stay = () => {
    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);

      setCanPlay(false);
      setStopLoading(false);
    } else {
      console.log("you cant play");
    }
  };

  // pedir carta caso consiga jogar
  const hit = () => {
    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);

      gameStarted ? null : setGameStarted(true);

      if (yourSum < 21) {
        const card = new Card();
        const newDeck = yourDeck;
        const newSum = yourSum + card.value;
        newDeck.push(card);

        setYourSum(newSum);
        setYourDeck(newDeck);

        setSeconds(0);
        setStopLoading(false);
      }
    } else {
      console.log("you cant play");
    }
  };

  // jogada do dealer
  function dealerPlay() {
    if (yourSum === 21 && dealerSum < 21) {
      dealerHit() ? "" : setWinner("you");
    } else if (dealerSum === 21 && yourSum < 21) {
      setWinner("dealer");
    } else if ((dealerSum === 21 && yourSum === 21) || yourSum === dealerSum) {
      dealerHit() ? "" : setWinner("tie");
    } else if (dealerSum > 21 && yourSum < dealerSum) {
      setWinner("you");
    } else if (yourSum > 21 && dealerSum < yourSum) {
      setWinner("dealer");
    } else if (dealerSum < yourSum) {
      dealerHit() ? "" : setWinner("you");
    } else if (yourSum < dealerSum) {
      setWinner("dealer");
    }
  }

  // formar baralho inicial
  function buildDeck(deck) {
    let sum = 0;

    for (let index = 0; index < 2; index++) {
      const card = new Card();
      sum = sum + card.value;
      deck.push(card);
    }
    return sum;
  }

  // pedir carta para o dealer
  function dealerHit() {
    if (dealerSum < 16) {
      const card = new Card();
      const newDeck = dealerDeck;
      const newSum = dealerSum + card.value;
      newDeck.push(card);

      setDealerSum(newSum);
      setDealerDeck(newDeck);

      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      className="w-[100%] min-h-[100vh] overflow-y-auto  flex items-center flex-col"
      style={{
        // backgroundColor:"#d4d2c9",
        // backgroundColor: pallate[0],
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="w-[100%] pt-[60px]">
        <h1
          className="cowboy uppercase text-[80px] tracking-[2px] text-center"
          style={{
            color: pallate[6],
          }}
        >
          Blackjack
        </h1>
        <div className="flex px-[15%] justify-between mt-[40px] md:flex-col lg:justify-center">
          {/* <p
            className="cowboy uppercase text-[30px] tracking-[3px] "
            style={{
              color: pallate[6],
            }}
          >
            You: {yourSum}
          </p> */}

          <p
            className="cowboy uppercase text-[30px] tracking-[3px] flex items-center "
            style={{
              color: winner === "dealer" ? pallate[5] : pallate[6],
            }}
          >
            Winner: {winner === ">" ? "-" : winner}{" "}
            {winner === "you" && (
              <img
                src="/approved.svg"
                className="inline w-[32px] h-[32px] ml-[10px] translate-y-[-1.5px]"
                alt=""
              />
            )}
          </p>

          {/* <p
            className="cowboy uppercase text-[30px] tracking-[3px]"
            style={{
              color: pallate[6],
            }}
          >
            Dealer: {dealerSum}
          </p> */}
        </div>
      </div>
      <div className="w-[100%] flex px-[10%] md:h-[600px] h-[300px] shrink-0 md:flex-col  md:mt-[50px] md:items-center">
        {/* your hand */}
        <YourHand
          winner={winner}
          canPlay={canPlay}
          dealerSum={dealerSum}
          hiddenScore={hiddenScore}
          dealerDeck={dealerDeck}
          yourSum={yourSum}
          yourDeck={yourDeck}
        />
        {/* dealer hand */}
        <DealerHand
          winner={winner}
          canPlay={canPlay}
          dealerSum={dealerSum}
          hiddenScore={hiddenScore}
          dealerDeck={dealerDeck}
        />
      </div>
      {/* Game Controls */}
      <div className="shrink-0 mt-[60px] mb-[40px] md:w-[90%]">
        <div className="w-full h-[6px] rounded-full bg-shadow mb-4 relative overflow-hidden">
          {stopLoading && yourDeck.length > 2 ? (
            <div
              className="bg-primary h-[100%]"
              style={{
                backgroundColor: "#373948",
                width: `${((seconds * 10) / 60) * 100}%`,
              }}
            ></div>
          ) : (
            ""
          )}
        </div>

        {winner != "" ? (
          <div>
            <button
              onClick={() => {
                setDealerDeck([]);
                setYourDeck([]);
                setDealerSum(0);
                setYourSum(0);
                setCanPlay(true);
                setWinner("");
              }}
              className="text-[42px] w-[500px] md:w-[100%] cowboy uppercase tracking-[2px] h-[90px] rounded-md bg-primary text-bg"
              style={{
                backgroundColor: pallate[6],
              }}
            >
              <span className="translate-y-[2px]">Play again</span>
            </button>{" "}
            <br />
          </div>
        ) : (
          <div className="flex md:flex-col  md:h-[200px] justify-between">
            <button
              onClick={hit}
              style={{
                backgroundColor: pallate[6],
              }}
              className={`text-[40px] md:w-[100%] w-[240px] h-[90px] rounded-md uppercase cowboy tracking-[2px] ${
                canPlay && yourSum < 21
                  ? "bg-primary text-bg"
                  : "bg-shadow text-secondary"
              } transition-colors duration-300`}
            >
              hit
            </button>
            <button
              onClick={stay}
              style={{
                backgroundColor: "#444",
              }}
              className={`text-[40px] md:w-[100%] w-[240px] h-[90px] uppercase cowboy tracking-[2px] ${
                canPlay && yourSum <= 21
                  ? "bg-b-secondary text-bg"
                  : "bg-shadow text-secondary"
              } transition-colors rounded-md lg:ml-4`}
            >
              stay
            </button>
          </div>
        )}
        {/* <Link className="text-2xl text-secondary underline mt-8" to={"/help"}>
          how to play
        </Link> */}
      </div>
    </div>
  );
}

export default Game;
