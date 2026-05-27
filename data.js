// TBM 안내페이지 콘텐츠 수정 파일
// 아래 문구만 바꾸면 화면에 반영됩니다.

const TBM_DATA = {
  organizationName: "작업 전 안전보건",
  appTitle: "작업 전 TBM 안내",

  today: {
    title: "오늘의 핵심 안전수칙",
    description: "",
    checklist: [
      "작업 전 보호구 착용 방법을 숙지하고 올바르게 착용합니다.",
      "작업 전 스트레칭을 실시합니다.",
      "계단, 지하통로 등 이용 시 미끄럼·넘어짐에 주의합니다.",
      "작업 전 위험요인 및 이동 동선을 확인합니다.",
      "차로 이동 시 반드시 전방과 좌우를 살핀 후 이동합니다."
    ]
  },

  stretching: [
    { title: "목 스트레칭", description: "고개를 천천히 아래로 숙였다가 정면으로 돌아옵니다. 무리하게 젖히지 않습니다." },
    { title: "어깨 돌리기", description: "양쪽 어깨를 크게 뒤로 돌려 긴장을 풀어줍니다." },
    { title: "손목 풀기", description: "손목을 천천히 돌리고 손바닥을 앞으로 밀어줍니다." },
    { title: "허리 펴기", description: "양손을 허리에 두고 허리를 가볍게 펴며 자세를 정돈합니다." }
  ],

  ppeChecklist: [],

  emergencySteps: [
    "즉시 안전한 장소를 확보하고 추가 사고를 방지합니다.",
    "119 신고 및 현장 관리자에게 즉시 보고합니다.",
    "필요 시 심폐소생술 및 AED 사용 등 응급조치를 실시합니다.",
    "사고 발생 경위와 조치사항을 기록·보고합니다."
  ]
};

// 디자인 보정 및 입력정보 저장 기능
(function(){
  const style = document.createElement("style");
  style.textContent = `
    header{background:transparent !important;color:var(--text) !important;padding:18px 18px 4px !important;border-bottom:0 !important;box-shadow:none !important;}
    .top-logo{height:20px !important;width:auto !important;display:block !important;background:transparent !important;border-radius:0 !important;padding:0 !important;}
    .badge{background:transparent !important;border:0 !important;color:var(--sub) !important;border-radius:0 !important;padding:0 !important;font-size:13px !important;font-weight:800 !important;white-space:nowrap !important;}
    .notice{background:#F8FAFC !important;border:1px solid #D7E0EA !important;color:#334155 !important;border-radius:18px !important;padding:14px !important;font-size:14px !important;line-height:1.65 !important;margin-bottom:14px !important;}
    .notice b{color:#17325C !important;}
    .notice-highlight{display:inline-block !important;padding:2px 8px !important;border-radius:999px !important;background:#EEF4FF !important;color:#183B7A !important;font-weight:900 !important;}
    .save-info{display:flex;gap:10px;align-items:flex-start;margin:12px 0;padding:12px;border-radius:14px;background:#F8FAFC;border:1px solid var(--line);font-size:14px;line-height:1.5;color:var(--text);font-weight:900;}
    .save-info input{width:auto;margin-top:3px;accent-color:var(--success);}
  `;
  document.head.appendChild(style);

  window.addEventListener("load", function(){
    const employeeId = document.getElementById("employeeId");
    const branch = document.getElementById("branch");
    const workplace = document.getElementById("workplace");
    const agreeRow = document.querySelector(".agree");
    if(!employeeId || !branch || !workplace || !agreeRow) return;

    if(!document.getElementById("saveInfoCheck")){
      const row = document.createElement("label");
      row.className = "save-info";
      row.innerHTML = '<input type="checkbox" id="saveInfoCheck"><span>내 정보 저장</span>';
      agreeRow.parentNode.insertBefore(row, agreeRow);
    }

    function loadSavedInfo(){
      try{
        const saved = JSON.parse(localStorage.getItem("tbmSavedInfo") || "null");
        if(!saved) return;
        employeeId.value = saved.employeeId || "";
        branch.value = saved.branch || "";
        workplace.value = saved.workplace || "";
        const saveCheck = document.getElementById("saveInfoCheck");
        if(saveCheck) saveCheck.checked = true;
      }catch(e){}
    }

    loadSavedInfo();

    if(typeof window.goConfirm === "function"){
      const originalGoConfirm = window.goConfirm;
      window.goConfirm = function(){
        originalGoConfirm();
        setTimeout(loadSavedInfo, 50);
      };
    }

    if(typeof window.submitConfirm === "function"){
      const originalSubmitConfirm = window.submitConfirm;
      window.submitConfirm = function(){
        const saveCheck = document.getElementById("saveInfoCheck");
        if(saveCheck && saveCheck.checked){
          localStorage.setItem("tbmSavedInfo", JSON.stringify({
            employeeId: employeeId.value.trim(),
            branch: branch.value.trim(),
            workplace: workplace.value.trim()
          }));
        }else{
          localStorage.removeItem("tbmSavedInfo");
        }
        originalSubmitConfirm();
      };
    }
  });
})();
