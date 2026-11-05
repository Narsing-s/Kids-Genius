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
