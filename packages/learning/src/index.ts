export type Language = "en" | "te";
export type BilingualText = { en: string; te: string };

export const gradeLevels = [
 {id:"nursery",label:"Nursery",minAge:3,maxAge:3,ageBandId:"little-learners",emoji:"🧸",description:"Play, pictures, sounds and first words"},
 {id:"lkg",label:"LKG",minAge:4,maxAge:4,ageBandId:"little-learners",emoji:"🌈",description:"Letters, numbers, colours and discovery"},
 {id:"ukg",label:"UKG",minAge:5,maxAge:5,ageBandId:"junior-stars",emoji:"⭐",description:"Early reading, writing and number sense"},
 ...Array.from({length:10},(_,i)=>({id:`class-${i+1}`,label:`Class ${i+1}`,minAge:i+6,maxAge:i+6,ageBandId:i<2?"junior-stars":i<4?"smart-kids":"young-champions",emoji:["🚀","🧠","🔭","🏅","🎓"][i%5],description:["Build strong foundations","Practice and explore","Think deeper and solve"][i<2?0:i<5?1:2]}))
] as const;

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
 {id:"creative",name:{en:"Art & Creativity",te:"కళలు & సృజనాత్మకత"},emoji:"🎨",description:"Colors, music, drawing and imagination"},

 {id:"hindi",name:{en:"Hindi",te:"హిందీ"},emoji:"📝",description:"Hindi reading, writing and grammar"},
 {id:"physics",name:{en:"Physics",te:"భౌతిక శాస్త్రం"},emoji:"⚡",description:"Motion, energy, forces and the universe"},
 {id:"chemistry",name:{en:"Chemistry",te:"రసాయన శాస్త్రం"},emoji:"🧪",description:"Matter, elements, reactions and materials"},
 {id:"biology",name:{en:"Biology",te:"జీవ శాస్త్రం"},emoji:"🧬",description:"Living things, cells, plants and the human body"},
 {id:"history",name:{en:"History",te:"చరిత్ర"},emoji:"🏛️",description:"People, timelines, civilizations and heritage"},
 {id:"geography",name:{en:"Geography",te:"భూగోళ శాస్త్రం"},emoji:"🗺️",description:"Earth, maps, climate and places"},
 {id:"civics",name:{en:"Civics & Political Science",te:"పౌరశాస్త్రం & రాజకీయ శాస్త్రం"},emoji:"🏛️",description:"Constitution, democracy, rights and citizenship"},
 {id:"economics",name:{en:"Economics",te:"ఆర్థిక శాస్త్రం"},emoji:"📈",description:"Money, markets, resources and choices"},
 {id:"computer",name:{en:"Computer Science",te:"కంప్యూటర్ సైన్స్"},emoji:"💻",description:"Digital skills, coding and computational thinking"},
 {id:"environment",name:{en:"Environmental Studies",te:"పర్యావరణ అధ్యయనం"},emoji:"🌱",description:"Ecology, sustainability and our planet"},
 {id:"physical",name:{en:"Physical Education & Health",te:"శారీరక విద్య & ఆరోగ్యం"},emoji:"⚽",description:"Movement, fitness, wellbeing and healthy habits"},
 {id:"commerce",name:{en:"Commerce & Business Basics",te:"వాణిజ్యం & వ్యాపార మౌలికాలు"},emoji:"💼",description:"Business, accounting and entrepreneurship"},
] as const;

export type LearningQuestion = {
 id:string; subjectId:string; ageBandId:string; gradeId?:string; prompt:BilingualText;
 choices:BilingualText[]; correctChoiceIndex:number; explanation:BilingualText;
};

