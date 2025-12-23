import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ResultScreen } from "./components/ResultScreen";

export type Department =
  | "홍보미디어부"
  | "학생복지부"
  | "체육부"
  | "학습문화부"
  | "환경디자인부"
  | "행사활동부";

export interface Answer {
  detail: string;
  point: number;
}

export interface Question {
  id: number;
  text: string;
  department: Department;
  type: "scale" | "choice"; // 척도형 vs 선택형
  answers?: Answer[]; // 선택형인 경우에만 존재
}

export const questions: Question[] = [
  // 환경디자인부
  {
    id: 1,
    text: "우리학교의 시설을 개선하고 싶다는 생각을 가지고 있다.",
    department: "환경디자인부",
    type: "scale",
  },
  {
    id: 2,
    text: "캠페인 진행을 할 수 있는 기회가 주어졌다! 나는?",
    department: "환경디자인부",
    type: "choice",
    answers: [
      { detail: "당장 참여한다!", point: 5 },
      { detail: "내키진 않지만 활동이니 참여한다", point: 3 },
      { detail: "다른 활동을 찾으러 간다", point: 1 },
      { detail: "가능하면 피하고 싶다", point: 1 },
    ],
  },
  {
    id: 3,
    text: "환경에 대해 관심을 가지는 편이다.",
    department: "환경디자인부",
    type: "scale",
  },

  // 홍보미디어부
  {
    id: 4,
    text: "영상 촬영 등에 관심이 많다",
    department: "홍보미디어부",
    type: "scale",
  },
  {
    id: 5,
    text: "나는 트렌드에 민감한 편이다.",
    department: "홍보미디어부",
    type: "scale",
  },
  {
    id: 6,
    text: "새로 생긴 트렌드나 밈은 활용(적용)하는 것을 좋아한다",
    department: "홍보미디어부",
    type: "scale",
  },

  // 행사활동부
  {
    id: 7,
    text: "축제 당일 갑작스런 순서 변경이 생겼을 때, 나는",
    department: "행사활동부",
    type: "choice",
    answers: [
      { detail: "침착하게 주변 사람들과 조율한다", point: 5 },
      { detail: "우선 선생님께 보고한다", point: 2 },
      { detail: "당황하지만 일단 따라간다", point: 2 },
      { detail: "누군가 대신 처리해주길 바란다", point: 1 },
    ],
  },
  {
    id: 8,
    text: "사람 많은 곳에서 마이크를 잡고 이야기해야 할 때, 나는",
    department: "행사활동부",
    type: "choice",
    answers: [
      { detail: "신난다! 내 차례다!", point: 5 },
      { detail: "약간 떨리지만 해보면 재밌다", point: 5 },
      { detail: "너무 부담된다", point: 1 },
      { detail: "가능하면 피하고 싶다", point: 1 },
    ],
  },
  {
    id: 9,
    text: '누군가 "이거 네가 맡아줬으면 좋겠어!"라고 부탁했을 때, 나는',
    department: "행사활동부",
    type: "choice",
    answers: [
      { detail: "일단 해보겠다고 한다", point: 5 },
      { detail: "상황 보고 결정한다", point: 2 },
      { detail: "고민 좀 해보자고 한다", point: 2 },
      { detail: "거절하는 편이다", point: 1 },
    ],
  },

  // 체육부
  {
    id: 10,
    text: "친구에게 운동을 소개하고 그에 따른 효과를 설명하는 것을 좋아한다.",
    department: "체육부",
    type: "scale",
  },
  {
    id: 11,
    text: "스포츠를 직접 참여하지 않고 진행, 관전하는 것을 좋아한다.",
    department: "체육부",
    type: "scale",
  },
  {
    id: 12,
    text: "같은 팀인 친구가 보드게임 도중 반칙이나 실수를 했다. 나는 그냥 넘어갈까?",
    department: "체육부",
    type: "choice",
    answers: [
      { detail: "넘어가준다.", point: 1 },
      { detail: "상황을 살피고 결정한다", point: 1 },
      { detail: "쌤한테 여쭤본다.", point: 2 },
      { detail: "룰을 따른다.", point: 5 },
    ],
  },

  // 학습문화부
  {
    id: 13,
    text: "친구가 공부 방법을 물어보면 정성을 다해 설명해주고 도와줄 수 있다.",
    department: "학습문화부",
    type: "scale",
  },
  {
    id: 14,
    text: "후배가 생기부 작성 때문에 고민하고 있으면 내가 아는 선에서 최대한 도와줄 수 있다.",
    department: "학습문화부",
    type: "scale",
  },
  {
    id: 15,
    text: "학교 공부 환경을 더 좋게 만들 방법이 생각나면 직접 행동으로 옮기고 싶은 마음이 든다.",
    department: "학습문화부",
    type: "scale",
  },

  // 학생복지부
  {
    id: 16,
    text: "학교 구성원의 불편 사항에 관심을 가지는 편이다.",
    department: "학생복지부",
    type: "scale",
  },
  {
    id: 17,
    text: "개인의 입장뿐 아니라 주변 학생들의 상황도 함께 고려한다.",
    department: "학생복지부",
    type: "scale",
  },
  {
    id: 18,
    text: "공식적인 의사소통 방식(회의, 전달 사항 등)을 잘 따른다.",
    department: "학생복지부",
    type: "scale",
  },
];

type Screen = "welcome" | "question" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [answers, setAnswers] = useState<
    Record<number, number | { index: number; point: number }>
  >({});
  const [result, setResult] = useState<
    Department[] | "all-rounder"
  >([]);
  const [allScores, setAllScores] = useState<Record<Department, number>>({
    홍보미디어부: 0,
    학생복지부: 0,
    체육부: 0,
    학습문화부: 0,
    환경디자인부: 0,
    행사활동부: 0,
  });

  const handleStart = () => {
    setScreen("question");
    setAnswers({});
  };

  const handleAnswer = (
    questionId: number,
    score: number | { index: number; point: number },
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateResult = () => {
    const scores: Record<Department, number> = {
      홍보미디어부: 0,
      학생복지부: 0,
      체육부: 0,
      학습문화부: 0,
      환경디자인부: 0,
      행사활동부: 0,
    };

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      // 선택형 질문인 경우 { index, point } 형태, 척도형은 숫자
      const score =
        typeof answer === "number" ? answer : answer.point;
      scores[q.department] += score;
    });

    setAllScores(scores);

    const maxScore = Math.max(...Object.values(scores));
    const topDepartments = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([dept, _]) => dept as Department);

    if (topDepartments.length === 6) {
      setResult("all-rounder");
    } else {
      setResult(topDepartments);
    }

    setScreen("result");
  };

  const handleRestart = () => {
    setScreen("welcome");
    setAnswers({});
    setResult([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {screen === "welcome" && (
        <WelcomeScreen onStart={handleStart} />
      )}
      {screen === "question" && (
        <QuestionScreen
          answers={answers}
          onAnswer={handleAnswer}
          onComplete={calculateResult}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          result={result}
          allScores={allScores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}