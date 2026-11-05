import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { ageBands, subjects, sampleQuestions } from "@kids-genius/learning";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [ageId, setAgeId] = useState("little-learners");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const question = sampleQuestions[questionIndex % sampleQuestions.length];
  const activeAge = ageBands.find((a) => a.id === ageId) ?? ageBands[1];
  const labels = language === "en"
    ? { tagline: "A little learning. A lot of wonder.", hero: "Big dreams begin with curious minds.", intro: "A joyful world of stories, games and discoveries.", levels: "Choose your adventure", subjects: "Explore learning worlds", quiz: "Quick brain boost", next: "Next question", correct: "Brilliant! You got it! 🌟", wrong: "Good try! Keep growing!", parents: "A safe space for little learners" }
    : { tagline: "చిన్న పాఠాలు. ఎన్నో అద్భుతాలు.", hero: "ఆసక్తితో నేర్చుకుంటే కలలు నిజమవుతాయి.", intro: "కథలు, ఆటలు మరియు కొత్త విషయాలతో ఆనంద ప్రపంచం.", levels: "మీ సాహసాన్ని ఎంచుకోండి", subjects: "అభ్యాస ప్రపంచాలు", quiz: "చిన్న మెదడు వ్యాయామం", next: "తదుపరి ప్రశ్న", correct: "అద్భుతం! సరైన సమాధానం! 🌟", wrong: "మంచి ప్రయత్నం! కొనసాగించండి!", parents: "పిల్లల కోసం సురక్షిత ప్రపంచం" };
  const isCorrect = answer === question.correctChoiceIndex;

  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.nav}><Text style={s.brand}>✦ kids<Text style={s.brandAccent}>genius</Text></Text><Pressable style={s.lang} onPress={() => setLanguage(language === "en" ? "te" : "en")}><Text style={s.langText}>{language === "en" ? "తెలుగు" : "English"}</Text></Pressable></View>
      <View style={s.hero}><Text style={s.eyebrow}>✦ {labels.tagline}</Text><Text style={s.heroTitle}>{labels.hero}</Text><Text style={s.body}>{labels.intro}</Text><Text style={s.planet}>🌎</Text><View style={s.heroPill}><Text style={s.heroPillText}>🌈 Learn · Play · Grow</Text></View></View>
      <View style={s.mission}><Text style={s.missionIcon}>🎯</Text><View style={{flex:1}}><Text style={s.kicker}>TODAY'S LITTLE MISSION</Text><Text style={s.missionText}>One fun question. One bright new star!</Text></View><Text style={s.star}>⭐ {stars}</Text></View>
      <Text style={s.heading}>{labels.levels}</Text><Text style={s.subheading}>Pick the path that feels just right.</Text>
      <View style={s.ageGrid}>{ageBands.map((a) => <Pressable key={a.id} onPress={() => setAgeId(a.id)} style={[s.ageCard, ageId === a.id && s.selected]}><Text style={s.emoji}>{a.emoji}</Text><Text style={s.ageRange}>AGES {a.minAge}–{a.maxAge}</Text><Text style={s.cardTitle}>{a.name}</Text><Text style={s.small}>{a.description}</Text></Pressable>)}</View>
      <Text style={s.selectedNote}>✨ Your path: {activeAge.name}</Text>
      <Text style={s.heading}>{labels.subjects}</Text><View style={s.subjectGrid}>{subjects.map((a) => <View key={a.id} style={s.subjectCard}><Text style={s.subjectEmoji}>{a.emoji}</Text><View style={{flex:1}}><Text style={s.subjectTitle}>{a.name[language]}</Text><Text style={s.small}>{a.description}</Text></View><Text style={s.arrow}>↗</Text></View>)}</View>
      <View style={s.quiz}><Text style={s.kicker}>READY, SET, THINK!</Text><Text style={s.heading}>{labels.quiz}</Text><Text style={s.question}>{question.prompt[language]}</Text>{question.choices.map((choice, index) => <Pressable key={index} disabled={answer !== null} onPress={() => { setAnswer(index); if (index === question.correctChoiceIndex) setStars((v) => v + 1); }} style={[s.option, answer === index && (isCorrect ? s.correct : s.incorrect), answer !== null && index === question.correctChoiceIndex && s.correct]}><Text style={s.optionLetter}>{String.fromCharCode(65 + index)}</Text><Text style={s.optionText}>{choice[language]}</Text><Text style={s.arrow}>→</Text></Pressable>)}{answer !== null && <Text style={[s.feedback, {color:isCorrect ? "#299b69" : "#bd7a42"}]}>{isCorrect ? labels.correct : labels.wrong}</Text>}<Pressable disabled={answer === null} onPress={() => { setQuestionIndex((v) => v + 1); setAnswer(null); }} style={[s.next, answer === null && {opacity:0.4}]}><Text style={s.nextText}>{labels.next} →</Text></Pressable></View>
      <View style={s.parent}><Text style={s.parentIcon}>🛡️</Text><Text style={s.parentTitle}>{labels.parents}</Text><Text style={s.small}>Parent-managed profiles · No public chat · No behavioural ads</Text></View>
      <Text style={s.footer}>Made with curiosity 💜 Kids Genius</Text>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  page:{padding:18,paddingTop:52,paddingBottom:40,backgroundColor:"#fffdf8"},
  nav:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:20},
  brand:{fontSize:25,fontWeight:"900",color:"#202447"},brandAccent:{color:"#6857e8"},
  lang:{backgroundColor:"#f0edff",paddingVertical:9,paddingHorizontal:13,borderRadius:12},langText:{fontWeight:"800",color:"#6857e8",fontSize:12},
  hero:{backgroundColor:"#f0edff",padding:22,borderRadius:24,overflow:"hidden"},
  eyebrow:{fontSize:10,fontWeight:"900",letterSpacing:1,color:"#6857e8"},
  heroTitle:{fontSize:35,lineHeight:40,fontWeight:"900",color:"#202447",marginTop:16},
  body:{fontSize:13,lineHeight:21,color:"#777b98",marginTop:10},
  planet:{fontSize:100,textAlign:"center",marginTop:5},
  heroPill:{alignSelf:"flex-start",backgroundColor:"#ffffffaa",paddingVertical:9,paddingHorizontal:13,borderRadius:20},
  heroPillText:{fontSize:11,fontWeight:"800",color:"#6857e8"},
  mission:{flexDirection:"row",alignItems:"center",gap:11,backgroundColor:"#fff7e4",borderRadius:16,padding:13,marginTop:18},
  missionIcon:{fontSize:25},kicker:{fontSize:9,fontWeight:"900",letterSpacing:1,color:"#8d75c9"},
  missionText:{fontSize:11,fontWeight:"700",color:"#202447",marginTop:4},star:{fontSize:12,fontWeight:"900",color:"#bd8b29"},
  heading:{fontSize:24,fontWeight:"900",color:"#202447",marginTop:28,marginBottom:5},
  subheading:{fontSize:12,color:"#8588a0",marginBottom:14},
  ageGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  ageCard:{width:"48%",minHeight:145,backgroundColor:"#f0edff",borderRadius:17,padding:13,borderWidth:1,borderColor:"transparent"},
  selected:{borderColor:"#6857e8",backgroundColor:"#f5f2ff"},
  emoji:{fontSize:29},ageRange:{fontSize:8,fontWeight:"900",letterSpacing:1,color:"#8588a0",marginTop:8},
  cardTitle:{fontSize:14,fontWeight:"900",color:"#202447",marginTop:4},small:{fontSize:10,lineHeight:15,color:"#8588a0",marginTop:4},
  selectedNote:{fontSize:11,color:"#6857e8",fontWeight:"800",marginTop:12},
  subjectGrid:{gap:9,marginTop:12},subjectCard:{flexDirection:"row",alignItems:"center",gap:12,backgroundColor:"white",padding:13,borderRadius:15,borderWidth:1,borderColor:"#efedf7"},
  subjectEmoji:{fontSize:25,width:42,textAlign:"center"},subjectTitle:{fontSize:12,fontWeight:"900",color:"#202447"},arrow:{fontSize:16,color:"#aaa4d9"},
  quiz:{backgroundColor:"#eaf8f3",padding:18,borderRadius:20,marginTop:30},
  question:{fontSize:19,fontWeight:"900",color:"#202447",marginVertical:18},
  option:{flexDirection:"row",alignItems:"center",gap:10,backgroundColor:"white",padding:12,borderRadius:12,borderWidth:1,borderColor:"#eeedf5",marginBottom:8},
  optionLetter:{backgroundColor:"#efedff",color:"#6857e8",fontWeight:"900",padding:8,borderRadius:8,fontSize:10},
  optionText:{flex:1,fontWeight:"800",fontSize:12,color:"#202447"},correct:{borderColor:"#7bc9a2",backgroundColor:"#effbf4"},incorrect:{borderColor:"#f1a3a9",backgroundColor:"#fff3f3"},
  feedback:{fontSize:12,fontWeight:"900",marginTop:5},next:{backgroundColor:"#6857e8",padding:13,borderRadius:11,alignItems:"center",marginTop:13},nextText:{color:"white",fontWeight:"900",fontSize:11},
  parent:{backgroundColor:"#fff3e8",padding:20,borderRadius:18,marginTop:25,alignItems:"center"},parentIcon:{fontSize:30},parentTitle:{fontSize:17,fontWeight:"900",color:"#202447",marginTop:8},
  footer:{textAlign:"center",fontSize:10,color:"#999bb0",marginTop:25}
});
