import React from 'react';
import { Trophy, Award, Zap, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { LanguageCode, WeeklyChallenge } from '../types';
import { translations } from '../i18n/translations';

interface WeeklyChallengesViewProps {
  challenges: WeeklyChallenge[];
  language: LanguageCode;
}

export const WeeklyChallengesView: React.FC<WeeklyChallengesViewProps> = ({
  challenges,
  language,
}) => {
  const t = translations[language] || translations.es;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
      default:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
    }
  };

  return (
    <div id="weekly-challenges-view" className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.weeklyTitle}</h2>
            <p className="text-xs text-slate-400">{t.weeklySubtitle}</p>
          </div>
        </div>

        <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-indigo-300">
          Semana 31 • 2026
        </div>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => {
          const percent = Math.min(100, Math.round((challenge.currentCount / challenge.targetCount) * 100));

          return (
            <div
              key={challenge.id}
              id={`challenge-card-${challenge.id}`}
              className={`relative bg-slate-900 border rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-4 transition-all ${
                challenge.completed
                  ? 'border-emerald-500/50 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getBadgeIcon(challenge.badgeIcon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{challenge.titleKey}</h3>
                    <span className="inline-block mt-0.5 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2 py-0.5 rounded-md">
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>

                {challenge.completed ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.completedBadge}</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2 py-1 rounded-lg">
                    +{challenge.rewardPoints} pts
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.descKey}
              </p>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>{t.progress}</span>
                  <span className="font-bold text-slate-200">
                    {challenge.currentCount} / {challenge.targetCount} ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      challenge.completed
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
