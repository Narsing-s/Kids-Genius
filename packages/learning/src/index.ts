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
 {id:"creative-002",subjectId:"creative",ageBandId:"junior-stars",prompt:{en:"Which shape has three sides?",te:"మూడు భుజాలు ఉన్న ఆకారం ఏది?"},choices:[{en:"Circle",te:"వృత్తం"},{en:"Triangle",te:"త్రిభుజం"},{en:"Square",te:"చతురస్రం"}],correctChoiceIndex:1,explanation:{en:"A triangle has three sides.",te:"త్రిభుజానికి మూడు భుజాలు ఉంటాయి."}},
 {id:"hindi-001",subjectId:"hindi",ageBandId:"junior-stars",prompt:{en:"Which Hindi letter begins the word कमल?",te:"कमल అనే పదం ఏ హిందీ అక్షరంతో మొదలవుతుంది?"},choices:[{en:"क",te:"क"},{en:"म",te:"म"},{en:"ल",te:"ल"}],correctChoiceIndex:0,explanation:{en:"कमल begins with क.",te:"कमल పదం क అక్షరంతో మొదలవుతుంది."}},
 {id:"physics-001",subjectId:"physics",ageBandId:"smart-kids",prompt:{en:"What force pulls objects toward Earth?",te:"వస్తువులను భూమి వైపు లాగే బలం ఏది?"},choices:[{en:"Gravity",te:"గురుత్వాకర్షణ"},{en:"Friction",te:"ఘర్షణ"},{en:"Magnetism",te:"అయస్కాంత బలం"}],correctChoiceIndex:0,explanation:{en:"Gravity attracts objects toward Earth.",te:"గురుత్వాకర్షణ వస్తువులను భూమి వైపు ఆకర్షిస్తుంది."}},
 {id:"chemistry-001",subjectId:"chemistry",ageBandId:"young-champions",prompt:{en:"What is the chemical formula for water?",te:"నీటి రసాయన సూత్రం ఏమిటి?"},choices:[{en:"H₂O",te:"H₂O"},{en:"CO₂",te:"CO₂"},{en:"O₂",te:"O₂"}],correctChoiceIndex:0,explanation:{en:"A water molecule contains two hydrogen atoms and one oxygen atom.",te:"నీటి అణువులో రెండు హైడ్రోజన్ అణువులు, ఒక ఆక్సిజన్ అణువు ఉంటాయి."}},
 {id:"biology-001",subjectId:"biology",ageBandId:"smart-kids",prompt:{en:"What is the basic unit of life?",te:"జీవితానికి ప్రాథమిక ప్రమాణం ఏది?"},choices:[{en:"Cell",te:"కణం"},{en:"Organ",te:"అవయవం"},{en:"Tissue",te:"కణజాలం"}],correctChoiceIndex:0,explanation:{en:"All living organisms are made of one or more cells.",te:"అన్ని జీవులు ఒకటి లేదా అంతకంటే ఎక్కువ కణాలతో నిర్మితమవుతాయి."}},
 {id:"history-001",subjectId:"history",ageBandId:"young-champions",prompt:{en:"Who was the first emperor of the Maurya Empire?",te:"మౌర్య సామ్రాజ్యపు మొదటి చక్రవర్తి ఎవరు?"},choices:[{en:"Chandragupta Maurya",te:"చంద్రగుప్త మౌర్య"},{en:"Ashoka",te:"అశోకుడు"},{en:"Harsha",te:"హర్షుడు"}],correctChoiceIndex:0,explanation:{en:"Chandragupta Maurya founded the Maurya Empire.",te:"చంద్రగుప్త మౌర్యుడు మౌర్య సామ్రాజ్యాన్ని స్థాపించాడు."}},
 {id:"geography-001",subjectId:"geography",ageBandId:"smart-kids",prompt:{en:"Which is the largest ocean on Earth?",te:"భూమిపై అతిపెద్ద మహాసముద్రం ఏది?"},choices:[{en:"Pacific Ocean",te:"పసిఫిక్ మహాసముద్రం"},{en:"Indian Ocean",te:"హిందూ మహాసముద్రం"},{en:"Atlantic Ocean",te:"అట్లాంటిక్ మహాసముద్రం"}],correctChoiceIndex:0,explanation:{en:"The Pacific Ocean is the largest and deepest ocean.",te:"పసిఫిక్ మహాసముద్రం అతిపెద్దది, అత్యంత లోతైనది."}},
 {id:"civics-001",subjectId:"civics",ageBandId:"young-champions",prompt:{en:"What is the supreme law of India?",te:"భారతదేశంలో అత్యున్నత చట్టం ఏది?"},choices:[{en:"The Constitution",te:"రాజ్యాంగం"},{en:"A school rulebook",te:"పాఠశాల నియమావళి"},{en:"A local notice",te:"స్థానిక ప్రకటన"}],correctChoiceIndex:0,explanation:{en:"The Constitution is the supreme law of India.",te:"భారత రాజ్యాంగం దేశ అత్యున్నత చట్టం."}},
 {id:"economics-001",subjectId:"economics",ageBandId:"young-champions",prompt:{en:"What is a budget?",te:"బడ్జెట్ అంటే ఏమిటి?"},choices:[{en:"A plan for income and spending",te:"ఆదాయం, ఖర్చుల ప్రణాళిక"},{en:"A weather report",te:"వాతావరణ నివేదిక"},{en:"A map",te:"పటం"}],correctChoiceIndex:0,explanation:{en:"A budget plans how money will be received and spent.",te:"డబ్బు ఎలా వస్తుంది, ఎలా ఖర్చవుతుంది అనే ప్రణాళిక బడ్జెట్."}},
 {id:"environment-001",subjectId:"environment",ageBandId:"junior-stars",prompt:{en:"Which action helps reduce plastic waste?",te:"ప్లాస్టిక్ వ్యర్థాలను తగ్గించడానికి ఏ చర్య సహాయపడుతుంది?"},choices:[{en:"Reuse a water bottle",te:"నీటి సీసాను మళ్లీ ఉపయోగించడం"},{en:"Use a new bag every time",te:"ప్రతిసారి కొత్త సంచిని వాడటం"},{en:"Drop litter outdoors",te:"బయట చెత్త వేయడం"}],correctChoiceIndex:0,explanation:{en:"Reusing items helps reduce waste.",te:"వస్తువులను మళ్లీ ఉపయోగించడం వ్యర్థాలను తగ్గిస్తుంది."}},
 {id:"physical-001",subjectId:"physical",ageBandId:"little-learners",prompt:{en:"Which habit helps keep our body healthy?",te:"మన శరీరాన్ని ఆరోగ్యంగా ఉంచే అలవాటు ఏది?"},choices:[{en:"Playing and moving daily",te:"ప్రతిరోజూ ఆడుతూ కదలడం"},{en:"Never drinking water",te:"నీరు తాగకపోవడం"},{en:"Staying awake all night",te:"రాత్రంతా మేల్కొని ఉండటం"}],correctChoiceIndex:0,explanation:{en:"Daily movement, water and rest support health.",te:"ప్రతిరోజూ కదలిక, నీరు, విశ్రాంతి ఆరోగ్యానికి తోడ్పడతాయి."}},
 {id:"commerce-001",subjectId:"commerce",ageBandId:"young-champions",prompt:{en:"What does an entrepreneur do?",te:"వ్యవస్థాపకుడు ఏమి చేస్తాడు?"},choices:[{en:"Starts and manages a business",te:"వ్యాపారాన్ని ప్రారంభించి నిర్వహిస్తాడు"},{en:"Only studies weather",te:"వాతావరణాన్ని మాత్రమే అధ్యయనం చేస్తాడు"},{en:"Draws road maps only",te:"రోడ్డు పటాలే గీస్తాడు"}],correctChoiceIndex:0,explanation:{en:"An entrepreneur organises resources to create a business or service.",te:"వ్యవస్థాపకుడు వ్యాపారం లేదా సేవను సృష్టించడానికి వనరులను సమకూరుస్తాడు."}}
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

