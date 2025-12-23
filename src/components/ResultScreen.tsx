import { Department } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";

import promotionMediaImg from "../assets/promotion-media-cat.png";
import welfareImg from "../assets/welfare-cat.png";
import peImg from "../assets/P.E-cat.png";
import nsuImg from "../assets/Nsu-cat.png";
import envImg from "../assets/env-cat.png";
import festivalImg from "../assets/festival-cat.jpg";
import allRounderImg from "../assets/carzy-all-rounder-cat-wider.png";

interface ResultScreenProps {
  result: Department[] | "all-rounder";
  allScores: Record<Department, number>;
  onRestart: () => void;
}

const departmentImages: Record<Department | "all-rounder", string> = {
  홍보미디어부: promotionMediaImg,
  학생복지부: welfareImg,
  체육부: peImg,
  학습문화부: nsuImg,
  환경디자인부: envImg,
  행사활동부: festivalImg,
  "all-rounder": allRounderImg,
};

const departmentColors: Record<Department | "all-rounder", string> = {
  홍보미디어부: "#7B6CE1",
  학생복지부: "#E07085",
  체육부: "#F59E0B",
  학습문화부: "#10B981",
  환경디자인부: "#06B6D4",
  행사활동부: "#EC4899",
  "all-rounder": "#8B5CF6",
};

export function ResultScreen({
  result,
  allScores,
  onRestart,
}: ResultScreenProps) {
  const isAllRounder = result === "all-rounder";

  useEffect(() => {
    // Reset window scroll to top to avoid seeing the page 'jump' to bottom
    window.scrollTo({ top: 0, behavior: "auto" });

    // Blur any active element so focus doesn't cause unexpected scrolling
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Reset internal scrollable containers (e.g. question container) if any
    document.querySelectorAll<HTMLElement>(".overflow-y-auto").forEach((el) => {
      el.scrollTop = 0;
    });
  }, []);

  // Sort departments by score
  const sortedDepartments = Object.entries(allScores)
    .sort(([, a], [, b]) => b - a)
    .map(([dept]) => dept as Department);

  const topDepartments = isAllRounder
    ? ["all-rounder"]
    : (result as Department[]);
  const secondPlace = !isAllRounder
    ? sortedDepartments
        .filter((dept) => !topDepartments.includes(dept))
        .slice(0, 1)
    : [];
  const thirdPlace = !isAllRounder
    ? sortedDepartments
        .filter((dept) => !topDepartments.includes(dept))
        .slice(1, 2)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={
                departmentImages[
                  isAllRounder ? "all-rounder" : topDepartments[0]
                ]
              }
              alt={isAllRounder ? "올라운더" : topDepartments[0]}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" /> */}
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Main Result */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-3">
                {isAllRounder ? "당신은..." : "당신의 부서는"}
              </p>
              {topDepartments.length === 1 ? (
                <h1
                  className="mb-2"
                  style={{
                    color:
                      departmentColors[
                        topDepartments[0] as Department | "all-rounder"
                      ],
                  }}
                >
                  {isAllRounder ? "올라운더" : topDepartments[0]}!
                </h1>
              ) : (
                <div className="space-y-2 mb-2">
                  {topDepartments.map((dept, index) => (
                    <h2
                      key={dept}
                      style={{ color: departmentColors[dept as Department] }}
                    >
                      {dept}
                      {index < topDepartments.length - 1 && " /"}
                    </h2>
                  ))}
                </div>
              )}
            </div>

            {/* All Rounder Special Message */}
            {isAllRounder && (
              <div className="bg-purple-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
                <p className="text-purple-800 text-center leading-relaxed">
                  🎉 모든 부서에 골고루 적합한 만능 인재입니다!
                </p>
              </div>
            )}

            {/* Multiple Top Departments Message */}
            {!isAllRounder && topDepartments.length > 1 && (
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
                <p className="text-blue-800 text-center leading-relaxed">
                  🌟 여러 부서에 동시에 적합합니다!
                </p>
              </div>
            )}

            {/* Rankings */}
            {!isAllRounder && (
              <div className="space-y-4 mb-8">
                {/* Second Place */}
                {secondPlace.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                          <span className="text-white">2</span>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">2순위 적성</p>
                          <p className="text-gray-800 font-medium">
                            {secondPlace[0]}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">
                          {allScores[secondPlace[0]]}점
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Third Place */}
                {thirdPlace.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                          <span className="text-white">3</span>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">3순위 적성</p>
                          <p className="text-gray-800 font-medium">
                            {thirdPlace[0]}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">
                          {allScores[thirdPlace[0]]}점
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* All Scores Display */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="text-center text-gray-700 mb-4">전체 적성 점수</h3>
              <div className="space-y-3">
                {sortedDepartments.map((dept) => {
                  const isTop = !isAllRounder && topDepartments.includes(dept);
                  const maxScore = Math.max(...Object.values(allScores));
                  const percentage = (allScores[dept] / maxScore) * 100;

                  return (
                    <div key={dept}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${isTop ? "font-bold" : ""}`}>
                          {dept}
                        </span>
                        <span className={`text-sm ${isTop ? "font-bold" : ""}`}>
                          {allScores[dept]}점
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: departmentColors[dept],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
