// Экспортируем массив данных, чтобы его можно было импортировать в App.jsx
export const levelsData = [
  {
    id: 1,
    title: "Chapter I: The CV Blueprint",
    story: "Help the duck make a perfect CV to get a job at the local corporate bakery.",
    video: "/videoChapter1.mp4",
    quizBg: "/backgroundChapter1.jpg",
    themeClass: "theme-chapter-1",
    questions: [ 
      { text: "Max CV length?", options: ["1-2 pages", "3-4 pages", "5 pages", "A whole novel"], correct: 0 },
      { text: "Work experience order?", options: ["Alphabetical", "Newest first", "Oldest first", "Random"], correct: 1 },
      { text: "Best email address?", options: ["quack99@pond.com", "bread_lover@bakery.net", "name.surname@mail.com", "sir.duck@empire.org"], correct: 2 },
      { text: "Strongest action verb?", options: ["Helped with", "Spearheaded", "Watched over", "Was okay at"], correct: 1 },
      { text: "Include pond hobbies?", options: ["Half page", "Only if relevant", "Strictly illegal", "Giant bold text"], correct: 1 },
      { text: "Cover letter purpose?", options: ["Copy CV text", "Explain why you fit", "Demand high pay", "Write a poem"], correct: 1 },
      { text: "Safest file format?", options: ["Word (.docx)", "Photoshop (.psd)", "PDF (.pdf)", "Text (.txt)"], correct: 2 }
    ],
  },
  {
    id: 2,
    title: "Chapter II: Casino Royale",
    story: "Play cards perfectly in the underground casino to win your initial capital.",
    video: "/videoChapter2.mp4",
    quizBg: "/backgroundChapter2.jpg",
    themeClass: "theme-chapter-2",
    questions: [
      { text: "Cards in a standard deck?", options: ["36", "48", "52", "64"], correct: 2 },
      { text: "Most popular poker variant?", options: ["Omaha", "Texas Hold'em", "Stud", "Draw"], correct: 1 },
      { text: "Blackjack target score?", options: ["11", "15", "21", "100"], correct: 2 },
      { text: "What if you go over 21?", options: ["Win double", "Tie", "Bust and lose", "Swap card"], correct: 2 },
      { text: "Which suit is a clover leaf?", options: ["Spades ♠", "Clubs ♣", "Hearts ♥", "Diamonds ♦"], correct: 1 },
      { text: "Name of the discard pile?", options: ["The Muck", "The Pot", "The Ante", "The Burn"], correct: 0 },
      { text: "First 3 community cards?", options: ["Turn", "River", "Flop", "Rainbow"], correct: 2 },
      { text: "The 4th community card?", options: ["Flop", "Turn", "River", "Showdown"], correct: 1 },
      { text: "Which hand beats a Flush?", options: ["Two Pair", "Straight", "Three of a Kind", "Full House"], correct: 3 },
      { text: "Absolute best poker hand?", options: ["Four of a Kind", "Straight Flush", "Royal Flush", "Full House"], correct: 2 }
    ]
  }

  
  /* Код 3 и 4 главы закомментирован, чтобы сейчас работали только 1 и 2 главы
  ,
  {
    id: 3,
    title: "Chapter III: The Shadow Don",
    story: "Command your syndicate, deal with rival gangs, and earn absolute loyalty.",
    video: "/videoChapter3.mp4",
    quizBg: "/backgroundChapter3.jpg",
    themeClass: "theme-chapter-3",
    questions: [
      { id: "gangName", type: "text", text: "Name your duck gang:", placeholder: "Enter gang name..." },
      { id: "priorities", type: "ranking", text: "Rank your gang priorities:", options: ["Train crew", "Give weapons", "Fortify base", "Plan attack"] },
      { id: "weapon", type: "choice", text: "Choose your weapon:", options: ["Tommy Gun", "Shotgun", "Crossbow", "Blade"] },
      { id: "mercy", type: "choice", text: "What to do with the captured rival boss?", options: ["Spare them", "Kill them"] },
      { id: "bases", type: "choice", text: "What to do with captured rival bases?", options: ["Destroy them", "Occupy them"] },
      { id: "loyalty", type: "choice", text: "How to keep your crew loyal?", options: ["Pay them money", "Earn respect in battle"] },
      { id: "income", type: "choice", text: "Choose your main source of money:", options: ["Smuggling at docks", "Protection racket"] }
    ]
  },
  {
    id: 4,
    title: "Chapter IV: The Imperial Crown",
    story: "Dynamic Text",
    video: "/videoChapter4.mp4",
    quizBg: "/backgroundChapter4.jpg",
    themeClass: "theme-chapter-4",
    questions: [
      { id: "kingdomName", type: "text", text: "Name your new Kingdom:", placeholder: "Enter kingdom name..." },
      { id: "government", type: "choice", text: "Form of government:", options: ["Absolute Monarchy", "Technocracy", "Feudal Hegemony", "The Bread Syndicate"] },
      { id: "foreignPolicy", type: "choice", text: "Foreign policy:", options: ["War and Conquest", "Trade and Alliance"] },
      { id: "domesticPolicy", type: "choice", text: "How to handle public riots?", options: ["Use military force", "Give free food"] },
      { id: "capitalType", type: "choice", text: "Where to build the capital?", options: ["Golden Citadel", "Iron Bunker"] },
      { id: "grandStrategy", type: "choice", text: "Ultimate imperial focus:", options: ["Total Industry", "Cosmic Ascension"] }
    ]
  }
  */
];