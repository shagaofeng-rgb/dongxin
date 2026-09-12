export const brand = { name: "Dongxin Machinery", shortName: "DONGXIN", descriptor: "MACHINERY" };
export const industries = [
 {slug:"chemical-industry",name:"Chemical",icon:"chemical",image:"chemical",challenge:"Balance material compatibility, cleaning requirements and dependable flow.",materials:["Pigments","Resins","Detergents","Fertilizers","Additives","Powders"]},
 {slug:"construction-industry",name:"Construction",icon:"construction",image:"construction",challenge:"Handle abrasive bulk materials with a configuration suited to your process.",materials:["Cement","Gypsum","Sand","Limestone","Fly ash","Minerals"]},
 {slug:"food-industry",name:"Food",icon:"food",image:"food",challenge:"Faster cleaning, better sanitation, more efficient bulk material processing, and less mess.",materials:["Flour","Sugar","Wheat & grains","Corn","Nuts and seeds","Coffee"]},
 {slug:"pet-food-industry",name:"Pet Food",icon:"petfood",image:"pet-food",challenge:"Keep ingredients moving while making cleaning and product changeovers practical.",materials:["Kibble","Grains","Protein meals","Vitamins","Minerals","Additives"]},
 {slug:"pharmaceutical-cosmetics-industry",name:"Pharmaceutical & Cosmetics",icon:"pharma",image:"pharmaceutical",challenge:"Configure controlled handling for fine powders and sensitive ingredients.",materials:["Powders","Starches","Pigments","Vitamins","Minerals","Ingredients"]},
 {slug:"plastics-industry",name:"Plastics",icon:"plastics",image:"plastics",challenge:"Handle pellets, flakes and regrind with consistent, low-damage transfer.",materials:["Pellets","Regrind","Flakes","Resins","Colorants","Additives"]},
];
export type Industry = typeof industries[number];
export type Product = {slug:string;name:string;category:string;summary:string;applications:string[];materials:string[];image:string;industries:string[];specifications:{label:string;value:string}[]};
const names = ["AN-X Dust Collector","CI Series","CI Series with Quick-Clean","Sanitary CI with Quick-Clean","XTR-CI Series","MD Series","MD Series with Quick-Clean","Sanitary MD Series with Quick-Clean","XTR-MD Series","12-inch Multi-Port Series","DR-S Series","Aero-Flow Series","DC Series","S-Pellet Series","S-Pellet Series with Quick-Clean","BT Series","SD Series","FT Series","Discharge Trough Feeder Valve Series","Gravity Diverter Valve","CI-RPV Series","Mini 19 Series","Double Flap Series","CDC-CI Series","CDC-MD Series","Micro-Ingredient Valve"];
export const slugify = (value:string) => value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
// Branded renders are excluded; mapped images are temporary layout placeholders.
const previewImageNumber:Record<number,number>={3:5,4:5,7:9,8:9,10:26,15:14,17:2,22:26};
export const products:Product[] = names.map((name,index)=>({
 name,slug:index===1?"airlock-ci-series":slugify(name),
 category:index===0||index===12?"Dust Collector":index===19?"Diverter":"Rotary Airlock",
 summary:"Rotary valve for metering, feeding and airlock applications. Explore housing, rotor and drive configurations for your material handling process.",
 applications:index===0||index===12?["Dust Collector"]:["Bulk Material","Pneumatic Conveying"],
 materials:["Cast iron","Stainless steel"],image:`/media/valve-${String(previewImageNumber[index+1]??index+1).padStart(2,"0")}.webp`,
 industries:index===13||index===14?["Plastics"]:index===3||index===7?["Food","Pet Food","Pharmaceutical & Cosmetics"]:["Chemical","Construction","Food","Pet Food","Plastics"],
 specifications:[{label:"Inlet / outlet flange sizes",value:"Application dependent"},{label:"Material of construction",value:"Cast iron / stainless steel"},{label:"Pressure differential",value:"Confirm with engineering"},{label:"Temperature range",value:"Confirm with engineering"}]
}));
export const options=["Closed End Rotor","Open End Rotor","Adjustable Rotor","Flex Tip Style Rotor","Metering Rotor","Helical Rotor","Reduced Volume Rotor","Radius Pocket Rotor","Staggered Pocket Rotor","Bolt-On Serrated Tips Rotor","Shaft Seal Air Purge Kit","Rotor Pocket Air Purge Kit","Zero Speed Switch Kit","Shaft Guard Kit","Discharge Finger Guard","Maintenance Slide Gate","Inlet Shear Protector","Vent Box","Pressure Blower Package","Screw Conveyor","Vacuum Blower Package"].map((name,index)=>({name,slug:slugify(name),category:index<10?"Rotors":index<14?"Kits":index<18?"Accessories":"Conveying Equipment",image:index<10?`/media/rotor-${String(index===3?2:index+1).padStart(2,"0")}.webp`:index<18?"/media/valve-02.webp":"/media/valve-19.webp"}));
export const articles=[
 {title:"Where can you use a quick-cleaning rotary valve?",category:"Quick Cleaning",image:"/media/valve-05.webp",summary:"Explore cleaning access and product changeovers across different bulk material applications."},
 {title:"Which parts of a rotary valve are customizable?",category:"Customization",image:"/media/rotor-06.webp",summary:"A practical overview of rotor, housing, sealing and drive choices for your application."},
 {title:"How to choose a rotor for your application",category:"Valve Tips",image:"/media/rotor-02.webp",summary:"Start with the characteristics of your material and the requirements of your production line."},
 {title:"A closer look at rotary valve maintenance",category:"Maintenance",image:"/media/valve-06.webp",summary:"Plan inspection and servicing around the equipment, material and operating conditions."},
 {title:"Material handling in food processing",category:"Food Safety",image:"/media/industry-food.webp",summary:"Consider cleanability, contact surfaces and process requirements when selecting equipment."},
 {title:"Configuring valves for abrasive materials",category:"Durability",image:"/media/industry-construction.webp",summary:"Compare material compatibility, wear components and access for routine maintenance."},
].map(article=>({...article,slug:slugify(article.title)}));
export const resourceTypes=["Datasheets","Technical Drawings","Literature","Videos"];
export const faqs=[
 {question:"How do I choose the right rotary valve?",answer:"Begin with the material, required flow rate, pressure, temperature and installation dimensions. These details help the engineering team narrow down suitable configurations."},
 {question:"What does it mean when a valve is quick-cleaning?",answer:"Quick-cleaning configurations provide easier access to the rotor and internal surfaces. The final cleaning procedure depends on the selected equipment and the material being processed."},
 {question:"Which rotary valve components can be configured?",answer:"Common configuration choices include the housing material, rotor, shaft seals, drive, surface finish and application accessories. Confirm compatibility for your selected model."}
];