export const questionBank: LearningQuestion[] = [
 {id:"math-001",subjectId:"math",ageBandId:"little-learners",prompt:{en:"How many apples do you see? 🍎🍎",te:"ఇక్కడ ఎన్ని ఆపిల్స్ ఉన్నాయి? 🍎🍎"},choices:[{en:"Two",te:"రెండు"},{en:"One",te:"ఒకటి"},{en:"Three",te:"మూడు"}],correctChoiceIndex:0,explanation:{en:"There are two apples.",te:"అక్కడ రెండు ఆపిల్స్ ఉన్నాయి."}},
 {id:"science-001",subjectId:"science",ageBandId:"junior-stars",prompt:{en:"Which one gives us light during the day?",te:"పగటిపూట మనకు వెలుతురు ఇచ్చేది ఏది?"},choices:[{en:"Sun",te:"సూర్యుడు"},{en:"Moon",te:"చంద్రుడు"},{en:"Star",te:"నక్షత్రం"}],correctChoiceIndex:0,explanation:{en:"The Sun gives us daylight.",te:"సూర్యుడు మనకు పగటి వెలుతురు ఇస్తాడు."}},
 {id:"language-001",subjectId:"language",ageBandId:"little-learners",prompt:{en:"Which letter does Apple begin with?",te:"ఆపిల్ ఏ అక్షరంతో ప్రారంభమవుతుంది?"},choices:[{en:"A",te:"ఏ"},{en:"B",te:"బీ"},{en:"C",te:"సీ"}],correctChoiceIndex:0,explanation:{en:"Apple begins with the letter A.",te:"Apple అనే పదం A అక్షరంతో మొదలవుతుంది."}},
 {id:"math-002",subjectId:"math",ageBandId:"junior-stars",prompt:{en:"What is 5 + 3?",te:"5 + 3 ఎంత?"},choices:[{en:"7",te:"7"},{en:"8",te:"8"},{en:"9",te:"9"}],correctChoiceIndex:1,explanation:{en:"Five plus three makes eight.",te:"ఐదుకు మూడు కలిపితే ఎనిమిది."}},
 {id:"science-002",subjectId:"science",ageBandId:"little-learners",prompt:{en:"Which animal says 'meow'?",te:"'మ్యావ్' అని ఏ జంతువు అంటుంది?"},choices:[{en:"Dog 🐶",te:"కుక్క 🐶"},{en:"Cat 🐱",te:"పిల్లి 🐱"},{en:"Cow 🐮",te:"ఆవు 🐮"}],correctChoiceIndex:1,explanation:{en:"A cat says meow.",te:"పిల్లి మ్యావ్ అని అంటుంది."}},
 {id:"social-001",subjectId:"social",ageBandId:"junior-stars",prompt:{en:"What is the capital of India?",te:"భారతదేశ రాజధాని ఏది?"},choices:[{en:"Mumbai",te:"ముంబై"},{en:"New Delhi",te:"న్యూఢిల్లీ"},{en:"Chennai",te:"చెన్నై"}],correctChoiceIndex:1,explanation:{en:"New Delhi is the capital of India.",te:"న్యూఢిల్లీ భారతదేశ రాజధాని."}},
 {id:"life-001",subjectId:"life-skills",ageBandId:"little-learners",prompt:{en:"When should we wash our hands?",te:"మన చేతులను ఎప్పుడు కడుక్కోవాలి?"},choices:[{en:"Before eating",te:"భోజనం ముందు"},{en:"Never",te:"ఎప్పుడూ కాదు"},{en:"Only at night",te:"రాత్రి మాత్రమే"}],correctChoiceIndex:0,explanation:{en:"Wash hands before eating and after using the toilet.",te:"భోజనం ముందు, మరుగుదొడ్డి ఉపయోగించిన తర్వాత చేతులు కడుక్కోవాలి."}},
 {id:"creative-001",subjectId:"creative",ageBandId:"little-learners",prompt:{en:"Which two colours make green?",te:"ఏ రెండు రంగులు కలిపితే ఆకుపచ్చ వస్తుంది?"},choices:[{en:"Red + blue",te:"ఎరుపు + నీలం"},{en:"Blue + yellow",te:"నీలం + పసుపు"},{en:"Black + white",te:"నలుపు + తెలుపు"}],correctChoiceIndex:1,explanation:{en:"Blue and yellow make green.",te:"నీలం, పసుపు కలిపితే ఆకుపచ్చ వస్తుంది."}},
 {id:"math-003",subjectId:"math",ageBandId:"smart-kids",prompt:{en:"What is 9 × 4?",te:"9 × 4 ఎంత?"},choices:[{en:"32",te:"32"},{en:"36",te:"36"},{en:"40",te:"40"}],correctChoiceIndex:1,explanation:{en:"Nine groups of four make thirty-six.",te:"నాలుగును తొమ్మిది సార్లు కలిపితే ముప్పై ఆరు."}},
 {id:"science-003",subjectId:"science",ageBandId:"smart-kids",prompt:{en:"Which part of a plant absorbs water?",te:"మొక్కలో నీటిని పీల్చుకునే భాగం ఏది?"},choices:[{en:"Roots",te:"వేర్లు"},{en:"Flowers",te:"పూలు"},{en:"Fruits",te:"పండ్లు"}],correctChoiceIndex:0,explanation:{en:"Roots absorb water from the soil.",te:"వేర్లు నేల నుంచి నీటిని పీల్చుకుంటాయి."}},
 {id:"language-002",subjectId:"language",ageBandId:"junior-stars",prompt:{en:"Choose the opposite of 'hot'.",te:"'వేడి'కి వ్యతిరేక పదం ఏది?"},choices:[{en:"Warm",te:"వెచ్చని"},{en:"Cold",te:"చల్లని"},{en:"Bright",te:"ప్రకాశవంతమైన"}],correctChoiceIndex:1,explanation:{en:"The opposite of hot is cold.",te:"వేడికి వ్యతిరేక పదం చల్లని."}},
 {id:"social-002",subjectId:"social",ageBandId:"smart-kids",prompt:{en:"How many states are there in India?",te:"భారతదేశంలో ఎన్ని రాష్ట్రాలు ఉన్నాయి?"},choices:[{en:"28",te:"28"},{en:"29",te:"29"},{en:"30",te:"30"}],correctChoiceIndex:0,explanation:{en:"India has 28 states and 8 union territories.",te:"భారతదేశంలో 28 రాష్ట్రాలు, 8 కేంద్రపాలిత ప్రాంతాలు ఉన్నాయి."}},
 {id:"life-002",subjectId:"life-skills",ageBandId:"junior-stars",prompt:{en:"What should you do if you feel unsafe or get lost?",te:"మీకు భయం వేసినా లేదా దారి తప్పినా ఏమి చేయాలి?"},choices:[{en:"Go with a stranger",te:"తెలియని వ్యక్తితో వెళ్లాలి"},{en:"Find a trusted adult",te:"నమ్మకమైన పెద్దవారిని సంప్రదించాలి"},{en:"Hide alone",te:"ఒంటరిగా దాక్కోవాలి"}],correctChoiceIndex:1,explanation:{en:"Find a trusted grown-up and ask for help.",te:"నమ్మకమైన పెద్దవారిని కనుగొని సహాయం అడగాలి."}},
 {id:"math-004",subjectId:"math",ageBandId:"young-champions",prompt:{en:"A book costs ₹35. What do 3 books cost?",te:"ఒక పుస్తకం ధర ₹35. మూడు పుస్తకాల ధర ఎంత?"},choices:[{en:"₹95",te:"₹95"},{en:"₹105",te:"₹105"},{en:"₹115",te:"₹115"}],correctChoiceIndex:1,explanation:{en:"35 × 3 = 105.",te:"35 × 3 = 105."}},
 {id:"science-004",subjectId:"science",ageBandId:"young-champions",prompt:{en:"Which process turns water vapour into tiny water droplets?",te:"నీటి ఆవిరి చిన్న నీటి బిందువులుగా మారే ప్రక్రియ ఏది?"},choices:[{en:"Evaporation",te:"ఆవిరీభవనం"},{en:"Condensation",te:"సంగ్రహణం"},{en:"Melting",te:"ద్రవీభవనం"}],correctChoiceIndex:1,explanation:{en:"Condensation changes water vapour into liquid droplets.",te:"సంగ్రహణం వల్ల నీటి ఆవిరి ద్రవ బిందువులుగా మారుతుంది."}},
 {id:"social-003",subjectId:"social",ageBandId:"young-champions",prompt:{en:"Which imaginary line divides Earth into Northern and Southern Hemispheres?",te:"భూమిని ఉత్తర, దక్షిణ అర్ధగోళాలుగా విభజించే కల్పిత రేఖ ఏది?"},choices:[{en:"Equator",te:"భూమధ్యరేఖ"},{en:"Prime Meridian",te:"ప్రధాన మధ్యాహ్న రేఖ"},{en:"Tropic of Cancer",te:"కర్కాటక రేఖ"}],correctChoiceIndex:0,explanation:{en:"The Equator divides Earth into two hemispheres.",te:"భూమధ్యరేఖ భూమిని రెండు అర్ధగోళాలుగా విభజిస్తుంది."}},
 {id:"language-003",subjectId:"language",ageBandId:"smart-kids",prompt:{en:"Which word is a noun?",te:"కింది వాటిలో నామవాచకం ఏది?"},choices:[{en:"Quickly",te:"త్వరగా"},{en:"Beautiful",te:"అందమైన"},{en:"Garden",te:"తోట"}],correctChoiceIndex:2,explanation:{en:"Garden is a noun because it names a place.",te:"Garden ఒక స్థలాన్ని సూచిస్తుంది కాబట్టి అది నామవాచకం."}},
 {id:"creative-002",subjectId:"creative",ageBandId:"junior-stars",prompt:{en:"Which shape has three sides?",te:"మూడు భుజాలు ఉన్న ఆకారం ఏది?"},choices:[{en:"Circle",te:"వృత్తం"},{en:"Triangle",te:"త్రిభుజం"},{en:"Square",te:"చతురస్రం"}],correctChoiceIndex:1,explanation:{en:"A triangle has three sides.",te:"త్రిభుజానికి మూడు భుజాలు ఉంటాయి."}}
];


