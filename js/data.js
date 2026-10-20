const CONFIG={name:"Pizza World & Fast Food",wa:"923497494457",open:10,close:1,deliveryFee:0,minOrder:0};
const SZ=["Small 8\"","Medium 10\"","Large 13\""];
const pz=(n,d,a,b,c)=>({n,d,v:[[SZ[0],a],[SZ[1],b],[SZ[2],c]]});
const one=(n,d,p)=>({n,d,v:[["Add",p]]});
const two=(n,d,l1,a,l2,b)=>({n,d,v:[[l1,a],[l2,b]]});
const dl=(no,p,d)=>({n:"Deal "+no,d,v:[["Add",p]]});
const MENU=[
{id:"classic",title:"Regular classic pizza",items:[
pz("Chicken Tikka","Cheese, tikka boti, onion, hot chilli tomato sauce",550,1000,1400),
pz("Chicken Supreme","Cheese, spicy chicken, onion, green pepper, olives, mushroom",550,1000,1400),
pz("Chicken Fajita","Cheese, fajita chicken, mushroom, olives, capsicum",550,1000,1400),
pz("American Hot","Cheese, minced chicken, Italian sausage, onion, hot chilli",550,1000,1400),
pz("Cheese Lover","Extra cheese and tasty tomato sauce",550,1000,1400),
pz("Hot N Spicy","Spicy chicken, hot sauce, olives, sausages, onion ring, capsicum",550,1000,1400),
pz("Vegetarian Pizza","Cheese, green pepper, tomato, capsicum, olives, mushroom",550,1000,1400),
pz("Achari Pizza","Extra cheese, achari chicken, onion, olives",550,1000,1400)]},
{id:"crust",title:"Pizza crust",items:[
{n:"Kabab Crust",d:"Kabab-stuffed crust",v:[[SZ[0],700],[SZ[1],1200],[SZ[2],1650]]},
{n:"Lazinia Pizza",d:"Layered lazinia style",v:[[SZ[0],750],[SZ[1],1250],[SZ[2],1800]]},
{n:"Malai Boti Crust",d:"Malai boti-stuffed crust",v:[[SZ[0],700],[SZ[1],1150],[SZ[2],1650]]},
{n:"Cheese Stuffer",d:"Cheese-stuffed crust",v:[[SZ[0],700],[SZ[1],1150],[SZ[2],1650]]},
{n:"Crown Crust",d:"Medium and large only",v:[[SZ[1],1200],[SZ[2],1700]]}]},
{id:"special",title:"Special pizza",items:[
pz("Pizza World Special","The house pizza",700,1150,1650),
pz("Fajita Sicilian","",650,1130,1570),
pz("Thin Crust","",650,1130,1570),
pz("Super Supreme","",650,1140,1550),
pz("Bone Fire","",650,1140,1570),
pz("White Special","",650,1130,1550),
pz("Pizza Delight","",650,1130,1550),
pz("Afghani Topping","",650,1130,1550),
two("Kabab Stuffer Pizza","Our special","Medium",1400,"Large",1800)]},
{id:"pasta",title:"Pasta and platters",items:[
two("Macaroni Pasta","","Half",500,"Full",700),
two("Crunchy Pasta","","Half",550,"Full",750),
two("Creamy Pasta","","Half",550,"Full",750),
two("Vegetable Pasta","","Half",500,"Full",700),
one("Shahi Tikka 1 kg","",1850),
one("Chicken Pakora 1 kg","",1800)]},
{id:"burgers",title:"Burgers",items:[
one("Zinger Burger","",400),one("Zinger Cheese Burger","",450),one("Chapli Kabab Burger","",300),
one("Chicken Patty Burger","",250),one("Tikka Patty Burger","",280),one("Zesty Fillet Burger","",300),
one("Crispy Burger","",250),one("Chicken Cheese Burger","",300),one("Grill Burger","",350)]},
{id:"rolls",title:"Paratha rolls",items:[
one("Zinger Paratha Roll","",400),one("Chicken Paratha Roll","",250),one("Kabab Paratha Roll","",300),
one("Cheese Paratha Roll","",300),one("Pizza Paratha","",450),one("Behari Roll","",500),one("Spin Roll","",450)]},
{id:"shawarma",title:"Shawarma",items:[
one("Kabab Shawarma","",250),one("Chicken Shawarma","",150),one("Zinger Shawarma","",300),
one("Shahi Tikka Shawarma","",250),one("Malai Boti Shawarma","",250),one("Cheese Shawarma","",250)]},
{id:"sides",title:"Wings, fries and sides",items:[
one("Hot Wings","5 pieces",300),one("Nuggets","5 pieces",300),one("Oven Baked Wings","10 pieces",700),
{n:"Fries",d:"",v:[["Full",450],["Cheese",500],["Loaded",550]]}]},
{id:"ice",title:"Ice cream",items:[
two("Special Tutti Frutti","","Small",180,"Large",280),two("Pista","","Small",170,"Large",250),
two("Mango","","Small",170,"Large",250),two("Kulfa","","Small",170,"Large",250),
two("Vanilla","","Small",170,"Large",250),two("Strawberry","","Small",170,"Large",250),
two("Chocolate","","Small",170,"Large",250),two("Caramel Crunch","","Small",180,"Large",280)]},
{id:"student",title:"Student offer, 10 AM to 3 PM",items:[
{n:"Student Pizza",d:"Valid 10 AM to 3 PM",v:[["Small",500],["Medium",900],["Large",1250]]},
one("Student Zinger Burger","Valid 10 AM to 3 PM",350),
one("Student Chicken Burger","Valid 10 AM to 3 PM",200),
one("Student Chicken Shawarma","Valid 10 AM to 3 PM",130)]},
{id:"double",title:"Double pizza offer, 10 AM to 4 PM",items:[
{n:"Double Pizza",d:"Any 2 pizzas, valid 10 AM to 4 PM",v:[["2 Small",1000],["2 Medium",1800],["2 Large",2500]]}]},
{id:"deals",title:"Deals",items:[
dl(1,550,"10 hot wings"),
dl(2,600,"1 zinger burger, 4 hot wings"),
dl(3,1800,"1 medium pizza, 12 hot wings, 1.5 L drink"),
dl(4,1000,"Small pizza, zinger burger, 500 ml drink"),
dl(5,1050,"Small pizza, boomer burger, shawarma, 1 L drink"),
dl(6,1500,"5 mini zinger burgers, 1.5 L drink"),
dl(7,1700,"Medium pizza, shawarma, zinger burger, 1.5 L drink"),
dl(8,4400,"2 large pizza, 2 chicken shawarma, 2 zinger burger, family fries, 1.5 L drink"),
dl(9,2500,"2 small pizza, 2 zinger burger, 10 hot wings, 1.5 L drink"),
dl(10,850,"2 zinger burger, 500 ml drink"),
dl(11,1850,"Large pizza, 5 hot wings, 1.5 L drink"),
dl(12,1350,"Small pizza, zinger burger, 5 hot wings, 1 L drink"),
dl(13,2150,"2 medium pizza, 1.5 L drink"),
dl(14,700,"2 zinger shawarma, 500 ml drink"),
dl(15,2750,"Large pizza, zinger burger, 2 chicken shawarma, 2 paratha roll, 1.5 L drink"),
dl(16,850,"2 twister roll, 500 ml drink"),
dl(17,1800,"2 small pizza, 10 hot wings, 1.5 L drink"),
dl(18,550,"10 nuggets"),
dl(19,7000,"3 large pizza, 4 zinger burger, 3 twister roll, 3 shawarma, 2 x 1.5 L drink. Free 1 pound birthday cake"),
dl(20,1150,"2 chicken shawarma, 5 hot shot, zinger burger, 1 L drink"),
dl(21,2000,"5 jumbo zinger burger, 1.5 L drink"),
dl(22,1500,"3 chicken shawarma, 10 hot wings, zinger burger, 1.5 L drink"),
dl(23,4300,"3 large pizza, 1.5 L drink"),
dl(24,650,"Chapli kabab burger, kabab shawarma roll, 500 ml drink"),
dl(25,600,"2 boomer burger, 500 ml drink"),
dl(26,350,"Zesty fillet burger, tin pack"),
dl(27,350,"Crispy patty burger, 500 ml drink"),
dl(28,450,"10 chicken corn fries, tin pack"),
dl(29,550,"10 chicken pakora, tin pack"),
dl(30,550,"10 chicken donuts, tin pack"),
dl(31,550,"10 chicken spring roll"),
dl(32,450,"Leg tikka, tin pack"),
dl(33,550,"10 shahi tikka pieces, tin pack"),
dl(34,500,"10 hot shot, tin pack"),
dl(35,400,"10 chicken samosa"),
dl(36,550,"2 tikka patty burger, 500 ml drink"),
dl(37,700,"2 grilled burger, 500 ml drink"),
dl(38,550,"2 chicken paratha roll, 500 ml drink"),
dl(39,1550,"10 chicken shawarma, 1.5 L drink")]}
];
