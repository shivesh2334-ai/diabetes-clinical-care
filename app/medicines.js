import { COMBINATION_CLASSES } from "./combinations.js";
// Indian retail reference, checked 31 October 2026. Prices are snapshots, not live quotations.
export const CHECKED_ON = "2026-10-31";
const mg = (slug) => "https://www.1mg.com/" + slug;
const sources = {
 met: mg("drugs/glycomet-500-mg-tablet-18033"),
 su: mg("drugs/1-mg-12155"),
 dpp: mg("drugs/100mg-32897"),
 pio: mg("drugs/pioglit-15-tablet-27733"),
 vog: mg("drugs/Volix-Tablet-325238"),
 rep: mg("drugs/eurepa-1-tablet-556052"),
 sglt: mg("drugs/jardiance-10mg-tablet-322717"),
 basal: mg("drugs-therapeutic-classes/drug-class-245"),
 nph: mg("drugs-therapeutic-classes/drug-class-208"),
 regular: mg("drugs/huminsulin-r-40-iu-injection-14549"),
 mix: mg("drugs/huminsulin-30-70-40iu-injection-14547"),
};
const row = (generic, strength, brand, company, price, unit, priceType, source, availability = "Listed; local stock must be checked") =>
 ({generic, strength, brand, company, companyRole: "Marketer / brand company", manufacturer: null, price, unit, priceType, source, availability, checkedOn: CHECKED_ON});
