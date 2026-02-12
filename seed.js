/*
  SEED SCRIPT — Run this ONCE to populate your Firebase database
  
  How to run:
  1. Open your deployed B-Line app in Chrome
  2. Open DevTools (right-click → Inspect → Console tab)
  3. Paste this entire script and press Enter
  4. Refresh the page — you'll see all the sample data!
*/

import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js").then(({initializeApp})=>{
import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js").then(({getFirestore,collection,addDoc,setDoc,doc,Timestamp})=>{

const app=initializeApp({
  apiKey:"AIzaSyBEj2oJXTX-yZMwEeAcXVBgq9_Bk7YjkXs",
  authDomain:"the-b-line.firebaseapp.com",
  projectId:"the-b-line",
  storageBucket:"the-b-line.firebasestorage.app",
  messagingSenderId:"986242881238",
  appId:"1:986242881238:web:ecbd70f2d70f27fdab5b77"
},"seed");
const db=getFirestore(app);
const ts=(hoursAgo)=>Timestamp.fromDate(new Date(Date.now()-hoursAgo*3600000));

async function seed(){
  console.log("🌱 Seeding B-Line database...");
  
  // Settings
  await setDoc(doc(db,"settings","app"),{
    chemoRound:0,totalChemo:12,herceptinMonth:0,totalHerceptin:12,isResting:false,startDate:"2026-02-12"
  });
  console.log("✅ Settings");
  
  // Messages
  const msgs=[
    {author:"Sarah M.",text:"Sending you so much love and strength! You've got this, warrior! 💛",color:"#E84B8A",createdAt:ts(2)},
    {author:"Mike & Jen",text:"Our whole family is rooting for you. You're the toughest person we know. Anything you need — we're here.",color:"#26A69A",createdAt:ts(5)},
    {author:"Coach Williams",text:"Champions don't quit, and neither will you. The whole team sends their love! 🏆",color:"#F4845F",createdAt:ts(24)},
    {author:"Aunt Rose",text:"I lit a candle for you at church today. Praying every single day. Love you sweetheart.",color:"#8E4585",createdAt:ts(28)},
    {author:"David K.",text:"Remember our road trip last summer? We have so many more adventures ahead. Stay strong! 🚗",color:"#FFD54F",createdAt:ts(48)},
  ];
  for(const m of msgs) await addDoc(collection(db,"messages"),m);
  console.log("✅ Messages");
  
  // Updates
  await addDoc(collection(db,"updates"),{author:"Brianna",text:"Round 2 is done! Feeling tired but grateful for all the love. The messages keep me going — thank you all so much. 🌻",isPrivate:false,createdAt:ts(3)});
  await addDoc(collection(db,"updates"),{author:"Dan",text:"She's resting well today. The doctors are really happy with how things are going. Keep those good vibes coming! 🙌",isPrivate:false,createdAt:ts(24)});
  console.log("✅ Updates");
  
  // Shows
  const shows=[
    {title:"The Bear",platform:"Hulu",genre:"Drama",note:"Intense but SO good. Perfect for binge-watching!",author:"Sarah M.",saved:false,createdAt:ts(12)},
    {title:"Ted Lasso",platform:"Apple TV+",genre:"Feel-Good",note:"The most uplifting show ever made. You WILL smile.",author:"Mike & Jen",saved:false,createdAt:ts(20)},
    {title:"Our Planet",platform:"Netflix",genre:"Documentary",note:"Beautiful and calming. Great for relaxing during treatment.",author:"Aunt Rose",saved:false,createdAt:ts(36)},
  ];
  for(const s of shows) await addDoc(collection(db,"shows"),s);
  console.log("✅ Shows");
  
  // Music
  const songs=[
    {title:"Here Comes the Sun — The Beatles",platform:"Spotify",genre:"Classic",note:"Because the sun always comes back out. ☀️",author:"David K.",saved:false,createdAt:ts(10)},
    {title:"Fight Song — Rachel Platten",platform:"Apple Music",genre:"Uplifting",note:"Your anthem right now!",author:"Sarah M.",saved:false,createdAt:ts(18)},
    {title:"Three Little Birds — Bob Marley",platform:"Spotify",genre:"Chill",note:"Every little thing is gonna be alright 💛",author:"Coach Williams",saved:false,createdAt:ts(30)},
  ];
  for(const s of songs) await addDoc(collection(db,"music"),s);
  console.log("✅ Music");
  
  // Books
  const books=[
    {title:"The Four Agreements",platform:"Kindle",genre:"Self-Help",note:"Short, powerful, and life-changing. Perfect for quiet days.",author:"Maria G.",saved:false,createdAt:ts(14)},
    {title:"The Midnight Library",platform:"Audible",genre:"Fiction",note:"Beautiful story about second chances. Great on audiobook!",author:"David K.",saved:false,createdAt:ts(22)},
    {title:"When Breath Becomes Air",platform:"Bookshop.org",genre:"Memoir",note:"Deeply moving. A neurosurgeon's perspective on life and meaning.",author:"Aunt Rose",saved:false,createdAt:ts(40)},
    {title:"Year of Yes — Shonda Rhimes",platform:"Audible",genre:"Humor",note:"Funny, empowering, and the audiobook narration is amazing.",author:"Sarah M.",saved:false,createdAt:ts(50)},
  ];
  for(const b of books) await addDoc(collection(db,"books"),b);
  console.log("✅ Books");
  
  // Advice
  const advice=[
    {author:"Lisa (cancer survivor)",text:"Get yourself a really soft blanket for infusion days. It makes such a difference when the room is cold. Also, ginger candies were a lifesaver for nausea.",category:"Comfort Items",helpful:12,color:"#26A69A",createdAt:ts(24)},
    {author:"Tom R.",text:"My wife swore by peppermint tea during her treatment. Also — freezing water bottles to hold during infusion can help prevent nail damage (ask your doctor about this).",category:"Nausea Relief",helpful:8,color:"#F4845F",createdAt:ts(48)},
    {author:"Maria G.",text:"Don't feel bad about resting. Your body is fighting hard. Let people help you. That's the hardest part but also the most important.",category:"Emotional Support",helpful:15,color:"#E84B8A",createdAt:ts(72)},
  ];
  for(const a of advice) await addDoc(collection(db,"advice"),a);
  console.log("✅ Advice");
  
  console.log("🌻 Done! Refresh your B-Line app to see the data.");
}

seed().catch(console.error);
})});
