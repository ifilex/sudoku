import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tabPlay: string;
  tabStats: string;
  tabChallenges: string;
  tabTutorial: string;
  tabSettings: string;
  
  // Difficulties
  easy: string;
  medium: string;
  hard: string;
  expert: string;
  master: string;
  
  // Controls
  newGame: string;
  restart: string;
  undo: string;
  erase: string;
  notes: string;
  smartHint: string;
  pause: string;
  resume: string;
  autoSaved: string;
  mistakes: string;
  time: string;
  difficulty: string;
  
  // Cognitive metrics
  cognitiveProfile: string;
  memoryIndex: string;
  memoryIndexDesc: string;
  focusScore: string;
  focusScoreDesc: string;
  processingSpeed: string;
  processingSpeedDesc: string;
  logicScore: string;
  logicScoreDesc: string;
  overallAgility: string;
  overallAgilityDesc: string;
  streakDays: string;
  gamesCompleted: string;
  winRate: string;
  avgTime: string;
  bestTime: string;
  
  // AI Coach
  aiCoachTitle: string;
  aiCoachSubtitle: string;
  generateInsight: string;
  generatingInsight: string;
  aiStrengths: string;
  aiFocusAreas: string;
  aiTip: string;
  
  // Smart Hint Modal
  hintTitle: string;
  hintExplanation: string;
  hintApply: string;
  hintClose: string;
  noHintAvailable: string;
  
  // Weekly Challenges
  weeklyTitle: string;
  weeklySubtitle: string;
  completedBadge: string;
  progress: string;
  
  // Tutorial
  tutorialTitle: string;
  tutorialSubtitle: string;
  prevStep: string;
  nextStep: string;
  finishTutorial: string;
  tryInteractive: string;
  
  // Settings
  settingsTitle: string;
  languageSelect: string;
  autoCheckErrors: string;
  highlightMatchingNumbers: string;
  highlightRowColBox: string;
  autoClearNotes: string;
  themeSelect: string;
  resetData: string;
  resetConfirm: string;
  
  // Completion
  congratsTitle: string;
  congratsMessage: string;
  cognitiveGain: string;
  playAgain: string;
  
  // Tutorial steps content
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
}

