// WhatsApp number in international format for Egypt: 20 + number without leading 0
// Your number: 01055511518 -> 201055511518
const WHATSAPP_NUMBER = "201055511518";
const WHATSAPP_MESSAGE_AR = "مرحباً Evara، أريد الاستفسار عن خدماتكم في البناء والتصميم.";
const WHATSAPP_MESSAGE_EN = "Hello Evara, I would like to inquire about your building and design services.";

const waBtn = document.getElementById("waBtn");
function setWhatsAppLink(lang){
  const msg = (lang === "ar") ? WHATSAPP_MESSAGE_AR : WHATSAPP_MESSAGE_EN;
  waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const dict = {
  ar: {
    nav_home:"الرئيسية",
    nav_services:"الخدمات",
    nav_portfolio:"أعمالنا",
    nav_testimonials:"آراء العملاء",
    badge:"بناء • تصميم • إشراف",
    hero_title:'نبني الأفكار… ونصمّم الواقع مع <span class="grad">Evara</span> ',
    hero_desc:"Evara شركة هندسية متخصصة في البناء والتصميم، نقدم حلولًا متكاملة في التصميم المعماري والإنشائي، إدارة المشروعات، والإشراف على التنفيذ وفق أعلى معايير الجودة.",
    cta_services:"استعرض الخدمات",
    cta_portfolio:"شاهد أعمالنا",
    stat_projects:"مشروع",
    stat_years:"سنوات خبرة",
    stat_support:"دعم",
    services_title:"خدمات Evara",
    services_desc:"حلول هندسية متكاملة تضمن جودة التنفيذ ونجاح المشروع.",
    srv1_title:"تصميم معماري",
    srv1_desc:"مخططات، واجهات، وتصورات ثلاثية الأبعاد ورسومات تنفيذية.",
    srv2_title:"تصميم إنشائي",
    srv2_desc:"أنظمة إنشائية آمنة مع حسابات دقيقة ورسومات تنفيذية.",
    srv3_title:"تنسيق MEP",
    srv3_desc:"تنسيق كهرباء/ميكانيكا/سباكة وتفادي التعارضات.",
    srv4_title:"إشراف على التنفيذ",
    srv4_desc:"متابعة ميدانية، ضبط جودة، وتقارير دورية.",
    srv5_title:"إدارة مشروعات",
    srv5_desc:"تخطيط وجدولة ومتابعة لضمان التسليم في الوقت.",
    srv6_title:"حصر كميات وتكاليف",
    srv6_desc:"BOQ وتقدير تكاليف وتحسين القيمة الهندسية.",
    portfolio_title:"مشاريع Evara",
    portfolio_desc:"نماذج مختارة من أعمالنا في البناء والتصميم.",
    p1_title:"مبنى تجاري",
    p1_desc:"تصميم معماري وإنشائي متكامل مع لوحات تنفيذية.",
    p2_title:"مجمّع سكني",
    p2_desc:"تخطيط وواجهات وتنسيق MEP وإشراف تنفيذ.",
    p3_title:"منشأة صناعية",
    p3_desc:"تصميم هيكلي ورسومات تفصيلية وتحسينات إنشائية.",
    test_title:"ماذا يقول عملاء Evara",
    test_desc:"آراء حقيقية من عملائنا في مشاريع البناء والتصميم.",
    t1:"“تصميمات دقيقة وتنفيذ منظّم، تجربة ممتازة.”",
    t1n:"عميل",
    t2:"“تنسيق قوي بين التخصصات ولا تعارضات في الموقع.”",
    t2n:"مقاول",
    t3:"“إشراف احترافي وتقارير واضحة طوال مدة المشروع.”",
    t3n:"استشاري",
    wa_text:"واتساب",
    rights:"جميع الحقوق محفوظة."
  },
  en: {
    nav_home:"Home",
    nav_services:"Services",
    nav_portfolio:"Portfolio",
    nav_testimonials:"Testimonials",
    badge:"Build • Design • Supervision",
    hero_title:'Build ideas… and deliver reality with <span class="grad">Evara</span> ',
    hero_desc:"Evara is an engineering company specialized in building and design, providing architectural and structural design, project management, and site supervision with high quality standards.",
    cta_services:"Explore Services",
    cta_portfolio:"View Portfolio",
    stat_projects:"Projects",
    stat_years:"Years Experience",
    stat_support:"Support",
    services_title:"Evara Services",
    services_desc:"Integrated engineering solutions to ensure quality and successful delivery.",
    srv1_title:"Architectural Design",
    srv1_desc:"Plans, facades, 3D visualization, and execution drawings.",
    srv2_title:"Structural Design",
    srv2_desc:"Safe structural systems with accurate calculations and drawings.",
    srv3_title:"MEP Coordination",
    srv3_desc:"Electrical/Mechanical/Plumbing coordination and clash prevention.",
    srv4_title:"Site Supervision",
    srv4_desc:"On-site follow-up, quality control, and periodic reporting.",
    srv5_title:"Project Management",
    srv5_desc:"Planning, scheduling, and tracking to deliver on time.",
    srv6_title:"Quantity Surveying",
    srv6_desc:"BOQ, cost estimation, and value engineering.",
    portfolio_title:"Evara Projects",
    portfolio_desc:"Selected work samples in building and design.",
    p1_title:"Commercial Building",
    p1_desc:"Full architectural & structural package with execution drawings.",
    p2_title:"Residential Compound",
    p2_desc:"Planning, facades, MEP coordination, and supervision.",
    p3_title:"Industrial Facility",
    p3_desc:"Structural detailing and optimized engineering solutions.",
    test_title:"What Evara Clients Say",
    test_desc:"Real feedback from building & design projects.",
    t1:"“Accurate designs and organized execution. Excellent experience.”",
    t1n:"Client",
    t2:"“Strong coordination across disciplines, no site clashes.”",
    t2n:"Contractor",
    t3:"“Professional supervision with clear reports throughout the project.”",
    t3n:"Consultant",
    wa_text:"WhatsApp",
    rights:"All rights reserved."
  }
};

const langToggle = document.getElementById("langToggle");

function applyLang(lang){
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[lang][key]) el.innerHTML = dict[lang][key];
  });

  langToggle.textContent = (lang === "ar") ? "EN" : "AR";
  setWhatsAppLink(lang);
  localStorage.setItem("evara_lang", lang);
}

langToggle.addEventListener("click", ()=>{
  const current = localStorage.getItem("evara_lang") || "ar";
  applyLang(current === "ar" ? "en" : "ar");
});

applyLang(localStorage.getItem("evara_lang") || "ar");
