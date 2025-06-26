// 表单控制
var tableName = "";
function showFormModal(fileName) {
  tableName = fileName;
  document.getElementById("formModal").style.display = "flex";
}

// 隐藏表单弹窗
function hideFormModal() {
  document.getElementById("formModal").style.display = "none";
}

// 点击模态框外部关闭
document.getElementById("formModal").addEventListener("click", function (e) {
  if (e.target === this) {
    hideFormModal();
  }
});

// 表单提交处理
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 获取表单数据
  const formData = {
    tableName: tableName,
    tp: document.getElementById("tp").value,
    level1: document.getElementById("title1").value,
    level2: document.getElementById("title2").value,
    level3: document.getElementById("title3").value,
    content: document.getElementById("content").value,
  };

  // 表单处理逻辑
  const reqData = {
    tableName: tableName,
    columnData: [
      {
        level1: formData.level1,
        level2: formData.level2,
        level3: formData.level3,
        content: formData.content,
      },
    ],
  };
  fetch("https://ycobfudfzkft.ap-northeast-1.clawcloudrun.com/dynamic/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: formData.tp,
    },
    body: JSON.stringify(reqData),
  }).then((res) => {
    // 重置表单并关闭弹窗
    if (res.status === 200) {

      this.reset();
    }
  });

  hideFormModal();
});