const gradeCoreQuestions: LearningQuestion[] = ([["nursery","language","Which word starts with B?","B ధ్వనితో మొదలయ్యే పదం ఏది?",["Ball","Apple","Cat"],0,"Ball begins with /b/.","Ball అనే పదం /బ/ ధ్వనితో మొదలవుతుంది."],["nursery","science","Which one is alive?","వీటిలో జీవి ఏది?",["Tree","Stone","Chair"],0,"A tree grows and needs water.","చెట్టు పెరుగుతుంది; దానికి నీరు అవసరం."],["lkg","language","Which word rhymes with sun?","sun తో ప్రాస కలిగిన పదం ఏది?",["Run","Dog","Pen"],0,"Sun and run share an ending sound.","Sun, run పదాలకు చివరి ధ్వని ఒకేలా ఉంటుంది."],["lkg","computer","Which part is used to type?","టైప్ చేయడానికి ఏ భాగాన్ని వాడతారు?",["Keyboard","Speaker","Monitor"],0,"A keyboard has keys for typing.","టైప్ చేయడానికి కీబోర్డ్‌లో కీలు ఉంటాయి."],["ukg","science","Which plant part makes food?","మొక్కకు ఆహారం తయారు చేసే భాగం ఏది?",["Leaves","Roots","Pot"],0,"Leaves use sunlight to make food.","ఆకులు సూర్యకాంతితో ఆహారం తయారు చేస్తాయి."],["ukg","social","What should we do before crossing a road?","రోడ్డు దాటే ముందు ఏమి చేయాలి?",["Look both ways","Run without looking","Play on the road"],0,"Stop, look both ways and cross carefully.","ఆగి, రెండు వైపులా చూసి జాగ్రత్తగా దాటాలి."],["class-1","language","What is the plural of box?","box యొక్క బహువచనం ఏది?",["Boxs","Boxes","Boxies"],1,"Words ending in x usually add -es.","x తో ముగిసే పదాలకు సాధారణంగా -es చేరుతుంది."],["class-1","science","Ice is which state of water?","మంచు నీటి ఏ స్థితి?",["Solid","Liquid","Gas"],0,"Ice is water in its solid state.","మంచు నీటి ఘన స్థితి."],["class-2","social","Why do communities need rules?","సమాజానికి నియమాలు ఎందుకు అవసరం?",["Safety and fairness","Stop all games","Confuse roads"],0,"Rules help people live safely and fairly.","నియమాలు ప్రజలు సురక్షితంగా, న్యాయంగా జీవించడానికి సహాయపడతాయి."],["class-2","computer","What makes a password stronger?","బలమైన పాస్‌వర్డ్‌కు ఏది సహాయపడుతుంది?",["Letters, numbers and symbols","Your name only","12345"],0,"A longer unique password is harder to guess.","పొడవైన ప్రత్యేక పాస్‌వర్డ్‌ను ఊహించడం కష్టం."],["class-3","language","Identify the verb: The children are reading.","The children are reading లో క్రియ ఏది?",["children","are reading","the"],1,"Are reading tells what the children do.","పిల్లలు ఏమి చేస్తున్నారో are reading తెలియజేస్తుంది."],["class-3","science","What do plants need for photosynthesis?","కిరణజన్య సంయోగక్రియకు మొక్కలకు ఏమి అవసరం?",["Sunlight, water and carbon dioxide","Only sand","Only darkness"],0,"Plants use light, water and carbon dioxide to make food.","మొక్కలు కాంతి, నీరు, కార్బన్ డయాక్సైడ్‌తో ఆహారం తయారు చేస్తాయి."],["class-4","social","What does a map scale help calculate?","పటంలోని స్కేల్ దేనిని లెక్కించడానికి సహాయపడుతుంది?",["Real distance","Temperature","Population age"],0,"A map scale relates map distance to real distance.","పటంలోని దూరాన్ని నిజమైన దూరంతో పోల్చడానికి స్కేల్ సహాయపడుతుంది."],["class-4","computer","What is debugging?","డీబగ్గింగ్ అంటే ఏమిటి?",["Finding and fixing errors","Turning off a monitor","Deleting every file"],0,"Debugging means correcting program errors.","ప్రోగ్రామ్‌లోని లోపాలను సరిచేయడమే డీబగ్గింగ్."],["class-5","language","What is the past tense of teach?","teach యొక్క భూతకాల రూపం ఏది?",["teached","taught","teaching"],1,"The irregular past tense of teach is taught.","teach యొక్క అసాధారణ భూతకాల రూపం taught."],["class-5","science","Which organ pumps blood?","రక్తాన్ని పంపే అవయవం ఏది?",["Heart","Lungs","Stomach"],0,"The heart pumps blood through blood vessels.","గుండె రక్తనాళాల ద్వారా రక్తాన్ని పంపుతుంది."],["class-6","social","What is the main purpose of a constitution?","రాజ్యాంగం యొక్క ప్రధాన ఉద్దేశం ఏమిటి?",["Set basic rules for governing","List hobbies","Predict weather"],0,"A constitution sets the framework of government.","రాజ్యాంగం ప్రభుత్వ నిర్మాణాన్ని నిర్ధారిస్తుంది."],["class-6","computer","What is a variable in programming?","ప్రోగ్రామింగ్‌లో వేరియబుల్ అంటే ఏమిటి?",["Named place to store a value","Monitor cable","Printed page"],0,"A variable stores data a program can use or change.","ప్రోగ్రామ్ ఉపయోగించే లేదా మార్చే డేటాను వేరియబుల్ నిల్వ చేస్తుంది."],["class-7","language","Which figure of speech uses like or as?","like లేదా as ఉపయోగించే అలంకారం ఏది?",["Simile","Metaphor","Hyperbole"],0,"A simile compares using like or as.","ఉపమలో like లేదా as ఉపయోగించి పోలుస్తారు."],["class-7","science","Which gas do plants absorb in photosynthesis?","కిరణజన్య సంయోగక్రియలో మొక్కలు ఏ వాయువును గ్రహిస్తాయి?",["Carbon dioxide","Oxygen","Helium"],0,"Plants absorb carbon dioxide in photosynthesis.","కిరణజన్య సంయోగక్రియలో మొక్కలు కార్బన్ డయాక్సైడ్‌ను గ్రహిస్తాయి."],["class-8","science","What is the SI unit of force?","బలానికి SI ప్రమాణం ఏది?",["Newton","Joule","Watt"],0,"Force is measured in newtons.","బలాన్ని న్యూటన్‌లలో కొలుస్తారు."],["class-8","computer","What is a database used for?","డేటాబేస్ దేనికి ఉపయోగపడుతుంది?",["Organising and retrieving data","Cooling a processor","Drawing circles"],0,"Databases store structured information for access.","డేటాను క్రమబద్ధంగా నిల్వ చేసి పొందడానికి డేటాబేస్ ఉపయోగపడుతుంది."],["class-9","science","Which law states F = ma?","F = ma అని తెలిపే నియమం ఏది?",["Newton's second law","Newton's first law","Law of reflection"],0,"Newton's second law is written F = ma.","న్యూటన్ రెండవ నియమాన్ని F = ma అని రాస్తారు."],["class-9","social","What is universal adult franchise?","సార్వత్రిక వయోజన ఓటుహక్కు అంటే ఏమిటి?",["Eligible adults can vote","Only wealthy people vote","Only officials vote"],0,"Eligible adult citizens have the right to vote.","అర్హత కలిగిన వయోజన పౌరులకు ఓటు హక్కు ఉంటుంది."],["class-10","language","Which clause functions as a noun?","నామవాచకంలా పనిచేసే ఉపవాక్యం ఏది?",["Noun clause","Adverb clause","Adjective clause"],0,"A noun clause performs the role of a noun.","నామవాచక ఉపవాక్యం నామవాచక పాత్రను పోషిస్తుంది."],["class-10","computer","Which data structure follows Last In, First Out?","Last In, First Out సూత్రాన్ని అనుసరించేది ఏది?",["Stack","Queue","Tree"],0,"A stack removes the newest item first.","స్టాక్‌లో చివరిగా చేర్చిన అంశం ముందుగా తొలగించబడుతుంది."]] as [string,string,string,string,string[],number,string,string][]).map(([gradeId, subjectId, en, te, options, answer, why, whyTe]) => ({
 id: `${gradeId}-${subjectId}-core-01`,
 gradeId,
 subjectId,
 ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions",
 prompt: { en, te },
 choices: options.map((value: string) => ({ en: value, te: value })),
 correctChoiceIndex: answer,
 explanation: { en: why, te: whyTe }
}));


