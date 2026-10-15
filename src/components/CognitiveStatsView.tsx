import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import {
  Brain,
  Zap,
  Target,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { AICognitiveInsight, DailyStatEntry, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface CognitiveStatsViewProps {
  stats: DailyStatEntry[];
  streakDays: number;
  language: LanguageCode;
}

export const CognitiveStatsView: React.FC<CognitiveStatsViewProps> = ({
  stats,
  streakDays,
  language,
}) => {
  const t = translations[language] || translations.es;
  const [aiInsight, setAiInsight] = useState<AICognitiveInsight | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Latest stats or defaults
  const latestEntry = stats[stats.length - 1];
  const metrics = latestEntry?.cognitiveMetrics || {
    memoryIndex: 82,
    focusScore: 90,
    processingSpeed: 4.5,
    logicScore: 85,
    overallAgility: 86,
  };

  const totalGamesPlayed = stats.reduce((acc, curr) => acc + curr.gamesPlayed, 0);
  const totalGamesWon = stats.reduce((acc, curr) => acc + curr.gamesWon, 0);
  const totalTimeSeconds = stats.reduce((acc, curr) => acc + curr.totalTimeSeconds, 0);
  const avgTimeSeconds = totalGamesWon > 0 ? Math.round(totalTimeSeconds / totalGamesWon) : 0;

  // Chart data formatting
  const trendData = stats.slice(-10).map((s) => ({
    date: s.date.slice(5),
    agility: s.cognitiveMetrics.overallAgility,
    memory: s.cognitiveMetrics.memoryIndex,
    focus: s.cognitiveMetrics.focusScore,
  }));

  const difficultyData = [
    { name: t.easy, count: stats.reduce((acc, c) => acc + (c.difficultyBreakdown?.easy || 0), 0) },
    { name: t.medium, count: stats.reduce((acc, c) => acc + (c.difficultyBreakdown?.medium || 0), 0) },
    { name: t.hard, count: stats.reduce((acc, c) => acc + (c.difficultyBreakdown?.hard || 0), 0) },
    { name: t.expert, count: stats.reduce((acc, c) => acc + (c.difficultyBreakdown?.expert || 0), 0) },
    { name: t.master, count: stats.reduce((acc, c) => acc + (c.difficultyBreakdown?.master || 0), 0) },
  ];

  const fetchAICognitiveInsight = async () => {
    setLoadingAi(true);
    setAiError(null);
    try {
      const response = await fetch('/api/ai-cognitive-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stats: {
            metrics,
            totalGamesPlayed,
            totalGamesWon,
            streakDays,
            avgTimeSeconds,
          },
          language,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setAiInsight(resData.data);
      } else {
        setAiError(resData.error || 'No key or error generating insight');
      }
    } catch (err) {
      setAiError('Network error connecting to AI Brain Coach');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div id="cognitive-stats-view" className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 text-slate-100">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Brain className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.cognitiveProfile}</h2>
            <p className="text-xs text-slate-400">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
            <Flame className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase">{t.streakDays}</p>
              <p className="text-sm font-bold text-amber-300">{streakDays} days</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
            <Award className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase">{t.gamesCompleted}</p>
              <p className="text-sm font-bold text-indigo-300">{totalGamesWon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid (4 Cards) */}
      <div id="metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Memory Index */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.memoryIndex}</span>
            <Brain className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-200">{metrics.memoryIndex}</span>
            <span className="text-xs font-bold text-indigo-400">/ 100</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.memoryIndex}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">{t.memoryIndexDesc}</p>
        </div>

        {/* Focus & Precision */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.focusScore}</span>
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-200">{metrics.focusScore}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.focusScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">{t.focusScoreDesc}</p>
        </div>

        {/* Processing Speed */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.processingSpeed}</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-200">{metrics.processingSpeed}s</span>
            <span className="text-xs text-slate-400">/ cell</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, 100 - metrics.processingSpeed * 10)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">{t.processingSpeedDesc}</p>
        </div>

        {/* Overall Mental Agility */}
        <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-300">{t.overallAgility}</span>
            <Sparkles className="w-5 h-5 text-indigo-300 animate-spin-slow" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics.overallAgility}</span>
            <span className="text-xs font-bold text-indigo-300">/ 100</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.overallAgility}%` }}
            />
          </div>
          <p className="text-[11px] text-indigo-200 leading-tight">{t.overallAgilityDesc}</p>
        </div>
      </div>

      {/* AI Cognitive Brain Coach Card */}
      <div id="ai-brain-coach-card" className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">{t.aiCoachTitle}</h3>
              <p className="text-xs text-slate-400">{t.aiCoachSubtitle}</p>
            </div>
          </div>

          <button
            id="btn-generate-ai-insight"
            onClick={fetchAICognitiveInsight}
            disabled={loadingAi}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loadingAi ? t.generatingInsight : t.generateInsight}</span>
          </button>
        </div>

        {aiInsight && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
              <p className="text-sm font-medium text-slate-200 leading-relaxed">{aiInsight.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/40">
                <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t.aiStrengths}</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {aiInsight.strengths.map((item, idx) => (
                    <li key={`str-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-cyan-950/20 rounded-xl p-3.5 border border-cyan-900/40">
                <h4 className="text-xs font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.aiFocusAreas}</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {aiInsight.focusAreas.map((item, idx) => (
                    <li key={`foc-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-950/20 rounded-xl p-3.5 border border-amber-900/40 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-xs text-amber-200 font-medium">
                <strong className="font-bold text-amber-300">{t.aiTip}: </strong>
                {aiInsight.tip}
              </p>
            </div>
          </div>
        )}

        {aiError && (
          <p className="text-xs text-slate-400 italic">
            El entrenador de IA está listo. Si lo deseas, puedes configurar la API Key de Gemini o disfrutar del cálculo cognitivo local integrado.
          </p>
        )}
      </div>

      {/* Progress Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Tendencia Agilidad Mental</span>
          </h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData.length > 0 ? trendData : [{ date: 'Hoy', agility: metrics.overallAgility }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="agility" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Breakdown Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Distribución de Partidas por Dificultad</span>
          </h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
