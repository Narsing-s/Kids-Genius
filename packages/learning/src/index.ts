export type Language = "en" | "te";
export const ageBands = [
 {id:"tiny-explorers",name:"Tiny Explorers",minAge:1,maxAge:2,emoji:"🐣",description:"Parent-assisted sounds, pictures and recognition"},
 {id:"little-learners",name:"Little Learners",minAge:3,maxAge:4,emoji:"🧸",description:"First words, colors, shapes and counting"},
 {id:"junior-stars",name:"Junior Stars",minAge:5,maxAge:6,emoji:"⭐",description:"Early reading, writing and number skills"},
 {id:"smart-kids",name:"Smart Kids",minAge:7,maxAge:8,emoji:"🚀",description:"Core subjects, reasoning and discovery"},
 {id:"young-champions",name:"Young Champions",minAge:9,maxAge:10,emoji:"🏆",description:"Deeper concepts and problem solving"}
] as const;
export const subjects = [
 {id:"language",name:{en:"English & Telugu",te:"ఆంగ్లం & తెలుగు"},emoji:"🔤",description:"Letters, vocabulary, reading and grammar"},
 {id:"math",name:{en:"Mathematics",te:"గణితం"},emoji:"🔢",description:"Counting, arithmetic, shapes and patterns"},
 {id:"science",name:{en:"Science",te:"విజ్ఞాన శాస్త్రం"},emoji:"🔬",description:"Nature, animals, plants, body and space"},
 {id:"social",name:{en:"Social Studies & GK",te:"సామాజిక శాస్త్రం & సాధారణ జ్ఞానం"},emoji:"🌍",description:"India, geography, history and the world"},
 {id:"life-skills",name:{en:"Life Skills",te:"జీవన నైపుణ్యాలు"},emoji:"🧼",description:"Hygiene, safety, kindness and habits"},
 {id:"creative",name:{en:"Art & Creativity",te:"కళలు & సృజనాత్మకత"},emoji:"🎨",description:"Colors, music, drawing and imagination"}
] as const;
export const sampleQuestions = [
 {id:"math-001",subjectId:"math",ageBandId:"little-learners",prompt:{en:"How many apples do you see? 🍎🍎",te:"ఇక్కడ ఎన్ని ఆపిల్స్ ఉన్నాయి? 🍎🍎"},choices:[{en:"Two",te:"రెండు"},{en:"One",te:"ఒకటి"},{en:"Three",te:"మూడు"}],correctChoiceIndex:0,explanation:{en:"There are two apples.",te:"అక్కడ రెండు ఆపిల్స్ ఉన్నాయి."}},
 {id:"science-001",subjectId:"science",ageBandId:"junior-stars",prompt:{en:"Which one gives us light during the day?",te:"పగటిపూట మనకు వెలుతురు ఇచ్చేది ఏది?"},choices:[{en:"Sun",te:"సూర్యుడు"},{en:"Moon",te:"చంద్రుడు"},{en:"Star",te:"నక్షత్రం"}],correctChoiceIndex:0,explanation:{en:"The Sun is our star and gives us daylight.",te:"సూర్యుడు మనకు పగటి వెలుతురు ఇస్తాడు."}}
] as const;
export const isCorrect = (selected:number, answer:number) => selected === answer;
export const canUseTimedQuiz = (age:number) => age >= 5;