export const translations: Record<LanguageCode, Translations> = {
  es: {
    appName: "Sudoku Cognitivo",
    appSubtitle: "Entrenamiento de Memoria & Agilidad Mental",
    tabPlay: "Jugar",
    tabStats: "Progreso Cognitivo",
    tabChallenges: "Desafíos Semanales",
    tabTutorial: "Aprender & Tutorial",
    tabSettings: "Ajustes",
    
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    expert: "Experto",
    master: "Maestro Cognitivo",
    
    newGame: "Nueva Partida",
    restart: "Reiniciar",
    undo: "Deshacer",
    erase: "Borrar",
    notes: "Lápiz (Notas)",
    smartHint: "Pista Inteligente",
    pause: "Pausar",
    resume: "Reanudar",
    autoSaved: "Partida guardada automáticamente",
    mistakes: "Errores",
    time: "Tiempo",
    difficulty: "Dificultad",
    
    cognitiveProfile: "Perfil de Rendimiento Cognitivo",
    memoryIndex: "Índice de Memoria",
    memoryIndexDesc: "Capacidad para retener patrones visuales y candidatos sin ayuda.",
    focusScore: "Precisión y Enfoque",
    focusScoreDesc: "Porcentaje de movimientos correctos sin cometer errores.",
    processingSpeed: "Velocidad de Procesamiento",
    processingSpeedDesc: "Segundos promedio dedicados por cada deducción correcta.",
    logicScore: "Deducción Lógica",
    logicScoreDesc: "Efectividad en resolver patrones complejos sin depender de pistas.",
    overallAgility: "Agilidad Mental General",
    overallAgilityDesc: "Puntuación combinada de rendimiento neuro-cognitivo.",
    streakDays: "Días Seguidos",
    gamesCompleted: "Juegos Resueltos",
    winRate: "Tasa de Victoria",
    avgTime: "Tiempo Promedio",
    bestTime: "Mejor Tiempo",
    
    aiCoachTitle: "Entrenador Cognitivo IA",
    aiCoachSubtitle: "Análisis personalizado impulsado por IA sobre tu agilidad mental",
    generateInsight: "Obtener Análisis IA",
    generatingInsight: "Analizando patrones cognitivos...",
    aiStrengths: "Puntos Fortalecidos",
    aiFocusAreas: "Áreas de Mejora",
    aiTip: "Consejo Neuronal del Día",
    
    hintTitle: "Pista Lógica Deductiva",
    hintExplanation: "Explicación Técnica",
    hintApply: "Colocar Número",
    hintClose: "Entendido",
    noHintAvailable: "El tablero ya está completo o no se detectó ningún error.",
    
    weeklyTitle: "Desafíos Semanales de Memoria",
    weeklySubtitle: "Completa metas especiales para potenciar tu reserva cognitiva",
    completedBadge: "¡Completado!",
    progress: "Progreso",
    
    tutorialTitle: "Tutorial Interactivo de Sudoku Cognitivo",
    tutorialSubtitle: "Aprende las reglas y técnicas lógicas paso a paso",
    prevStep: "Anterior",
    nextStep: "Siguiente",
    finishTutorial: "¡Empezar a Jugar!",
    tryInteractive: "Prueba práctica:",
    
    settingsTitle: "Configuración del Juego",
    languageSelect: "Idioma / Language",
    autoCheckErrors: "Comprobar errores automáticamente",
    highlightMatchingNumbers: "Resaltar números iguales",
    highlightRowColBox: "Resaltar fila, columna y cuadrícula",
    autoClearNotes: "Borrar notas automáticamente al colocar número",
    themeSelect: "Tema Visual Cognitivo",
    resetData: "Restablecer Datos y Estadísticas",
    resetConfirm: "¿Seguro que deseas borrar tus estadísticas y datos guardados?",
    
    congratsTitle: "¡Excelente Trabajo Neuronal!",
    congratsMessage: "Has resuelto el Sudoku estimulando tu memoria de trabajo y corteza prefrontal.",
    cognitiveGain: "Puntos Cognitivos Ganados",
    playAgain: "Jugar Otra Partida",
    
    step1Title: "Paso 1: La Regla Fundamental",
    step1Desc: "Cada fila de 9 casillas debe contener los números del 1 al 9 sin repetir ninguno.",
    step2Title: "Paso 2: Columnas y Cuadrículas",
    step2Desc: "Las 9 columnas verticales y las 9 regiones de 3x3 también deben tener del 1 al 9 sin duplicados.",
    step3Title: "Paso 3: Escaneo Visual y Memoria",
    step3Desc: "Escanea líneas cruzadas para identificar dónde falta un único número posible (Single Desnudo).",
    step4Title: "Paso 4: Modo Lápiz (Notas de Candidatos)",
    step4Desc: "Usa las notas en lápiz para registrar números posibles y liberar carga cognitiva en tu memoria activa.",
    step5Title: "Paso 5: Pistas Lógicas Inteligentes",
    step5Desc: "Nuestra pista no solo te da la respuesta, te enseña la deducción lógica matemática para entrenar tu cerebro."
  },
  en: {
    appName: "Cognitive Sudoku",
    appSubtitle: "Memory Training & Mental Agility",
    tabPlay: "Play",
    tabStats: "Cognitive Progress",
    tabChallenges: "Weekly Challenges",
    tabTutorial: "Learn & Tutorial",
    tabSettings: "Settings",
    
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    expert: "Expert",
    master: "Cognitive Master",
    
    newGame: "New Game",
    restart: "Restart",
    undo: "Undo",
    erase: "Erase",
    notes: "Pencil (Notes)",
    smartHint: "Smart Hint",
    pause: "Pause",
    resume: "Resume",
    autoSaved: "Game auto-saved",
    mistakes: "Mistakes",
    time: "Time",
    difficulty: "Difficulty",
    
    cognitiveProfile: "Cognitive Performance Profile",
    memoryIndex: "Memory Index",
    memoryIndexDesc: "Ability to retain visual patterns and candidates without assistance.",
    focusScore: "Focus & Precision",
    focusScoreDesc: "Percentage of correct moves made without errors.",
    processingSpeed: "Processing Speed",
    processingSpeedDesc: "Average seconds spent per correct logical placement.",
    logicScore: "Logic Deduction",
    logicScoreDesc: "Effectiveness in solving complex patterns without relying on hints.",
    overallAgility: "Overall Mental Agility",
    overallAgilityDesc: "Combined neuro-cognitive performance score.",
    streakDays: "Streak Days",
    gamesCompleted: "Games Solved",
    winRate: "Win Rate",
    avgTime: "Avg Time",
    bestTime: "Best Time",
    
    aiCoachTitle: "AI Cognitive Coach",
    aiCoachSubtitle: "Personalized AI-powered analysis of your cognitive performance",
    generateInsight: "Get AI Analysis",
    generatingInsight: "Analyzing cognitive patterns...",
    aiStrengths: "Strengths",
    aiFocusAreas: "Growth Areas",
    aiTip: "Daily Neural Tip",
    
    hintTitle: "Logical Deductive Hint",
    hintExplanation: "Technical Explanation",
    hintApply: "Place Number",
    hintClose: "Understood",
    noHintAvailable: "The board is complete or no errors detected.",
    
    weeklyTitle: "Weekly Memory Challenges",
    weeklySubtitle: "Complete special targets to boost your cognitive reserve",
    completedBadge: "Completed!",
    progress: "Progress",
    
    tutorialTitle: "Interactive Cognitive Sudoku Tutorial",
    tutorialSubtitle: "Learn rules and logical deduction techniques step by step",
    prevStep: "Previous",
    nextStep: "Next",
    finishTutorial: "Start Playing!",
    tryInteractive: "Interactive Practice:",
    
    settingsTitle: "Game Settings",
    languageSelect: "Language",
    autoCheckErrors: "Auto-check errors",
    highlightMatchingNumbers: "Highlight matching numbers",
    highlightRowColBox: "Highlight row, column & grid",
    autoClearNotes: "Auto-clear notes when placing number",
    themeSelect: "Cognitive Visual Theme",
    resetData: "Reset Data & Statistics",
    resetConfirm: "Are you sure you want to reset your saved stats and progress?",
    
    congratsTitle: "Great Neural Workout!",
    congratsMessage: "You solved the Sudoku, stimulating your working memory and prefrontal cortex.",
    cognitiveGain: "Cognitive Points Earned",
    playAgain: "Play Another Game",
    
    step1Title: "Step 1: The Core Rule",
    step1Desc: "Every row of 9 cells must contain numbers 1 through 9 with no duplicates.",
    step2Title: "Step 2: Columns & Sub-grids",
    step2Desc: "All 9 vertical columns and 9 sub-grids (3x3) must also contain 1 through 9.",
    step3Title: "Step 3: Visual Scanning & Memory",
    step3Desc: "Cross-scan intersecting lines to identify missing single candidates (Naked Single).",
    step4Title: "Step 4: Pencil Notes Mode",
    step4Desc: "Use candidate notes to track possibilities and reduce working memory strain.",
    step5Title: "Step 5: Smart Logical Hints",
    step5Desc: "Our hint system teaches you mathematical logic step-by-step rather than just revealing digits."
  },
  de: {
    appName: "Kognitives Sudoku",
    appSubtitle: "Gedächtnistraining & Geistige Agilität",
    tabPlay: "Spielen",
    tabStats: "Kognitiver Fortschritt",
    tabChallenges: "Wochen-Herausforderungen",
    tabTutorial: "Lernen & Tutorial",
    tabSettings: "Einstellungen",
    
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    expert: "Experte",
    master: "Kognitiver Meister",
    
    newGame: "Neues Spiel",
    restart: "Neustart",
    undo: "Rückgängig",
    erase: "Löschen",
    notes: "Bleistift (Notizen)",
    smartHint: "Intelligenter Hinweis",
    pause: "Pause",
    resume: "Fortsetzen",
    autoSaved: "Automatisch gespeichert",
    mistakes: "Fehler",
    time: "Zeit",
    difficulty: "Schwierigkeit",
    
    cognitiveProfile: "Kognitives Leistungsprofil",
    memoryIndex: "Gedächtnis-Index",
    memoryIndexDesc: "Fähigkeit, visuelle Muster ohne Hilfe zu behalten.",
    focusScore: "Fokus & Präzision",
    focusScoreDesc: "Prozentsatz korrekter Züge ohne Fehler.",
    processingSpeed: "Verarbeitungsgeschwindigkeit",
    processingSpeedDesc: "Durchschnittliche Sekunden pro richtiger Entscheidung.",
    logicScore: "Logische Deduktion",
    logicScoreDesc: "Lösung komplexer Muster ohne Hinweise.",
    overallAgility: "Gesamte Geistige Agilität",
    overallAgilityDesc: "Kombinierter neuro-kognitiver Wert.",
    streakDays: "Tage Serie",
    gamesCompleted: "Gelöste Spiele",
    winRate: "Siegquote",
    avgTime: "Durchschn. Zeit",
    bestTime: "Bestzeit",
    
    aiCoachTitle: "KI-Kognitionscoach",
    aiCoachSubtitle: "Personalisierte Analyse deiner kognitiven Fähigkeiten",
    generateInsight: "KI-Analyse abrufen",
    generatingInsight: "Muster werden analysiert...",
    aiStrengths: "Stärken",
    aiFocusAreas: "Entwicklungsbereiche",
    aiTip: "Täglicher Gehirntipp",
    
    hintTitle: "Logisch-Deduktiver Hinweis",
    hintExplanation: "Technische Erklärung",
    hintApply: "Zahl einsetzen",
    hintClose: "Verstanden",
    noHintAvailable: "Das Spielfeld ist fertig oder enthält keine Fehler.",
    
    weeklyTitle: "Wöchentliche Gedächtnisaufgaben",
    weeklySubtitle: "Erreiche Spezialziele für deine kognitive Reserve",
    completedBadge: "Abgeschlossen!",
    progress: "Fortschritt",
    
    tutorialTitle: "Interaktives Kognitives Sudoku-Tutorial",
    tutorialSubtitle: "Lerne Regeln und Logik Schritt für Schritt",
    prevStep: "Zurück",
    nextStep: "Weiter",
    finishTutorial: "Jetzt Spielen!",
    tryInteractive: "Interaktives Training:",
    
    settingsTitle: "Spieleinstellungen",
    languageSelect: "Sprache",
    autoCheckErrors: "Fehler automatisch prüfen",
    highlightMatchingNumbers: "Gleiche Zahlen hervorheben",
    highlightRowColBox: "Zeile, Spalte & Block hervorheben",
    autoClearNotes: "Notizen beim Platzieren automatisch löschen",
    themeSelect: "Kognitives Farbschema",
    resetData: "Daten & Statistiken zurücksetzen",
    resetConfirm: "Möchtest du alle gespeicherten Daten wirklich zurücksetzen?",
    
    congratsTitle: "Hervorragendes Gehirntraining!",
    congratsMessage: "Du hast das Sudoku gelöst und dein Arbeitsgedächtnis gestärkt.",
    cognitiveGain: "Gewonnene Kognitionspunkte",
    playAgain: "Neues Spiel starten",
    
    step1Title: "Schritt 1: Die Grundregel",
    step1Desc: "Jede Zeile mit 9 Feldern muss die Zahlen 1 bis 9 ohne Wiederholungen enthalten.",
    step2Title: "Schritt 2: Spalten und 3x3 Blöcke",
    step2Desc: "Alle 9 vertikalen Spalten und 9 Blöcke müssen ebenfalls 1 bis 9 enthalten.",
    step3Title: "Schritt 3: Visuelles Scannen",
    step3Desc: "Scanne kreuzende Linien, um eindeutige freie Felder zu finden.",
    step4Title: "Schritt 4: Bleistiftnotizen",
    step4Desc: "Nutze Notizen, um Möglichkeiten festzuhalten und dein Gedächtnis zu entlasten.",
    step5Title: "Schritt 5: Intelligente Hinweise",
    step5Desc: "Unser Hinweissystem erklärt dir Schritt für Schritt die mathematische Logik."
  },
  fr: {
    appName: "Sudoku Cognitif",
    appSubtitle: "Entraînement de la Mémoire & Agilité Mentale",
    tabPlay: "Jouer",
    tabStats: "Progrès Cognitifs",
    tabChallenges: "Défis Hebdomadaires",
    tabTutorial: "Apprendre & Tutoriel",
    tabSettings: "Paramètres",
    
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    expert: "Expert",
    master: "Maître Cognitif",
    
    newGame: "Nouvelle Partie",
    restart: "Recommencer",
    undo: "Annuler",
    erase: "Effacer",
    notes: "Crayon (Notes)",
    smartHint: "Indice Intelligent",
    pause: "Pause",
    resume: "Reprendre",
    autoSaved: "Partie sauvegardée automatiquement",
    mistakes: "Erreurs",
    time: "Temps",
    difficulty: "Difficulté",
    
    cognitiveProfile: "Profil de Performance Cognitive",
    memoryIndex: "Indice de Mémoire",
    memoryIndexDesc: "Capacité à retenir les motifs visuels et candidats sans aide.",
    focusScore: "Focus & Précision",
    focusScoreDesc: "Pourcentage de coups corrects sans erreur.",
    processingSpeed: "Vitesse de Traitement",
    processingSpeedDesc: "Temps moyen en secondes par déduction exacte.",
    logicScore: "Déduction Logique",
    logicScoreDesc: "Efficacité à résoudre des schémas complexes sans indices.",
    overallAgility: "Agilité Mentale Globale",
    overallAgilityDesc: "Score combiné de performance neuro-cognitive.",
    streakDays: "Jours Consécutifs",
    gamesCompleted: "Parties Résolues",
    winRate: "Taux de Victoire",
    avgTime: "Temps Moyen",
    bestTime: "Meilleur Temps",
    
    aiCoachTitle: "Coach Cognitif IA",
    aiCoachSubtitle: "Analyse personnalisée de vos capacités cognitives par IA",
    generateInsight: "Obtenir l'analyse IA",
    generatingInsight: "Analyse des schémas en cours...",
    aiStrengths: "Points Forts",
    aiFocusAreas: "Axes d'Amélioration",
    aiTip: "Conseil Neuronal du Jour",
    
    hintTitle: "Indice Logique Déductif",
    hintExplanation: "Explication Technique",
    hintApply: "Placer le Chiffre",
    hintClose: "Compris",
    noHintAvailable: "Le plateau est complet ou sans erreur détectée.",
    
    weeklyTitle: "Défis Hebdomadaires de Mémoire",
    weeklySubtitle: "Atteignez des objectifs spéciaux pour stimuler votre réserve cognitive",
    completedBadge: "Terminé !",
    progress: "Progression",
    
    tutorialTitle: "Tutoriel Interactif Sudoku Cognitif",
    tutorialSubtitle: "Apprenez les règles et déductions pas à pas",
    prevStep: "Précédent",
    nextStep: "Suivant",
    finishTutorial: "Commencer à Jouer !",
    tryInteractive: "Pratique interactive :",
    
    settingsTitle: "Paramètres du Jeu",
    languageSelect: "Langue",
    autoCheckErrors: "Vérifier automatiquement les erreurs",
    highlightMatchingNumbers: "Surligner les chiffres identiques",
    highlightRowColBox: "Surligner ligne, colonne & bloc",
    autoClearNotes: "Effacer les notes automatiquement",
    themeSelect: "Thème Visuel Cognitif",
    resetData: "Réinitialiser les Données",
    resetConfirm: "Voulez-vous vraiment réinitialiser vos statistiques sauvegardées ?",
    
    congratsTitle: "Excellent Entraînement Cérébral !",
    congratsMessage: "Vous avez résolu le Sudoku en stimulant votre mémoire de travail.",
    cognitiveGain: "Points Cognitifs Gagnés",
    playAgain: "Rejouer une Partie",
    
    step1Title: "Étape 1 : La Règle Fondamentale",
    step1Desc: "Chaque ligne de 9 cases doit contenir les chiffres de 1 à 9 sans doublon.",
    step2Title: "Étape 2 : Colonnes et Régions",
    step2Desc: "Les 9 colonnes et 9 blocs 3x3 doivent aussi contenir 1 à 9.",
    step3Title: "Étape 3 : Balayage Visuel",
    step3Desc: "Croisez les lignes pour repérer les candidats uniques.",
    step4Title: "Étape 4 : Mode Crayon (Notes)",
    step4Desc: "Utilisez les notes pour alléger la charge de votre mémoire de travail.",
    step5Title: "Étape 5 : Indices Logiques",
    step5Desc: "Notre système explique la logique mathématique étape par étape."
  },
  it: {
    appName: "Sudoku Cognitivo",
    appSubtitle: "Allenamento della Memoria & Agilità Mentale",
    tabPlay: "Gioca",
    tabStats: "Progresso Cognitivo",
    tabChallenges: "Sfide Settimanali",
    tabTutorial: "Impara & Tutorial",
    tabSettings: "Impostazioni",
    
    easy: "Facile",
    medium: "Medio",
    hard: "Difficile",
    expert: "Esperto",
    master: "Maestro Cognitivo",
    
    newGame: "Nuova Partita",
    restart: "Ricomincia",
    undo: "Annulla",
    erase: "Cancella",
    notes: "Matita (Note)",
    smartHint: "Suggerimento Intelligente",
    pause: "Pausa",
    resume: "Riprendi",
    autoSaved: "Salvataggio automatico",
    mistakes: "Errori",
    time: "Tempo",
    difficulty: "Difficoltà",
    
    cognitiveProfile: "Profilo delle Prestazioni Cognitive",
    memoryIndex: "Indice di Memoria",
    memoryIndexDesc: "Capacità di trattenere schemi visivi senza aiuti.",
    focusScore: "Focus e Precisione",
    focusScoreDesc: "Percentuale di mosse corrette senza errori.",
    processingSpeed: "Velocità di Elaborazione",
    processingSpeedDesc: "Secondi medi impiegati per ogni deduzione corretta.",
    logicScore: "Deduzione Logica",
    logicScoreDesc: "Efficacia nel risolvere schemi complessi senza suggerimenti.",
    overallAgility: "Agilità Mentale Generale",
    overallAgilityDesc: "Punteggio neuro-cognitivo combinato.",
    streakDays: "Giorni Consecutivi",
    gamesCompleted: "Partite Risolte",
    winRate: "Percentuale di Vittoria",
    avgTime: "Tempo Medio",
    bestTime: "Miglior Tempo",
    
    aiCoachTitle: "Coach Cognitivo IA",
    aiCoachSubtitle: "Analisi personalizzata basata sull'IA delle tue capacità mentali",
    generateInsight: "Ottieni Analisi IA",
    generatingInsight: "Analisi degli schemi in corso...",
    aiStrengths: "Punti di Forza",
    aiFocusAreas: "Aree di Miglioramento",
    aiTip: "Consiglio Neurale del Giorno",
    
    hintTitle: "Suggerimento Logico Deduttivo",
    hintExplanation: "Spiegazione Tecnica",
    hintApply: "Inserisci Numero",
    hintClose: "Capito",
    noHintAvailable: "Griglia completata o nessun errore rilevato.",
    
    weeklyTitle: "Sfide Settimanali di Memoria",
    weeklySubtitle: "Raggiungi obiettivi speciali per stimolare la tua riserva cognitiva",
    completedBadge: "Completato!",
    progress: "Progresso",
    
    tutorialTitle: "Tutorial Interattivo Sudoku Cognitivo",
    tutorialSubtitle: "Impara le regole e le tecniche di deduzione passo dopo passo",
    prevStep: "Precedente",
    nextStep: "Successivo",
    finishTutorial: "Inizia a Giocare!",
    tryInteractive: "Pratica interattiva:",
    
    settingsTitle: "Impostazioni di Gioco",
    languageSelect: "Lingua",
    autoCheckErrors: "Controllo automatico errori",
    highlightMatchingNumbers: "Evidenzia numeri uguali",
    highlightRowColBox: "Evidenzia riga, colonna e griglia",
    autoClearNotes: "Cancella note automaticamente",
    themeSelect: "Tema Visivo Cognitivo",
    resetData: "Ripristina Dati e Statistiche",
    resetConfirm: "Sei sicuro di voler cancellare tutte le tue statistiche salvate?",
    
    congratsTitle: "Eccellente Allenamento Neurale!",
    congratsMessage: "Hai risolto il Sudoku stimolando la memoria di lavoro e la corteccia prefrontale.",
    cognitiveGain: "Punti Cognitivi Guadagnati",
    playAgain: "Gioca un'Altra Partita",
    
    step1Title: "Passo 1: La Regola Fondamentale",
    step1Desc: "Ogni riga di 9 caselle deve contenere i numeri da 1 a 9 senza ripetizioni.",
    step2Title: "Passo 2: Colonne e Regioni",
    step2Desc: "Tutte le 9 colonne e le 9 regioni 3x3 devono contenere i numeri da 1 a 9.",
    step3Title: "Passo 3: Scansione Visiva",
    step3Desc: "Incrocia le linee per individuare l'unico numero mancante.",
    step4Title: "Passo 4: Modalità Matita (Note)",
    step4Desc: "Usa le note a matita per ridurre lo sforzo della memoria a breve termine.",
    step5Title: "Passo 5: Suggerimenti Logici Smart",
    step5Desc: "Il nostro sistema ti insegna la deduzione matematica passo dopo passo."
  },
  pt: {
    appName: "Sudoku Cognitivo",
    appSubtitle: "Treino de Memória & Agilidade Mental",
    tabPlay: "Jogar",
    tabStats: "Progresso Cognitivo",
    tabChallenges: "Desafios Semanais",
    tabTutorial: "Aprender & Tutorial",
    tabSettings: "Configurações",
    
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
    expert: "Especialista",
    master: "Mestre Cognitivo",
    
    newGame: "Novo Jogo",
    restart: "Reiniciar",
    undo: "Desfazer",
    erase: "Apagar",
    notes: "Lápis (Notas)",
    smartHint: "Dica Inteligente",
    pause: "Pausar",
    resume: "Continuar",
    autoSaved: "Jogo salvo automaticamente",
    mistakes: "Erros",
    time: "Tempo",
    difficulty: "Dificuldade",
    
    cognitiveProfile: "Perfil de Desempenho Cognitivo",
    memoryIndex: "Índice de Memória",
    memoryIndexDesc: "Capacidade de reter padrões visuais sem ajuda externa.",
    focusScore: "Foco & Precisão",
    focusScoreDesc: "Porcentagem de jogadas corretas sem cometer erros.",
    processingSpeed: "Velocidade de Processamento",
    processingSpeedDesc: "Segundos médios gastos por dedução correta.",
    logicScore: "Dedução Lógica",
    logicScoreDesc: "Eficácia em resolver padrões complexos sem dicas.",
    overallAgility: "Agilidade Mental Geral",
    overallAgilityDesc: "Pontuação combinada de desempenho neurocognitivo.",
    streakDays: "Dias Seguidos",
    gamesCompleted: "Jogos Concluídos",
    winRate: "Taxa de Vitória",
    avgTime: "Tempo Médio",
    bestTime: "Melhor Tempo",
    
    aiCoachTitle: "Treinador Cognitivo IA",
    aiCoachSubtitle: "Análise personalizada com Inteligência Artificial sobre suas habilidades",
    generateInsight: "Obter Análise IA",
    generatingInsight: "Analisando padrões cognitivos...",
    aiStrengths: "Pontos Fortes",
    aiFocusAreas: "Áreas de Melhoria",
    aiTip: "Dica Neuronal do Dia",
    
    hintTitle: "Dica Lógica Dedutiva",
    hintExplanation: "Explicação Técnica",
    hintApply: "Colocar Número",
    hintClose: "Entendido",
    noHintAvailable: "O tabuleiro está completo ou sem erros detectados.",
    
    weeklyTitle: "Desafios Semanais de Memória",
    weeklySubtitle: "Cumpra metas especiais para impulsionar sua reserva cognitiva",
    completedBadge: "Concluído!",
    progress: "Progresso",
    
    tutorialTitle: "Tutorial Interativo de Sudoku Cognitivo",
    tutorialSubtitle: "Aprenda regras e deduções lógicas passo a passo",
    prevStep: "Anterior",
    nextStep: "Próximo",
    finishTutorial: "Começar a Jogar!",
    tryInteractive: "Prática interativa:",
    
    settingsTitle: "Configurações do Jogo",
    languageSelect: "Idioma",
    autoCheckErrors: "Verificar erros automaticamente",
    highlightMatchingNumbers: "Destacar números iguais",
    highlightRowColBox: "Destacar linha, coluna e bloco",
    autoClearNotes: "Apagar notas automaticamente",
    themeSelect: "Tema Visual Cognitivo",
    resetData: "Redefinir Dados e Estatísticas",
    resetConfirm: "Tem certeza de que deseja apagar todas as estatísticas salvas?",
    
    congratsTitle: "Excelente Treino Neuronal!",
    congratsMessage: "Você resolveu o Sudoku estimulando sua memória de trabalho e córtex pré-frontal.",
    cognitiveGain: "Pontos Cognitivos Ganhos",
    playAgain: "Jogar Outra Partida",
    
    step1Title: "Passo 1: A Regra Fundamental",
    step1Desc: "Cada linha de 9 células deve conter os números de 1 a 9 sem repetição.",
    step2Title: "Passo 2: Colunas e Blocos",
    step2Desc: "Todas as 9 colunas e 9 blocos 3x3 também devem conter de 1 a 9.",
    step3Title: "Passo 3: Varredura Visual",
    step3Desc: "Cruze linhas e colunas para encontrar candidatos únicos.",
    step4Title: "Passo 4: Modo Lápis (Notas)",
    step4Desc: "Use as notas para reduzir o esforço da sua memória de trabalho.",
    step5Title: "Passo 5: Dicas Lógicas Inteligentes",
    step5Desc: "Nosso sistema ensina a dedução matemática passo a passo."
  },
  zh: {
    appName: "认知数独",
    appSubtitle: "记忆训练与大脑敏捷度提升",
    tabPlay: "开始游戏",
    tabStats: "认知进度",
    tabChallenges: "每周挑战",
    tabTutorial: "互动教程",
    tabSettings: "设置",
    
    easy: "简单",
    medium: "中等",
    hard: "困难",
    expert: "专家",
    master: "认知大师",
    
    newGame: "新游戏",
    restart: "重新开始",
    undo: "撤销",
    erase: "擦除",
    notes: "铅笔笔记",
    smartHint: "智能逻辑提示",
    pause: "暂停",
    resume: "继续",
    autoSaved: "已自动保存",
    mistakes: "错误数",
    time: "用时",
    difficulty: "难度",
    
    cognitiveProfile: "认知能力分析档案",
    memoryIndex: "记忆指数",
    memoryIndexDesc: "在无需外部辅助下保持视觉记忆的能力。",
    focusScore: "专注与精确度",
    focusScoreDesc: "无错误填入正确数字的百分比。",
    processingSpeed: "思维处理速度",
    processingSpeedDesc: "完成每次正确逻辑推断平均所需秒数。",
    logicScore: "逻辑推理能力",
    logicScoreDesc: "在不依赖提示的情况下解决复杂逻辑的能力。",
    overallAgility: "综合大脑敏捷度",
    overallAgilityDesc: "神经认知综合综合评分。",
    streakDays: "连续打卡天数",
    gamesCompleted: "已完成局数",
    winRate: "胜率",
    avgTime: "平均用时",
    bestTime: "最佳用时",
    
    aiCoachTitle: "AI 认知大脑教练",
    aiCoachSubtitle: "基于人工智能对您大脑敏捷度的个性化分析",
    generateInsight: "生成 AI 认知报告",
    generatingInsight: "正在分析思维模式...",
    aiStrengths: "核心优势",
    aiFocusAreas: "提升空间",
    aiTip: "每日大脑神经训练建议",
    
    hintTitle: "演绎逻辑提示",
    hintExplanation: "逻辑推理解析",
    hintApply: "填入此数字",
    hintClose: "知道了",
    noHintAvailable: "棋盘已完成或暂未检测到错误。",
    
    weeklyTitle: "每周记忆脑力挑战",
    weeklySubtitle: "完成专属目标，提升认知储备能力",
    completedBadge: "已完成！",
    progress: "进度",
    
    tutorialTitle: "认知数独互动教程",
    tutorialSubtitle: "一步步学习规则与数独逻辑解题技巧",
    prevStep: "上一步",
    nextStep: "下一步",
    finishTutorial: "开始体验！",
    tryInteractive: "互动练习：",
    
    settingsTitle: "游戏设置",
    languageSelect: "语言 / Language",
    autoCheckErrors: "自动检查错误",
    highlightMatchingNumbers: "高亮相同数字",
    highlightRowColBox: "高亮相关行列与九宫格",
    autoClearNotes: "填入数字时自动清除候选笔记",
    themeSelect: "认知视觉主题",
    resetData: "重置数据与统计",
    resetConfirm: "您确定要重置所有保存的统计数据和进度吗？",
    
    congratsTitle: "出色的大脑神经锻炼！",
    congratsMessage: "您成功解答了数独，极大地刺激了工作记忆与前额叶皮层。",
    cognitiveGain: "获得认知得分",
    playAgain: "再玩一局",
    
    step1Title: "第1步：核心规则",
    step1Desc: "每行9个格子必须包含数字 1 到 9 且不能重复。",
    step2Title: "第2步：列与九宫格",
    step2Desc: "9个垂直列和9个3x3九宫格同样必须包含 1 到 9。",
    step3Title: "第3步：视觉扫描与记忆",
    step3Desc: "交叉扫描交叉线，寻找唯一可填数字（显性唯一解）。",
    step4Title: "第4步：铅笔候选笔记模式",
    step4Desc: "使用笔记标记可能数字，减轻工作记忆的认知负荷。",
    step5Title: "第5步：智能逻辑提示系统",
    step5Desc: "提示系统不仅给出答案，更教授数理解题步骤与推断逻辑。"
  },
  ja: {
    appName: "認知数独",
    appSubtitle: "記憶力トレーニング＆脳の回転速度向上",
    tabPlay: "プレイ",
    tabStats: "認知プログレス",
    tabChallenges: "週間チャレンジ",
    tabTutorial: "チュートリアル",
    tabSettings: "設定",
    
    easy: "初級",
    medium: "中級",
    hard: "上級",
    expert: "エキスパート",
    master: "認知マスター",
    
    newGame: "新しいゲーム",
    restart: "やり直し",
    undo: "元に戻す",
    erase: "消去",
    notes: "メモ (鉛筆)",
    smartHint: "スマートヒント",
    pause: "一時停止",
    resume: "再開",
    autoSaved: "自動保存済み",
    mistakes: "ミス数",
    time: "時間",
    difficulty: "難易度",
    
    cognitiveProfile: "認知パフォーマンスプロフィール",
    memoryIndex: "記憶力指数",
    memoryIndexDesc: "ヒントなしで視覚パターンや候補を維持する能力。",
    focusScore: "集中力・正確性",
    focusScoreDesc: "ミスなく正解を入力できた割合。",
    processingSpeed: "処理速度",
    processingSpeedDesc: "正しい推断1回あたりにかかった平均秒数。",
    logicScore: "論理的推論力",
    logicScoreDesc: "ヒントに頼らず複雑なパターンを解く力。",
    overallAgility: "総合的な脳の柔軟性",
    overallAgilityDesc: "総合的な神経認知パフォーマンススコア。",
    streakDays: "連続日数",
    gamesCompleted: "クリア数",
    winRate: "勝率",
    avgTime: "平均時間",
    bestTime: "ベストタイム",
    
    aiCoachTitle: "AI 認知脳コーチ",
    aiCoachSubtitle: "AIによる脳のパフォーマンスと敏捷性の個別分析",
    generateInsight: "AI分析を取得",
    generatingInsight: "認知パターンを分析中...",
    aiStrengths: "強み",
    aiFocusAreas: "改善のポイント",
    aiTip: "今日の脳トレアドバイス",
    
    hintTitle: "論理的推論ヒント",
    hintExplanation: "解説",
    hintApply: "数字を入力",
    hintClose: "了解",
    noHintAvailable: "盤面が完了しているか、エラーはありません。",
    
    weeklyTitle: "週間記憶力チャレンジ",
    weeklySubtitle: "特別ターゲットを達成して認知予備能を強化しましょう",
    completedBadge: "達成！",
    progress: "進捗",
    
    tutorialTitle: "認知数独インタラクティブチュートリアル",
    tutorialSubtitle: "ルールと論理解法をステップ・バイ・ステップで学ぶ",
    prevStep: "前へ",
    nextStep: "次へ",
    finishTutorial: "プレイを開始！",
    tryInteractive: "インタラクティブ練習:",
    
    settingsTitle: "ゲーム設定",
    languageSelect: "言語",
    autoCheckErrors: "エラーを自動チェック",
    highlightMatchingNumbers: "同じ数字をハイライト",
    highlightRowColBox: "行・列・3x3ブロックをハイライト",
    autoClearNotes: "数字入力時にメモを自動消去",
    themeSelect: "認知ビジュアルテーマ",
    resetData: "データと統計をリセット",
    resetConfirm: "本当にすべての統計データと進行状況をリセットしますか？",
    
    congratsTitle: "素晴らしい脳のトレーニング！",
    congratsMessage: "作業記憶と前頭前野を活性化させて数独をクリアしました。",
    cognitiveGain: "獲得認知ポイント",
    playAgain: "もう一度プレイ",
    
    step1Title: "ステップ1: 基本ルール",
    step1Desc: "各行の9つのマスには1から9までの数字が重複なく入ります。",
    step2Title: "ステップ2: 列と3x3ブロック",
    step2Desc: "9つの縦列と9つの3x3ブロックにも同様に1から9が入ります。",
    step3Title: "ステップ3: 視覚スキャン",
    step3Desc: "交差する線をスキャンして一意の数字を見つけ出します。",
    step4Title: "ステップ4: メモモード（鉛筆）",
    step4Desc: "メモ機能を使用して、作業記憶への負担を軽減しましょう。",
    step5Title: "ステップ5: スマート論理ヒント",
    step5Desc: "単に答えを教えるのではなく、論理的な解法ステップを提示します。"
  },
  ru: {
    appName: "Когнитивный Судоку",
    appSubtitle: "Тренировка Памяти и Скорости Мышления",
    tabPlay: "Играть",
    tabStats: "Когнитивный Прогресс",
    tabChallenges: "Еженедельные Задания",
    tabTutorial: "Обучение",
    tabSettings: "Настройки",
    
    easy: "Легкий",
    medium: "Средний",
    hard: "Сложный",
    expert: "Эксперт",
    master: "Мастер Когниции",
    
    newGame: "Новая Игра",
    restart: "Переиграть",
    undo: "Отменить",
    erase: "Стереть",
    notes: "Карандаш (Заметки)",
    smartHint: "Умная Подсказка",
    pause: "Пауза",
    resume: "Продолжить",
    autoSaved: "Игра автосохранена",
    mistakes: "Ошибки",
    time: "Время",
    difficulty: "Сложность",
    
    cognitiveProfile: "Профиль Когнитивной Продуктивности",
    memoryIndex: "Индекс Памяти",
    memoryIndexDesc: "Способность удерживать зрительные шаблоны без подсказок.",
    focusScore: "Фокус и Точность",
    focusScoreDesc: "Процент верных ходов, сделанных без ошибок.",
    processingSpeed: "Скорость Обработки",
    processingSpeedDesc: "Среднее время в секундах на каждое верное логическое решение.",
    logicScore: "Логический Вывод",
    logicScoreDesc: "Эффективность решения сложных схем без подсказок.",
    overallAgility: "Общая Скорость Мышления",
    overallAgilityDesc: "Комбинированная нейрокогнитивная оценка.",
    streakDays: "Дней Подряд",
    gamesCompleted: "Решено Игр",
    winRate: "Процент Побед",
    avgTime: "Среднее Время",
    bestTime: "Рекорд",
    
    aiCoachTitle: "ИИ Когнитивный Тренер",
    aiCoachSubtitle: "Персональный ИИ-анализ ваших интеллектуальных способностей",
    generateInsight: "Получить Анализ ИИ",
    generatingInsight: "Анализ когнитивных паттернов...",
    aiStrengths: "Сильные Стороны",
    aiFocusAreas: "Зоны Роста",
    aiTip: "Нейро-Совет Дня",
    
    hintTitle: "Логическая Подсказка",
    hintExplanation: "Техническое Объяснение",
    hintApply: "Вставить Число",
    hintClose: "Понятно",
    noHintAvailable: "Поле заполнено или ошибок не обнаружено.",
    
    weeklyTitle: "Еженедельные Задания на Память",
    weeklySubtitle: "Выполняйте особые цели для укрепления когнитивного резерва",
    completedBadge: "Выполнено!",
    progress: "Прогресс",
    
    tutorialTitle: "Интерактивный Обучающий Курс",
    tutorialSubtitle: "Изучите правила и логические техники шаг за шагом",
    prevStep: "Назад",
    nextStep: "Вперед",
    finishTutorial: "Начать Играть!",
    tryInteractive: "Интерактивная практика:",
    
    settingsTitle: "Настройки Игры",
    languageSelect: "Язык",
    autoCheckErrors: "Автопроверка ошибок",
    highlightMatchingNumbers: "Подсвечивать одинаковые цифры",
    highlightRowColBox: "Подсвечивать строку, столбец и блок",
    autoClearNotes: "Автоочистка заметок при вводе цифры",
    themeSelect: "Визуальная Тема",
    resetData: "Сбросить Данные и Статистику",
    resetConfirm: "Вы уверены, что хотите сбросить сохраненную статистику?",
    
    congratsTitle: "Отличная Тренировка Мозга!",
    congratsMessage: "Вы решили судоку, активировав рабочую память и префронтальную кору.",
    cognitiveGain: "Получено Когнитивных Очков",
    playAgain: "Сыграть Еще Раз",
    
    step1Title: "Шаг 1: Главное Правило",
    step1Desc: "Каждая строка из 9 клеток должна содержать цифры от 1 до 9 без повторений.",
    step2Title: "Шаг 2: Столбцы и Блоки",
    step2Desc: "Все 9 столбцов и 9 блоков 3x3 также должны содержать числа от 1 до 9.",
    step3Title: "Шаг 3: Визуальный Сканер",
    step3Desc: "Пересекайте линии для поиска единственной возможной цифры.",
    step4Title: "Шаг 4: Заметки Карандашом",
    step4Desc: "Используйте заметки, чтобы разгрузить рабочую память.",
    step5Title: "Шаг 5: Умные Подсказки",
    step5Desc: "Наша система объясняет математическую логику шаг за шагом."
  }
};