type GradeMathSeed = { prompt: BilingualText; choices: BilingualText[]; answer: number; explanation: BilingualText };
const gradeMathSeeds: Record<string, GradeMathSeed[]> = {
 nursery: [
  {prompt:{en:"Count the stars: ⭐ ⭐ ⭐",te:"నక్షత్రాలను లెక్కించండి: ⭐ ⭐ ⭐"},choices:[{en:"2",te:"2"},{en:"3",te:"3"},{en:"4",te:"4"}],answer:1,explanation:{en:"There are three stars.",te:"మూడు నక్షత్రాలు ఉన్నాయి."}},
  {prompt:{en:"Which number comes after 1?",te:"1 తర్వాత వచ్చే సంఖ్య ఏది?"},choices:[{en:"2",te:"2"},{en:"3",te:"3"},{en:"1",te:"1"}],answer:0,explanation:{en:"The number after one is two.",te:"ఒకటి తర్వాత రెండు వస్తుంది."}},
  {prompt:{en:"Which group has more: 🍎 or 🍎🍎?",te:"ఏ గుంపులో ఎక్కువ ఆపిల్స్ ఉన్నాయి: 🍎 లేదా 🍎🍎?"},choices:[{en:"One apple",te:"ఒక ఆపిల్"},{en:"Two apples",te:"రెండు ఆపిల్స్"},{en:"Same",te:"సమానం"}],answer:1,explanation:{en:"Two is more than one.",te:"రెండు అనేది ఒకటి కంటే ఎక్కువ."}}
 ],
 lkg: [
  {prompt:{en:"What is 2 + 1?",te:"2 + 1 ఎంత?"},choices:[{en:"2",te:"2"},{en:"3",te:"3"},{en:"4",te:"4"}],answer:1,explanation:{en:"Two plus one equals three.",te:"రెండుకు ఒకటి కలిపితే మూడు."}},
  {prompt:{en:"Which shape has no corners?",te:"మూలలు లేని ఆకారం ఏది?"},choices:[{en:"Circle",te:"వృత్తం"},{en:"Square",te:"చతురస్రం"},{en:"Triangle",te:"త్రిభుజం"}],answer:0,explanation:{en:"A circle has no corners.",te:"వృత్తానికి మూలలు ఉండవు."}},
  {prompt:{en:"Which number is bigger: 4 or 2?",te:"4, 2 లో పెద్ద సంఖ్య ఏది?"},choices:[{en:"2",te:"2"},{en:"4",te:"4"},{en:"Both equal",te:"రెండూ సమానం"}],answer:1,explanation:{en:"Four is greater than two.",te:"నాలుగు అనేది రెండు కంటే పెద్దది."}}
 ],
 ukg: [
  {prompt:{en:"What is 5 + 4?",te:"5 + 4 ఎంత?"},choices:[{en:"8",te:"8"},{en:"9",te:"9"},{en:"10",te:"10"}],answer:1,explanation:{en:"Five plus four equals nine.",te:"ఐదుకు నాలుగు కలిపితే తొమ్మిది."}},
  {prompt:{en:"What is 10 − 3?",te:"10 − 3 ఎంత?"},choices:[{en:"6",te:"6"},{en:"7",te:"7"},{en:"8",te:"8"}],answer:1,explanation:{en:"Ten take away three leaves seven.",te:"పది నుంచి మూడు తీసేస్తే ఏడు మిగులుతుంది."}},
  {prompt:{en:"How many sides does a square have?",te:"చతురస్రానికి ఎన్ని భుజాలు ఉంటాయి?"},choices:[{en:"3",te:"3"},{en:"4",te:"4"},{en:"5",te:"5"}],answer:1,explanation:{en:"A square has four equal sides.",te:"చతురస్రానికి నాలుగు సమాన భుజాలు ఉంటాయి."}}
 ],
 "class-1": [
  {prompt:{en:"What is 8 + 7?",te:"8 + 7 ఎంత?"},choices:[{en:"14",te:"14"},{en:"15",te:"15"},{en:"16",te:"16"}],answer:1,explanation:{en:"8 + 7 = 15.",te:"8 + 7 = 15."}},
  {prompt:{en:"What is 16 − 9?",te:"16 − 9 ఎంత?"},choices:[{en:"6",te:"6"},{en:"7",te:"7"},{en:"8",te:"8"}],answer:1,explanation:{en:"16 − 9 = 7.",te:"16 − 9 = 7."}},
  {prompt:{en:"Which number is even?",te:"సరి సంఖ్య ఏది?"},choices:[{en:"13",te:"13"},{en:"18",te:"18"},{en:"21",te:"21"}],answer:1,explanation:{en:"18 is divisible by 2.",te:"18 ను 2 తో భాగించవచ్చు."}}
 ],
 "class-2": [
  {prompt:{en:"What is 6 × 4?",te:"6 × 4 ఎంత?"},choices:[{en:"20",te:"20"},{en:"24",te:"24"},{en:"28",te:"28"}],answer:1,explanation:{en:"Six groups of four make 24.",te:"నాలుగును ఆరు సార్లు కలిపితే 24."}},
  {prompt:{en:"What is the value of 5 in 352?",te:"352 లో 5 యొక్క స్థాన విలువ ఎంత?"},choices:[{en:"5",te:"5"},{en:"50",te:"50"},{en:"500",te:"500"}],answer:1,explanation:{en:"The 5 is in the tens place, so its value is 50.",te:"5 పదుల స్థానంలో ఉంది; దాని విలువ 50."}},
  {prompt:{en:"What is 45 ÷ 5?",te:"45 ÷ 5 ఎంత?"},choices:[{en:"8",te:"8"},{en:"9",te:"9"},{en:"10",te:"10"}],answer:1,explanation:{en:"45 divided by 5 equals 9.",te:"45 ను 5 తో భాగిస్తే 9."}}
 ],
 "class-3": [
  {prompt:{en:"What is 125 + 238?",te:"125 + 238 ఎంత?"},choices:[{en:"353",te:"353"},{en:"363",te:"363"},{en:"373",te:"373"}],answer:1,explanation:{en:"125 + 238 = 363.",te:"125 + 238 = 363."}},
  {prompt:{en:"What is 9 × 7?",te:"9 × 7 ఎంత?"},choices:[{en:"56",te:"56"},{en:"63",te:"63"},{en:"72",te:"72"}],answer:1,explanation:{en:"Nine times seven is 63.",te:"తొమ్మిది సార్లు ఏడు 63."}},
  {prompt:{en:"A quarter means which fraction?",te:"పావు భాగాన్ని ఏ భిన్నం సూచిస్తుంది?"},choices:[{en:"1/2",te:"1/2"},{en:"1/3",te:"1/3"},{en:"1/4",te:"1/4"}],answer:2,explanation:{en:"One quarter is one of four equal parts.",te:"నాలుగు సమాన భాగాల్లో ఒక భాగం పావు."}}
 ],
 "class-4": [
  {prompt:{en:"What is 36 × 12?",te:"36 × 12 ఎంత?"},choices:[{en:"422",te:"422"},{en:"432",te:"432"},{en:"442",te:"442"}],answer:1,explanation:{en:"36 × 12 = 432.",te:"36 × 12 = 432."}},
  {prompt:{en:"Which fraction is equal to 1/2?",te:"1/2 కు సమానమైన భిన్నం ఏది?"},choices:[{en:"2/4",te:"2/4"},{en:"1/3",te:"1/3"},{en:"3/4",te:"3/4"}],answer:0,explanation:{en:"Two quarters make one half.",te:"రెండు పావులు కలిపితే సగం."}},
  {prompt:{en:"How many centimetres are in 2 metres?",te:"2 మీటర్లలో ఎన్ని సెంటీమీటర్లు?"},choices:[{en:"20",te:"20"},{en:"200",te:"200"},{en:"2000",te:"2000"}],answer:1,explanation:{en:"1 metre is 100 centimetres, so 2 metres is 200.",te:"1 మీటరు 100 సెంటీమీటర్లు; 2 మీటర్లు 200."}}
 ],
 "class-5": [
  {prompt:{en:"What is 3/5 + 1/5?",te:"3/5 + 1/5 ఎంత?"},choices:[{en:"4/5",te:"4/5"},{en:"4/10",te:"4/10"},{en:"3/10",te:"3/10"}],answer:0,explanation:{en:"Add the numerators: 3/5 + 1/5 = 4/5.",te:"లవాలను కలపండి: 3/5 + 1/5 = 4/5."}},
  {prompt:{en:"What is 2.5 + 1.75?",te:"2.5 + 1.75 ఎంత?"},choices:[{en:"4.15",te:"4.15"},{en:"4.25",te:"4.25"},{en:"4.5",te:"4.5"}],answer:1,explanation:{en:"Align decimal points: the sum is 4.25.",te:"దశాంశ స్థానాలను సరిపెడితే మొత్తం 4.25."}},
  {prompt:{en:"What is the perimeter of a 6 cm square?",te:"6 సెం.మీ. భుజం ఉన్న చతురస్రం చుట్టుకొలత ఎంత?"},choices:[{en:"12 cm",te:"12 సెం.మీ."},{en:"18 cm",te:"18 సెం.మీ."},{en:"24 cm",te:"24 సెం.మీ."}],answer:2,explanation:{en:"Perimeter = 4 × side = 24 cm.",te:"చుట్టుకొలత = 4 × భుజం = 24 సెం.మీ."}}
 ],
 "class-6": [
  {prompt:{en:"What is 3/4 of 20?",te:"20 లో 3/4 ఎంత?"},choices:[{en:"12",te:"12"},{en:"15",te:"15"},{en:"16",te:"16"}],answer:1,explanation:{en:"20 ÷ 4 × 3 = 15.",te:"20 ÷ 4 × 3 = 15."}},
  {prompt:{en:"What is −4 + 9?",te:"−4 + 9 ఎంత?"},choices:[{en:"5",te:"5"},{en:"−5",te:"−5"},{en:"13",te:"13"}],answer:0,explanation:{en:"Starting at −4 and moving 9 steps right gives 5.",te:"−4 నుంచి 9 అడుగులు కుడివైపు వెళ్తే 5."}},
  {prompt:{en:"Solve: x + 8 = 15.",te:"పరిష్కరించండి: x + 8 = 15."},choices:[{en:"6",te:"6"},{en:"7",te:"7"},{en:"8",te:"8"}],answer:1,explanation:{en:"Subtract 8 from both sides: x = 7.",te:"రెండు వైపులా 8 తీసేస్తే x = 7."}}
 ],
 "class-7": [
  {prompt:{en:"What is 2/3 of 27?",te:"27 లో 2/3 ఎంత?"},choices:[{en:"16",te:"16"},{en:"18",te:"18"},{en:"20",te:"20"}],answer:1,explanation:{en:"27 ÷ 3 × 2 = 18.",te:"27 ÷ 3 × 2 = 18."}},
  {prompt:{en:"Simplify: 3a + 2a.",te:"సరళీకరించండి: 3a + 2a."},choices:[{en:"5a",te:"5a"},{en:"6a",te:"6a"},{en:"5a²",te:"5a²"}],answer:0,explanation:{en:"Like terms add: 3a + 2a = 5a.",te:"సమాన పదాలను కలిపితే 3a + 2a = 5a."}},
  {prompt:{en:"What is the complement of 35°?",te:"35° కు పూరక కోణం ఎంత?"},choices:[{en:"55°",te:"55°"},{en:"145°",te:"145°"},{en:"65°",te:"65°"}],answer:0,explanation:{en:"Complementary angles add to 90°; 90 − 35 = 55°.",te:"పూరక కోణాల మొత్తం 90°; 90 − 35 = 55°."}}
 ],
 "class-8": [
  {prompt:{en:"Solve: 3x − 5 = 16.",te:"పరిష్కరించండి: 3x − 5 = 16."},choices:[{en:"x = 5",te:"x = 5"},{en:"x = 7",te:"x = 7"},{en:"x = 9",te:"x = 9"}],answer:1,explanation:{en:"3x = 21, so x = 7.",te:"3x = 21, కాబట్టి x = 7."}},
  {prompt:{en:"What is the square root of 196?",te:"196 యొక్క వర్గమూలం ఎంత?"},choices:[{en:"12",te:"12"},{en:"14",te:"14"},{en:"16",te:"16"}],answer:1,explanation:{en:"14 × 14 = 196.",te:"14 × 14 = 196."}},
  {prompt:{en:"Expand (a + b)².",te:"(a + b)² ను విస్తరించండి."},choices:[{en:"a² + b²",te:"a² + b²"},{en:"a² + 2ab + b²",te:"a² + 2ab + b²"},{en:"a² − 2ab + b²",te:"a² − 2ab + b²"}],answer:1,explanation:{en:"The identity is a² + 2ab + b².",te:"సూత్రం a² + 2ab + b²."}}
 ],
 "class-9": [
  {prompt:{en:"If 2x + 3 = 13, what is x?",te:"2x + 3 = 13 అయితే x విలువ ఎంత?"},choices:[{en:"4",te:"4"},{en:"5",te:"5"},{en:"6",te:"6"}],answer:1,explanation:{en:"2x = 10, therefore x = 5.",te:"2x = 10, కాబట్టి x = 5."}},
  {prompt:{en:"What is the distance between (0,0) and (3,4)?",te:"(0,0), (3,4) మధ్య దూరం ఎంత?"},choices:[{en:"4",te:"4"},{en:"5",te:"5"},{en:"7",te:"7"}],answer:1,explanation:{en:"Distance = √(3² + 4²) = 5.",te:"దూరం = √(3² + 4²) = 5."}},
  {prompt:{en:"The sum of angles in a triangle is…",te:"త్రిభుజంలోని కోణాల మొత్తం ఎంత?"},choices:[{en:"90°",te:"90°"},{en:"180°",te:"180°"},{en:"360°",te:"360°"}],answer:1,explanation:{en:"The interior angles of every triangle total 180°.",te:"ప్రతి త్రిభుజం అంతర్గత కోణాల మొత్తం 180°."}}
 ],
 "class-10": [
  {prompt:{en:"What are the roots of x² − 5x + 6 = 0?",te:"x² − 5x + 6 = 0 యొక్క మూలాలు ఏమిటి?"},choices:[{en:"2 and 3",te:"2 మరియు 3"},{en:"1 and 6",te:"1 మరియు 6"},{en:"−2 and −3",te:"−2 మరియు −3"}],answer:0,explanation:{en:"Factor: (x − 2)(x − 3) = 0.",te:"విభజిస్తే: (x − 2)(x − 3) = 0."}},
  {prompt:{en:"What is sin 30°?",te:"sin 30° విలువ ఎంత?"},choices:[{en:"1",te:"1"},{en:"1/2",te:"1/2"},{en:"√3/2",te:"√3/2"}],answer:1,explanation:{en:"A standard trigonometric value: sin 30° = 1/2.",te:"ప్రామాణిక త్రికోణమితి విలువ: sin 30° = 1/2."}},
  {prompt:{en:"Find the 10th term of the AP 2, 5, 8, …",te:"2, 5, 8, … సమాంతర శ్రేఢిలో 10వ పదం కనుగొనండి."},choices:[{en:"27",te:"27"},{en:"29",te:"29"},{en:"30",te:"30"}],answer:1,explanation:{en:"aₙ = a + (n−1)d = 2 + 9×3 = 29.",te:"aₙ = a + (n−1)d = 2 + 9×3 = 29."}}
 ]
};

