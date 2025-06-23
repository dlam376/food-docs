async function renderDatabaseContent(tableName) {
  try {
    const cacheContent = localStorage.getItem(tableName);
    if (cacheContent) {
      return cacheContent;
    }
    const reqData = {
      tableName: tableName,
    };
    const res = await fetch("https://ycobfudfzkft.ap-northeast-1.clawcloudrun.com/dynamic/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "9966",
      },
      body: JSON.stringify(reqData),
    });
    const resJson = await res.json();
    const resData = resJson.data
    // 对存在换行符 \n 的地方进行换行
    resData.forEach(item => {
      if (item.content.includes('\\n')) {
        item.content = item.content.replace(/\\n/g, '  \n')
      }
    })
    // const resData = [
    //   { level1: "概述", content: "总览内容..." }, // 只有level1
    //   {
    //     level1: "安装",
    //     level2: "Windows",
    //     content: "Win安装...",
    //   }, // level1+2
    //   {
    //     level1: "开发",
    //     level2: "API",
    //     level3: "鉴权",
    //     content: "OAuth...",
    //   }, // 完整三级
    // ];
    // 按照层级分组数据
    const groupedData = groupByLevels(resData);

    // 生成Markdown格式内容
    const markdownContent = generateMarkdown(groupedData);
    localStorage.setItem(tableName, markdownContent);
    return markdownContent;
  } catch (error) {
    return `❌ 加载失败: ${error.message}`;
  }
}

// 按层级分组数据
function groupByLevels(data) {
  const result = {};

  data.forEach((item) => {
    // 如果level1不存在则跳过（或可以设置为"未分类"）
    if (!item.level1) return;

    // 初始化一级分类
    if (!result[item.level1]) {
      result[item.level1] = {
        _directContent: [], // 专门存储没有子层级的内容
      };
    }

    // 如果有level2
    if (item.level2) {
      if (!result[item.level1][item.level2]) {
        result[item.level1][item.level2] = [];
      }
      result[item.level1][item.level2].push(item);
    }
    // 只有level1的情况
    else {
      result[item.level1]._directContent.push(item);
    }
  });

  return result;
}

// 生成Markdown文本
function generateMarkdown(groupedData) {
  let md = "";

  Object.entries(groupedData).forEach(([level1, level2Data]) => {
    md += `# ${level1}\n\n`;

    // 先处理直接属于level1的内容
    if (level2Data._directContent?.length) {
      level2Data._directContent.forEach((item) => {
        md += `${item.content}\n\n`;
      });
    }

    // 处理有level2的内容
    Object.entries(level2Data).forEach(([level2, items]) => {
      if (level2 === "_directContent") return;

      md += `## ${level2}\n\n`;

      items.forEach((item) => {
        if (item.level3) {
          md += `### ${item.level3}\n`;
        }
        md += `${item.content}\n\n`;
      });
    });
  });

  return md;
}
