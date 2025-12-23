import { questions, Question } from "../App";
import { useState, useEffect, useRef } from "react";

interface QuestionScreenProps {
  answers: Record<number, number | { index: number; point: number }>;
  onAnswer: (questionId: number, score: number | { index: number; point: number }) => void;
  onComplete: () => void;
}

const scoreValues = [5, 4, 3, 2, 1];

export function QuestionScreen({
  answers,
  onAnswer,
  onComplete,
}: QuestionScreenProps) {
  const allAnswered = questions.every(
    (q) => answers[q.id] !== undefined,
  );
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          containerRef.current;
        // Show button when scrolled to bottom (with 50px threshold)
        const isAtBottom =
          scrollHeight - scrollTop - clientHeight < 50;
        setShowButton(isAtBottom);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Check initially
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleAnswerWithScroll = (questionId: number, score: number | { index: number; point: number }) => {
    onAnswer(questionId, score);
    
    // Use setTimeout to wait for state update
    setTimeout(() => {
      // Find next unanswered question after this one
      const currentIndex = questions.findIndex(q => q.id === questionId);
      const remainingQuestions = questions.slice(currentIndex + 1);
      
      // Get updated answers by checking which questions don't have answers yet
      const nextUnansweredQuestion = remainingQuestions.find(
        q => {
          // Check if this question will be unanswered after current update
          return q.id !== questionId && answers[q.id] === undefined;
        }
      );
      
      // Scroll to next unanswered question
      if (nextUnansweredQuestion && questionRefs.current[nextUnansweredQuestion.id]) {
        const element = questionRefs.current[nextUnansweredQuestion.id];
        if (element && containerRef.current) {
          const container = containerRef.current;
          const elementTop = element.offsetTop;
          const containerHeight = container.clientHeight;
          const elementHeight = element.offsetHeight;
          
          // Scroll to center the next question
          const scrollPosition = elementTop - (containerHeight / 2) + (elementHeight / 2);
          
          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 300);
  };

  const handleSubmit = () => {
    if (allAnswered) {
      onComplete();
    }
  };

  const renderScaleQuestion = (question: Question) => {
    const isAnswered = answers[question.id] !== undefined;

    return (
      <div
        key={question.id}
        className={`border-b border-gray-100 pb-12 last:border-b-0 transition-opacity ${
          isAnswered ? "opacity-40" : "opacity-100"
        }`}
        ref={el => questionRefs.current[question.id] = el}
      >
        {/* Question Text */}
        <p className="mb-6 leading-relaxed text-gray-800 font-medium">
          {question.text}
        </p>

        {/* Scale with Labels */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span
            className="text-xs sm:text-sm shrink-0"
            style={{ color: "#7B6CE1" }}
          >
            동의함
          </span>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            {scoreValues.map((score) => {
              // Size classes based on score
              const sizeClass =
                score === 5 || score === 1
                  ? "w-11 h-11 sm:w-12 sm:h-12" // Largest (동의함/동의하지 않음)
                  : score === 4 || score === 2
                    ? "w-10 h-10 sm:w-10 sm:h-10" // Medium
                    : "w-9 h-9"; // Smallest but tappable (3점 - 중립)

              const isSelected = answers[question.id] === score;
              const agreeColor = "#7B6CE1";
              const disagreeColor = "#E07085";

              return (
                <button
                  key={score}
                  onClick={() => handleAnswerWithScroll(question.id, score)}
                  className={`${sizeClass} rounded-full border-2 transition-all shrink-0`}
                  style={
                    isSelected
                      ? score >= 4
                        ? {
                            borderColor: agreeColor,
                            backgroundColor: agreeColor,
                          }
                        : score === 3
                          ? {
                              borderColor: "#D1D5DB",
                              backgroundColor: "#D1D5DB",
                            }
                          : {
                              borderColor: disagreeColor,
                              backgroundColor: disagreeColor,
                            }
                      : score >= 4
                        ? {
                            borderColor: agreeColor,
                            backgroundColor: "white",
                          }
                        : score === 3
                          ? {
                              borderColor: "#D1D5DB",
                              backgroundColor: "white",
                            }
                          : {
                              borderColor: disagreeColor,
                              backgroundColor: "white",
                            }
                  }
                />
              );
            })}
          </div>

          <span
            className="text-xs sm:text-sm shrink-0"
            style={{ color: "#E07085" }}
          >
            동의하지
            <br className="sm:hidden" />
            않음
          </span>
        </div>
      </div>
    );
  };

  const renderChoiceQuestion = (question: Question) => {
    const isAnswered = answers[question.id] !== undefined;

    return (
      <div
        key={question.id}
        className={`border-b border-gray-100 pb-12 last:border-b-0 transition-opacity ${
          isAnswered ? "opacity-40" : "opacity-100"
        }`}
        ref={el => questionRefs.current[question.id] = el}
      >
        {/* Question Text */}
        <p className="mb-6 leading-relaxed text-gray-800 font-medium">
          {question.text}
        </p>

        {/* Choice Answers */}
        <div className="space-y-3">
          {question.answers?.map((answer, index) => {
            const currentAnswer = answers[question.id];
            const isSelected = 
              typeof currentAnswer === 'object' && currentAnswer.index === index;

            return (
              <button
                key={index}
                onClick={() =>
                  handleAnswerWithScroll(question.id, { index, point: answer.point })
                }
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-purple-300 bg-purple-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/30"
                }`}
              >
                <span className="text-gray-700">
                  {answer.detail}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{ height: 50, backgroundColor: "white" }}
      ></div>
      <div
        ref={containerRef}
        className="min-h-screen bg-white overflow-y-auto"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-32">
          {/* Questions List */}
          <div className="space-y-12">
            {questions.map((question) => {
              if (question.type === "scale") {
                return renderScaleQuestion(question);
              } else {
                return renderChoiceQuestion(question);
              }
            })}
          </div>

          {/* Submit Button - Shows only when scrolled to bottom */}
          {showButton && (
            <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent">
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="w-full bg-gradient-to-r from-blue-300 to-purple-300 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  결과 확인하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}