const extraMath = (en:string,te:string,opts:[string,string,string],answer:number,why:string,whyTe:string):GradeMathSeed => ({
 prompt:{en,te}, choices:opts.map(value=>({en:value,te:value})), answer, explanation:{en:why,te:whyTe}
});
const extraMathByGrade: Record<string, GradeMathSeed[]> = {
 nursery:[extraMath("Count the balloons: 🎈🎈🎈🎈","బెలూన్లను లెక్కించండి: 🎈🎈🎈🎈",["3","4","5"],1,"There are four balloons.","నాలుగు బెలూన్లు ఉన్నాయి."),extraMath("You have 1 toy and get 1 more. How many?","మీ దగ్గర 1 బొమ్మ ఉంది; మరో 1 వచ్చింది. మొత్తం ఎన్ని?",["1","2","3"],1,"1 + 1 = 2 toys.","1 + 1 = 2 బొమ్మలు.")],
 lkg:[extraMath("What is 3 + 2?","3 + 2 ఎంత?",["4","5","6"],1,"3 + 2 = 5.","3 + 2 = 5."),extraMath("What is 6 − 2?","6 − 2 ఎంత?",["3","4","5"],1,"6 − 2 = 4.","6 − 2 = 4.")],
 ukg:[extraMath("What is 7 + 5?","7 + 5 ఎంత?",["11","12","13"],1,"7 + 5 = 12.","7 + 5 = 12."),extraMath("What is 9 − 4?","9 − 4 ఎంత?",["4","5","6"],1,"9 − 4 = 5.","9 − 4 = 5.")],
 "class-1":[extraMath("What is 24 + 18?","24 + 18 ఎంత?",["40","42","44"],1,"24 + 18 = 42.","24 + 18 = 42."),extraMath("What is 35 − 17?","35 − 17 ఎంత?",["16","18","20"],1,"35 − 17 = 18.","35 − 17 = 18.")],
 "class-2":[extraMath("What is 7 × 6?","7 × 6 ఎంత?",["40","42","48"],1,"7 groups of 6 make 42.","6 ను 7 సార్లు కలిపితే 42."),extraMath("What is 56 ÷ 8?","56 ÷ 8 ఎంత?",["6","7","8"],1,"56 divided into 8 equal groups gives 7.","56 ను 8 సమాన భాగాలుగా చేస్తే 7.")],
 "class-3":[extraMath("What is 145 + 276?","145 + 276 ఎంత?",["411","421","431"],1,"145 + 276 = 421.","145 + 276 = 421."),extraMath("What is 8 × 9?","8 × 9 ఎంత?",["63","72","81"],1,"Eight times nine is 72.","ఎనిమిది సార్లు తొమ్మిది 72.")],
 "class-4":[extraMath("What is 245 + 138?","245 + 138 ఎంత?",["373","383","393"],1,"245 + 138 = 383.","245 + 138 = 383."),extraMath("What is 24 × 12?","24 × 12 ఎంత?",["268","288","298"],1,"24 × 12 = 288.","24 × 12 = 288.")],
 "class-5":[extraMath("What is 3/8 + 2/8?","3/8 + 2/8 ఎంత?",["4/8","5/8","6/8"],1,"With equal denominators, add the numerators: 5/8.","హారాలు సమానంగా ఉన్నప్పుడు లవాలను కలపాలి: 5/8."),extraMath("What is 4.5 + 2.25?","4.5 + 2.25 ఎంత?",["6.25","6.75","7.25"],1,"Align decimal places: the sum is 6.75.","దశాంశ స్థానాలను సరిపెడితే మొత్తం 6.75.")],
 "class-6":[extraMath("Solve: 2x + 3 = 11.","పరిష్కరించండి: 2x + 3 = 11.",["x = 3","x = 4","x = 5"],1,"2x = 8, so x = 4.","2x = 8, కాబట్టి x = 4."),extraMath("What is −7 + 12?","−7 + 12 ఎంత?",["3","5","7"],1,"Moving 12 units right from −7 gives 5.","−7 నుంచి 12 యూనిట్లు కుడివైపు వెళ్తే 5.")],
 "class-7":[extraMath("Simplify: 3a + 4a.","సరళీకరించండి: 3a + 4a.",["7a","12a","7a²"],0,"Add like terms: 3a + 4a = 7a.","సమాన పదాలను కలిపితే 3a + 4a = 7a."),extraMath("What is 25% of 80?","80 లో 25% ఎంత?",["15","20","25"],1,"25% is one quarter; 80 ÷ 4 = 20.","25% అంటే పావు వంతు; 80 ÷ 4 = 20.")],
 "class-8":[extraMath("Solve: 4x − 9 = 19.","పరిష్కరించండి: 4x − 9 = 19.",["x = 6","x = 7","x = 8"],1,"4x = 28, so x = 7.","4x = 28, కాబట్టి x = 7."),extraMath("What is the square root of 225?","225 యొక్క వర్గమూలం ఎంత?",["13","15","17"],1,"15 × 15 = 225.","15 × 15 = 225.")],
 "class-9":[extraMath("If 3x + 4 = 19, what is x?","3x + 4 = 19 అయితే x ఎంత?",["4","5","6"],1,"3x = 15, so x = 5.","3x = 15, కాబట్టి x = 5."),extraMath("Two angles of a triangle are 65° and 55°. Find the third.","త్రిభుజంలోని రెండు కోణాలు 65°, 55°. మూడవ కోణం ఎంత?",["50°","60°","70°"],1,"180° − 65° − 55° = 60°.","180° − 65° − 55° = 60°.")],
 "class-10":[extraMath("What are the roots of x² − 7x + 12 = 0?","x² − 7x + 12 = 0 యొక్క మూలాలు ఏమిటి?",["2 and 6","3 and 4","1 and 12"],1,"Factor: (x − 3)(x − 4) = 0.","విభజిస్తే: (x − 3)(x − 4) = 0."),extraMath("Find the 12th term of AP 4, 7, 10, …","4, 7, 10, … సమాంతర శ్రేఢిలో 12వ పదం కనుగొనండి.",["34","37","40"],1,"a₁₂ = 4 + 11 × 3 = 37.","a₁₂ = 4 + 11 × 3 = 37.")]
};
Object.entries(extraMathByGrade).forEach(([gradeId,seeds]) => gradeMathSeeds[gradeId].push(...seeds));


