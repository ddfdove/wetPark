import fs from 'fs';
import path from 'path';

const projectPath = path.resolve(); // 设置你的项目路径

// 递归遍历目录
async function checkJsonFiles(dir) {
  try {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      
      try {
        const stat = await fs.promises.stat(filePath);

        if (stat.isDirectory()) {
          // 如果是目录，则递归检查
          await checkJsonFiles(filePath);
        } else if (filePath.endsWith('.json')) {
          try {
            const content = await fs.promises.readFile(filePath, 'utf-8');
            JSON.parse(content); // 尝试解析 JSON 文件

            console.log(`✅ JSON 格式正确: ${filePath}`);
          } catch (error) {
            console.error(`❌ JSON 格式错误: ${filePath}`);
            console.error(`错误信息: ${error.message}`);
          }
        }
      } catch (error) {
        console.warn(`⚠️ 无法读取文件或目录: ${filePath}`);
        console.warn(`错误信息: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`❌ 无法读取目录: ${dir}`);
    console.error(`错误信息: ${error.message}`);
  }
}

// 运行检查
checkJsonFiles(projectPath);
