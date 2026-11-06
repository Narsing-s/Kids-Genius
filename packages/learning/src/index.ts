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
 id:string; subjectId:string; ageBandId:string; prompt:BilingualText;
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
export const gradeQuestionBank: LearningQuestion[] = Object.entries(gradeMathSeeds).flatMap(([gradeId, seeds]) =>
 seeds.map((seed, index) => ({ id: `${gradeId}-math-${index+1}`, gradeId, subjectId: "math", ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions", prompt: seed.prompt, choices: seed.choices, correctChoiceIndex: seed.answer, explanation: seed.explanation }))
);

export const sampleQuestions = questionBank;
export function getQuestions(ageBandId:string, subjectId?:string):LearningQuestion[] {
 const exact = questionBank.filter(q => q.ageBandId === ageBandId && (!subjectId || q.subjectId === subjectId));
 if (exact.length) return exact;
 const ageFallback = questionBank.filter(q => q.ageBandId === ageBandId);
 if (ageFallback.length) return ageFallback;
 return questionBank.filter(q => !subjectId || q.subjectId === subjectId);
}
export const isCorrect = (selected:number, answer:number) => selected === answer;
export const canUseTimedQuiz = (age:number) => age >= 5;