function generatedMathPractice(gradeId:string, gradeIndex:number):GradeMathSeed[] {
 const rows:GradeMathSeed[]=[];
 const base=Math.max(1,gradeIndex+1);
 for(let n=0;n<120;n++){
  const kind=n%5, round=Math.floor(n/5)+1;
  let promptEn="",promptTe="",answer=0,whyEn="",whyTe="";
  if(gradeIndex<=2){
   const a=base+round+(kind%2), b=1+(round%4);
   if(kind===0){answer=a+b;promptEn=`Count and add: ${a} objects + ${b} objects = ?`;promptTe=`లెక్కించి కలపండి: ${a} + ${b} = ?`;whyEn=`${a} + ${b} = ${answer}.`;whyTe=`${a} + ${b} = ${answer}.`;}
   else if(kind===1){answer=a;promptEn=`Which number comes after ${a-1}?`;promptTe=`${a-1} తర్వాత వచ్చే సంఖ్య ఏది?`;whyEn=`The next number after ${a-1} is ${a}.`;whyTe=`${a-1} తర్వాత ${a} వస్తుంది.`;}
   else if(kind===2){answer=Math.max(0,a-b);promptEn=`You have ${a} toys and give away ${b}. How many remain?`;promptTe=`మీ దగ్గర ${a} బొమ్మలు ఉన్నాయి; ${b} ఇచ్చారు. ఎన్ని మిగిలాయి?`;whyEn=`${a} − ${b} = ${answer}.`;whyTe=`${a} − ${b} = ${answer}.`;}
   else if(kind===3){answer=4;promptEn="How many sides does a square have?";promptTe="చతురస్రానికి ఎన్ని భుజాలు ఉంటాయి?";whyEn="A square has four sides.";whyTe="చతురస్రానికి నాలుగు భుజాలు ఉంటాయి.";}
   else {answer=round%2===0?3:5;promptEn="How many vowels are there in the English alphabet?";promptTe="ఆంగ్ల అక్షరమాలలో అచ్చులు ఎన్ని?";whyEn="The five vowels are A, E, I, O and U.";whyTe="A, E, I, O, U అనే ఐదు అచ్చులు ఉన్నాయి.";}
  } else {
   const a=base*3+round+2,b=base+1+(round%7);
   if(kind===0){answer=a+b;promptEn=`Calculate: ${a} + ${b}.`;promptTe=`లెక్కించండి: ${a} + ${b}.`;whyEn=`${a} + ${b} = ${answer}.`;whyTe=`${a} + ${b} = ${answer}.`;}
   else if(kind===1){answer=a*b;promptEn=`Calculate: ${a} × ${b}.`;promptTe=`లెక్కించండి: ${a} × ${b}.`;whyEn=`${a} groups of ${b} make ${answer}.`;whyTe=`${a} × ${b} = ${answer}.`;}
   else if(kind===2){const product=a*b;answer=a;promptEn=`Solve: ${product} ÷ ${b}.`;promptTe=`పరిష్కరించండి: ${product} ÷ ${b}.`;whyEn=`${product} divided by ${b} equals ${a}.`;whyTe=`${product} ను ${b} తో భాగిస్తే ${a}.`;}
   else if(kind===3){answer=a-b;promptEn=`Calculate: ${a} − ${b}.`;promptTe=`లెక్కించండి: ${a} − ${b}.`;whyEn=`${a} − ${b} = ${answer}.`;whyTe=`${a} − ${b} = ${answer}.`;}
   else {answer=(round+base)*10;promptEn=`What is ${round+base} × 10?`;promptTe=`${round+base} × 10 ఎంత?`;whyEn="Multiplying a whole number by 10 shifts its digits one place left.";whyTe="పూర్ణ సంఖ్యను 10 తో గుణిస్తే దాని అంకెలు ఒక స్థానం ఎడమకు మారతాయి.";}
  }
  const candidates=[answer,answer+1,answer+2];
  const shift=n%3, ordered=[candidates[shift],candidates[(shift+1)%3],candidates[(shift+2)%3]];
  const correct=ordered.indexOf(answer);
  rows.push({prompt:{en:promptEn,te:promptTe},choices:ordered.map(v=>({en:String(v),te:String(v)})),answer:correct,explanation:{en:whyEn,te:whyTe}});
 }
 return rows;
}
for(const [gradeIndex,grade] of gradeLevels.entries()){
 const seeds=gradeMathSeeds[grade.id] ?? (gradeMathSeeds[grade.id]=[]);
 const generated=generatedMathPractice(grade.id,gradeIndex);
 seeds.push(...generated);
}

