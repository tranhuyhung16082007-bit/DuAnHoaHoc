import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Constants for content directory
const contentDir = path.join(process.cwd(), "content");

export async function getLessonData(grade: string, chapterId: string, lessonId: string) {
  const filePath = path.join(contentDir, grade, chapterId, `${lessonId}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    return {
      success: true as const,
      frontmatter,
      content
    };
  } catch (error) {
    return {
      success: false as const,
      error: `Không tìm thấy file bài học: ${filePath}`
    };
  }
}

// Function to recursively get all .mdx files
function walkDir(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else if (filePath.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function getAllPaths() {
  return walkDir(contentDir);
}

export function getMdxBySlug(slugArray: string[]) {
  const filePath = path.join(contentDir, ...slugArray) + ".mdx";
  if (!fs.existsSync(filePath)) {
    return null; // Not an MDX file
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  return {
    slug: slugArray.join("/"),
    frontmatter,
    content,
  };
}

export function getDirectoryContent(slugArray: string[]) {
  const dirPath = slugArray.length > 0 ? path.join(contentDir, ...slugArray) : contentDir;
  
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return null;
  }

  let meta = { title: slugArray[slugArray.length - 1] || "Thư mục", description: "" };
  const metaPath = path.join(dirPath, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch (e) {}
  }

  const items = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file === "meta.json") continue;
    
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    const itemSlug = slugArray.length > 0 ? `${slugArray.join("/")}/${file.replace(".mdx", "")}` : file.replace(".mdx", "");

    if (stat.isDirectory()) {
      let childMeta = { title: file, description: "" };
      const childMetaPath = path.join(filePath, "meta.json");
      if (fs.existsSync(childMetaPath)) {
        try {
          childMeta = JSON.parse(fs.readFileSync(childMetaPath, "utf-8"));
        } catch (e) {}
      }
      items.push({
        slug: itemSlug,
        type: "directory",
        title: childMeta.title || file,
        description: childMeta.description,
      });
    } else if (file.endsWith(".mdx")) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      items.push({
        slug: itemSlug,
        type: "file",
        title: data.title || file.replace(".mdx", ""),
        description: data.description || "",
      });
    }
  }

  return {
    meta,
    items,
  };
}
