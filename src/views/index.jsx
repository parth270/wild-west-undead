import SimpleScene from "../components/SimpleScene";
import { useDispatch } from "react-redux";
import { setAAppear, setLoadingSecond } from "../services/modeling";
import { useNavigate } from "react-router-dom";

const Linked = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  return (
    <div
      className="w-[100px] h-[40px] bg-[#c23d2c] absolute top-[10px] left-[10px] cowboy"
      style={{
        zIndex: 10000,
        width: "100px",
        height: "40px",
        backgroundColor: "#c23d2c",
        position: "absolute",
        top: 10,
        left: 10,
        textTransform: "uppercase",
        letterSpacing: "1px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "15px",
        lineHeight: "19px",
        borderRadius: "3px",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(setAAppear(true));
        dispatch(setLoadingSecond(true));
        setTimeout(() => {
          router("/blackjack")
        },1700);
      }}
    >
      <span
        style={{
          transform: "translateY(1.5px)",
        }}
      >
        blackjack
      </span>
    </div>
  );
};


export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-[100%] flex-col items-center justify-center p-6 `}
    >
      <Linked />
      <div className="w-full h-[50vh] md:w-[75vw] md:h-[75vh] xl:w-[60vw] xl:h-[60vh] overflow-hidden">
        <SimpleScene />
      </div>
    </main>
  );
}