const gradeExtensionRows: [string,string,string,string,string[],number,string,string][] = [["nursery","math","Which number comes after 3?","3 తర్వాత వచ్చే సంఖ్య ఏది?",["2","4","5"],1,"4 comes after 3.","3 తర్వాత 4 వస్తుంది."],["lkg","science","Which animal gives us milk?","మనకు పాలు ఇచ్చే జంతువు ఏది?",["Cow","Lion","Tiger"],0,"A cow gives us milk.","ఆవు మనకు పాలు ఇస్తుంది."],["ukg","math","What is 5 + 2?","5 + 2 ఎంత?",["6","7","8"],1,"Five plus two equals seven.","ఐదు కలిపి రెండు = ఏడు."],["class-1","math","What is 12 - 5?","12 - 5 ఎంత?",["6","7","8"],1,"12 minus 5 equals 7.","12 నుంచి 5 తీసేస్తే 7."],["class-1","social","Which is a community helper?","సమాజానికి సేవ చేసే వ్యక్తి ఎవరు?",["Doctor","Toy","Tree"],0,"Doctors help people stay healthy.","వైద్యులు ప్రజలు ఆరోగ్యంగా ఉండేందుకు సహాయపడతారు."],["class-2","science","Which part of a plant absorbs water?","మొక్కలో నీటిని పీల్చుకునే భాగం ఏది?",["Root","Flower","Fruit"],0,"Roots absorb water from the soil.","వేర్లు నేల నుంచి నీటిని పీల్చుకుంటాయి."],["class-2","math","What is 8 × 3?","8 × 3 ఎంత?",["21","24","27"],1,"Eight groups of three make 24.","మూడు చొప్పున ఎనిమిది సమూహాలు 24."],["class-3","science","Which planet is known as the Red Planet?","ఎర్ర గ్రహం అని దేనిని పిలుస్తారు?",["Mars","Venus","Jupiter"],0,"Iron-rich dust makes Mars look red.","ఇనుము కలిగిన ధూళి వల్ల అంగారకుడు ఎర్రగా కనిపిస్తాడు."],["class-3","math","What is one quarter of 20?","20లో పావు భాగం ఎంత?",["4","5","10"],1,"20 divided by 4 equals 5.","20ను 4తో భాగిస్తే 5."],["class-4","science","Which gas do humans need to breathe?","మనుషులు శ్వాసించడానికి అవసరమైన వాయువు ఏది?",["Oxygen","Carbon dioxide","Helium"],0,"Our bodies use oxygen for respiration.","మన శరీరం శ్వాసక్రియకు ఆక్సిజన్‌ను ఉపయోగిస్తుంది."],["class-4","math","What is 9 × 7?","9 × 7 ఎంత?",["56","63","72"],1,"Nine times seven equals 63.","తొమ్మిది రెట్లు ఏడు = 63."],["class-5","social","Which line divides Earth into Northern and Southern Hemispheres?","భూమిని ఉత్తర, దక్షిణ అర్ధగోళాలుగా విభజించే రేఖ ఏది?",["Equator","Prime Meridian","Tropic of Cancer"],0,"The Equator is at 0 degrees latitude.","భూమధ్యరేఖ 0 డిగ్రీల అక్షాంశం వద్ద ఉంటుంది."],["class-5","math","What is 15% of 200?","200లో 15 శాతం ఎంత?",["20","30","40"],1,"10% is 20 and 5% is 10, total 30.","10 శాతం 20, 5 శాతం 10; మొత్తం 30."],["class-6","science","Which particle has a negative electric charge?","ఋణ విద్యుత్ ఆవేశం కలిగిన కణం ఏది?",["Electron","Proton","Neutron"],0,"Electrons carry a negative charge.","ఎలక్ట్రాన్లకు ఋణ ఆవేశం ఉంటుంది."],["class-6","math","What is the LCM of 4 and 6?","4, 6ల క.సా.గు ఎంత?",["10","12","24"],1,"12 is the smallest common multiple of 4 and 6.","4, 6ల అతి చిన్న సామాన్య గుణిజం 12."],["class-7","science","What is the process of liquid changing into gas called?","ద్రవం వాయువుగా మారే ప్రక్రియను ఏమంటారు?",["Evaporation","Condensation","Freezing"],0,"Evaporation changes a liquid into vapour.","బాష్పీభవనంలో ద్రవం ఆవిరిగా మారుతుంది."],["class-7","math","Solve: 3x = 21.","3x = 21 ను పరిష్కరించండి.",["x = 6","x = 7","x = 8"],1,"Divide both sides by 3 to get x = 7.","రెండు వైపులా 3తో భాగిస్తే x = 7."],["class-8","science","What is the pH of a neutral solution at room temperature?","గది ఉష్ణోగ్రత వద్ద తటస్థ ద్రావణం pH ఎంత?",["7","1","14"],0,"A neutral solution has pH 7.","తటస్థ ద్రావణం pH విలువ 7."],["class-8","math","What is the square root of 144?","144 యొక్క వర్గమూలం ఎంత?",["10","12","14"],1,"12 × 12 equals 144.","12 × 12 = 144."],["class-9","science","Which cell organelle is called the powerhouse of the cell?","కణంలోని శక్తి కేంద్రం అని దేనిని పిలుస్తారు?",["Mitochondrion","Nucleus","Ribosome"],0,"Mitochondria release usable energy from food.","మైటోకాండ్రియా ఆహారం నుంచి ఉపయోగకరమైన శక్తిని విడుదల చేస్తాయి."],["class-9","math","What is the degree of a quadratic polynomial?","ద్విఘాత బహుపది యొక్క ఘాతం ఎంత?",["1","2","3"],1,"A quadratic polynomial has highest exponent 2.","ద్విఘాత బహుపదిలో అత్యధిక ఘాతం 2."],["class-10","science","Which type of lens is used to correct myopia?","మయోపియాను సరిచేయడానికి ఏ కటకం ఉపయోగిస్తారు?",["Concave lens","Convex lens","Cylindrical lens"],0,"A concave lens diverges light to correct myopia.","పుటాకార కటకం కాంతిని వ్యాపింపజేసి మయోపియాను సరిచేస్తుంది."],["class-10","math","If the roots of x² - 5x + 6 = 0 are?","x² - 5x + 6 = 0 యొక్క మూలాలు ఏవి?",["2 and 3","1 and 6","-2 and -3"],0,"(x - 2)(x - 3) = 0, so roots are 2 and 3.","(x - 2)(x - 3) = 0 కాబట్టి మూలాలు 2, 3."],["class-10","social","Which institution conducts elections in India?","భారతదేశంలో ఎన్నికలను నిర్వహించే సంస్థ ఏది?",["Election Commission of India","Supreme Court","Finance Commission"],0,"The Election Commission of India supervises elections.","భారత ఎన్నికల సంఘం ఎన్నికలను పర్యవేక్షిస్తుంది."]];
const gradeExtensionQuestions: LearningQuestion[] = gradeExtensionRows.map(([gradeId, subjectId, en, te, options, answer, why, whyTe], index) => ({
 id: `${gradeId}-${subjectId}-extension-${index+1}`,
 gradeId,
 subjectId,
 ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions",
 prompt: { en, te },
 choices: options.map((value) => ({ en: value, te: value })),
 correctChoiceIndex: answer,
 explanation: { en: why, te: whyTe }
}));



