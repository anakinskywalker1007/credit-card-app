/**
 * CardTier — Static Card Page Generator
 * 
 * Run: node generate-card-pages.js
 * 
 * Generates /cards/[slug]/index.html for all cards that don't yet have pages.
 * The 5 POC cards (below) are already created with full editorial content.
 * This script generates templated pages for the remaining 45 cards.
 */

const fs = require('fs');
const path = require('path');

// Cards already created with full editorial content (skip these)
const ALREADY_CREATED = [
  'chase-sapphire-preferred',
  'amex-gold',
  'capital-one-venture-x',
  'chase-freedom-unlimited',
  'citi-double-cash'
];

// Full card data from index.html (all 50 cards)
const cards = [
  {id:1,name:"Chase Sapphire Preferred®",issuer:"Chase",net:"Visa",slug:"chase-sapphire-preferred",desc:"Best starter travel card. Strong bonus, low fee.",bonus:"75K pts",val:1500,valDisp:"$1,500",fee:95,feeNote:"Waived 1st yr",score:"750+",scLabel:"Excellent",apr:"19.99%",introApr:"0% for 12 months",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Dining, Uber","3X"],["Travel","2X"],["Streaming","3X"]],perks:["$50 Annual Hotel Credit via Chase Travel","DoorDash DashPass","5X on Lyft","3X Dining Worldwide","3X Streaming","No Foreign Tx Fee","Trip Cancellation Insurance"],transfers:["United","Southwest","Hyatt","Marriott","IHG","Virgin"],cat:["travel","premium"],link:"https://www.chase.com",best:"Best all-around"},
  {id:2,name:"Chase Sapphire Reserve®",issuer:"Chase",net:"Visa",slug:"chase-sapphire-reserve",desc:"Premium travel perks with a $300 annual travel credit.",bonus:"125K pts",val:2500,valDisp:"$2,500",fee:795,feeNote:"",score:"760+",scLabel:"Excellent",apr:"19.99%",introApr:"None",spend:"$6,000",time:"3 mo",ftf:"No",rewards:[["Travel, Dining","3X"]],perks:["$300 Annual Travel Credit","$500 The Edit Hotel Credit","Priority Pass Lounges","Global Entry or TSA PreCheck","3X on Travel and Dining","No Foreign Tx Fee","Trip Cancellation Insurance"],transfers:["United","Hyatt","Marriott","Air Canada","Virgin"],cat:["travel","premium"],link:"https://www.chase.com",best:"Premium travelers"},
  {id:3,name:"Chase Freedom Unlimited®",issuer:"Chase",net:"Visa",slug:"chase-freedom-unlimited",desc:"Flat 1.5% on everything, no annual fee.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"19.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"3%",rewards:[["Dining, Travel","3%"],["Everything","1.5%"]],perks:["1.5% on Everything","3% Dining and Drugstores","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.chase.com",best:"Flat cash back"},
  {id:4,name:"Chase Freedom Flex℠",issuer:"Chase",net:"Visa",slug:"chase-freedom-flex",desc:"5% rotating categories plus solid base rewards.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"19.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"3%",rewards:[["Rotating 5%","5%"],["Dining, Drugstores","3%"]],perks:["5% Rotating Categories","3% Dining and Drugstores","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.chase.com",best:"Rotating categories"},
  {id:5,name:"Chase Ink Business Preferred®",issuer:"Chase",net:"Visa",slug:"chase-ink-business-preferred",desc:"Best business travel card. 3X on travel and shipping.",bonus:"100K pts",val:2050,valDisp:"$2,050",fee:95,feeNote:"",score:"720+",scLabel:"Good+",apr:"19.99%",introApr:"0% for 12 months",spend:"$8,000",time:"3 mo",ftf:"No",rewards:[["Travel","3X"],["Advertising","3X"],["Internet","3X"]],perks:["$600 Cell Phone Protection","3X Travel","No Foreign Tx Fee","14 Transfer Partners"],transfers:["United","Southwest","Hyatt","Marriott"],cat:["business"],link:"https://www.chase.com",best:"Business spending"},
  {id:6,name:"Capital One Venture X",issuer:"Capital One",net:"Visa",slug:"capital-one-venture-x",desc:"Best all-in-one travel card.",bonus:"75K mi",val:1388,valDisp:"$1,388",fee:395,feeNote:"Net ~$195",score:"750+",scLabel:"Excellent",apr:"24.99%",introApr:"0% for 12 months",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Everything","2X"]],perks:["$300 Annual Capital One Travel Credit","Priority Pass","Global Entry"],transfers:["Air Canada","British Airways","Virgin Atlantic"],cat:["travel","premium"],link:"https://www.capitalone.com",best:"Premium travel"},
  {id:7,name:"Capital One Venture",issuer:"Capital One",net:"Visa",slug:"capital-one-venture",desc:"Simple 2X miles on everything.",bonus:"75K mi",val:1388,valDisp:"$1,388",fee:95,feeNote:"",score:"700+",scLabel:"Good+",apr:"24.99%",introApr:"0% for 12 months",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Everything","2X"]],perks:["$100 Global Entry","2X Miles on Everything","No Foreign Tx Fee"],transfers:["Air Canada","British Airways"],cat:["travel"],link:"https://www.capitalone.com",best:"Simple travel"},
  {id:8,name:"Capital One Quicksilver",issuer:"Capital One",net:"Visa",slug:"capital-one-quicksilver",desc:"Unlimited 1.5% cash back with no annual fee.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"24.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"No",rewards:[["Everything","1.5%"]],perks:["1.5% Cash Back","No Annual Fee","No Foreign Tx Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.capitalone.com",best:"Flat rate"},
  {id:9,name:"Capital One SavorCash",issuer:"Capital One",net:"Visa",slug:"capital-one-savorcash",desc:"4% on dining and entertainment.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"24.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"No",rewards:[["Dining","4%"],["Entertainment","4%"]],perks:["4% Dining","4% Entertainment","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.capitalone.com",best:"Dining & entertainment"},
  {id:10,name:"Capital One SavorOne",issuer:"Capital One",net:"Visa",slug:"capital-one-savorone",desc:"Dining rewards with no annual fee.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"24.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"No",rewards:[["Dining","3%"],["Entertainment","3%"]],perks:["3% Dining","3% Entertainment","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.capitalone.com",best:"No fee dining"},
  {id:11,name:"Amex Platinum®",issuer:"Amex",net:"Amex",slug:"amex-platinum",desc:"The ultimate status card. Unmatched lounge access.",bonus:"175K pts",val:3500,valDisp:"$3,500",fee:895,feeNote:"",score:"740+",scLabel:"Excellent",apr:"19.99%",introApr:"None",spend:"$12,000",time:"6 mo",ftf:"No",rewards:[["Flights","5X"],["Hotels","5X"]],perks:["Centurion Lounge Access","$200 Uber Cash","$200 Airline Fee Credit","Priority Pass Select","Hilton Honors Gold Status","Marriott Bonvoy Gold"],transfers:["Delta","Marriott","Hilton","British Airways","Singapore","Emirates"],cat:["travel","premium"],link:"https://www.americanexpress.com",best:"Maximum perks"},
  {id:12,name:"Amex Gold Card®",issuer:"Amex",net:"Amex",slug:"amex-gold",desc:"Best card for dining and groceries.",bonus:"100K pts",val:2000,valDisp:"$2,000",fee:325,feeNote:"",score:"720+",scLabel:"Good+",apr:"19.99%",introApr:"None",spend:"$5,000",time:"6 mo",ftf:"No",rewards:[["Dining Worldwide","4X"],["U.S. Supermarkets","4X"]],perks:["$120 Dining Credit","$120 Uber Cash","4X Dining"],transfers:["Delta","Marriott","Hilton"],cat:["travel"],link:"https://www.americanexpress.com",best:"Dining & groceries"},
  {id:13,name:"Amex Green Card®",issuer:"Amex",net:"Amex",slug:"amex-green",desc:"Travel and transit rewards at a lower annual fee.",bonus:"60K pts",val:1200,valDisp:"$1,200",fee:150,feeNote:"",score:"700+",scLabel:"Good+",apr:"19.99%",introApr:"None",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Dining","3X"],["Travel","3X"],["Transit","3X"]],perks:["$100 CLEAR Plus","$100 LoungeBuddy","3X Travel, Dining, Transit"],transfers:["Delta","Marriott","Hilton"],cat:["travel"],link:"https://www.americanexpress.com",best:"Travel & transit"},
  {id:14,name:"Amex Blue Business Plus®",issuer:"Amex",net:"Amex",slug:"amex-blue-business-plus",desc:"2X on all business purchases. No annual fee.",bonus:"15K pts",val:300,valDisp:"$300",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"19.99%",introApr:"0% for 12 months",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Everything","2X"]],perks:["2X on Everything (up to $50K)","0% APR 12 months","No Annual Fee"],transfers:["Delta","Marriott","Hilton"],cat:["business","noaf"],link:"https://www.americanexpress.com",best:"Business flat rate"},
  {id:15,name:"Amex Business Platinum®",issuer:"Amex",net:"Amex",slug:"amex-business-platinum",desc:"Massive business perks with up to $1,000 in annual credits.",bonus:"250K pts",val:5000,valDisp:"$5,000",fee:895,feeNote:"",score:"740+",scLabel:"Excellent",apr:"19.99%",introApr:"None",spend:"$15,000",time:"3 mo",ftf:"No",rewards:[["Flights, Hotels","5X"]],perks:["$1,200 AmexTravel Credit","Centurion Lounges","Priority Pass","35% Points Rebate"],transfers:["Delta","Marriott","Hilton","British Airways","Singapore"],cat:["business","premium"],link:"https://www.americanexpress.com",best:"Premium business"},
  {id:16,name:"Citi Strata Elite",issuer:"Citi",net:"Mastercard",slug:"citi-strata-elite",desc:"Top transfer partners for serious points collectors.",bonus:"100K pts",val:1900,valDisp:"$1,900",fee:95,feeNote:"Waived 1st yr",score:"720+",scLabel:"Good+",apr:"29.99%",introApr:"0% 12mo",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Travel","3X"],["Dining","3X"]],perks:["$300 Air Travel Credit","$100 Hotel Credit","10 Transfer Partners"],transfers:["JetBlue","Singapore","Turkish","Virgin Atlantic","Cathay Pacific"],cat:["travel"],link:"https://www.citibank.com",best:"Flexible travel"},
  {id:17,name:"Citi Custom Cash℠",issuer:"Citi",net:"Mastercard",slug:"citi-custom-cash",desc:"5% on your top spending category automatically.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"29.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"3%",rewards:[["Top Category","5%"],["Everything","1%"]],perks:["5% Top Category (auto)","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.citibank.com",best:"Auto category"},
  {id:18,name:"Citi Double Cash®",issuer:"Citi",net:"Mastercard",slug:"citi-double-cash",desc:"Simple 2% on everything.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"29.99%",introApr:"0% for 18 months",spend:"$1,000",time:"3 mo",ftf:"3%",rewards:[["Everything","2%"]],perks:["2% on Everything","0% APR 18 months","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.citibank.com",best:"Simple 2%"},
  {id:19,name:"Bilt Mastercard®",issuer:"Bilt",net:"Mastercard",slug:"bilt-mastercard",desc:"Only card that earns points on rent. No annual fee.",bonus:"50K pts",val:1100,valDisp:"$1,100",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"29.99%",introApr:"None",spend:"$2,000",time:"3 mo",ftf:"No",rewards:[["Dining","3X"],["Travel","2X"],["Rent","1X"]],perks:["Earn Points on Rent","3X Dining","1:1 Transfers","No Annual Fee"],transfers:["Hyatt","United","American","Air Canada"],cat:["travel","noaf"],link:"https://www.bilt.com",best:"Renters"},
  {id:20,name:"Wells Fargo Active Cash®",issuer:"Wells Fargo",net:"Visa",slug:"wells-fargo-active-cash",desc:"Unlimited 2% cash back. No annual fee.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"670+",scLabel:"Good",apr:"28.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"3%",rewards:[["Everything","2%"]],perks:["$600 Cell Phone Protection","2% Cash Back","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.wellsfargo.com",best:"Flat cash"},
  {id:21,name:"Wells Fargo Autograph℠",issuer:"Wells Fargo",net:"Visa",slug:"wells-fargo-autograph",desc:"3X on travel, dining, gas, and more. No annual fee.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"28.99%",introApr:"0% for 15 months",spend:"$500",time:"3 mo",ftf:"No",rewards:[["Travel, Transit","3X"],["Dining","3X"],["Gas","3X"]],perks:["3X on Travel, Gas, Dining","$600 Cell Phone Protection","No Annual Fee","No Foreign Tx Fee"],transfers:["Aer Lingus","British Airways","Virgin Atlantic"],cat:["cash","noaf"],link:"https://www.wellsfargo.com",best:"Bonus categories"},
  {id:22,name:"Discover it® Cash Back",issuer:"Discover",net:"Discover",slug:"discover-it-cash-back",desc:"5% rotating categories with first-year cash back match.",bonus:"MATCH",val:0,valDisp:"Match Yr1",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"28.99%",introApr:"0% for 15 months",spend:"—",time:"",ftf:"No",rewards:[["Rotating","5%"],["Everything","1%"]],perks:["5% Rotating Categories","Cashback Match First Year","No Annual Fee","Free FICO Score"],transfers:[],cat:["cash","noaf"],link:"https://www.discover.com",best:"Rotating"},
  {id:23,name:"Discover it® Miles",issuer:"Discover",net:"Discover",slug:"discover-it-miles",desc:"1.5X miles matched after year one.",bonus:"MATCH",val:0,valDisp:"Match Yr1",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"28.99%",introApr:"0% for 15 months",spend:"—",time:"",ftf:"No",rewards:[["Everything","1.5X"]],perks:["1.5X Miles","Miles Match First Year","No Annual Fee"],transfers:[],cat:["travel","noaf"],link:"https://www.discover.com",best:"Flat travel"},
  {id:24,name:"BoA Customized Cash",issuer:"Bank of America",net:"Mastercard",slug:"boa-customized-cash",desc:"Pick your 3% category.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"670+",scLabel:"Good",apr:"29.99%",introApr:"0% for 15 months",spend:"$1,000",time:"3 mo",ftf:"3%",rewards:[["Choice Category","3%"],["Everything","2%"]],perks:["3% Your Choice Category","Preferred Rewards Bonus","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.bankofamerica.com",best:"Custom categories"},
  {id:25,name:"BoA Travel Rewards",issuer:"Bank of America",net:"Visa",slug:"boa-travel-rewards",desc:"Simple travel rewards with no annual fee.",bonus:"$250",val:250,valDisp:"$250",fee:0,feeNote:"No fee",score:"670+",scLabel:"Good",apr:"29.99%",introApr:"0% for 15 months",spend:"$1,000",time:"3 mo",ftf:"No",rewards:[["Everything","1.5%"]],perks:["1.5X Points on Everything","No Annual Fee","No Foreign Tx Fee"],transfers:[],cat:["travel","noaf"],link:"https://www.bankofamerica.com",best:"Simple travel"},
  {id:26,name:"Amazon Prime Rewards Visa",issuer:"Amazon/Chase",net:"Visa",slug:"amazon-prime-rewards",desc:"5% back at Amazon and Whole Foods.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"Prime required",score:"670+",scLabel:"Good",apr:"27.99%",introApr:"0% 12mo",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Amazon","5%"],["Whole Foods","5%"]],perks:["5% at Amazon.com and Whole Foods","No Annual Fee (Prime required)","No Foreign Tx Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.amazon.com/primerewards",best:"Amazon shoppers"},
  {id:27,name:"Costco Anywhere Visa",issuer:"Citi",net:"Visa",slug:"costco-anywhere-visa",desc:"4% on gas, 3% dining.",bonus:"$100",val:100,valDisp:"$100",fee:0,feeNote:"Costco member",score:"670+",scLabel:"Good",apr:"19.99%",introApr:"0% 12mo",spend:"$1,000",time:"3 mo",ftf:"No",rewards:[["Gas","4%"],["Costco","2%"]],perks:["4% Gas","3% Dining","2% Costco","No Annual Fee (Costco member)"],transfers:[],cat:["cash","noaf"],link:"https://www.citibank.com",best:"Costco"},
  {id:28,name:"Apple Card",issuer:"Goldman Sachs",net:"Mastercard",slug:"apple-card",desc:"2% on Apple Pay.",bonus:"$75",val:75,valDisp:"$75",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"27.99%",introApr:"0% 12mo",spend:"$500",time:"3 mo",ftf:"No",rewards:[["Apple","3%"],["Apple Pay","2%"]],perks:["3% Apple Purchases","2% Apple Pay","No Annual Fee","No Late Fees","No Foreign Tx Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.apple.com/apple-card",best:"Apple"},
  {id:30,name:"Navy Federal GoRewards",issuer:"Navy Federal",net:"Visa",slug:"navy-federal-gorewards",desc:"Solid everyday rewards for military.",bonus:"20K pts",val:250,valDisp:"$250",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"14.90%-18%",introApr:"0% 12mo",spend:"$1,500",time:"3 mo",ftf:"No",rewards:[["Dining","3X"],["Gas","3X"]],perks:["Low APR (14.90%-18%)","No Annual Fee","Military Benefits"],transfers:[],cat:["cash","noaf"],link:"https://www.navyfederal.org",best:"Military"},
  {id:31,name:"Delta SkyMiles Gold",issuer:"Amex",net:"Amex",slug:"delta-skymiles-gold",desc:"Best entry-level Delta card.",bonus:"50K mi + $400",val:1025,valDisp:"$875",fee:0,feeNote:"Waived 1st yr",score:"700+",scLabel:"Good+",apr:"20.99%-29.99%",introApr:"0% 15mo",spend:"$2,000",time:"3 mo",ftf:"No",rewards:[["Delta","2X"],["Groceries","2X"]],perks:["Free First Checked Bag","Priority Boarding","$200 Delta Stays Credit"],transfers:["Delta","Marriott"],cat:["travel","noaf"],link:"https://www.americanexpress.com",best:"Delta"},
  {id:32,name:"Delta SkyMiles Platinum",issuer:"Amex",net:"Amex",slug:"delta-skymiles-platinum",desc:"Annual companion certificate.",bonus:"100K mi",val:1250,valDisp:"$1,125",fee:350,feeNote:"",score:"720+",scLabel:"Good+",apr:"20.99%-29.99%",introApr:"0% 15mo",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Delta","3X"],["Hotels","3X"]],perks:["Free First Checked Bag","Companion Certificate","3X Delta","Global Entry Credit"],transfers:["Delta","Marriott"],cat:["travel","premium"],link:"https://www.americanexpress.com",best:"Delta Plus"},
  {id:33,name:"Delta SkyMiles Reserve",issuer:"Amex",net:"Amex",slug:"delta-skymiles-reserve",desc:"Delta's premium card with Sky Club lounge access.",bonus:"125K mi",val:1563,valDisp:"$1,563",fee:650,feeNote:"",score:"750+",scLabel:"Excellent",apr:"20.99%-29.99%",introApr:"0% 15mo",spend:"$6,000",time:"3 mo",ftf:"No",rewards:[["Delta","3X"]],perks:["Delta Sky Club Access","Centurion Lounge (flying Delta)","First Class Companion Certificate"],transfers:["Delta","Marriott"],cat:["travel","premium"],link:"https://www.americanexpress.com",best:"Delta Elite"},
  {id:34,name:"United Quest Card",issuer:"United",net:"Visa",slug:"united-quest-card",desc:"Mid-tier United card with strong annual statement credits.",bonus:"100K pts",val:1500,valDisp:"$1,200",fee:350,feeNote:"",score:"720+",scLabel:"Good+",apr:"21.99%-28.99%",introApr:"0% 12mo",spend:"$5,000",time:"3 mo",ftf:"No",rewards:[["United","3X"],["Dining","2X"]],perks:["$125 United Travel Credit","2 Free Checked Bags","10,000 Mile Discount"],transfers:["United","Marriott"],cat:["travel","premium"],link:"https://www.united.com",best:"United"},
  {id:35,name:"United Explorer Card",issuer:"United",net:"Visa",slug:"united-explorer-card",desc:"Best entry-level United card.",bonus:"85K pts",val:1275,valDisp:"$1,275",fee:150,feeNote:"Waived 1st yr",score:"700+",scLabel:"Good+",apr:"21.99%-28.99%",introApr:"0% 12mo",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["United","2X"],["Dining","2X"],["Hotels","2X"]],perks:["Free First Checked Bag","Priority Boarding","2 United Club Passes"],transfers:["United"],cat:["travel"],link:"https://www.united.com",best:"United occasional"},
  {id:36,name:"Southwest Priority",issuer:"Chase",net:"Visa",slug:"southwest-priority",desc:"Best Southwest card. $75 travel credit offsets the fee.",bonus:"60K pts",val:900,valDisp:"$900",fee:229,feeNote:"",score:"720+",scLabel:"Good+",apr:"21.99%-28.99%",introApr:"0% 12mo",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Southwest","3X"]],perks:["$75 Southwest Annual Travel Credit","7,500 Anniversary Points","4 Upgraded Boardings/yr"],transfers:["Southwest"],cat:["travel"],link:"https://www.chase.com",best:"Southwest"},
  {id:37,name:"Hilton Honors Amex",issuer:"Amex",net:"Amex",slug:"hilton-honors-amex",desc:"Free night reward annually.",bonus:"130K pts + FN",val:780,valDisp:"$480",fee:95,feeNote:"Waived 1st yr",score:"700+",scLabel:"Good+",apr:"19.99%-28.99%",introApr:"0% 15mo",spend:"$2,000",time:"3 mo",ftf:"No",rewards:[["Hilton","7X"],["Gas","5X"]],perks:["Hilton Gold Status","Free Weekend Night","7X Hilton Hotels"],transfers:["Hilton"],cat:["travel"],link:"https://www.americanexpress.com",best:"Hilton"},
  {id:38,name:"Hilton Surpass",issuer:"Amex",net:"Amex",slug:"hilton-surpass",desc:"Top Hilton card. Free weekend night plus Priority Pass.",bonus:"130K pts + FN",val:1080,valDisp:"$780",fee:250,feeNote:"",score:"720+",scLabel:"Good+",apr:"19.99%-28.99%",introApr:"0% 15mo",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Hilton Hotels","12X"],["Dining","6X"]],perks:["Hilton Gold Status","Free Weekend Night","Priority Pass (10 visits/yr)"],transfers:["Hilton"],cat:["travel","premium"],link:"https://www.americanexpress.com",best:"Hilton Elite"},
  {id:39,name:"Alaska Airlines Visa",issuer:"BoA",net:"Visa",slug:"alaska-airlines-visa",desc:"Annual companion fare. Best for West Coast travelers.",bonus:"80K mi",val:1440,valDisp:"$1,440",fee:95,feeNote:"",score:"720+",scLabel:"Good+",apr:"20.99%-27.99%",introApr:"0% 12mo",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Alaska","3X"],["Gas","2X"]],perks:["Companion Fare Annually","Free First Checked Bag","Priority Boarding"],transfers:["Alaska","British Airways"],cat:["travel"],link:"https://www.google.com",best:"Alaska"},
  {id:40,name:"Brex 70 Card",issuer:"Brex",net:"Mastercard",slug:"brex-70",desc:"High-limit business card for startups.",bonus:"70K pts",val:1050,valDisp:"$1,050",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"0%",introApr:"0% Always",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Everything","1X"],["Travel","4X"]],perks:["7X Rideshare","4X Airbnb","No Personal Guarantee","No Annual Fee"],transfers:["Air Canada","Virgin Atlantic"],cat:["business","travel","noaf"],link:"https://www.brex.com",best:"Startups"},
  {id:41,name:"Spark Cash Plus",issuer:"Capital One",net:"Visa",slug:"capital-one-spark-cash-plus",desc:"Unlimited 2% cash back for businesses.",bonus:"$2,000",val:2000,valDisp:"$2,000",fee:95,feeNote:"",score:"720+",scLabel:"Good+",apr:"24.99%-29.99%",introApr:"0% 12mo",spend:"$20,000",time:"3 mo",ftf:"No",rewards:[["Everything","2%"]],perks:["2% Cash Back on Everything","No Preset Spending Limit","Employee Cards Free"],transfers:[],cat:["business","cash"],link:"https://www.capitalone.com",best:"Business"},
  {id:42,name:"Spark Miles",issuer:"Capital One",net:"Visa",slug:"capital-one-spark-miles",desc:"2X miles on all business spending.",bonus:"75K mi",val:1388,valDisp:"$1,388",fee:95,feeNote:"",score:"700+",scLabel:"Good+",apr:"24.99%-29.99%",introApr:"0% 12mo",spend:"$5,000",time:"3 mo",ftf:"No",rewards:[["Everything","2X"]],perks:["2X Miles on Everything","Global Entry Credit","15+ Transfer Partners"],transfers:["Air Canada","Virgin Atlantic"],cat:["business","travel"],link:"https://www.capitalone.com",best:"Business Travel"},
  {id:44,name:"US Bank Cash+",issuer:"US Bank",net:"Visa",slug:"us-bank-cash-plus",desc:"5% on two categories you choose.",bonus:"$200",val:200,valDisp:"$200",fee:0,feeNote:"No fee",score:"670+",scLabel:"Good",apr:"19.99%-29.99%",introApr:"0% 15mo",spend:"$1,000",time:"3 mo",ftf:"No",rewards:[["Choice categories","5%"],["Everything","1%"]],perks:["5% on Two Choice Categories","2% One Everyday Category","No Annual Fee","No Foreign Tx Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.usbank.com",best:"Custom"},
  {id:46,name:"Amex Blue Business Cash",issuer:"Amex",net:"Amex",slug:"amex-blue-business-cash",desc:"2% cash back on all business purchases.",bonus:"$500",val:500,valDisp:"$500",fee:0,feeNote:"No fee",score:"700+",scLabel:"Good+",apr:"19.99%",introApr:"0% 12mo",spend:"$3,000",time:"3 mo",ftf:"No",rewards:[["Everything","2%"]],perks:["2% Cash Back (up to $50K/yr)","0% APR 12 months","No Annual Fee"],transfers:[],cat:["business","cash","noaf"],link:"https://www.americanexpress.com",best:"Business Flat"},
  {id:47,name:"Citi Rewards+",issuer:"Citi",net:"Mastercard",slug:"citi-rewards-plus",desc:"Rounds up every purchase to nearest 10 points.",bonus:"15K pts",val:285,valDisp:"$285",fee:0,feeNote:"No fee",score:"660+",scLabel:"Good",apr:"18.99%-28.99%",introApr:"0% 15mo",spend:"$1,000",time:"3 mo",ftf:"3%",rewards:[["Gas/Groceries","2X"],["Everything","1X"]],perks:["Round Up to Nearest 10 Points","10% Points Back on First 100K","No Annual Fee"],transfers:["Citi ThankYou"],cat:["cash","noaf"],link:"https://www.citibank.com",best:"Small bonus"},
  {id:48,name:"Citi Strata Premier",issuer:"Citi",net:"Mastercard",slug:"citi-strata-premier",desc:"Broad category bonuses with top-tier transfer partners.",bonus:"60K pts",val:1140,valDisp:"$1,140",fee:95,feeNote:"Waived 1st yr",score:"720+",scLabel:"Good+",apr:"20.24%-28.24%",introApr:"0% 15mo",spend:"$4,000",time:"3 mo",ftf:"No",rewards:[["Travel","3X"],["Dining","3X"]],perks:["$100 Annual Hotel Savings","3X Dining, Groceries, Gas","15+ Transfer Partners"],transfers:["JetBlue","Virgin Atlantic","Singapore","Turkish"],cat:["travel"],link:"https://www.citibank.com",best:"Citi travel"},
  {id:49,name:"Citi AAdvantage Executive",issuer:"Citi",net:"Mastercard",slug:"citi-aadvantage-executive",desc:"Premium AA card with full Admirals Club lounge access.",bonus:"100K mi",val:1770,valDisp:"$1,770",fee:595,feeNote:"",score:"750+",scLabel:"Excellent",apr:"20.24%-28.24%",introApr:"0% 15mo",spend:"$5,000",time:"3 mo",ftf:"No",rewards:[["American Airlines","4X"]],perks:["Admirals Club Membership","Free First Checked Bag","Priority Boarding","4X American Airlines"],transfers:["American Airlines"],cat:["travel","premium"],link:"https://www.citibank.com",best:"AA Elite"},
  {id:51,name:"Navy Federal Platinum",issuer:"Navy Federal",net:"Visa",slug:"navy-federal-platinum",desc:"Low APR card for military members.",bonus:"$100",val:100,valDisp:"$100",fee:0,feeNote:"No fee",score:"640+",scLabel:"Fair",apr:"14.90%-18%",introApr:"0% 12mo",spend:"$2,000",time:"3 mo",ftf:"No",rewards:[["Everything","1.5%"]],perks:["Low APR (14.90%-18%)","No Balance Transfer Fee","No Annual Fee"],transfers:[],cat:["cash","noaf"],link:"https://www.navyfederal.org",best:"Basic card"}
];

function getTier(v) {
  if (v >= 2000) return 'S';
  if (v >= 1000) return 'A';
  if (v >= 500) return 'B';
  if (v >= 200) return 'C';
  return 'D';
}

function getCategoryLabel(cat) {
  if (cat.includes('travel')) return 'Travel';
  if (cat.includes('cash')) return 'Cash Back';
  if (cat.includes('business')) return 'Business';
  if (cat.includes('noaf')) return 'No Annual Fee';
  return 'All Cards';
}

function getCategoryUrl(cat) {
  if (cat.includes('travel')) return '/best-travel-credit-cards';
  if (cat.includes('cash')) return '/best-cash-back-credit-cards';
  if (cat.includes('business')) return '/best-business-credit-cards';
  if (cat.includes('noaf')) return '/best-credit-cards-no-annual-fee';
  return '/';
}

function generateCardPage(card) {
  const tier = getTier(card.val);
  const catLabel = getCategoryLabel(card.cat);
  const catUrl = getCategoryUrl(card.cat);
  const isNoFee = card.fee === 0;
  const feeWaived = card.feeNote && card.feeNote.includes('Waived');
  
  const rewardsHtml = card.rewards.map(r => `
      <div class="reward-item">
        <span class="reward-category">${r[0]}</span>
        <span class="reward-rate">${r[1]}</span>
      </div>`).join('');

  const perksHtml = card.perks.map(p => 
    `<div class="perk-item"><span class="perk-icon">✓</span> ${p}</div>`
  ).join('');

  const transfersHtml = card.transfers.length > 0 
    ? `<div class="content-section">
    <h2 class="section-title">Transfer Partners</h2>
    <div class="transfers-wrap">
      ${card.transfers.map(t => `<span class="transfer-pill">${t}</span>`).join('')}
    </div>
  </div>` : '';

  // Auto-generate a simple 300-word review
  const isTravel = card.cat.includes('travel');
  const isBusiness = card.cat.includes('business');
  const isNoFeeCard = card.cat.includes('noaf');
  
  let reviewText = `<p>The ${card.name} is a ${isTravel ? 'travel rewards' : isBusiness ? 'business' : 'cash back'} card from ${card.issuer} that earns ${card.rewards[0] ? card.rewards[0][1] + ' on ' + card.rewards[0][0] : 'rewards on purchases'}. ${card.desc}</p>

      <p>The signup bonus of ${card.bonus} ${card.val > 0 ? `is valued at approximately ${card.valDisp}` : 'is matched after your first year of card membership'}, requiring ${card.spend} in spending within ${card.time || 'the qualifying period'}. ${isNoFee ? 'With no annual fee, this card provides strong value with zero financial commitment.' : `The annual fee is $${card.fee}${feeWaived ? ', waived for the first year.' : '.'}`}</p>

      <p>${card.rewards.length > 1 ? `Earning rates are tiered: ${card.rewards.map(r => `${r[1]} on ${r[0]}`).join(', ')}. This structure rewards ${card.best ? card.best.toLowerCase() : 'everyday spending'} effectively.` : `The flat ${card.rewards[0]?.[1] || ''} earning rate simplifies rewards — no categories to track, no activation required.`}</p>

      <p>${card.perks.length > 3 ? `Notable perks include: ${card.perks.slice(0, 4).join(', ')}. These benefits ${isNoFee ? 'are exceptional for a no-annual-fee card.' : 'help offset the annual fee for regular users.'}` : `The card includes ${card.perks.slice(0, 3).join(', ')}.`}</p>

      ${card.transfers.length > 0 ? `<p>Points are transferable to ${card.transfers.slice(0, 4).join(', ')}${card.transfers.length > 4 ? ', and more' : ''} — unlocking premium travel redemption values beyond standard cash back rates.</p>` : ''}

      <p><strong>CardTier Bottom Line:</strong> The ${card.name} earns a <strong>${tier}-Tier</strong> rating with ${card.val > 0 ? card.valDisp : 'match value'} in first-year value. ${card.best ? `Best suited for: ${card.best}.` : ''} ${card.ftf === 'No' ? 'No foreign transaction fees make it a solid travel companion.' : 'Note: this card charges foreign transaction fees, so use a different card abroad.'}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${card.name} Review 2026 — CardTier</title>
<meta name="description" content="${card.name} review 2026: ${card.bonus} signup bonus, ${card.fee === 0 ? 'no annual fee' : '$' + card.fee + ' annual fee'}. ${card.desc} CardTier net value breakdown and full review.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://cardtier.com/cards/${card.slug}">
<meta property="og:title" content="${card.name} Review 2026 — CardTier">
<meta property="og:description" content="${card.bonus} bonus, ${card.fee === 0 ? 'no annual fee' : '$' + card.fee + ' annual fee'}. ${card.desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://cardtier.com/cards/${card.slug}">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💳</text></svg>">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "${card.name} Review 2026",
  "reviewBody": "${card.name} - ${card.desc} ${card.bonus} signup bonus. $${card.fee} annual fee. CardTier ${tier}-Tier.",
  "reviewRating": {"@type": "Rating", "ratingValue": "${tier === 'S' ? '5.0' : tier === 'A' ? '4.5' : tier === 'B' ? '4.0' : '3.5'}", "bestRating": "5"},
  "author": {"@type": "Organization", "name": "CardTier"},
  "datePublished": "2026-03-01",
  "dateModified": "2026-03-03",
  "itemReviewed": {
    "@type": "Product",
    "name": "${card.name}",
    "brand": {"@type": "Brand", "name": "${card.issuer}"}
  }
}
<\/script>
<link rel="stylesheet" href="../../_shared.css">
</head>
<body>
<nav>
  <a href="/" class="logo">
    <svg width="32" height="23" viewBox="0 0 36 26" fill="none">
      <rect x="4" y="4" width="28" height="18" rx="3" fill="#93c5fd"/>
      <rect x="4" y="8" width="28" height="3" fill="#bfdbfe"/>
      <rect x="0" y="6" width="28" height="18" rx="3" fill="#2563eb"/>
      <rect x="0" y="10" width="28" height="3" fill="#1d4ed8"/>
      <rect x="4" y="17" width="8" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="23" cy="19" r="3" fill="rgba(255,255,255,0.3)"/>
      <circle cx="26" cy="19" r="3" fill="rgba(255,255,255,0.5)"/>
    </svg>
    <span style="color:#111">Card</span><span style="color:#2563eb">Tier</span>
  </a>
  <div class="nav-links">
    <a href="/" class="nav-link">All Cards</a>
    <a href="/best-travel-credit-cards" class="nav-link">Travel</a>
    <a href="/best-cash-back-credit-cards" class="nav-link">Cash Back</a>
    <a href="/best-premium-credit-cards" class="nav-link">Premium</a>
    <a href="/#compare" class="nav-link nav-cta">Compare Cards</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">CardTier</a>
  <span>›</span>
  <a href="${catUrl}">${catLabel} Cards</a>
  <span>›</span>
  ${card.name}
</div>

<div class="page-wrapper">

  <div class="card-hero">
    <div class="card-hero-header">
      <div class="card-hero-left">
        <h1>${card.name} Review 2026</h1>
        <div class="card-issuer-line">
          <span>${card.issuer} · ${card.net}</span>
          <span class="tier-chip tier-${tier}">${tier}-Tier</span>
          ${card.best ? `<span style="font-size:11px;background:#dbeafe;color:#2563eb;padding:3px 8px;border-radius:6px;font-weight:700;">${card.best}</span>` : ''}
        </div>
      </div>
      <div>
        <a href="${card.link || '#'}" class="apply-btn" rel="noopener sponsored" target="_blank">Apply Now →</a>
        <div class="apply-disclaimer">via ${card.issuer} secure site</div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-label">Signup Bonus</div>
        <div class="stat-value green">${card.bonus}</div>
        <div class="stat-sub">${card.val > 0 ? 'Worth ~' + card.valDisp : 'Matched Year 1'}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Annual Fee</div>
        <div class="stat-value ${card.fee === 0 ? 'green' : 'red'}">${card.fee === 0 ? '$0' : '$' + card.fee}</div>
        <div class="stat-sub">${card.feeNote || (card.fee === 0 ? 'Free forever' : '')}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Credit Score</div>
        <div class="stat-value">${card.score}</div>
        <div class="stat-sub">${card.scLabel}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Regular APR</div>
        <div class="stat-value" style="font-size:16px">${card.apr}</div>
        <div class="stat-sub">${card.introApr}</div>
      </div>
    </div>

    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:8px">
      <div class="score-badge">
        <span>CardTier Score</span>
        <span class="score">${tier}</span>
      </div>
      <div style="font-size:13px;color:#6b7280">
        Updated March 2026${card.spend && card.spend !== '—' ? ' · Spend: ' + card.spend + (card.time ? ' in ' + card.time : '') : ''} · Foreign fees: ${card.ftf}
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2 class="section-title">${card.name} Review 2026</h2>
    <div class="section-body">
      ${reviewText}
    </div>
  </div>

  <div class="content-section">
    <h2 class="section-title">Rewards Earning Rates</h2>
    <div class="rewards-list">
      ${rewardsHtml}
    </div>
  </div>

  <div class="content-section">
    <h2 class="section-title">Key Benefits &amp; Perks</h2>
    <div class="perks-grid">
      ${perksHtml}
    </div>
  </div>

  ${transfersHtml}

  <div class="content-section" style="text-align:center;padding:32px">
    <div style="font-size:20px;font-weight:900;color:#0f172a;margin-bottom:8px;letter-spacing:-0.02em">Apply for ${card.name}</div>
    <div style="font-size:13px;color:#6b7280;margin-bottom:18px">${card.bonus} bonus · ${card.fee === 0 ? 'No annual fee' : '$' + card.fee + ' annual fee'} · ${card.score} credit score required</div>
    <a href="${card.link || '#'}" class="apply-btn" style="font-size:15px;padding:14px 32px" rel="noopener sponsored" target="_blank">Apply Now →</a>
    <div class="apply-disclaimer" style="margin-top:10px">Rates and fees subject to change. CardTier may receive compensation if you apply through our links.</div>
  </div>

  <div class="content-section">
    <h2 class="section-title">Explore More Cards</h2>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <a href="${catUrl}" style="display:inline-flex;align-items:center;gap:6px;background:#eff6ff;color:#2563eb;text-decoration:none;padding:10px 16px;border-radius:9px;font-size:13px;font-weight:600">← All ${catLabel} Cards</a>
      <a href="/" style="display:inline-flex;align-items:center;gap:6px;background:#f9fafb;color:#374151;text-decoration:none;padding:10px 16px;border-radius:9px;font-size:13px;font-weight:600">View All 50 Cards</a>
    </div>
  </div>

</div>

<footer>
  <div class="footer-links">
    <a href="/">All Cards</a>
    <a href="/best-travel-credit-cards">Best Travel Cards</a>
    <a href="/best-cash-back-credit-cards">Best Cash Back</a>
    <a href="/best-premium-credit-cards">Premium Cards</a>
    <a href="/best-credit-cards-no-annual-fee">No Annual Fee</a>
  </div>
  <div>© 2026 CardTier — Always verify current terms directly with the card issuer before applying. CardTier may receive affiliate compensation.</div>
</footer>
</body>
</html>`;
}

// Generate pages
let generated = 0;
let skipped = 0;

cards.forEach(card => {
  if (ALREADY_CREATED.includes(card.slug)) {
    console.log(`⏭️  Skipping ${card.slug} (already has editorial page)`);
    skipped++;
    return;
  }

  const dir = path.join(__dirname, 'cards', card.slug);
  const file = path.join(dir, 'index.html');

  if (fs.existsSync(file)) {
    console.log(`⏭️  Skipping ${card.slug} (file already exists)`);
    skipped++;
    return;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generateCardPage(card));
  console.log(`✅ Generated /cards/${card.slug}`);
  generated++;
});

console.log(`\n📊 Summary: ${generated} pages generated, ${skipped} skipped`);
console.log(`🌐 Total card pages: ${generated + skipped} of ${cards.length}`);
