import { Sparkles } from "lucide-react";
import allRounderImg from "../assets/carzy-all-rounder-cat.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 15,
              overflow: "hidden",
            }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg"
          >
            {/* <Sparkles className="w-10 h-10 text-white" /> */}
            <img src={allRounderImg} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 style={{ fontWeight: 700 }} className="text-3xl mb-4">
            내가 학생회라면?
          </h1>
          <p style={{ fontWeight: 400 }} className="text-gray-600">
            나에게 맞는 학생회 부서를 찾아보세요!
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-12">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-indigo-600">📝</span>
              </div>
              <div>
                <h3 style={{ fontWeight: 500 }} className="mb-1">
                  총 18개 질문
                </h3>
                <p className="text-sm text-gray-600">
                  각 질문에 솔직하게 답해주세요
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-purple-600">⏱️</span>
              </div>
              <div>
                <h3 style={{ fontWeight: 500 }} className="mb-1">
                  약 3분 소요
                </h3>
                <p className="text-sm text-gray-600">
                  부담없이 편하게 진행하세요
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-pink-600">🎯</span>
              </div>
              <div>
                <h3 style={{ fontWeight: 500 }} className="mb-1">
                  6개 부서 중 매칭
                </h3>
                <p className="text-sm text-gray-600">
                  가장 적합한 부서를 찾아드려요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          테스트 시작하기
        </button>

        {/* <p className="text-center text-sm text-gray-500 mt-6">
          솔직한 답변이 정확한 결과를 만듭니다
        </p> */}
      </div>
    </div>
  );
}