const gradeAdditionalRows: [string,string,string,string,string[],string[],number,string,string][] = [
 ["nursery","language","Which letter starts the word Apple?","Apple అనే పదం ఏ అక్షరంతో మొదలవుతుంది?",["A","B","C"],["ఏ","బీ","సీ"],0,"Apple begins with the letter A.","Apple అనే పదం A అక్షరంతో ప్రారంభమవుతుంది."],
 ["nursery","science","Which animal says “meow”?","“మ్యావ్” అని ఏ జంతువు అంటుంది?",["Cat","Dog","Cow"],["పిల్లి","కుక్క","ఆవు"],0,"A cat says meow.","పిల్లి మ్యావ్ అని అంటుంది."],
 ["lkg","language","Which word begins with the letter B?","B అక్షరంతో ప్రారంభమయ్యే పదం ఏది?",["Ball","Cat","Sun"],["బంతి","పిల్లి","సూర్యుడు"],0,"Ball begins with B.","Ball అనే పదం B తో ప్రారంభమవుతుంది."],
 ["lkg","science","Which one is a fruit?","వీటిలో పండు ఏది?",["Mango","Chair","Shoe"],["మామిడి","కుర్చీ","చెప్పు"],0,"A mango is a fruit.","మామిడి ఒక పండు."],
 ["ukg","language","Which word rhymes with “sun”?","“sun” అనే పదంతో ప్రాస కలిగిన పదం ఏది?",["Fun","Pen","Cat"],["Fun","Pen","Cat"],0,"Sun and fun rhyme because they share the ending sound.","Sun, fun పదాల చివరి శబ్దం ఒకేలా ఉంటుంది."],
 ["ukg","science","Which body part helps us hear sounds?","శబ్దాలను వినడానికి ఏ శరీర భాగం సహాయపడుతుంది?",["Ears","Eyes","Nose"],["చెవులు","కళ్ళు","ముక్కు"],0,"We hear sounds with our ears.","మనము చెవులతో శబ్దాలను వింటాము."],
 ["class-1","language","What is the plural of “book”?","“Book” అనే పదానికి బహువచనం ఏది?",["Books","Book","Booking"],["పుస్తకాలు","పుస్తకం","బుకింగ్"],0,"Add s to book to make books.","Book కు s చేరిస్తే Books అవుతుంది."],
 ["class-1","science","Which plant part usually makes food using sunlight?","సూర్యకాంతిని ఉపయోగించి సాధారణంగా ఆహారం తయారు చేసే మొక్క భాగం ఏది?",["Leaves","Roots","Flowers"],["ఆకులు","వేర్లు","పూలు"],0,"Leaves use sunlight to make food by photosynthesis.","ఆకులు కిరణజన్య సంయోగక్రియ ద్వారా ఆహారం తయారు చేస్తాయి."],
 ["class-2","language","What is the opposite of “hot”?","“వేడి” అనే పదానికి వ్యతిరేక పదం ఏది?",["Cold","Warm","Bright"],["చల్లని","వెచ్చని","ప్రకాశవంతమైన"],0,"Cold is the opposite of hot.","వేడి అనే పదానికి వ్యతిరేక పదం చల్లని."],
 ["class-2","social","What is the capital of India?","భారతదేశ రాజధాని ఏది?",["New Delhi","Mumbai","Chennai"],["న్యూఢిల్లీ","ముంబై","చెన్నై"],0,"New Delhi is the capital of India.","న్యూఢిల్లీ భారతదేశ రాజధాని."],
 ["class-3","language","What is the past tense of “go”?","“Go” అనే క్రియ యొక్క భూతకాల రూపం ఏది?",["Went","Goed","Going"],["Went","Goed","Going"],0,"The past tense of go is went.","Go యొక్క భూతకాల రూపం Went."],
 ["class-3","science","In which forms can water be found on Earth?","భూమిపై నీరు ఏ రూపాల్లో కనిపిస్తుంది?",["Solid, liquid and gas","Only liquid","Only gas"],["ఘన, ద్రవ, వాయు","ద్రవం మాత్రమే","వాయువు మాత్రమే"],0,"Water exists as ice, liquid water and water vapour.","నీరు మంచు, ద్రవ నీరు, నీటి ఆవిరి రూపాల్లో ఉంటుంది."],
 ["class-4","language","Which word is the adjective in “The bright sun shines”?","“The bright sun shines” వాక్యంలో విశేషణం ఏది?",["Bright","Sun","Shines"],["ప్రకాశవంతమైన","సూర్యుడు","ప్రకాశిస్తుంది"],0,"Bright describes the noun sun.","Bright అనే పదం Sun ను వివరిస్తుంది."],
 ["class-4","social","In which direction does the Sun appear to rise?","సూర్యుడు ఏ దిశలో ఉదయించినట్లు కనిపిస్తాడు?",["East","West","North"],["తూర్పు","పడమర","ఉత్తరం"],0,"The Sun appears to rise in the east.","సూర్యుడు తూర్పు దిశలో ఉదయించినట్లు కనిపిస్తాడు."],
 ["class-5","language","Which word is closest in meaning to “rapid”?","“Rapid” అనే పదానికి దగ్గర అర్థం ఉన్న పదం ఏది?",["Fast","Quiet","Late"],["వేగమైన","నిశ్శబ్దమైన","ఆలస్యమైన"],0,"Rapid means fast or quick.","Rapid అంటే వేగంగా లేదా త్వరగా."],
 ["class-5","science","What is the change from liquid water to water vapour called?","ద్రవ నీరు నీటి ఆవిరిగా మారే ప్రక్రియను ఏమంటారు?",["Evaporation","Freezing","Melting"],["బాష్పీభవనం","గడ్డకట్టడం","కరగడం"],0,"Evaporation changes liquid water into water vapour.","బాష్పీభవనంలో ద్రవ నీరు నీటి ఆవిరిగా మారుతుంది."],
 ["class-6","language","Which pronoun can replace the name “Ravi” in a sentence?","వాక్యంలో “రవి” అనే పేరుకు బదులుగా ఏ సర్వనామం వాడవచ్చు?",["He","They","It"],["అతడు","వారు","అది"],0,"He is a singular pronoun commonly used for Ravi.","రవి అనే వ్యక్తికి He అనే ఏకవచన సర్వనామం వాడవచ్చు."],
 ["class-6","science","Which material is a good conductor of electricity?","విద్యుత్‌ను బాగా ప్రసారం చేసే పదార్థం ఏది?",["Copper","Rubber","Wood"],["రాగి","రబ్బరు","చెక్క"],0,"Copper allows electric current to pass through easily.","రాగి ద్వారా విద్యుత్ ప్రవాహం సులభంగా జరుగుతుంది."],
 ["class-7","language","Which tense is used in “She has finished her homework”?","“She has finished her homework” వాక్యంలో ఏ కాలం ఉపయోగించారు?",["Present perfect","Simple past","Future"],["వర్తమాన సంపూర్ణ కాలం","సాధారణ భూతకాలం","భవిష్యత్ కాలం"],0,"Has finished is in the present perfect tense.","Has finished అనేది వర్తమాన సంపూర్ణ కాలం."],
 ["class-7","social","Which idea is central to democracy?","ప్రజాస్వామ్యంలో ప్రధానమైన భావన ఏది?",["People choose their representatives","One person inherits all power","Citizens cannot vote"],["ప్రజలు తమ ప్రతినిధులను ఎన్నుకుంటారు","ఒకరికి వారసత్వంగా అధికారం వస్తుంది","పౌరులు ఓటు వేయలేరు"],0,"In a democracy, people choose representatives through elections.","ప్రజాస్వామ్యంలో ప్రజలు ఎన్నికల ద్వారా ప్రతినిధులను ఎన్నుకుంటారు."],
 ["class-8","computer","Which two digits are used in the binary number system?","ద్విమానం సంఖ్యా విధానంలో ఉపయోగించే రెండు అంకెలు ఏవి?",["0 and 1","1 and 2","0 and 9"],["0 మరియు 1","1 మరియు 2","0 మరియు 9"],0,"Binary uses only the digits 0 and 1.","ద్విమానం సంఖ్యా విధానంలో 0, 1 మాత్రమే ఉంటాయి."],
 ["class-8","science","Which process do green plants use to make food?","ఆకుపచ్చ మొక్కలు ఆహారం తయారు చేయడానికి ఉపయోగించే ప్రక్రియ ఏది?",["Photosynthesis","Respiration only","Fermentation"],["కిరణజన్య సంయోగక్రియ","శ్వాసక్రియ మాత్రమే","కిణ్వ ప్రక్రియ"],0,"Photosynthesis uses light energy to make food from carbon dioxide and water.","కిరణజన్య సంయోగక్రియలో కాంతి శక్తితో కార్బన్ డయాక్సైడ్, నీటి నుంచి ఆహారం తయారవుతుంది."],
 ["class-9","science","Which cell structure contains most of the cell’s genetic material?","కణంలోని జన్యు పదార్థంలో ఎక్కువ భాగం ఏ నిర్మాణంలో ఉంటుంది?",["Nucleus","Cell wall","Vacuole"],["కేంద్రకం","కణ గోడ","రసధాని"],0,"The nucleus contains most of a eukaryotic cell’s DNA.","యూకారియోటిక్ కణంలోని DNA లో ఎక్కువ భాగం కేంద్రకంలో ఉంటుంది."],
 ["class-9","social","On which date was the Constitution of India adopted?","భారత రాజ్యాంగాన్ని ఏ తేదీన ఆమోదించారు?",["26 November 1949","15 August 1947","26 January 1950"],["26 నవంబర్ 1949","15 ఆగస్టు 1947","26 జనవరి 1950"],0,"The Constituent Assembly adopted the Constitution on 26 November 1949.","రాజ్యాంగ సభ 26 నవంబర్ 1949న రాజ్యాంగాన్ని ఆమోదించింది."],
 ["class-10","computer","What is HTML mainly used for?","HTML ప్రధానంగా దేనికి ఉపయోగిస్తారు?",["Structuring web pages","Editing photos","Compressing videos"],["వెబ్ పేజీల నిర్మాణం","ఫోటోలను సవరించడం","వీడియోలను కుదించడం"],0,"HTML describes the structure and content of web pages.","HTML వెబ్ పేజీల నిర్మాణం మరియు కంటెంట్‌ను నిర్వచిస్తుంది."],
 ["class-10","social","Which part of the Indian Constitution guarantees Fundamental Rights?","భారత రాజ్యాంగంలో ప్రాథమిక హక్కులకు సంబంధించిన భాగం ఏది?",["Part III","Part I","Part IV"],["భాగం III","భాగం I","భాగం IV"],0,"Fundamental Rights are listed in Part III of the Constitution.","రాజ్యాంగంలోని భాగం IIIలో ప్రాథమిక హక్కులు పొందుపరిచారు."],
 ["nursery","language","Which letter comes after A?","A తర్వాత వచ్చే అక్షరం ఏది?",["B","C","D"],["బీ","సీ","డీ"],0,"B comes immediately after A in the alphabet.","ఆంగ్ల అక్షరమాలలో A తర్వాత B వస్తుంది."],
 ["nursery","science","Which object gives us light during the day?","పగటిపూట మనకు వెలుతురు ఇచ్చేది ఏది?",["Sun","Moon","Cloud"],["సూర్యుడు","చంద్రుడు","మేఘం"],0,"The Sun is our main natural source of daylight.","పగటి వెలుతురుకు సూర్యుడు ప్రధాన సహజ మూలం."],
 ["lkg","language","Which of these is a vowel?","వీటిలో అచ్చు అక్షరం ఏది?",["A","B","T"],["ఏ","బీ","టీ"],0,"A is one of the five English vowels.","A ఆంగ్లంలోని ఐదు అచ్చు అక్షరాలలో ఒకటి."],
 ["lkg","science","Which sense organ helps us smell a flower?","పువ్వు వాసనను తెలుసుకోవడానికి ఏ జ్ఞానేంద్రియం సహాయపడుతుంది?",["Nose","Ear","Eye"],["ముక్కు","చెవి","కన్ను"],0,"We use our nose to smell.","వాసనను తెలుసుకోవడానికి ముక్కును ఉపయోగిస్తాము."],
 ["ukg","language","Choose the correctly spelled word.","సరైన అక్షరక్రమం ఉన్న పదాన్ని ఎంచుకోండి.",["School","Skool","Scool"],["School","Skool","Scool"],0,"School is the correct spelling.","School అనేది సరైన అక్షరక్రమం."],
 ["ukg","science","Which one can fly in the sky?","ఆకాశంలో ఎగరగలిగేది ఏది?",["Bird","Fish","Turtle"],["పక్షి","చేప","తాబేలు"],0,"Most birds use their wings to fly.","చాలా పక్షులు రెక్కల సహాయంతో ఎగురుతాయి."],
 ["class-1","math","What is 6 + 3?","6 + 3 ఎంత?",["8","9","10"],["8","9","10"],1,"Adding 3 to 6 gives 9.","6కు 3 కలిపితే 9 వస్తుంది."],
 ["class-1","social","Which place lends books to readers?","పాఠకులకు పుస్తకాలు ఇచ్చే ప్రదేశం ఏది?",["Library","Hospital","Bakery"],["గ్రంథాలయం","ఆసుపత్రి","బేకరీ"],0,"A library keeps books for people to read or borrow.","గ్రంథాలయంలో చదవడానికి లేదా తీసుకెళ్లడానికి పుస్తకాలు ఉంటాయి."],
 ["class-2","math","What is 15 − 7?","15 − 7 ఎంత?",["7","8","9"],["7","8","9"],1,"15 minus 7 equals 8.","15 నుంచి 7 తీసివేస్తే 8 వస్తుంది."],
 ["class-2","science","Which part of a plant absorbs water from soil?","మొక్కలో నేల నుంచి నీటిని పీల్చుకునే భాగం ఏది?",["Roots","Leaves","Fruit"],["వేర్లు","ఆకులు","పండు"],0,"Roots absorb water and minerals from the soil.","వేర్లు నేల నుంచి నీరు, ఖనిజాలను పీల్చుకుంటాయి."],
 ["class-3","math","How many sides does a hexagon have?","షడ్భుజికి ఎన్ని భుజాలు ఉంటాయి?",["5","6","8"],["5","6","8"],1,"A hexagon has six sides.","షడ్భుజికి ఆరు భుజాలు ఉంటాయి."],
 ["class-3","social","What is the name of India's national flag?","భారతదేశ జాతీయ జెండాను ఏమంటారు?",["Tricolour","Union Jack","Maple Leaf"],["త్రివర్ణ పతాకం","యూనియన్ జాక్","మేపుల్ లీఫ్"],0,"India's flag is commonly called the Tiranga or Tricolour.","భారత జెండాను తిరంగా లేదా త్రివర్ణ పతాకం అంటారు."],
 ["class-4","math","What is the place value of 5 in 3,542?","3,542లో 5 స్థాన విలువ ఎంత?",["50","500","5"],["50","500","5"],1,"The digit 5 is in the hundreds place, so its value is 500.","5 వందల స్థానంలో ఉంది కాబట్టి దాని స్థాన విలువ 500."],
 ["class-4","science","Which force pulls objects towards Earth?","వస్తువులను భూమి వైపు లాగే బలం ఏది?",["Gravity","Friction","Magnetism"],["గురుత్వాకర్షణ","ఘర్షణ","అయస్కాంతత్వం"],0,"Gravity attracts objects towards Earth's centre.","గురుత్వాకర్షణ వస్తువులను భూమి కేంద్రం వైపు ఆకర్షిస్తుంది."],
 ["class-5","math","What is 3/4 expressed as a percentage?","3/4 ను శాతంగా రాస్తే ఎంత?",["25%","50%","75%"],["25%","50%","75%"],2,"3 divided by 4 is 0.75, which is 75%.","3 ను 4తో భాగిస్తే 0.75, అంటే 75%."],
 ["class-5","social","Which imaginary line divides Earth into Northern and Southern Hemispheres?","భూమిని ఉత్తర, దక్షిణ అర్ధగోళాలుగా విభజించే ఊహాత్మక రేఖ ఏది?",["Equator","Prime Meridian","Tropic of Cancer"],["భూమధ్యరేఖ","ప్రధాన రేఖాంశం","కర్కట రేఖ"],0,"The Equator is at 0° latitude and separates the two hemispheres.","భూమధ్యరేఖ 0° అక్షాంశంలో ఉండి రెండు అర్ధగోళాలను వేరు చేస్తుంది."],
 ["class-6","math","What is the LCM of 4 and 6?","4 మరియు 6 యొక్క క.సా.గు. ఎంత?",["8","12","24"],["8","12","24"],1,"12 is the smallest positive number divisible by both 4 and 6.","4 మరియు 6 రెండింటితో భాగించబడే అతి చిన్న ధన సంఖ్య 12."],
 ["class-6","science","Which gas do plants take in for photosynthesis?","కిరణజన్య సంయోగక్రియ కోసం మొక్కలు ఏ వాయువును తీసుకుంటాయి?",["Carbon dioxide","Oxygen","Nitrogen"],["కార్బన్ డయాక్సైడ్","ఆక్సిజన్","నైట్రోజన్"],0,"Plants use carbon dioxide and water to make food using light.","మొక్కలు కాంతి సహాయంతో కార్బన్ డయాక్సైడ్, నీటిని ఉపయోగించి ఆహారం తయారు చేస్తాయి."],
 ["class-7","math","What is the value of 2³?","2³ విలువ ఎంత?",["6","8","9"],["6","8","9"],1,"2³ means 2 × 2 × 2, which equals 8.","2³ అంటే 2 × 2 × 2, దాని విలువ 8."],
 ["class-7","science","Which blood cells help the body fight infections?","సంక్రమణలతో పోరాడటానికి శరీరానికి సహాయపడే రక్త కణాలు ఏవి?",["White blood cells","Red blood cells","Platelets"],["తెల్ల రక్త కణాలు","ఎర్ర రక్త కణాలు","ప్లేట్‌లెట్లు"],0,"White blood cells are part of the immune system.","తెల్ల రక్త కణాలు రోగనిరోధక వ్యవస్థలో భాగం."],
 ["class-8","math","Solve: 3x = 21. What is x?","3x = 21 అయితే x విలువ ఎంత?",["6","7","8"],["6","7","8"],1,"Divide both sides by 3 to get x = 7.","రెండు వైపులా 3తో భాగిస్తే x = 7 వస్తుంది."],
 ["class-8","social","Which movement began in 1942 demanding an end to British rule in India?","భారతదేశంలో బ్రిటిష్ పాలన ముగియాలని 1942లో ప్రారంభమైన ఉద్యమం ఏది?",["Quit India Movement","Swadeshi Movement","Khilafat Movement"],["క్విట్ ఇండియా ఉద్యమం","స్వదేశీ ఉద్యమం","ఖిలాఫత్ ఉద్యమం"],0,"The Quit India Movement was launched in August 1942.","క్విట్ ఇండియా ఉద్యమం ఆగస్టు 1942లో ప్రారంభమైంది."],
 ["class-9","math","What is the slope of the line y = 4x + 3?","y = 4x + 3 రేఖ యొక్క వాలు ఎంత?",["3","4","7"],["3","4","7"],1,"In y = mx + c, the coefficient m is the slope.","y = mx + c రూపంలో m గుణకం వాలును సూచిస్తుంది."],
 ["class-9","science","What is the SI unit of force?","బలానికి SI ప్రమాణం ఏది?",["Joule","Newton","Watt"],["జౌల్","న్యూటన్","వాట్"],1,"Force is measured in newtons (N).","బలాన్ని న్యూటన్ (N)లలో కొలుస్తారు."],
 ["class-10","math","If sin 30° = 1/2, what is cosec 30°?","sin 30° = 1/2 అయితే cosec 30° ఎంత?",["1/2","1","2"],["1/2","1","2"],2,"Cosec θ is the reciprocal of sin θ, so it is 2.","cosec θ అనేది sin θ యొక్క వ్యుత్క్రమం కాబట్టి విలువ 2."],
 ["class-10","science","Which law states that current is directly proportional to voltage at constant temperature?","స్థిర ఉష్ణోగ్రత వద్ద విద్యుత్ ప్రవాహం వోల్టేజీకి అనులోమానుపాతంలో ఉంటుందని చెప్పే నియమం ఏది?",["Ohm's law","Newton's law","Faraday's law"],["ఓమ్ నియమం","న్యూటన్ నియమం","ఫారడే నియమం"],0,"Ohm's law states V = IR when physical conditions remain constant.","భౌతిక పరిస్థితులు స్థిరంగా ఉన్నప్పుడు V = IR అని ఓమ్ నియమం చెబుతుంది."]

];
const gradeAdditionalQuestions: LearningQuestion[] = gradeAdditionalRows.map(([gradeId, subjectId, en, te, optionsEn, optionsTe, answer, why, whyTe], index) => ({
 id: `${gradeId}-${subjectId}-additional-${index+1}`,
 gradeId,
 subjectId,
 ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions",
 prompt: { en, te },
 choices: optionsEn.map((value, optionIndex) => ({ en: value, te: optionsTe[optionIndex] ?? value })),
 correctChoiceIndex: answer,
 explanation: { en: why, te: whyTe }
}));