const gradeCoreQuestions: LearningQuestion[] = [["nursery","language","Which word starts with B?","B ధ్వనితో మొదలయ్యే పదం ఏది?",["Ball","Apple","Cat"],0,"Ball begins with /b/.","Ball అనే పదం /బ/ ధ్వనితో మొదలవుతుంది."],["nursery","science","Which one is alive?","వీటిలో జీవి ఏది?",["Tree","Stone","Chair"],0,"A tree grows and needs water.","చెట్టు పెరుగుతుంది; దానికి నీరు అవసరం."],["lkg","language","Which word rhymes with sun?","sun తో ప్రాస కలిగిన పదం ఏది?",["Run","Dog","Pen"],0,"Sun and run share an ending sound.","Sun, run పదాలకు చివరి ధ్వని ఒకేలా ఉంటుంది."],["lkg","computer","Which part is used to type?","టైప్ చేయడానికి ఏ భాగాన్ని వాడతారు?",["Keyboard","Speaker","Monitor"],0,"A keyboard has keys for typing.","టైప్ చేయడానికి కీబోర్డ్‌లో కీలు ఉంటాయి."],["ukg","science","Which plant part makes food?","మొక్కకు ఆహారం తయారు చేసే భాగం ఏది?",["Leaves","Roots","Pot"],0,"Leaves use sunlight to make food.","ఆకులు సూర్యకాంతితో ఆహారం తయారు చేస్తాయి."],["ukg","social","What should we do before crossing a road?","రోడ్డు దాటే ముందు ఏమి చేయాలి?",["Look both ways","Run without looking","Play on the road"],0,"Stop, look both ways and cross carefully.","ఆగి, రెండు వైపులా చూసి జాగ్రత్తగా దాటాలి."],["class-1","language","What is the plural of box?","box యొక్క బహువచనం ఏది?",["Boxs","Boxes","Boxies"],1,"Words ending in x usually add -es.","x తో ముగిసే పదాలకు సాధారణంగా -es చేరుతుంది."],["class-1","science","Ice is which state of water?","మంచు నీటి ఏ స్థితి?",["Solid","Liquid","Gas"],0,"Ice is water in its solid state.","మంచు నీటి ఘన స్థితి."],["class-2","social","Why do communities need rules?","సమాజానికి నియమాలు ఎందుకు అవసరం?",["Safety and fairness","Stop all games","Confuse roads"],0,"Rules help people live safely and fairly.","నియమాలు ప్రజలు సురక్షితంగా, న్యాయంగా జీవించడానికి సహాయపడతాయి."],["class-2","computer","What makes a password stronger?","బలమైన పాస్‌వర్డ్‌కు ఏది సహాయపడుతుంది?",["Letters, numbers and symbols","Your name only","12345"],0,"A longer unique password is harder to guess.","పొడవైన ప్రత్యేక పాస్‌వర్డ్‌ను ఊహించడం కష్టం."],["class-3","language","Identify the verb: The children are reading.","The children are reading లో క్రియ ఏది?",["children","are reading","the"],1,"Are reading tells what the children do.","పిల్లలు ఏమి చేస్తున్నారో are reading తెలియజేస్తుంది."],["class-3","science","What do plants need for photosynthesis?","కిరణజన్య సంయోగక్రియకు మొక్కలకు ఏమి అవసరం?",["Sunlight, water and carbon dioxide","Only sand","Only darkness"],0,"Plants use light, water and carbon dioxide to make food.","మొక్కలు కాంతి, నీరు, కార్బన్ డయాక్సైడ్‌తో ఆహారం తయారు చేస్తాయి."],["class-4","social","What does a map scale help calculate?","పటంలోని స్కేల్ దేనిని లెక్కించడానికి సహాయపడుతుంది?",["Real distance","Temperature","Population age"],0,"A map scale relates map distance to real distance.","పటంలోని దూరాన్ని నిజమైన దూరంతో పోల్చడానికి స్కేల్ సహాయపడుతుంది."],["class-4","computer","What is debugging?","డీబగ్గింగ్ అంటే ఏమిటి?",["Finding and fixing errors","Turning off a monitor","Deleting every file"],0,"Debugging means correcting program errors.","ప్రోగ్రామ్‌లోని లోపాలను సరిచేయడమే డీబగ్గింగ్."],["class-5","language","What is the past tense of teach?","teach యొక్క భూతకాల రూపం ఏది?",["teached","taught","teaching"],1,"The irregular past tense of teach is taught.","teach యొక్క అసాధారణ భూతకాల రూపం taught."],["class-5","science","Which organ pumps blood?","రక్తాన్ని పంపే అవయవం ఏది?",["Heart","Lungs","Stomach"],0,"The heart pumps blood through blood vessels.","గుండె రక్తనాళాల ద్వారా రక్తాన్ని పంపుతుంది."],["class-6","social","What is the main purpose of a constitution?","రాజ్యాంగం యొక్క ప్రధాన ఉద్దేశం ఏమిటి?",["Set basic rules for governing","List hobbies","Predict weather"],0,"A constitution sets the framework of government.","రాజ్యాంగం ప్రభుత్వ నిర్మాణాన్ని నిర్ధారిస్తుంది."],["class-6","computer","What is a variable in programming?","ప్రోగ్రామింగ్‌లో వేరియబుల్ అంటే ఏమిటి?",["Named place to store a value","Monitor cable","Printed page"],0,"A variable stores data a program can use or change.","ప్రోగ్రామ్ ఉపయోగించే లేదా మార్చే డేటాను వేరియబుల్ నిల్వ చేస్తుంది."],["class-7","language","Which figure of speech uses like or as?","like లేదా as ఉపయోగించే అలంకారం ఏది?",["Simile","Metaphor","Hyperbole"],0,"A simile compares using like or as.","ఉపమలో like లేదా as ఉపయోగించి పోలుస్తారు."],["class-7","science","Which gas do plants absorb in photosynthesis?","కిరణజన్య సంయోగక్రియలో మొక్కలు ఏ వాయువును గ్రహిస్తాయి?",["Carbon dioxide","Oxygen","Helium"],0,"Plants absorb carbon dioxide in photosynthesis.","కిరణజన్య సంయోగక్రియలో మొక్కలు కార్బన్ డయాక్సైడ్‌ను గ్రహిస్తాయి."],["class-8","science","What is the SI unit of force?","బలానికి SI ప్రమాణం ఏది?",["Newton","Joule","Watt"],0,"Force is measured in newtons.","బలాన్ని న్యూటన్‌లలో కొలుస్తారు."],["class-8","computer","What is a database used for?","డేటాబేస్ దేనికి ఉపయోగపడుతుంది?",["Organising and retrieving data","Cooling a processor","Drawing circles"],0,"Databases store structured information for access.","డేటాను క్రమబద్ధంగా నిల్వ చేసి పొందడానికి డేటాబేస్ ఉపయోగపడుతుంది."],["class-9","science","Which law states F = ma?","F = ma అని తెలిపే నియమం ఏది?",["Newton's second law","Newton's first law","Law of reflection"],0,"Newton's second law is written F = ma.","న్యూటన్ రెండవ నియమాన్ని F = ma అని రాస్తారు."],["class-9","social","What is universal adult franchise?","సార్వత్రిక వయోజన ఓటుహక్కు అంటే ఏమిటి?",["Eligible adults can vote","Only wealthy people vote","Only officials vote"],0,"Eligible adult citizens have the right to vote.","అర్హత కలిగిన వయోజన పౌరులకు ఓటు హక్కు ఉంటుంది."],["class-10","language","Which clause functions as a noun?","నామవాచకంలా పనిచేసే ఉపవాక్యం ఏది?",["Noun clause","Adverb clause","Adjective clause"],0,"A noun clause performs the role of a noun.","నామవాచక ఉపవాక్యం నామవాచక పాత్రను పోషిస్తుంది."],["class-10","computer","Which data structure follows Last In, First Out?","Last In, First Out సూత్రాన్ని అనుసరించేది ఏది?",["Stack","Queue","Tree"],0,"A stack removes the newest item first.","స్టాక్‌లో చివరిగా చేర్చిన అంశం ముందుగా తొలగించబడుతుంది."]].map(([gradeId, subjectId, en, te, options, answer, why, whyTe]: [string,string,string,string,string[],number,string,string]) => ({
 id: `${gradeId}-${subjectId}-core-01`,
 gradeId,
 subjectId,
 ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions",
 prompt: { en, te },
 choices: options.map((value: string) => ({ en: value, te: value })),
 correctChoiceIndex: answer,
 explanation: { en: why, te: whyTe }
}));