const BASE_MEDICINE_CLASSES = [
 {id:"biguanides", name:"Biguanides", note:"Five brand examples of metformin, not five different molecules. These entries are immediate-release tablets.", medicines:[
 row("Metformin","500 mg tablet (IR)","Glycomet","USV Private Limited",19.59,"10 tablets","MRP", "https://pharmeasy.in/medicines/glycomet-500mg-strip-of-10-tablets-49207/"),
 row("Metformin","500 mg tablet (IR)","Okamet","Cipla Ltd",1.04,"1 tablet","Listed unit price",sources.met),
 row("Metformin","500 mg tablet (IR)","Glyciphage","Franco-Indian Pharmaceuticals Pvt Ltd",1.89,"1 tablet","Listed unit price",sources.met),
 row("Metformin","500 mg tablet (IR)","Gluformin","Abbott Healthcare Private Limited",1.89,"1 tablet","Listed unit price",sources.met),
 row("Metformin","500 mg tablet (IR)","Biciphage","Biochem Pharmaceutical Industries",1.16,"1 tablet","Listed unit price",sources.met),
 ]},
 {id:"sulfonylureas", name:"Sulfonylureas", note:"Five marketed brand examples; molecules and release formulations differ.", medicines:[
 row("Glimepiride","1 mg tablet","Amaryl","Sanofi India Ltd",119.07,"30 tablets","MRP",mg("drugs/amaryl-1-mg-tablet-12155")),
 row("Glimepiride","1 mg tablet","Glimda","Cipla Ltd",1.88,"1 tablet","Listed unit price",sources.su),
 row("Glimepiride","1 mg tablet","Zoryl","Intas Pharmaceuticals Ltd",3.42,"1 tablet","Listed unit price",sources.su),
 row("Gliclazide","60 mg tablet (XR)","Diamicron XR 60","Servier India Private Limited",317.06,"15 tablets","MRP",mg("brands/diamicron-ZGlhbWljcm9u")),
 row("Glipizide","5 mg tablet","Glynase","USV Private Limited",10.95,"10 tablets","MRP",mg("drugs/glynase-tablet-12183?buyNow=true")),
 ]},
 {id:"glinides", name:"Meglitinides / glinides", note:"Five brand examples of repaglinide; a class may have fewer than five distinct molecules.", medicines:[
 row("Repaglinide","1 mg tablet","Eurepa","Torrent Pharmaceuticals Ltd",318,"15 tablets","MRP",mg("drugs/Eurepa-Tablet-556052")),
 row("Repaglinide","1 mg tablet","SA Rapid","Medley Pharmaceuticals",11.8,"1 tablet","Listed unit price",sources.rep),
 row("Repaglinide","1 mg tablet","Shortepa","Aanav Healthcare",9.28,"1 tablet","Listed unit price",sources.rep),
 row("Repaglinide","1 mg tablet","Premeal","Elsker Lifescience Pvt Ltd",13.1,"1 tablet","Listed unit price",sources.rep),
 row("Repaglinide","1 mg tablet","Mlrepa","Medicamen Biotech Ltd",9.73,"1 tablet","Listed unit price",sources.rep),
 ]},
 {id:"dpp4", name:"DPP-4 inhibitors", note:"Five different molecules with representative Indian brands. These are not dose-equivalent alternatives.", medicines:[
 row("Sitagliptin","100 mg tablet","Januvia","MSD Pharmaceuticals Pvt Ltd",304,"7 tablets","MRP",sources.dpp),
 row("Linagliptin","5 mg tablet","Trajenta","Boehringer Ingelheim",348.75,"10 tablets","MRP",mg("drugs/Trajenta-Tablet-126729")),
 row("Vildagliptin","50 mg tablet","Galvus","Novartis India Ltd",371.25,"15 tablets","MRP",mg("drugs/galvus-50mg-tablet-485431")),
 row("Teneligliptin","20 mg tablet","Ziten","Glenmark Pharmaceuticals Ltd",177.66,"15 tablets","MRP",mg("drugs/ziten-tablet-353110")),
 row("Saxagliptin","5 mg tablet","Onglyza","AstraZeneca",623.9,"14 tablets","MRP",mg("drugs/Onglyza-Tablet-198548")),
 ]},
 {id:"sglt2", name:"SGLT2 inhibitors", note:"Five brands across empagliflozin, dapagliflozin and remogliflozin. Indications differ by molecule.", medicines:[
 row("Empagliflozin","10 mg tablet","Jardiance","Boehringer Ingelheim",422,"10 tablets","MRP",sources.sglt),
 row("Dapagliflozin","10 mg tablet","Forxiga","AstraZeneca",566.25,"14 tablets","MRP",mg("drugs/forxiga-10mg-tablet-172791")),
 row("Remogliflozin etabonate","100 mg tablet","Remo","Glenmark Pharmaceuticals Ltd",241.41,"15 tablets","MRP",mg("drugs/remo-tablet-622532")),
 row("Empagliflozin","10 mg tablet","Gibtulio","Lupin Ltd",13.6,"1 tablet","Listed unit price",mg("drugs/%E0%A4%9C%E0%A5%8B%E0%A4%B0%E0%A5%8D%E0%A4%A1%E0%A4%BF%E0%A4%8F%E0%A4%A8%E0%A5%8D%E0%A4%B8-%E0%A4%9F%E0%A5%88%E0%A4%AC%E0%A4%B2%E0%A5%87%E0%A4%9F-322717")),
 row("Empagliflozin","10 mg tablet","Empacip","Cipla Ltd",7.59,"1 tablet","Listed unit price",mg("drugs/%E0%A4%9C%E0%A5%8B%E0%A4%B0%E0%A5%8D%E0%A4%A1%E0%A4%BF%E0%A4%8F%E0%A4%A8%E0%A5%8D%E0%A4%B8-%E0%A4%9F%E0%A5%88%E0%A4%AC%E0%A4%B2%E0%A5%87%E0%A4%9F-322717")),
 ]},
 {id:"tzd", name:"Thiazolidinediones", note:"Five pioglitazone brands; not five separate molecules.", medicines:[
 row("Pioglitazone","15 mg tablet","Pioglit","Sun Pharmaceutical Industries Ltd",74.53,"10 tablets","MRP",sources.pio),
 row("Pioglitazone","15 mg tablet","Pioz","USV Private Limited",7.74,"1 tablet","Listed unit price",sources.pio),
 row("Pioglitazone","15 mg tablet","Piosys","Systopic Laboratories Pvt Ltd",1.65,"1 tablet","Listed unit price",sources.pio),
 row("Pioglitazone","15 mg tablet","Piokind","Mankind Pharma Ltd",6.74,"1 tablet","Listed unit price",sources.pio),
 row("Pioglitazone","15 mg tablet","Piomed","Ipca Laboratories Ltd",7.39,"1 tablet","Listed unit price",sources.pio),
 ]},
 {id:"agi", name:"Alpha-glucosidase inhibitors", note:"Five brands across voglibose, acarbose and miglitol.", medicines:[
 row("Voglibose","0.2 mg tablet","PPG 0.2","Abbott",8.13,"1 tablet","Listed unit price",sources.vog),
 row("Voglibose","0.2 mg tablet","Vobose 0.2","USV Private Limited",11,"1 tablet","Listed unit price",sources.vog),
 row("Voglibose","0.2 mg tablet","Voglimac 0.2","Macleods Pharmaceuticals Pvt Ltd",10.2,"1 tablet","Listed unit price",sources.vog),
 row("Acarbose","50 mg tablet","Glucobay 50","Bayer Zydus Pharma Pvt Ltd",180,"10 tablets","MRP",mg("drugs/glucobay-50mg-tablet-40388")),
 row("Miglitol","25 mg tablet","Mignar 25","Glenmark Pharmaceuticals Ltd",201,"10 tablets","MRP","https://www.netmeds.com/product/mignar-25mg-tablet-10s-m1uu21-8519260"),
 ]},
 {id:"glp1", name:"GLP-1 receptor agonists", note:"Five brands, including oral and injectable formulations. Starter strengths are not maintenance-dose or monthly-cost equivalents.", medicines:[
 row("Semaglutide","3 mg tablet","Rybelsus","Novo Nordisk India Pvt Ltd",2971.88,"10 tablets","MRP",mg("drugs/rybelsus-3mg-tablet-706353")),
 row("Semaglutide","0.25 mg/dose prefilled pen","Ozempic","Novo Nordisk India Pvt Ltd",5660,"1 pen (1.5 mL)","MRP",mg("drugs/ozempic-0.25mg-injection-1088935")),
 row("Liraglutide","6 mg/mL prefilled pen","Lirafit","Glenmark Pharmaceuticals Ltd",2085.94,"1 pen (3 mL)","MRP",mg("drugs/victoza-solution-for-injection-139334?wpsrc=Google+Organic+Search")),
 row("Liraglutide","6 mg/mL prefilled pen","Victoza","Novo Nordisk India Pvt Ltd",4991,"1 pen (3 mL)","MRP",mg("drugs/victoza-solution-for-injection-139334?wpsrc=Google+Organic+Search"),"Sold out at source"),
 row("Dulaglutide","1.5 mg/0.5 mL single-dose pen","Trulicity","Eli Lilly and Company India Pvt Ltd",5669.06,"2 pens (0.5 mL each)","MRP",mg("drugs/trulicity-1.5mg-pre-filled-pen-328641")),
 ]},
 {id:"basal", name:"Basal insulin analogues", note:"Five brands. Glargine U100, glargine U300, degludec and detemir have different devices and pharmacokinetics.", medicines:[
 row("Insulin glargine","100 units/mL cartridge","Lantus","Sanofi India Ltd",651.98,"1 cartridge (3 mL)","MRP",mg("drugs/lantus-100iu-injection-956405")),
 row("Insulin glargine","100 units/mL cartridge","Basalog Refill","Biocon",621.22,"1 cartridge (3 mL)","Listed price",sources.basal),
 row("Insulin degludec","100 units/mL prefilled pen","Tresiba FlexTouch","Novo Nordisk India Pvt Ltd",1942,"1 pen (3 mL)","Listed price",sources.basal),
 row("Insulin glargine","300 units/mL cartridge","Toujeo","Sanofi India Ltd",1540,"1 cartridge (1.5 mL)","Listed price",sources.basal),
 row("Insulin detemir","100 units/mL prefilled pen","Levemir FlexPen","Novo Nordisk India Pvt Ltd",1594.78,"1 pen (3 mL)","Listed price",sources.basal,"Not available at source"),
 ]},
 {id:"rapid", name:"Rapid / faster-acting insulin analogues", note:"Five brands; Fiasp is faster-acting aspart. Device compatibility must be checked.", medicines:[
 row("Insulin aspart","100 units/mL cartridge","NovoRapid Penfill","Novo Nordisk India Pvt Ltd",937.02,"1 cartridge (3 mL)","MRP",mg("drugs/novorapid-100iu-ml-solution-for-injection-372477")),
 row("Insulin aspart (faster-acting)","100 units/mL cartridge","Fiasp Penfill","Novo Nordisk India Pvt Ltd",814.77,"1 cartridge (3 mL)","MRP",mg("drugs/fiasp-100iu-ml-penfill-506091")),
 row("Insulin lispro","100 units/mL cartridge","Humalog","Eli Lilly and Company India Pvt Ltd",1197.8,"1 cartridge (3 mL)","MRP",mg("drugs/humalog-100iu-cartridge-341834")),
 row("Insulin glulisine","100 units/mL cartridge","Apidra","Sanofi India Ltd",5063,"5 cartridges (3 mL each)","MRP",mg("drugs/apidra-100iu-cartridge-3ml-324935")),
 row("Insulin aspart","100 units/mL cartridge","InsuQuick","USV Private Limited",3850,"5 cartridges (3 mL each)","MRP",mg("drugs/insuquick-cartridge-3ml-each-937466")),
 ]},
 {id:"regular", name:"Regular human insulin", note:"Five brands of soluble human insulin. All shown as U40 10 mL vials; match syringe concentration.", medicines:[
 row("Regular human insulin","40 units/mL injection","Huminsulin R","Eli Lilly and Company India Pvt Ltd",177,"1 vial (10 mL)","MRP",sources.regular),
 row("Regular human insulin","40 units/mL injection","Human Actrapid","Novo Nordisk India Pvt Ltd",181.39,"1 vial (10 mL)","Listed price",sources.regular),
 row("Regular human insulin","40 units/mL injection","Insugen-R","Biocon",182.26,"1 vial (10 mL)","Listed price",sources.regular),
 row("Regular human insulin","40 units/mL injection","Lupisulin R","Lupin Ltd",182.6,"1 vial (10 mL)","Listed price",sources.regular),
 row("Regular human insulin","40 units/mL injection","Xsulin R","Eris Lifesciences Limited",181.39,"1 vial (10 mL)","Listed price",sources.regular),
 ]},
 {id:"nph", name:"NPH / isophane human insulin", note:"Five brands of intermediate-acting human insulin. All shown as U40 10 mL vials.", medicines:[
 row("Insulin isophane (NPH)","40 units/mL suspension","Human Insulatard","Novo Nordisk India Pvt Ltd",182.7,"1 vial (10 mL)","Listed price",sources.nph),
 row("Insulin isophane (NPH)","40 units/mL suspension","Insugen-N","Biocon",181.09,"1 vial (10 mL)","Listed price",sources.nph),
 row("Insulin isophane (NPH)","40 units/mL suspension","Huminsulin N","Eli Lilly and Company India Pvt Ltd",177,"1 vial (10 mL)","Listed price",sources.nph),
 row("Insulin isophane (NPH)","40 units/mL suspension","Lupisulin N","Lupin Ltd",178.25,"1 vial (10 mL)","Listed price",sources.nph),
 row("Insulin isophane (NPH)","40 units/mL suspension","Wosulin-N","Wockhardt Ltd",178.29,"1 vial (10 mL)","Listed price",sources.nph,"Not available at source"),
 ]},
 {id:"premix", name:"Premixed human insulin", note:"Five brands of 30% regular + 70% NPH human insulin. Packs and concentrations differ; costs are for the stated packs.", medicines:[
 row("Human insulin 30% + NPH 70%","40 units/mL suspension","Human Mixtard 30/70","Novo Nordisk India Pvt Ltd",181.39,"1 vial (10 mL)","MRP",mg("drugs/human-mixtard-40iu-injection-322872")),
 row("Human insulin 30% + NPH 70%","40 units/mL injection","Huminsulin 30/70","Eli Lilly and Company India Pvt Ltd",177,"1 vial (10 mL)","MRP",sources.mix),
 row("Human insulin 30% + NPH 70%","40 units/mL injection","Insugen 30/70","Biocon",181.09,"1 vial (10 mL)","Listed price",sources.mix),
 row("Human insulin 30% + NPH 70%","40 units/mL injection","Lupisulin M30","Lupin Ltd",182.6,"1 vial (10 mL)","Listed price",sources.mix),
 row("Human insulin 30% + NPH 70%","100 units/mL cartridge","Wosulin 30/70","Wockhardt Ltd",2118.5,"5 cartridges (3 mL each)","Listed price",mg("drugs-therapeutic-classes/drug-class-298?page=5")),
 ]},
 {id:"dual", name:"Dual GIP / GLP-1 receptor agonists", note:"Only one brand verified in this review. Five strengths of the same brand are not presented as five different medicines.", medicines:[
 row("Tirzepatide","2.5 mg/dose KwikPen","Mounjaro","Eli Lilly and Company India Pvt Ltd",13125,"1 multidose pen (2.4 mL; 4 doses)","MRP",mg("drugs/mounjaro-2.5mg-kwikpen-1122597")),
 ]},
 {id:"amylin", name:"Amylin analogues", note:"Pramlintide is mentioned in the learning material, but an Indian retail brand and price were not verified in this review. No invented brands or prices are supplied.", medicines:[]},
];
export const PHARMACOLOGICAL_CLASSES = BASE_MEDICINE_CLASSES.map(({id,name}) => ({id,name}));
export const MEDICINE_CLASSES = [
 ...BASE_MEDICINE_CLASSES.map(group => ({
   ...group,
   kind: group.id === "premix" ? "combination" : "single",
   limited: group.id === "amylin" || group.id === "dual",
   classIds: group.id === "premix" ? ["premix","regular","nph"] : [group.id],
 })),
 ...COMBINATION_CLASSES,
];
const classNames = Object.fromEntries(PHARMACOLOGICAL_CLASSES.map(group => [group.id,group.name]));
export const MEDICINES = MEDICINE_CLASSES.flatMap(group => group.medicines.map(m => ({
 ...m, classId:group.id, className:group.name, kind:group.kind,
 componentClasses:group.classIds.map(id=>classNames[id]).join(" "),
})));