export const gradeQuestionBank: LearningQuestion[] = [...Object.entries(gradeMathSeeds).flatMap(([gradeId, seeds]) =>
 seeds.map((seed, index) => ({ id: `${gradeId}-math-${index+1}`, gradeId, subjectId: "math", ageBandId: gradeLevels.find((grade) => grade.id === gradeId)?.ageBandId ?? "young-champions", prompt: seed.prompt, choices: seed.choices, correctChoiceIndex: seed.answer, explanation: seed.explanation }))
), ...gradeCoreQuestions, ...gradeExtensionQuestions, ...gradeAdditionalQuestions];


export const sampleQuestions = questionBank;
export function getQuestions(ageBandId:string, subjectId?:string, gradeId?:string):LearningQuestion[] {
 const gradeExact = gradeId ? gradeQuestionBank.filter(q => q.gradeId === gradeId && (!subjectId || q.subjectId === subjectId)) : [];
 if (gradeExact.length) return gradeExact;
 const exact = questionBank.filter(q => q.ageBandId === ageBandId && (!subjectId || q.subjectId === subjectId));
 if (exact.length) return exact;
 // Never show an unrelated subject's questions when a selected subject has no age-band sample.
 const subjectFallback = [...questionBank, ...gradeQuestionBank].filter(q => !subjectId || q.subjectId === subjectId);
 if (subjectFallback.length) return subjectFallback;
 return [];
}
export const isCorrect = (selected:number, answer:number) => selected === answer;
export const canUseTimedQuiz = (age:number) => age >= 5;