export const gradeQuestionBank: LearningQuestion[] = [...Object.entries(gradeMathSeeds).flatMap(([gradeId, seeds]) =>
 seeds.map((seed, index) => ({ id: `${gradeId}-math-${index+1}`, gradeId, subjectId: "math", ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions", prompt: seed.prompt, choices: seed.choices, correctChoiceIndex: seed.answer, explanation: seed.explanation }))
), ...gradeCoreQuestions];


export const sampleQuestions = questionBank;
export function getQuestions(ageBandId:string, subjectId?:string, gradeId?:string):LearningQuestion[] {
 const gradeExact = gradeId ? gradeQuestionBank.filter(q => q.gradeId === gradeId && (!subjectId || q.subjectId === subjectId)) : [];
 if (gradeExact.length) return gradeExact;
 const exact = questionBank.filter(q => q.ageBandId === ageBandId && (!subjectId || q.subjectId === subjectId));
 if (exact.length) return exact;
 // Never show an unrelated subject's questions when a selected subject has no age-band sample.
 const subjectFallback = questionBank.filter(q => !subjectId || q.subjectId === subjectId);
 if (subjectFallback.length) return subjectFallback;
 return [];
}
export const isCorrect = (selected:number, answer:number) => selected === answer;
export const canUseTimedQuiz = (age:number) => age >= 5;
